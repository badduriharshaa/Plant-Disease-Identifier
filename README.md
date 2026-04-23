Plant Disease Identifier

A deep learning-based web application that identifies diseases in plant leaves using image classification. Users can upload a leaf image or capture one using their device camera, and the system instantly identifies the disease along with a confidence score.

About the Project

This project uses a fine-tuned MobileNetV2 model trained to classify 185 disease categories across 38+ plant species. The application features a modern, dark-themed web interface built with React and a FastAPI backend that handles image processing and model inference.

Plants Covered :

Aloe Vera, Apple, Arabian Jasmine, Banana, Bitter Gourd, Black Pepper, Blackgram, Bottle Gourd, Cassava, Cauliflower, Chilli, Chrysanthemum, Cotton, Cucumber, Drumstick, Eggplant, Grape, Guava, Hibiscus, Jute, Maize, Mango, Money Plant, Neem, Night Jasmine, Orange, Papaya, Pepper Bell, Potato, Ragi, Rice, Rose, Sugarcane, Tea, Tomato, Turmeric, Wheat

How It Works

1. User uploads or captures a leaf image.
2. The image is sent to the FastAPI backend.
3. The MobileNetV2 model processes and classifies the image.
4. The identified disease name and confidence score are returned to the user.

Tech Stack
Frontend: React, Vite, TailwindCSS, Framer Motion
Backend: FastAPI, Uvicorn
Model: MobileNetV2 (PyTorch)
