'use client';

import React, { useState } from 'react';
import { Settings, ShieldCheck, Sliders, Bell, Cpu } from 'lucide-react';
import { Shell } from '@/components/layout/Shell';
import { useToast } from '@/components/common/ToastProvider';

export default function SettingsPage() {
  const { showToast } = useToast();
  const [limit, setLimit] = useState('50000');
  const [retries, setRetries] = useState('3');
  const [confidence, setConfidence] = useState('70');
  const [cooldown, setCooldown] = useState('6');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Demo setting updated: Autonomous recovery policies saved.');
  };

  return (
    <Shell pageTitle="Settings & Recovery Policies">
      <div className="space-y-8 pb-12 max-w-4xl">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight font-mono">Settings & Policies</h2>
          <p className="text-xs text-text-secondary mt-1">
            Configure safety thresholds, AI confidence limits, and notification preferences.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Merchant Profile */}
          <div className="bg-[#16191E] border border-[#242830] rounded-lg p-6 space-y-4">
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-text-primary border-b border-[#242830] pb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-gold" /> Merchant Profile
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="text-text-muted block mb-1">Merchant Name</label>
                <input
                  type="text"
                  value="UrbanCart India Pvt Ltd"
                  disabled
                  className="w-full bg-[#121418] border border-[#242830] p-2.5 rounded text-text-primary cursor-not-allowed opacity-80"
                />
              </div>
              <div>
                <label className="text-text-muted block mb-1">Merchant ID</label>
                <input
                  type="text"
                  value="mid_8921_urbancart"
                  disabled
                  className="w-full bg-[#121418] border border-[#242830] p-2.5 rounded text-text-primary cursor-not-allowed opacity-80"
                />
              </div>
            </div>
          </div>

          {/* Recovery Policies (UI-only Phase 1) */}
          <div className="bg-[#16191E] border border-gold/30 rounded-lg p-6 space-y-5 shadow-xl">
            <div className="border-b border-[#242830] pb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-text-primary flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold" /> Safety & Autonomous Recovery Policies
              </h3>
              <span className="text-[10px] font-mono text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/30">
                ACTIVE DETERMINISTIC ENGINE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-mono">
              <div>
                <label className="text-text-primary font-semibold block mb-1">
                  Autonomous Recovery Limit (₹)
                </label>
                <p className="text-text-muted text-[11px] mb-2">Actions above this amount require human approval.</p>
                <input
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="w-full bg-[#121418] border border-[#242830] p-2.5 rounded text-gold font-bold focus:border-gold/60 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-text-primary font-semibold block mb-1">
                  Maximum Autonomous Retries
                </label>
                <p className="text-text-muted text-[11px] mb-2">Max retry attempts before escalation.</p>
                <input
                  type="number"
                  value={retries}
                  onChange={(e) => setRetries(e.target.value)}
                  className="w-full bg-[#121418] border border-[#242830] p-2.5 rounded text-text-primary font-bold focus:border-gold/60 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-text-primary font-semibold block mb-1">
                  Minimum AI Confidence Threshold (%)
                </label>
                <p className="text-text-muted text-[11px] mb-2">Minimum model certainty required to auto-execute.</p>
                <input
                  type="number"
                  value={confidence}
                  onChange={(e) => setConfidence(e.target.value)}
                  className="w-full bg-[#121418] border border-[#242830] p-2.5 rounded text-gold font-bold focus:border-gold/60 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-text-primary font-semibold block mb-1">
                  Recovery Cooldown Period (Hours)
                </label>
                <p className="text-text-muted text-[11px] mb-2">Interval between consecutive automated messages.</p>
                <input
                  type="number"
                  value={cooldown}
                  onChange={(e) => setCooldown(e.target.value)}
                  className="w-full bg-[#121418] border border-[#242830] p-2.5 rounded text-text-primary font-bold focus:border-gold/60 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded bg-gold text-[#0B0C0E] font-semibold text-xs font-mono hover:bg-gold-light transition-all shadow"
            >
              Save Policy Configuration
            </button>
          </div>
        </form>
      </div>
    </Shell>
  );
}
