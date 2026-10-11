import React, { useState, useEffect, useRef } from 'react';

interface PipelineState {
  id: string;
  label: string;
  action: string;
  log: string[];
  meterCount: number;
  imageSrc: string;
  imageAlt: string;
  badgeText: string;
  isSleeping: boolean;
}

const states: PipelineState[] = [
  {
    id: 'training',
    label: 'TRAINING_POLICY',
    action: 'Evaluate Checkpoint',
    log: [
      '> isaac_lab --env ElexisNav-v0 --envs 2048',
      '> step: 205M / 205M | 16.8k steps/s',
      '> actor_loss: 0.0412 | critic_loss: 0.0089',
      '> reward: TTC + goal_progress (discount=0.995)',
    ],
    meterCount: 4,
    imageSrc: '/assets/dexter-training.jpg',
    imageAlt: 'Dexter the Shih Tzu dog with round glasses coding at his laptop workstation',
    badgeText: 'DEXTER // TRAINING PPO 🐾',
    isSleeping: false,
  },
  {
    id: 'evaluating',
    label: 'POLICY_EVALUATION',
    action: 'Deploy Sim-to-Real',
    log: [
      '> parallel rollouts across 2048 crowd pedestrians',
      '> arrival_rate: 89.4% | collision: 9.9% | timeout: 0.7%',
      '> mean closest approach: 2.46s TTC',
      '> frozen_robot_trap: DEFEATED',
    ],
    meterCount: 5,
    imageSrc: '/assets/dexter-evaluating.jpg',
    imageAlt: 'Dexter the Shih Tzu inspecting benchmark telemetry charts with a magnifying glass',
    badgeText: 'DEXTER // EVALUATING 89.4% 🔬',
    isSleeping: false,
  },
  {
    id: 'deployed',
    label: 'SIM2REAL_DEPLOYED',
    action: 'Send to Nap',
    log: [
      '> ONBOARD TARGET: Jetson Orin Nano',
      '> control loop: 50 Hz closed (18.2 ms)',
      '> CiA 402 motor drives online',
      '> Elexis-W deployed in live warehouse corridor_',
    ],
    meterCount: 5,
    imageSrc: '/assets/dexter-deployed.jpg',
    imageAlt: 'Dexter the Shih Tzu engineer in the robotics lab operating quadruped and robot arm',
    badgeText: 'DEXTER // HARDWARE DEPLOYED ⚡',
    isSleeping: false,
  },
  {
    id: 'sleeping',
    label: 'SLEEPING_RECHARGED',
    action: 'Wake with Coffee',
    log: [
      '> all checkpoints synced to HuggingFace',
      '> battery: 100% | GPU cluster: cooled',
      '> developer & dexter: zZz_',
      '> ready for morning training session',
    ],
    meterCount: 2,
    imageSrc: '/assets/dexter-sleeping.jpg',
    imageAlt: 'Dexter the Shih Tzu curled up asleep next to his laptop and warm coffee mug',
    badgeText: 'DEXTER // SLEEPING zZ 💤',
    isSleeping: true,
  },
];

interface TrainingStationProps {
  onShowToast: (msg: string) => void;
}

export const TrainingStation: React.FC<TrainingStationProps> = ({ onShowToast }) => {
  const [stateIndex, setStateIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const currentState = states[stateIndex];

  const advancePipeline = () => {
    const nextIndex = (stateIndex + 1) % states.length;
    setStateIndex(nextIndex);
    // Call toast safely outside render lifecycle
    onShowToast(`DEXTER // ${states[nextIndex].label.toLowerCase()}`);
  };

  useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!currentState.isSleeping) {
      timerRef.current = window.setTimeout(() => {
        advancePipeline();
      }, 10000);
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [stateIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      advancePipeline();
    }
  };

  return (
    <section className="panda-break section-shell" aria-labelledby="training-title">
      <div className="panda-copy">
        <p className="section-kicker">PET PROCESS | PID 0789</p>
        <h2 id="training-title">
          ONE MORE<br />
          EPOCH<br />
          <em>before bed.</em>
        </h2>
        <p>
          This is Dexter the Shih Tzu. He has been monitoring Isaac Lab parallel PPO runs
          all night. Check on him before the GPU cluster—and the researcher—hits zero.
        </p>
        <button
          id="panda-action"
          className="panda-action"
          type="button"
          onClick={advancePipeline}
        >
          <span>{currentState.action}</span> <span>→</span>
        </button>
      </div>

      <div className="shihtzu-workstation-wrap">
        {/* Exact ISAAC_LAB_WORKER.LOG Terminal Card */}
        <div
          className="isaac-terminal-card"
          role="button"
          tabIndex={0}
          onClick={advancePipeline}
          onKeyDown={handleKeyDown}
          aria-label={`Isaac Lab worker is currently ${currentState.label}. Activate to advance pipeline.`}
        >
          <div className="isaac-terminal-top">
            <span className="window-dots">
              <i style={{ background: '#ff5b35' }} />
              <i style={{ background: '#e6ff58' }} />
              <i style={{ background: '#68d8cb' }} />
            </span>
            <b className="isaac-terminal-title">ISAAC_LAB_WORKER.LOG</b>
          </div>

          <div className="isaac-terminal-body">
            <code>
              {currentState.log.map((line, idx) => (
                <div key={idx} className="isaac-log-line">
                  {line}
                </div>
              ))}
            </code>

            {/* Glowing Segmented Energy / Progress Meter */}
            <div className="isaac-energy-meter" aria-label="Training Convergence Progress">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`meter-segment ${i < currentState.meterCount ? 'is-active' : 'is-inactive'}`}
                />
              ))}
            </div>
          </div>

          <div className="isaac-terminal-bottom">
            <div className="isaac-status-badge">
              <span className={`status-glow-dot ${currentState.isSleeping ? 'is-blue' : 'is-lime'}`} />
              <strong>{currentState.label}</strong>
            </div>
            <small className="isaac-status-hint">
              click terminal or button to advance pipeline
            </small>
          </div>
        </div>

        {/* Dexter the Shih Tzu Dog Companion Card with 4 Distinct Visual States */}
        <div
          className="shihtzu-companion-card"
          onClick={advancePipeline}
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          title="Click to advance Dexter's state"
        >
          <div className="shihtzu-image-box">
            <img
              key={currentState.imageSrc}
              src={currentState.imageSrc}
              alt={currentState.imageAlt}
              className="shihtzu-img"
            />
            <span className="shihtzu-badge">
              {currentState.badgeText}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingStation;
