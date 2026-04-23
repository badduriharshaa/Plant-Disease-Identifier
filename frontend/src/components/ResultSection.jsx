// Center Result Card
import { motion } from 'framer-motion';
import { CheckCircle2, RotateCcw } from 'lucide-react';

export default function ResultSection({ result, imageUrl, onReset }) {
  const disease = result?.disease || "Unknown";
  const confidence = result?.confidence ? Math.round(result.confidence * 100) : 0;
  
  const isHealthy = disease.toLowerCase().includes("healthy");
  const colorClass = isHealthy ? "text-ai-green" : "text-amber-500";
  const borderClass = isHealthy ? "border-ai-green/50" : "border-amber-500/50";
  const ringClass = isHealthy ? "text-ai-green" : "text-amber-500";
  const bgClass = isHealthy ? "bg-ai-green/10" : "bg-amber-500/10";

  return (
    <motion.div 
      className="w-full h-full flex flex-col items-center justify-center gap-4 md:gap-6 overflow-hidden relative box-border"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-[200px] h-[160px] md:h-[180px] rounded-2xl overflow-hidden border border-slate-700 bg-[#020617] relative shadow-inner shrink-0 flex items-center justify-center mx-auto">
        {imageUrl ? (
          <img src={imageUrl} alt="Scanned Leaf" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 text-sm">No Image</div>
        )}
        <div className="absolute inset-0 border-2 border-ai-green/20 pointer-events-none rounded-xl"></div>
      </div>

      <div className="w-full flex-1 flex flex-col items-center justify-center min-h-0 overflow-hidden box-border">
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-1 md:mb-2 shrink-0">Analysis Result</span>
        
        <h2 className={`text-xl md:text-2xl font-bold text-center leading-tight mb-4 md:mb-6 ${colorClass} drop-shadow-md px-2 md:px-4 break-words line-clamp-2 shrink-0 w-full`}>
          {disease}
        </h2>

        <div className="flex flex-row items-center gap-4 md:gap-6 justify-center w-full mb-4 md:mb-6 shrink-0 px-2 flex-wrap">
          <div className={`flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border-[3px] md:border-4 ${borderClass} ${bgClass} shadow-lg relative shrink-0`}>
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
               <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="3" fill="transparent" className={`${ringClass} opacity-20`} />
               <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="3" fill="transparent"
                 strokeDasharray={`${(confidence / 100) * 264} 264`} 
                 className={ringClass} 
                 strokeLinecap="round" 
                 style={{ transition: "stroke-dasharray 1s ease-in-out" }}
               />
            </svg>
            <span className="text-lg md:text-2xl font-bold text-white z-10">{confidence}%</span>
          </div>
          
          <div className="flex-1 min-w-[140px] max-w-[220px] shrink-0">
            <p className="text-slate-300 text-xs md:text-sm leading-snug md:leading-relaxed mb-2 line-clamp-3">
              {isHealthy 
                ? "Leaf appears healthy. Keep monitoring regularly."
                : "Pathogens detected. Immediate treatment is recommended."}
            </p>
            <div className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-semibold px-2 py-1 md:px-3 md:py-1.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              <CheckCircle2 className="w-3 h-3 text-ai-green" /> Verified Model
            </div>
          </div>
        </div>

        <button 
          onClick={onReset}
          className="mt-auto w-full max-w-[280px] md:max-w-[320px] py-3 bg-slate-800 hover:bg-slate-700 border border-ai-green/50 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] text-sm md:text-base shrink-0 mx-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Scan Another Leaf
        </button>
      </div>
    </motion.div>
  );
}
