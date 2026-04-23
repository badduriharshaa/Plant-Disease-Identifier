from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import io
import os
import json
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import models, transforms
from PIL import Image

app = FastAPI(title="Plant Disease Detector API")

# ──────────────────────────────────────────────
# Class labels (load from classes.json)
# ──────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CLASSES_PATH = os.path.join(BASE_DIR, "classes.json")

try:
    with open(CLASSES_PATH, "r") as f:
        classes = json.load(f)
    print(f"Loaded {len(classes)} classes from {CLASSES_PATH}")
except Exception as e:
    print(f"Failed to load classes.json: {e}")
    classes = []

NUM_CLASSES = len(classes)

# ──────────────────────────────────────────────
# Load MobileNetV2 model with trained weights
# ──────────────────────────────────────────────
# Model is located at: C:\Users\chait\on pc\plant disease\implementation\best_model_mobilenet.pth
MODEL_PATH = os.path.normpath(os.path.join(BASE_DIR, "..", "..", "..", "best_model_mobilenet.pth"))

try:
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")

    # Rebuild the same MobileNetV2 architecture used during training
    model = models.mobilenet_v2(weights=None)
    model.classifier = nn.Sequential(
        nn.Dropout(0.4),
        nn.Linear(model.last_channel, NUM_CLASSES)
    )

    # Load trained weights
    state_dict = torch.load(MODEL_PATH, map_location="cpu", weights_only=True)
    model.load_state_dict(state_dict)
    model.eval()
    print(f"MobileNetV2 model loaded successfully with {NUM_CLASSES} classes.")
    print(f"Model path: {MODEL_PATH}")

except Exception as e:
    print(f"Failed to load model: {e}")
    model = None

# ──────────────────────────────────────────────
# Image preprocessing pipeline (ImageNet norms)
# ──────────────────────────────────────────────
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])

# ──────────────────────────────────────────────
# CORS – allow React frontend on any port
# ──────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────────────────────────────────
# Routes
# ──────────────────────────────────────────────
@app.get("/")
def read_root():
    return {
        "message": "Welcome to the Plant Disease Detector API",
        "model_loaded": model is not None,
        "num_classes": NUM_CLASSES,
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Check server logs.")

    if NUM_CLASSES == 0:
        raise HTTPException(status_code=503, detail="Class labels not loaded. Check classes.json.")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        input_tensor = preprocess(image).unsqueeze(0)

        print("Running model inference...")
        with torch.no_grad():
            output = model(input_tensor)
        print("Inference finished")

        probabilities = F.softmax(output, dim=1)
        confidence_tensor, predicted_idx_tensor = torch.max(probabilities, dim=1)

        predicted_idx = predicted_idx_tensor.item()
        confidence    = confidence_tensor.item()

        if predicted_idx < len(classes):
            raw_name = classes[predicted_idx]
            # Format: "Plant_Disease" -> "Plant — Disease"
            parts = raw_name.split("_", 1)
            if len(parts) == 2:
                plant = parts[0].replace("_", " ").strip()
                disease = parts[1].replace("_", " ").strip()
                disease_name = f"{plant} — {disease}"
            else:
                disease_name = raw_name.replace("_", " ")
        else:
            disease_name = f"Class {predicted_idx}"

        return {
            "disease":    disease_name,
            "confidence": round(float(confidence), 4),
            "class_idx":  predicted_idx,
            "raw_label":  classes[predicted_idx] if predicted_idx < len(classes) else None,
        }

    except Exception as e:
        print("Prediction error:", e)
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
