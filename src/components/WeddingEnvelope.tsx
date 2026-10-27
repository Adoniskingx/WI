import React, { useState } from 'react';

interface WeddingEnvelopeProps {
  guestName: string;
  onOpen: () => void;
}

export const WeddingEnvelope: React.FC<WeddingEnvelopeProps> = ({ guestName, onOpen }) => {
  const [stage, setStage] = useState<'splash' | 'envelope'>('splash');
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenSeal = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 700); // Matches CSS transition duration
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#2f3e2b] to-[#1f291c] text-[#fbf8f1] transition-opacity duration-900 ${isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="absolute inset-0 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

      {/* Stage 1: Ganesha Splash */}
      {stage === 'splash' && (
        <div 
          onClick={() => setStage('envelope')}
          className="relative z-10 flex flex-col items-center gap-5 cursor-pointer p-6 text-center animate-fadeIn"
        >
          <img
            src="/Photos/And.webp" 
            alt="Lord Ganesha / Auspicious Motif"
            className="w-28 h-auto drop-shadow-[0_6px_18px_rgba(197,160,89,0.35)] animate-bounce"
            onError={(e) => {
              // Fallback SVG if image not found
              e.currentTarget.style.display = 'none';
            }}
          />
          <p className="font-serif text-xl tracking-wider text-[#e6c885] flex items-center gap-2">
            <span>✦</span>श्री गणेशाय नमः<span>✦</span>
          </p>
          <span className="mt-4 px-6 py-2.5 border border-[#c5a059] rounded-full font-sans text-xs tracking-[0.2em] uppercase text-[#e6c885] bg-[#c5a059]/10 hover:bg-[#c5a059] hover:text-[#1f291c] transition-all">
            Tap to Begin
          </span>
        </div>
      )}

      {/* Stage 2: Wax Seal Envelope */}
      {stage === 'envelope' && (
        <div className={`relative z-10 w-full max-w-[410px] bg-gradient-to-br from-[#2f3e2b]/96 to-[#1a2318]/98 border border-[#c5a059]/45 rounded-2xl p-8 shadow-2xl backdrop-blur-md flex flex-col items-center gap-5 transition-transform duration-700 ${isOpening ? 'scale-110 -translate-y-6 opacity-0' : 'scale-100'}`}>
          
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.22em] text-[#e6c885] bg-[#c5a059]/12 border border-[#c5a059]/35 px-4 py-1.5 rounded-full">
            Dear {guestName}
          </span>

          <img
            src="/Photos/And.webp"
            alt="Couple Illustration"
            className="w-36 h-auto drop-shadow-md"
          />

          <div className="text-center">
            <h2 className="font-serif text-3xl text-[#fbf8f1] tracking-wide mb-1">
              Adarsh &amp; Divyansha
            </h2>
            <p className="font-serif italic text-lg text-[#e6c885]">#DivyAdarshan</p>
          </div>

          <p className="text-sm text-[#fbf8f1]/80 text-center max-w-[260px]">
            Our forever begins — we invite you to our special celebration in Nagpur
          </p>

          <button
            onClick={handleOpenSeal}
            aria-label="Tap the seal to open invitation"
            className="mt-2 group bg-transparent border-none cursor-pointer flex flex-col items-center gap-2.5 text-[#fbf8f1]"
          >
            <div className="w-20 h-20 rounded-full bg-[#967334] border-2 border-[#e6c885] flex items-center justify-center shadow-xl shadow-black/40 group-hover:scale-105 transition-transform duration-300 animate-pulse">
              <span className="font-serif font-bold text-xs tracking-widest text-[#fbf8f1]">OPEN</span>
            </div>
            <span className="font-sans text-[0.7rem] tracking-[0.22em] uppercase text-[#e6c885]">
              Tap the seal to open
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
