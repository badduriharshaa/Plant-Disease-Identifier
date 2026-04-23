import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ScanLine, SearchCode, Combine, Loader2 } from 'lucide-react';

export default function ProcessingAnimation({ imageUrl }) {
  const steps = [
    { text: "Processing image...", icon: <ScanLine className="w-4 h-4" /> },
    { text: "Analyzing patterns...", icon: <SearchCode className="w-4 h-4" /> },
    { text: "Identifying features...", icon: <Combine className="w-4 h-4" /> },
    { text: "Generating result...", icon: <Loader2 className="w-4 h-4" /> }
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <motion.div 
      className="w-full h-full flex flex-col items-center justify-center gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h3 className="text-xl font-bold text-white tracking-wide">
        Scanning
      </h3>
      
      <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl border-2 border-ai-green/50 overflow-hidden relative shadow-[0_0_20px_rgba(16,185,129,0.2)] shrink-0">
        {imageUrl ? (
          <img src={imageUrl} alt="Processing" className="w-full h-full object-cover filter brightness-50" />
        ) : (
          <div className="w-full h-full bg-ai-darker flex items-center justify-center">
            <ScanLine className="w-12 h-12 text-slate-600" />
          </div>
        )}
        
        <motion.div 
          className="absolute left-0 w-full h-[3px] bg-ai-light drop-shadow-[0_0_8px_rgba(52,211,153,1)] z-20"
          initial={{ top: '0%' }}
          animate={{ top: '100%' }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear', repeatType: 'reverse' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-10"></div>
      </div>

      <div className="w-full max-w-xs mt-4">
        <div className="space-y-3 flex flex-col items-center">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={index} className="flex items-center gap-3 w-full max-w-[200px]">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-300 shrink-0
                  ${isCompleted ? 'bg-ai-green/20 text-ai-green border border-ai-green/50' : 
                    isActive ? 'bg-ai-green text-ai-darker shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 
                    'bg-slate-800 text-slate-500'}
                `}>
                  {isActive ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                      <Loader2 className="w-3 h-3" />
                    </motion.div>
                  ) : (
                    step.icon
                  )}
                </div>
                <span className={`text-sm font-medium transition-colors duration-300
                  ${isCompleted ? 'text-slate-400' : isActive ? 'text-white' : 'text-slate-600'}
                `}>
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
