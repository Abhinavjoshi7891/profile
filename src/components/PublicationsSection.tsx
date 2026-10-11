import React from 'react';

export const PublicationsSection: React.FC = () => {
  const publications = [
    {
      index: '01',
      meta: 'PRE-PRINT · 2025 · CO-AUTHOR',
      title: 'EEG-Based Depression Detection: Hybrid CNN-LSTM with Spatial RGB Spectrogram Mapping',
      description:
        'InceptionV3 + LSTM with a novel spatial RGB spectrogram mapping for decoding temporal-spatial structure from noisy neurophysiological signals. Achieved 90.0% Leave-One-Subject-Out (LOSO) accuracy across 40 subjects with 93.8% MDD clinical sensitivity.',
      badge: '90.0% LOSO ACCURACY',
    },
    {
      index: '02',
      meta: 'IN PREPARATION · TARGET: IEEE TBME / ICORR · RISE LAB, IIT DELHI',
      title: 'Ultrasound-Based Intent Decoding for Assistive & Rehabilitative Control',
      description:
        'A-mode and B-mode sonomyography (ultrasound) paired with IMU sensing to decode voluntary muscle intent, driving an accessible SO-101 robotic arm for spinal-cord-injury (SCI) rehabilitation and closed-loop assistive manipulation.',
      badge: 'SONOMYOGRAPHY × SO-101',
    },
    {
      index: '03',
      meta: 'M.SC. THESIS · LIVERPOOL JOHN MOORES UNIVERSITY · 2023',
      title: 'Teaching Drones to Navigate Through Urban Landscapes',
      description:
        'Within a privileged-expert / student framework, redesigned student depth backbones (MobileNet-V3-Small, GhostNet) to cut onboard inference cost while preserving zero-shot obstacle avoidance. Trained via DAgger in Flightmare, Unity, and Gazebo.',
      badge: 'EFFICIENT SIM-TO-REAL',
    },
  ];

  return (
    <section id="research" className="publications section-shell">
      <div className="section-heading compact">
        <div>
          <p className="section-kicker">05 / Research &amp; Publications</p>
          <h2>Papers &amp;<br /><em>pre-prints.</em></h2>
        </div>
      </div>

      <div className="pub-list">
        {publications.map((pub) => (
          <article key={pub.index} className="pub-card">
            <span className="pub-index">{pub.index}</span>
            <div>
              <p className="pub-meta">{pub.meta}</p>
              <h3>{pub.title}</h3>
              <p>{pub.description}</p>
            </div>
            <span className="pub-badge">{pub.badge}</span>
          </article>
        ))}
      </div>
    </section>
  );
};
