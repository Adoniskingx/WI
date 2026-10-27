import React, { useEffect, useRef, useState } from 'react';

interface ScratchCardProps {
  dateText?: string;
  venueText?: string;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  dateText = "14 November 2026",
  venueText = "The Grand Jashan, Nagpur"
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);
  const scratchCount = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 290;
    canvas.height = 170;

    // Paint rich metallic gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#b88e44');
    grad.addColorStop(0.35, '#f0d799');
    grad.addColorStop(0.65, '#c5a059');
    grad.addColorStop(1, '#8f6928');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative border & label on foil
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    ctx.fillStyle = '#232b20';
    ctx.font = '600 13px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦ SCRATCH OR TAP TO REVEAL ✦', canvas.width / 2, canvas.height / 2 + 5);
  }, []);

  const scratchAt = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    scratchCount.current += 1;
    if (scratchCount.current > 20) {
      setIsRevealed(true);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    scratchAt(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    scratchAt(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    scratchAt(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    scratchAt(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  return (
    <div className="flex flex-col items-center my-6">
      <div className="relative w-[290px] h-[170px] rounded-2xl overflow-hidden border-2 border-[#c5a059] shadow-xl bg-[#1f291c] text-[#fbf8f1] select-none">
        
        {/* Revealed Content Layer Beneath Foil */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
          <span className="font-serif text-2xl text-[#e6c885] tracking-wide mb-1">
            {dateText}
          </span>
          <span className="font-sans text-[0.78rem] tracking-[0.16em] uppercase text-[#fbf8f1]/90">
            {venueText}
          </span>
        </div>

        {/* Scratchable Foil Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => (isDrawing.current = false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => (isDrawing.current = false)}
          onClick={() => setIsRevealed(true)}
          aria-label="Scratch to reveal the wedding date"
          role="img"
          className={`absolute inset-0 w-full h-full z-20 cursor-grab touch-none transition-opacity duration-700 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>

      <p className="font-sans text-[0.75rem] tracking-[0.1em] text-[#5c6657] mt-3">
        Scratch the gold card, or simply tap to reveal.
      </p>
    </div>
  );
};
