'use client';

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0C0E] text-text-primary flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden font-sans">
      {/* Background Subtle Gradient Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#242830_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="flex items-center justify-between z-10 max-w-6xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-xs bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-[#0B0C0E] transform rotate-45" />
          </div>
          <span className="font-bold text-lg tracking-widest font-mono text-text-primary uppercase">
            REVIVE<span className="text-gold">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-text-muted border border-[#242830] px-3 py-1.5 rounded-full bg-[#121418]/60">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Razorpay BuildwithAI Track 03: Revenue Recovery
        </div>
      </header>

      {/* Main Content Hero */}
      <main className="z-10 max-w-4xl w-full mx-auto my-auto text-center space-y-8 py-16">
        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono tracking-wide">
          <span>AI REVENUE RECOVERY OPERATING SYSTEM</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-primary max-w-3xl mx-auto leading-tight">
          Find revenue that’s slipping away.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-amber-400">
            Win it back.
          </span>
        </h1>

        {/* Vision Paragraph */}
        <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          An AI-powered recovery command center that detects revenue at risk, diagnoses failure telemetry, applies bounded policy checks, and measures what actually comes back.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 rounded bg-gold text-[#0B0C0E] font-semibold text-sm hover:bg-gold-light transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-2 group"
          >
            <span>Open Command Center</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <Link
            href="/recovery/REC-82941"
            className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#16191E] border border-[#242830] text-text-primary font-medium text-sm hover:border-gold/40 hover:bg-[#1D2128] transition-all flex items-center justify-center"
          >
            Inspect AI Decision Case
          </Link>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="z-10 max-w-6xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted border-t border-[#242830] pt-6">
        <div>Designed for Razorpay BuildwithAI Hackathon • Phase 1 Frontend UI/UX</div>
        <div className="font-mono text-[11px] mt-2 sm:mt-0">AUTONOMOUS RECOVERY ENGINE • DEMO MODE ACTIVE</div>
      </footer>
    </div>
  );
}
