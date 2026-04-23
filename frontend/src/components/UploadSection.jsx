// Left Side
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { UploadCloud, X, ScanLine } from 'lucide-react';

export default function UploadSection({ onProcess, disabled }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    if (disabled) return;
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }, [disabled]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    disabled
  });

  const handleProcess = () => {
    if (file && !disabled) {
      onProcess(file);
    }
  };

  return (
    <div className="h-full w-full flex flex-col p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-3xl min-h-0 relative overflow-hidden" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>

      <h2 className="text-xl font-bold text-white mb-6 shrink-0 relative z-10 flex items-center gap-2">
        <UploadCloud className="w-5 h-5 text-ai-green" /> Upload Image
      </h2>
      
      <div className="flex-1 w-full min-h-0 flex flex-col items-center justify-center relative overflow-hidden z-10">
        {!preview ? (
          <div 
            {...getRootProps()} 
            className={`w-full flex-1 border-[3px] border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all p-4 md:p-6 overflow-hidden
              ${isDragActive ? 'border-ai-green bg-ai-green/10' : 'border-white/20 hover:border-ai-green/60 bg-slate-900/50 hover:bg-slate-800/60'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input {...getInputProps()} />
            
            <div className="flex flex-col items-center justify-center w-full shrink-0 min-h-0 overflow-hidden text-center gap-2">
              <div className="flex flex-row items-center justify-center gap-1.5 text-white font-medium text-[12px] md:text-[13px] flex-wrap leading-tight">
                <span>Drag & drop an image here or</span>
                <button 
                  disabled={disabled} 
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] md:text-[12px] text-white font-bold rounded-md transition-colors border border-slate-600 shadow-sm shrink-0 pointer-events-none"
                  onClick={(e) => {
                    // Prevent dropzone interference by calling the button internally using HTML semantics, dropzone handles clicking anyway
                    e.stopPropagation();
                  }}
                >
                  Browse Files
                </button>
              </div>
              <p className="text-slate-400 text-[11px] md:text-[12px] opacity-60 w-full truncate px-2">Supports JPG and PNG</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col relative min-h-0">
            {/* Upload preview takes exactly the full extent of this flex body */}
            <div className="w-full flex-1 rounded-2xl overflow-hidden border-[3px] border-ai-green/30 relative flex items-center justify-center bg-black/50 min-h-0 shrink-1">
              <img src={preview} alt="Upload Preview" className="w-full h-full object-contain" />
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
              className={`w-full mt-4 py-4 bg-ai-green hover:bg-ai-light text-ai-darker font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0 text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ScanLine className="w-6 h-6" />
              Analyze Image
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
