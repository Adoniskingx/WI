import React, { useState } from 'react';
import { WeddingEnvelope } from './components/WeddingEnvelope';
import { ScratchCard } from './components/ScratchCard';

export default function WeddingApp() {
  const [isOpen, setIsOpen] = useState(false);

  // Extract ?to= parameter from URL, defaulting to "Valued Guest"
  const params = new URLSearchParams(window.location.search);
  const guestParam = params.get('to');
  const guestName = guestParam ? guestParam.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Valued Guest';

  return (
    <main className="min-h-screen bg-[#fbf8f1] text-[#232b20] font-serif">
      {!isOpen && <WeddingEnvelope guestName={guestName} onOpen={() => setIsOpen(true)} />}

      <div className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <section className="py-16 px-6 text-center max-w-lg mx-auto">
          <span className="inline-block px-5 py-2 mb-6 bg-[#1f291c] text-[#e6c885] border border-[#c5a059] rounded-full font-sans text-xs tracking-widest uppercase">
            Dear {guestName}
          </span>
          <h1 className="font-serif text-4xl text-[#1f291c] mb-4">Adarsh &amp; Divyansha</h1>
          <p className="italic text-lg text-[#5c6657] mb-8">
            cordially invite you to celebrate #DivyAdarshan
          </p>

          <ScratchCard dateText="14 November 2026" venueText="The Grand Jashan, Nagpur" />
        </section>
      </div>
    </main>
  );
}
