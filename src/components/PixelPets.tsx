import React, { useState, useEffect } from 'react';

interface PetConfig {
  id: string;
  type: 'pet-sitting' | 'pet-curled' | 'pet-sprawled';
  imageSrc: string;
  frameClass: string;
  lore: string;
  label: string;
  messages: string[];
}

const petConfigs: PetConfig[] = [
  {
    id: 'corridor-blocked',
    type: 'pet-sitting',
    imageSrc: '/assets/dexter-sitting.png?v=6',
    frameClass: 'dexter-frame-one',
    lore: 'LAB CORRIDOR: BLOCKED',
    label: 'A pixel Dexter the Shih Tzu is sleeping while blocking the lab corridor. Click to relocate him.',
    messages: [
      'Lab corridor is blocked. Dexter has declared nap jurisdiction.',
      'Dexter grumbled softly and stayed fast asleep.',
      'AMR path planner halted: adorable fluffy obstacle detected.',
    ],
  },
  {
    id: 'deep-rest',
    type: 'pet-curled',
    imageSrc: '/assets/dexter-curled.png?v=7',
    frameClass: 'dexter-frame-two',
    lore: 'DEEP REST',
    label: 'A pixel Dexter the Shih Tzu is curled up in deep rest beside a chew bone. Click to relocate him.',
    messages: [
      'Chew bone finished. Deep rest protocol engaged.',
      'A quiet, rhythmic snore echoes from the cozy curl.',
      'Sleeping soundly. Do not disturb the researcher.',
    ],
  },
  {
    id: 'belly-up',
    type: 'pet-sprawled',
    imageSrc: '/assets/dexter-belly-up.png?v=7',
    frameClass: 'dexter-frame-three',
    lore: 'BELLY RUBS REQUIRED',
    label: 'A pixel Dexter the Shih Tzu is sleeping belly-up with paws in the air, waiting for belly rubs. Click to relocate him.',
    messages: [
      'Belly-up nap mode engaged. Immediate belly rubs required to reboot.',
      'All four paws in the air. Total trust, zero productivity.',
      'Zzz… fluffy white belly exposed to the sky. Not moving an inch.',
    ],
  },
];

const petAnchors = [
  { side: 'left' as const, progress: 0.14 },
  { side: 'right' as const, progress: 0.35 },
  { side: 'left' as const, progress: 0.68 },
  { side: 'right' as const, progress: 0.82 },
];

interface PixelPetsProps {
  onShowToast: (msg: string) => void;
}

export const PixelPets: React.FC<PixelPetsProps> = ({ onShowToast }) => {
  const [positions, setPositions] = useState<Array<{ top: number; left: number; boop: boolean }>>([
    { top: 650, left: 24, boop: false },
    { top: 2100, left: window.innerWidth - 200, boop: false },
    { top: 3450, left: 32, boop: false },
  ]);

  const placePets = () => {
    const pageHeight = Math.max(document.documentElement.scrollHeight, 4000);
    const gutter = Math.max(12, Math.min(window.innerWidth * 0.025, 36));
    const petWidth = Math.min(190, Math.max(140, window.innerWidth * 0.13));

    const nextPositions = petConfigs.map((_, i) => {
      const anchor = petAnchors[i % petAnchors.length];
      const left = anchor.side === 'left' ? gutter : window.innerWidth - petWidth - gutter;
      const top = Math.max(260, pageHeight * anchor.progress);
      return { top, left, boop: false };
    });

    setPositions(nextPositions);
  };

  useEffect(() => {
    placePets();
    window.addEventListener('resize', placePets);
    return () => window.removeEventListener('resize', placePets);
  }, []);

  const handlePetClick = (index: number) => {
    const pet = petConfigs[index];
    const msgs = pet.messages;
    const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
    onShowToast(randomMsg);

    setPositions((prev) => {
      const updated = [...prev];
      const pageHeight = Math.max(document.documentElement.scrollHeight, 4000);
      const gutter = Math.max(12, Math.min(window.innerWidth * 0.025, 36));
      const petWidth = Math.min(190, Math.max(140, window.innerWidth * 0.13));
      const randomAnchor = petAnchors[Math.floor(Math.random() * petAnchors.length)];
      const left = randomAnchor.side === 'left' ? gutter : window.innerWidth - petWidth - gutter;
      const top = Math.max(260, pageHeight * (0.15 + Math.random() * 0.75));

      updated[index] = { top, left, boop: true };
      return updated;
    });

    setTimeout(() => {
      setPositions((prev) => {
        const reset = [...prev];
        if (reset[index]) reset[index].boop = false;
        return reset;
      });
    }, 600);
  };

  return (
    <>
      {petConfigs.map((pet, index) => {
        const pos = positions[index] || { top: 600, left: 24, boop: false };
        return (
          <button
            key={pet.id}
            className={`pixel-pet ${pet.type} ${pos.boop ? 'is-booped' : ''}`}
            style={{ top: `${pos.top}px`, left: `${pos.left}px` }}
            type="button"
            onClick={() => handlePetClick(index)}
            aria-label={pet.label}
            title={pet.lore}
          >
            <span className="pixel-zzz">Zz</span>
            <span
              className={`pet-sprite dexter-sprite ${pet.frameClass}`}
              style={{
                backgroundImage: `url(${pet.imageSrc})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              role="img"
              aria-label={pet.label}
            />
            <span className="pet-lore">{pet.lore}</span>
          </button>
        );
      })}
    </>
  );
};

export default PixelPets;
