import { useState } from 'react';
import { Leaf } from 'lucide-react';
import PlaceholderAnimation from './components/PlaceholderAnimation';
import UploadSection from './components/UploadSection';
import CameraSection from './components/CameraSection';
import ResultSection from './components/ResultSection';
import ProcessingAnimation from './components/ProcessingAnimation';

export default function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const startAnalysis = async (imageFile) => {
    setProcessing(true);
    setResult(null);
    setError(null);
    setFile(imageFile);
    
    if (imageFile instanceof File || imageFile instanceof Blob) {
      setPreviewUrl(URL.createObjectURL(imageFile));
    } else {
      setPreviewUrl(imageFile);
    }

    try {
      const formData = new FormData();
      if (imageFile instanceof File) {
        formData.append('file', imageFile);
      } else {
        const blob = await (await fetch(imageFile)).blob();
        formData.append('file', blob, 'capture.jpg');
      }

      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        const errData = await response.json().catch(() => null);
        const detail = errData?.detail || `Server error (${response.status})`;
        setError(detail);
      }
    } catch(err) {
      setError("Could not connect to the server. Make sure the backend is running on http://localhost:8000");
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setProcessing(false);
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative flex flex-col font-sans text-white bg-[#031525]">
      {/* Soft gradient backgrounds globally */}
      <div className="absolute top-[-200px] right-[-200px] w-[800px] h-[800px] bg-ai-green/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-ai-light/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

      {/* Top Navbar */}
      <header className="relative z-10 py-5 px-8 flex flex-col items-center justify-center shrink-0 border-b border-white/5 bg-[#020e1a]/80 backdrop-blur-md">
        <div className="flex items-center gap-3 text-white font-bold text-2xl md:text-3xl tracking-tight mb-2 drop-shadow-md">
          <Leaf className="w-8 h-8 text-ai-green drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
          Plant Disease Identifier for Common Houseplants / Local Plants
        </div>
        <p className="text-slate-300 font-medium">
          Upload or scan a leaf to quickly identify plant diseases.
        </p>
      </header>

      <main className="relative z-10 flex-1 flex flex-row items-stretch justify-center p-6 gap-6 overflow-hidden w-full max-w-[1200px] mx-auto">
        
        {/* Left Side: Upload & Camera sections stacked vertically */}
        <div className="flex flex-col gap-6 shrink-0 min-h-0" style={{ flex: '4 1 0%' }}>
          <div className="flex-[1] min-h-0 flex flex-col w-full">
            <UploadSection onProcess={startAnalysis} disabled={processing} />
          </div>
          <div className="flex-[1] min-h-0 flex flex-col w-full">
            <CameraSection onProcess={startAnalysis} disabled={processing} />
          </div>
        </div>

        {/* Right Side: Result / Processing / Error / Animation placeholder */}
        <div className="flex flex-col shrink-0 min-h-0 relative" style={{ flex: '6 1 0%' }}>
          <div className="w-full h-full flex flex-col justify-center items-center relative rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-3xl min-h-0" style={{ background: 'rgba(15, 23, 42, 0.5)' }}>
            
            {processing ? (
               <div className="p-4 md:p-8 h-full w-full flex items-center justify-center relative z-10 overflow-hidden box-border">
                 <ProcessingAnimation imageUrl={previewUrl} />
               </div>
            ) : error ? (
               <div className="p-6 md:p-10 h-full w-full flex flex-col items-center justify-center relative z-10 overflow-hidden box-border gap-6">
                 {/* Error State */}
                 <div className="w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/40 flex items-center justify-center shrink-0">
                   <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                   </svg>
                 </div>
                 <div className="text-center max-w-sm">
                   <h3 className="text-xl font-bold text-red-400 mb-2">Analysis Failed</h3>
                   <p className="text-slate-400 text-sm leading-relaxed">{error}</p>
                 </div>
                 <button 
                   onClick={handleReset}
                   className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-red-500/30 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-md"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                   </svg>
                   Try Again
                 </button>
               </div>
            ) : result ? (
               <div className="p-4 md:p-8 h-full w-full flex flex-col relative z-10 overflow-hidden box-border">
                 <ResultSection result={result} imageUrl={previewUrl} onReset={handleReset} />
               </div>
            ) : (
               <div className="absolute inset-0 z-0 overflow-hidden box-border">
                 <PlaceholderAnimation />
               </div>
            )}
            
          </div>
        </div>
        
      </main>
    </div>
  )
}
