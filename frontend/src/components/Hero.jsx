import { motion } from 'framer-motion';
import { Upload, Camera } from 'lucide-react';

export default function Hero({ onSelectTab }) {
  return (
    <motion.div 
      className="max-w-3xl text-center flex flex-col items-center gap-8 mt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-ai-light text-sm font-medium mb-4 border-ai-green/30 border">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ai-green opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-ai-green"></span>
        </span>
        Deep Learning Powered
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-md">
        AI Powered Plant <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-green to-ai-light">Disease Detection</span>
      </h1>
      
      <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
        Upload or scan a plant leaf image and detect diseases instantly using advanced deep learning. Identify issues early and protect your crops.
      </p>
      
      <div className="flex items-center justify-center gap-6 mt-8">
        <button 
          onClick={() => onSelectTab('upload')}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-ai-green hover:bg-ai-light text-ai-darker font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
        >
          <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          <span>Upload Image</span>
        </button>
        
        <button 
          onClick={() => onSelectTab('camera')}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 glass-panel hover:bg-slate-800 text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-ai-light"
        >
          <Camera className="w-5 h-5 group-hover:scale-110 transition-transform text-slate-300 group-hover:text-ai-light" />
          <span>Scan Leaf</span>
        </button>
      </div>
    </motion.div>
  );
}
