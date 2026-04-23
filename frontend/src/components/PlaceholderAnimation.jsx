import { motion } from 'framer-motion';

export default function PlaceholderAnimation() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none flex flex-col items-center justify-center overflow-hidden">
      {/* Background glow behind leaf */}
      <div className="absolute w-[300px] h-[300px] bg-ai-light/10 rounded-full blur-[70px] pointer-events-none"></div>

      {/* Main Animation Area utilizing the entire exact Result Card constraints natively */}
      <div className="relative w-full h-full flex items-center justify-center max-w-[800px] mx-auto pointer-events-none overflow-hidden">
        
        {/* The Plant Leaf - Sized accurately at 220px, perfectly vertically/horizontally centered */}
        <motion.svg
          width="220"
          height="300"
          viewBox="0 0 200 300"
          className="absolute z-10 text-ai-green drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: 1,
            scale: 1,
            filter: [
              'drop-shadow(0 0 10px rgba(16,185,129,0.5))', 
              'drop-shadow(0 0 25px rgba(52,211,153,0.8))', 
              'drop-shadow(0 0 10px rgba(16,185,129,0.5))'
            ]
          }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        >
          <path
            d="M100 280 C100 280, 20 200, 20 100 C20 40, 100 20, 100 20 C100 20, 180 40, 180 100 C180 200, 100 280, 100 280 Z"
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M100 280 L100 20 M100 150 L40 100 M100 200 L50 150 M100 100 L60 60 M100 150 L160 100 M100 200 L150 150 M100 100 L140 60" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </motion.svg>

        {/* Small Scanning Line passing directly over the Leaf face independently */}
        <motion.div
           className="absolute z-20 w-[220px] h-[3px] bg-ai-light shadow-[0_0_15px_rgba(52,211,153,1),0_0_30px_rgba(52,211,153,1)] rounded-full"
           initial={{ top: '20%', opacity: 0 }}
           animate={{ 
             top: ['20%', '20%', '20%', '80%', '80%', '20%', '20%'],
             opacity: [0, 0, 0, 1, 0, 0, 0]
           }}
           transition={{ duration: 8, times: [0, 0.3, 0.4, 0.6, 0.7, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Smartphone sliding from far absolute edge, sizing specifically 150px, overlapping leaf partially */}
        <motion.div
          className="absolute z-30"
          initial={{ x: "200%", y: "0%", rotate: -5, opacity: 0 }}
          animate={{ 
            x: ["200%", "95%", "95%", "95%", "95%", "200%"], 
            y: ["0%", "0%", "0%", "0%", "0%", "0%"],
            rotate: [-5, -15, -15, -15, -15, -5],
            opacity: [0, 1, 1, 1, 1, 0]
          }}
          transition={{ duration: 8, times: [0, 0.2, 0.3, 0.7, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Phone outline: Exactly 150px wide */}
          <div className="w-[150px] h-[280px] border-[4px] border-slate-700 rounded-[25px] bg-[#020617]/90 flex items-center justify-center relative shadow-2xl backdrop-blur-md">
            
            {/* Phone Screen Mock */}
            <div className="w-[135px] h-[255px] rounded-[18px] border border-slate-800 relative bg-black/60 overflow-hidden flex flex-col items-center">
              <div className="w-full h-5 bg-slate-800/80 mb-2 flex items-center justify-center">
                 <div className="w-8 h-1 bg-slate-500 rounded-full"></div>
              </div>

              {/* Viewfinder Frame in Phone */}
              <div className="w-24 h-32 border-2 border-ai-green/60 rounded-xl relative flex justify-center items-center overflow-hidden mt-6">
                
                {/* Simulated Leaf inside phone */}
                <motion.svg
                  viewBox="0 0 200 300"
                  className="w-16 h-24 text-ai-green opacity-50"
                  animate={{ scale: [1, 1.05, 1.05, 1.05, 1] }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  <path
                    d="M100 280 C100 280, 20 200, 20 100 C20 40, 100 20, 100 20 C100 20, 180 40, 180 100 C180 200, 100 280, 100 280 Z"
                    fill="currentColor"
                    fillOpacity="0.3"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </motion.svg>
                
                {/* Processing Sweep inside phone screen */}
                <motion.div
                  className="absolute left-0 w-full h-[2px] bg-ai-light shadow-[0_0_6px_rgba(52,211,153,1)] z-20"
                  initial={{ top: '0%', opacity: 0 }}
                  animate={{ 
                    top: ['0%', '0%', '0%', '100%', '0%', '0%'],
                    opacity: [0, 0, 0, 1, 1, 0]
                  }}
                  transition={{ duration: 8, times: [0, 0.4, 0.45, 0.65, 0.7, 1], repeat: Infinity }}
                />
              </div>

              {/* Bottom Phone Button */}
              <div className="absolute bottom-4 w-10 h-10 rounded-full border-[3px] border-slate-500 bg-slate-300 flex items-center justify-center shadow-inner">
                 <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
          
          {/* Hand Abstract Elements */}
          <div className="absolute top-16 -left-3 w-6 h-20 bg-slate-800 rounded-lg shadow-md border border-slate-700/50"></div>
          <div className="absolute top-12 right-[-5px] w-8 h-24 bg-slate-800 rounded-lg shadow-md border border-slate-700/50"></div>
        </motion.div>
      </div>
    </div>
  );
}
