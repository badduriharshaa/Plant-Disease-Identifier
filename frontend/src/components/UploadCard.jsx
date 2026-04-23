import { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { UploadCloud, Camera, Image as ImageIcon, X, ArrowLeft, ScanLine } from 'lucide-react';

export default function UploadCard({ activeTab, setActiveTab, onProcess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const webcamRef = useRef(null);
  const [cameraError, setCameraError] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    maxFiles: 1
  });

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setPreview(imageSrc);
      setFile(imageSrc); // Data URL for now
    }
  }, [webcamRef]);

  const handleProcess = () => {
    if (file) {
      onProcess(file);
    }
  };

  return (
    <motion.div 
      className="w-full max-w-2xl mt-10 p-[1px] rounded-2xl bg-gradient-to-b from-ai-border to-ai-darker shadow-2xl overflow-hidden glass-panel backdrop-blur-3xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-ai-dark/90 rounded-[15px] p-6 lg:p-8 relative">
        <button 
          onClick={() => setActiveTab(null)}
          className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-center text-white mb-2 mt-4">Detect Plant Disease</h2>
        <p className="text-center text-slate-400 mb-8 max-w-sm mx-auto">
          {activeTab === 'upload' ? 'Upload an image of the plant leaf.' : 'Use your camera to scan a leaf in real-time.'}
        </p>

        {/* Tab Controls */}
        <div className="flex bg-ai-darker rounded-xl p-1 mb-6 border border-ai-border/50 max-w-xs mx-auto">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${activeTab === 'upload' ? 'bg-ai-green text-ai-darker shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            <UploadCloud className="w-4 h-4" /> Upload
          </button>
          <button
            onClick={() => setActiveTab('camera')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${activeTab === 'camera' ? 'bg-ai-light text-ai-darker shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            <Camera className="w-4 h-4" /> Camera
          </button>
        </div>

        {/* Content Area */}
        <div className="min-h-[300px] flex flex-col items-center justify-center">
          
          {activeTab === 'upload' && !preview && (
            <div 
              {...getRootProps()} 
              className={`w-full h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors
                ${isDragActive ? 'border-ai-green bg-ai-green/10' : 'border-ai-border hover:border-ai-green/50 bg-ai-darker/50 hover:bg-ai-darker'}
              `}
            >
              <input {...getInputProps()} />
              <div className="p-4 bg-ai-dark rounded-full mb-4 shadow-inner border border-ai-border">
                <UploadCloud className={`w-8 h-8 ${isDragActive ? 'text-ai-green animate-bounce' : 'text-ai-green/70'}`} />
              </div>
              <p className="text-white font-medium mb-1">Drag & drop your image here</p>
              <p className="text-slate-400 text-sm">Supports JPG and PNG up to 10MB</p>
              <button className="mt-4 px-6 py-2 bg-ai-border/40 hover:bg-ai-border text-white text-sm font-semibold rounded-lg transition-colors border border-ai-border">
                Browse Files
              </button>
            </div>
          )}

          {activeTab === 'camera' && !preview && (
            <div className="w-full relative rounded-2xl overflow-hidden border-2 border-ai-border bg-black h-64 flex items-center justify-center">
              {!cameraError ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: "environment" }}
                  onUserMediaError={() => setCameraError(true)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <Camera className="w-10 h-10 text-red-400 mx-auto mb-2" />
                  <p className="text-red-400 font-medium">Camera access denied or unavailable.</p>
                </div>
              )}
              
              {!cameraError && (
                <div className="absolute inset-0 border-4 border-ai-green/30 m-4 rounded-xl pointer-events-none drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] flex items-center justify-center">
                  <div className="w-32 h-32 border-2 text-ai-green border-ai-green/60 rounded-lg flex items-center justify-center opacity-50">
                    <ScanLine className="w-10 h-10 animate-pulse" />
                  </div>
                </div>
              )}
              
              {!cameraError && (
                <button 
                  onClick={capture}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm border-4 border-white rounded-full hover:bg-white/40 transition-colors shadow-xl"
                />
              )}
            </div>
          )}

          {preview && (
            <div className="w-full relative">
              <div className="relative w-full h-64 rounded-2xl overflow-hidden border-2 border-ai-border/80">
                <img src={preview} alt="Leaf Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => { setPreview(null); setFile(null); }}
                  className="absolute top-2 right-2 p-2 bg-black/60 hover:bg-red-500 text-white rounded-full transition-colors backdrop-blur-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <motion.button 
                onClick={handleProcess}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 py-4 bg-ai-green hover:bg-ai-light text-ai-darker font-bold rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 text-lg transition-colors"
              >
                <ScanLine className="w-5 h-5" />
                Analyze Image
              </motion.button>
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
}
