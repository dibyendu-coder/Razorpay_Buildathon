'use client';

import React from 'react';
import Link from 'next/link';
import { Brain, ShieldAlert, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { Shell } from '@/components/layout/Shell';
import { mockAIDecisions } from '@/lib/mock/data';

export default function AIDecisionsPage() {
  return (
    <Shell pageTitle="AI Decisions & Safety Log">
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight font-mono">AI Decisions & Safety Log</h2>
          <p className="text-xs text-text-secondary mt-1">
            Real-time inference telemetry and deterministic safety policy evaluation metrics.
          </p>
        </div>

        {/* AI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#16191E] border border-[#242830] rounded-lg p-4">
            <div className="text-xs font-mono uppercase text-text-muted">Total Decisions Evaluated</div>
            <div className="text-2xl font-bold text-text-primary mt-2 font-mono">847</div>
            <div className="text-[11px] text-text-muted mt-1">100% policy-evaluated</div>
          </div>

          <div className="bg-[#16191E] border border-emerald-900/40 rounded-lg p-4">
            <div className="text-xs font-mono uppercase text-emerald-400 font-medium">Autonomous Approved</div>
            <div className="text-2xl font-bold text-emerald-400 mt-2 font-mono">721</div>
            <div className="text-[11px] text-text-muted mt-1">85.1% auto-execution rate</div>
          </div>

          <div className="bg-[#16191E] border border-red-900/40 rounded-lg p-4">
            <div className="text-xs font-mono uppercase text-red-400 font-medium">Safety Blocked</div>
            <div className="text-2xl font-bold text-red-400 mt-2 font-mono">42</div>
            <div className="text-[11px] text-text-muted mt-1">Exceeded threshold limits</div>
          </div>

          <div className="bg-[#16191E] border border-gold/30 rounded-lg p-4 gold-glow">
            <div className="text-xs font-mono uppercase text-gold font-medium">Average AI Confidence</div>
            <div className="text-2xl font-bold text-gold mt-2 font-mono">89.4%</div>
            <div className="text-[11px] text-text-muted mt-1">High inference precision</div>
          </div>
        </div>

        {/* Timeline Table */}
        <div className="bg-[#16191E] border border-[#242830] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#242830] pb-3">
            <h3 className="text-sm font-semibold font-mono uppercase text-text-primary">Decision Inference Log</h3>
            <span className="text-xs font-mono text-text-muted">Live Agent Telemetry</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#121418] text-text-muted font-mono uppercase border-b border-[#242830]">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Case Reference</th>
                  <th className="py-3 px-4">AI Agent</th>
                  <th className="py-3 px-4">Recommended Action</th>
                  <th className="py-3 px-4">Confidence</th>
                  <th className="py-3 px-4">Policy Result</th>
                  <th className="py-3 px-4 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242830]">
                {mockAIDecisions.map((dec) => (
                  <tr key={dec.id} className="hover:bg-[#1D2128] transition-colors">
                    <td className="py-3.5 px-4 font-mono text-text-muted">{dec.timestamp}</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-gold">
                      <Link href={`/recovery/${dec.caseId}`}>{dec.caseId}</Link>
                    </td>
                    <td className="py-3.5 px-4 text-text-primary font-medium">{dec.agent}</td>
                    <td className="py-3.5 px-4 text-text-secondary">{dec.decision}</td>
                    <td className="py-3.5 px-4 font-mono text-gold font-bold">{dec.confidence}%</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                        dec.policyResult === 'Allowed'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                          : 'bg-red-950/60 text-red-400 border border-red-800/40'
                      }`}>
                        {dec.policyResult}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono">
                      <Link href={`/recovery/${dec.caseId}`} className="text-text-muted hover:text-gold text-xs">
                        Inspect →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Shell>
  );
}
