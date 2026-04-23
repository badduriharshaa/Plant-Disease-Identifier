import { motion } from 'framer-motion';

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-40 bg-ai-darker">
      {/* Background glow behind leaf */}
      <div className="absolute w-[800px] h-[800px] bg-ai-green/5 rounded-full blur-[100px]"></div>

      <div className="relative w-full h-full max-w-5xl max-h-5xl flex items-center justify-center">
        
        {/* The Plant Leaf - Always Visible, Glowing slightly */}
        <motion.svg
          width="400"
          height="500"
          viewBox="0 0 200 300"
          className="absolute z-10 text-ai-green drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]"
          initial={{ opacity: 0.8 }}
          animate={{ 
            opacity: [0.8, 1, 0.8],
            filter: ['drop-shadow(0 0 15px rgba(16,185,129,0.5))', 'drop-shadow(0 0 30px rgba(16,185,129,0.8))', 'drop-shadow(0 0 15px rgba(16,185,129,0.5))']
          }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        >
          {/* Main Leaf Body with semi-transparent fill so it feels solid but ethereal */}
          <path
            d="M100 280 C100 280, 20 200, 20 100 C20 40, 100 20, 100 20 C100 20, 180 40, 180 100 C180 200, 100 280, 100 280 Z"
            fill="currentColor"
            fillOpacity="0.05"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Stem & Veins */}
          <path d="M100 280 L100 20 M100 150 L40 100 M100 200 L50 150 M100 100 L60 60 M100 150 L160 100 M100 200 L150 150 M100 100 L140 60" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </motion.svg>

        {/* Global Scanner Line over the Leaf (Activated during scanning phase) */}
        <motion.div
           className="absolute z-30 w-[450px] h-[4px] bg-ai-light shadow-[0_0_20px_rgba(52,211,153,1),0_0_40px_rgba(52,211,153,0.8)] rounded-full"
           initial={{ top: '10%', opacity: 0 }}
           animate={{ 
             top: ['15%', '15%', '15%', '85%', '15%', '15%'],
             opacity: [0, 0, 0, 0.9, 0, 0]
           }}
           transition={{ duration: 10, times: [0, 0.3, 0.4, 0.7, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Circular Scanning Overlay behind the scanner line */}
        <motion.div
           className="absolute z-20 w-[400px] h-[400px] border-4 border-ai-light/30 rounded-full"
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ 
             opacity: [0, 0, 0, 1, 0, 0],
             scale: [0.8, 0.8, 0.8, 1.1, 1.1, 0.8]
           }}
           transition={{ duration: 10, times: [0, 0.3, 0.4, 0.7, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Inner dashed ring */}
          <motion.div 
            className="w-full h-full border-2 border-dashed border-ai-light/40 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Hand & Smartphone Scanning Sequence */}
        {/* Moves in, pauses to scan, moves out */}
        <motion.div
          className="absolute z-40 right-[-50px] bottom-[-150px]"
          initial={{ x: 500, y: 500, rotate: -15, scale: 0.9 }}
          animate={{ 
            x: [500, 150, 150, 150, 150, 500], 
            y: [500, 100, 100, 100, 100, 500],
            rotate: [-15, -5, -5, -5, -5, -15],
            scale: [0.9, 1, 1, 1, 1, 0.9]
          }}
          transition={{ duration: 10, times: [0, 0.25, 0.4, 0.7, 0.85, 1], repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Phone outline - Darker, sleeker */}
          <div className="w-[220px] h-[400px] border-[6px] border-slate-700/80 rounded-[40px] bg-slate-900/90 flex items-center justify-center relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] backdrop-blur-md">
            
            {/* Phone Screen showing UI mock */}
            <div className="w-[196px] h-[370px] rounded-[30px] border border-slate-800 relative bg-ai-darker overflow-hidden flex flex-col items-center">
              {/* Header inside phone */}
              <div className="w-full h-8 bg-slate-800/50 mb-4 items-center justify-center flex flex-col gap-1 pt-2">
                 <div className="w-16 h-1 bg-slate-600 rounded-full"></div>
              </div>

              {/* Viewfinder Frame in Phone */}
              <div className="w-40 h-56 border-2 border-ai-green/50 rounded-xl relative flex justify-center items-center overflow-hidden">
                {/* Simulated Leaf Reflection inside phone */}
                <motion.svg
                  viewBox="0 0 200 300"
                  className="w-32 h-44 text-ai-green opacity-40"
                >
                  <path
                    d="M100 280 C100 280, 20 200, 20 100 C20 40, 100 20, 100 20 C100 20, 180 40, 180 100 C180 200, 100 280, 100 280 Z"
                    fill="currentColor"
                    fillOpacity="0.2"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </motion.svg>

                {/* Shutter flash inside screen */}
                <motion.div 
                  className="absolute inset-0 bg-white z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0, 1, 0, 0, 0] }}
                  transition={{ duration: 10, times: [0, 0.35, 0.4, 0.45, 0.8, 1], repeat: Infinity }}
                />
                
                {/* Viewfinder Target corners */}
                <motion.div
                  className="absolute inset-4 border-ai-light z-20 opacity-80"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, currentColor 2px, transparent 2px) 0 0,
                      linear-gradient(to right, currentColor 2px, transparent 2px) 0 100%,
                      linear-gradient(to left, currentColor 2px, transparent 2px) 100% 0,
                      linear-gradient(to left, currentColor 2px, transparent 2px) 100% 100%,
                      linear-gradient(to bottom, currentColor 2px, transparent 2px) 0 0,
                      linear-gradient(to bottom, currentColor 2px, transparent 2px) 100% 0,
                      linear-gradient(to top, currentColor 2px, transparent 2px) 0 100%,
                      linear-gradient(to top, currentColor 2px, transparent 2px) 100% 100%
                    `,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px 16px'
                  }}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ 
                    scale: [1.2, 1.2, 1, 1, 1, 1.2],
                    opacity: [0, 0, 1, 1, 0, 0]
                  }}
                  transition={{ duration: 10, times: [0, 0.3, 0.4, 0.7, 0.8, 1], repeat: Infinity }}
                />

                {/* Processing Sweep inside phone */}
                <motion.div
                  className="absolute left-0 w-full h-[2px] bg-ai-light drop-shadow-[0_0_6px_rgba(52,211,153,1)] z-20"
                  initial={{ top: '0%', opacity: 0 }}
                  animate={{ 
                    top: ['0%', '0%', '0%', '100%', '0%', '0%'],
                    opacity: [0, 0, 0, 1, 1, 0]
                  }}
                  transition={{ duration: 10, times: [0, 0.4, 0.45, 0.65, 0.7, 1], repeat: Infinity }}
                />
              </div>

              {/* Bottom UI bar in phone */}
              <div className="absolute bottom-6 w-12 h-12 rounded-full border-4 border-slate-500 bg-slate-300 flex items-center justify-center">
                 <div className="w-8 h-8 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
          
          {/* Abstract Hand holding phone (Polished abstract shapes) */}
          {/* Thumb */}
          <div className="absolute top-24 -left-8 w-14 h-28 bg-slate-800/90 rounded-[30px] rotate-[-15deg] shadow-[-5px_10px_15px_rgba(0,0,0,0.5)] border border-slate-700"></div>
          {/* Fingers behind */}
          <div className="absolute top-16 right-[-10px] w-12 h-40 bg-slate-900/90 rounded-[20px] shadow-lg"></div>
        </motion.div>
      </div>
    </div>
  );
}
