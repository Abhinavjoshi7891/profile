import React, { useState, useEffect, useRef } from 'react';

interface DexterDynamicsRacerProps {
  onShowToast?: (msg: string) => void;
}

const NITRO_QUOTES = [
  '🏎️ NITRO ENGAGED! Dexter clocks 50 Hz MPC raceline at 86.4 km/h! 🔥💨',
  '🔥 FULL THROTTLE! Pacejka tire slip optimizer pushed to maximum grip! 🏁',
  '⚡ ACADOS SQP OVERCLOCK! Dexter screams through the high-speed chicane! 🏎️💨',
  '💨 TIRE BURNOUT! Jetson Orin Nano executing at 18.2 ms latency! ⚡',
];

export const DexterDynamicsRacer: React.FC<DexterDynamicsRacerProps> = ({ onShowToast }) => {
  const [isBoosting, setIsBoosting] = useState(false);
  const [speed, setSpeed] = useState(32);
  const boostTimeoutRef = useRef<number | null>(null);
  const speedIntervalRef = useRef<number | null>(null);

  const handleBoostClick = () => {
    if (boostTimeoutRef.current) {
      window.clearTimeout(boostTimeoutRef.current);
    }
    if (speedIntervalRef.current) {
      window.clearInterval(speedIntervalRef.current);
    }

    setIsBoosting(true);

    const quote = NITRO_QUOTES[Math.floor(Math.random() * NITRO_QUOTES.length)];
    onShowToast?.(quote);

    let currentSpeed = 32;
    speedIntervalRef.current = window.setInterval(() => {
      currentSpeed += 6;
      if (currentSpeed >= 86) {
        currentSpeed = 86;
        if (speedIntervalRef.current) window.clearInterval(speedIntervalRef.current);
      }
      setSpeed(currentSpeed);
    }, 40);

    boostTimeoutRef.current = window.setTimeout(() => {
      setIsBoosting(false);
      let decelSpeed = 86;
      speedIntervalRef.current = window.setInterval(() => {
        decelSpeed -= 4;
        if (decelSpeed <= 32) {
          decelSpeed = 32;
          if (speedIntervalRef.current) window.clearInterval(speedIntervalRef.current);
        }
        setSpeed(decelSpeed);
      }, 50);
    }, 4200);
  };

  useEffect(() => {
    return () => {
      if (boostTimeoutRef.current) window.clearTimeout(boostTimeoutRef.current);
      if (speedIntervalRef.current) window.clearInterval(speedIntervalRef.current);
    };
  }, []);

  return (
    <div
      className={`dexter-racer-mascot ${isBoosting ? 'is-boosting' : 'is-cruising'}`}
      onClick={handleBoostClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleBoostClick();
        }
      }}
      aria-label="Dexter Dynamics racing companion. Click to engage nitro boost."
      title={isBoosting ? 'NITRO ENGAGED! Dexter full throttle!' : "Click to REV Dexter's engine & boost with smoke & fire!"}
    >
      {/* Main Racer Stage with Car, Exhaust Effects & Motion Streaks */}
      <div className="dexter-racer-stage">
        {/* Speed Wind Streaks */}
        <div className="dexter-motion-lines" aria-hidden="true">
          <span className="motion-line line-1" />
          <span className="motion-line line-2" />
          <span className="motion-line line-3" />
          {isBoosting && (
            <>
              <span className="motion-line line-boost-1" />
              <span className="motion-line line-boost-2" />
              <span className="motion-line line-boost-3" />
            </>
          )}
        </div>

        {/* Ambient Idle Exhaust Smoke (Like Dexter's Zz Effect for Motion) */}
        {!isBoosting && (
          <div className="dexter-idle-exhaust" aria-hidden="true">
            <span className="idle-puff puff-1">💨</span>
            <span className="idle-puff puff-2">o</span>
            <span className="idle-puff puff-3">°</span>
          </div>
        )}

        {/* Roaring Nitro Exhaust Fire & Billowing Smoke Burst */}
        {isBoosting && (
          <div className="dexter-nitro-exhaust" aria-hidden="true">
            {/* Multi-layered Exhaust Flame Jet */}
            <div className="flame-jet-container">
              {/* Outer Roaring Orange Flame */}
              <svg className="flame-svg flame-outer" viewBox="0 0 120 60" fill="none">
                <path
                  d="M0 30 C20 15, 45 5, 80 10 C95 12, 115 22, 120 30 C115 38, 95 48, 80 50 C45 55, 20 45, 0 30 Z"
                  fill="#ff5b35"
                />
              </svg>
              {/* Mid Golden Hot Flame */}
              <svg className="flame-svg flame-mid" viewBox="0 0 90 40" fill="none">
                <path
                  d="M0 20 C15 10, 35 3, 60 7 C75 9, 88 15, 90 20 C88 25, 75 31, 60 33 C35 37, 15 30, 0 20 Z"
                  fill="#ffbd2e"
                />
              </svg>
              {/* Inner White/Cyan Plasma Core */}
              <svg className="flame-svg flame-core" viewBox="0 0 55 24" fill="none">
                <path
                  d="M0 12 C10 6, 22 2, 40 4 C48 6, 54 9, 55 12 C54 15, 48 18, 40 20 C22 22, 10 18, 0 12 Z"
                  fill="#e6ff58"
                />
              </svg>
              {/* Flying Exhaust Embers / Sparks */}
              <span className="spark spark-1" />
              <span className="spark spark-2" />
              <span className="spark spark-3" />
              <span className="spark spark-4" />
            </div>

            {/* Billowing Burnout Smoke Clouds */}
            <div className="smoke-billow-container">
              <span className="burnout-cloud cloud-1" />
              <span className="burnout-cloud cloud-2" />
              <span className="burnout-cloud cloud-3" />
              <span className="burnout-cloud cloud-4" />
            </div>

            {/* Tire Friction Skid Puffs */}
            <div className="tire-smoke-container">
              <span className="tire-puff tire-1" />
              <span className="tire-puff tire-2" />
            </div>
          </div>
        )}

        {/* Dexter Dynamics Vector Car Graphic */}
        <div className="dexter-car-frame">
          <img
            src="/assets/dexter_dynamics.svg"
            alt="Dexter the Shih Tzu driving Dexter Dynamics racer"
            className="dexter-car-img"
            draggable={false}
          />
        </div>
      </div>

      {/* Floating Pit-Board Status Pill (Positioned below car) */}
      <div className="dexter-racer-hud">
        <span className="dexter-racer-status-dot" />
        <span className="dexter-racer-status-text">
          {isBoosting ? `🔥 NITRO ${speed} KM/H` : `🏎️ DEXTER // ${speed} KM/H`}
        </span>
      </div>
    </div>
  );
};

export default DexterDynamicsRacer;
