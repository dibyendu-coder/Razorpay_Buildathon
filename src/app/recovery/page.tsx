'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, AlertTriangle, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Shell } from '@/components/layout/Shell';
import { mockRecoveryCases } from '@/lib/mock/data';
import { useToast } from '@/components/common/ToastProvider';

export default function RecoveryQueuePage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'Needs Review' | 'Approved' | 'In Progress'>('Needs Review');

  const handleAction = (actionName: string, caseId: string) => {
    showToast(`Demo action: ${actionName} flow for ${caseId} will be connected in Phase 2.`);
  };

  const casesInTab = mockRecoveryCases.filter((c) => {
    if (activeTab === 'Needs Review') return c.status === 'Needs Review' || c.status === 'Blocked';
    if (activeTab === 'Approved') return c.status === 'Approved';
    if (activeTab === 'In Progress') return c.status === 'In Progress';
    return true;
  });

  return (
    <Shell pageTitle="Recovery Queue">
      <div className="space-y-6 pb-12">
        {/* Page Header */}
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight font-mono">Recovery Queue</h2>
          <p className="text-xs text-text-secondary mt-1">
            AI-recommended interventions waiting for human validation or automated dispatch.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 border-b border-[#242830] pb-2">
          {(['Needs Review', 'Approved', 'In Progress'] as const).map((tab) => {
            const count = mockRecoveryCases.filter((c) => {
              if (tab === 'Needs Review') return c.status === 'Needs Review' || c.status === 'Blocked';
              if (tab === 'Approved') return c.status === 'Approved';
              if (tab === 'In Progress') return c.status === 'In Progress';
              return false;
            }).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab
                    ? 'bg-[#16191E] text-gold border border-gold/40 shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-[#16191E]/50'
                }`}
              >
                <span>{tab}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#121418] text-text-muted border border-[#242830]">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Queue Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {casesInTab.length === 0 ? (
            <div className="col-span-2 py-12 text-center bg-[#16191E] border border-[#242830] rounded-lg text-text-muted font-mono text-xs">
              No recovery cases in this queue section.
            </div>
          ) : (
            casesInTab.map((c) => (
              <div
                key={c.id}
                className="bg-[#16191E] border border-[#242830] hover:border-gold/30 rounded-lg p-6 space-y-5 transition-all shadow-xl flex flex-col justify-between"
              >
                {/* Top Row: Amount & Risk */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-mono text-text-muted uppercase">Case Reference</div>
                      <Link href={`/recovery/${c.caseId}`} className="text-sm font-mono font-bold text-gold hover:underline">
                        {c.caseId}
                      </Link>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold font-mono text-text-primary">
                        ₹{c.amountAtRisk.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] font-mono text-text-muted">at risk</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#242830]/60">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                      c.riskLevel === 'High' ? 'bg-red-950/60 text-red-400 border border-red-800/40' : 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                    }`}>
                      {c.riskLevel} RISK
                    </span>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-text-secondary">
                      <span>Confidence:</span>
                      <span className="text-gold font-bold">{c.probabilityOfRecovery}%</span>
                    </div>
                  </div>
                </div>

                {/* AI Recommendation Details */}
                <div className="bg-[#121418] border border-[#242830] p-4 rounded-lg space-y-2">
                  <div className="text-[11px] font-mono text-gold uppercase tracking-wider font-semibold">
                    AI Recommends
                  </div>
                  <div className="text-sm font-medium text-text-primary">
                    {c.recommendedAction}
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#242830] text-text-muted font-mono">
                    <span>Expected Recovery: <strong className="text-emerald-400">₹{c.expectedRecovery.toLocaleString('en-IN')}</strong></span>
                    <span>Policy: <strong className={c.policyState === 'APPROVED' ? 'text-emerald-400' : c.policyState === 'BLOCKED' ? 'text-red-400' : 'text-amber-400'}>{c.policyState}</strong></span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <Link
                    href={`/recovery/${c.caseId}`}
                    className="px-3 py-2 rounded bg-[#121418] border border-[#242830] text-xs font-mono text-text-secondary hover:text-text-primary hover:border-gold/30 transition-colors"
                  >
                    Review Case
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAction('Escalate', c.caseId)}
                      className="px-3 py-2 rounded bg-[#121418] border border-amber-900/40 text-amber-400 hover:bg-amber-950/40 text-xs font-mono transition-colors"
                    >
                      Escalate
                    </button>

                    <button
                      onClick={() => handleAction('Approve', c.caseId)}
                      className="px-4 py-2 rounded bg-gold text-[#0B0C0E] hover:bg-gold-light text-xs font-semibold font-mono transition-colors shadow"
                    >
                      Approve Action
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Shell>
  );
}
