// Right Side
import { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { Camera, X, ScanLine } from 'lucide-react';

export default function CameraSection({ onProcess, disabled }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const webcamRef = useRef(null);
  const [cameraError, setCameraError] = useState(false);

  const capture = useCallback(() => {
    if (disabled) return;
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPreview(imageSrc);
      setFile(imageSrc);
    }
  }, [webcamRef, disabled]);

  const handleProcess = () => {
    if (file && !disabled) {
      onProcess(file);
    }
  };

  return (
    <div className="h-full w-full flex flex-col p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-3xl min-h-0 relative overflow-hidden" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>

      <h2 className="text-xl font-bold text-white mb-6 shrink-0 relative z-10 flex items-center gap-2">
        <Camera className="w-5 h-5 text-ai-light" /> Live Camera
      </h2>
      
      <div className="flex-1 w-full min-h-0 flex flex-col items-center justify-center relative overflow-hidden z-10">
        {!preview ? (
           <div className="w-full flex-1 relative rounded-2xl overflow-hidden border-[3px] border-white/20 bg-slate-900/60 flex flex-col items-center justify-center p-4">
             {!cameraError ? (
               <Webcam
                 audio={false}
                 ref={webcamRef}
                 screenshotFormat="image/jpeg"
                 videoConstraints={{ facingMode: "environment" }}
                 onUserMediaError={() => setCameraError(true)}
                 className={`absolute inset-0 w-full h-full object-cover ${disabled ? 'opacity-50 blur-sm' : ''}`}
               />
             ) : (
               <div className="flex flex-col items-center justify-center w-full h-full text-center shrink-0 min-h-0 overflow-hidden px-4">
                 <p className="text-red-400 font-medium text-[12px] md:text-[13px] opacity-80 w-full whitespace-normal">Camera access denied. Please allow camera permission to use this feature.</p>
               </div>
             )}
             
             {!cameraError && !disabled && (
               <>
                 {/* Viewfinder brackets */}
                 <div className="absolute inset-0 border-4 border-ai-light/30 m-4 rounded-xl pointer-events-none drop-shadow-[0_0_10px_rgba(52,211,153,0.5)] flex items-center justify-center">
                   <div className="w-24 h-24 border-[3px] border-ai-light/60 rounded-full flex items-center justify-center opacity-40">
                     <ScanLine className="w-10 h-10 text-ai-light animate-pulse" />
                   </div>
                 </div>
                 
                 <button 
                   onClick={capture}
                   className="absolute bottom-5 left-1/2 -translate-x-1/2 w-16 h-16 bg-white/20 backdrop-blur-md border-4 border-white rounded-full hover:bg-white/40 transition-colors shadow-[0_0_25px_rgba(255,255,255,0.4)] z-20 shrink-0"
                 />
               </>
             )}
           </div>
        ) : (
          <div className="w-full h-full flex flex-col relative min-h-0">
            <div className="w-full flex-1 rounded-2xl overflow-hidden border-[3px] border-ai-light/30 bg-black/50 min-h-0 relative flex items-center justify-center">
              <img src={preview} alt="Camera Capture Preview" className="w-full h-full object-contain" />
              <button 
                onClick={() => { setPreview(null); setFile(null); }}
                className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-black/70 hover:bg-red-500 text-white rounded-full transition-all backdrop-blur-md shadow-lg z-10 border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <motion.button 
              disabled={disabled}
              onClick={handleProcess}
              whileHover={{ scale: disabled ? 1 : 1.02 }}
              whileTap={{ scale: disabled ? 1 : 0.98 }}
              className={`w-full mt-4 py-4 bg-ai-light hover:bg-ai-green text-ai-darker font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0 text-lg shadow-[0_0_20px_rgba(52,211,153,0.3)] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ScanLine className="w-6 h-6" />
              Analyze Capture
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
