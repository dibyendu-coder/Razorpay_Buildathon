'use client';

import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Clock, Zap } from 'lucide-react';
import { Shell } from '@/components/layout/Shell';
import { mockAnalyticsSummary } from '@/lib/mock/data';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function AnalyticsPage() {
  return (
    <Shell pageTitle="Recovery Analytics">
      <div className="space-y-8 pb-12">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight font-mono">Recovery Analytics</h2>
          <p className="text-xs text-text-secondary mt-1">
            Performance metrics, intervention conversion breakdown, and autonomous revenue uplift comparison.
          </p>
        </div>

        {/* Top 4 Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#16191E] border border-gold/30 rounded-lg p-5 gold-glow">
            <div className="text-xs font-mono uppercase text-gold">Total Revenue Recovered</div>
            <div className="text-2xl font-bold text-gold mt-2 font-mono">₹7,80,000</div>
            <div className="text-[11px] text-text-muted mt-1">+34% vs last period</div>
          </div>

          <div className="bg-[#16191E] border border-[#242830] rounded-lg p-5">
            <div className="text-xs font-mono uppercase text-text-muted">Recovery Rate</div>
            <div className="text-2xl font-bold text-emerald-400 mt-2 font-mono">62.9%</div>
            <div className="text-[11px] text-text-muted mt-1">Industry avg: 18.2%</div>
          </div>

          <div className="bg-[#16191E] border border-[#242830] rounded-lg p-5">
            <div className="text-xs font-mono uppercase text-text-muted">Net Recovery Uplift</div>
            <div className="text-2xl font-bold text-text-primary mt-2 font-mono">+₹3,70,000</div>
            <div className="text-[11px] text-text-muted mt-1">Direct ReviveAI contribution</div>
          </div>

          <div className="bg-[#16191E] border border-[#242830] rounded-lg p-5">
            <div className="text-xs font-mono uppercase text-text-muted">Avg Recovery Time</div>
            <div className="text-2xl font-bold text-text-primary mt-2 font-mono">4.2 hrs</div>
            <div className="text-[11px] text-text-muted mt-1">Down from 72 hrs manual</div>
          </div>
        </div>

        {/* REVIVEAI COMPARISON SECTION */}
        <div className="bg-[#16191E] border border-gold/30 rounded-lg p-6 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#242830] pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-mono bg-gold/10 text-gold border border-gold/30">
                BENCHMARK COMPARISON
              </div>
              <h3 className="text-lg font-bold font-mono text-text-primary mt-1">Autonomous Recovery Uplift Engine</h3>
            </div>
            <span className="text-xs font-mono text-text-muted bg-[#121418] px-3 py-1.5 rounded border border-[#242830]">
              Demo simulation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center font-mono">
            {/* WITHOUT */}
            <div className="bg-[#121418] border border-[#242830] p-6 rounded-lg space-y-2">
              <div className="text-xs text-text-muted uppercase">Without ReviveAI</div>
              <div className="text-2xl font-bold text-text-secondary">₹2.1L</div>
              <p className="text-[11px] text-text-muted">Standard retries & basic reminders</p>
            </div>

            {/* WITH */}
            <div className="bg-[#121418] border border-gold/40 p-6 rounded-lg space-y-2 gold-glow">
              <div className="text-xs text-gold uppercase font-bold">With ReviveAI</div>
              <div className="text-3xl font-extrabold text-gold">₹5.8L</div>
              <p className="text-[11px] text-gold/80">AI bounded intervention & smart timing</p>
            </div>

            {/* UPLIFT */}
            <div className="bg-emerald-950/40 border border-emerald-800/60 p-6 rounded-lg space-y-2">
              <div className="text-xs text-emerald-400 uppercase font-bold">Net Recovery Uplift</div>
              <div className="text-3xl font-extrabold text-emerald-400">+₹3.7L</div>
              <p className="text-[11px] text-emerald-300/80">Incremental revenue recovered</p>
            </div>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recovery by Intervention */}
          <div className="bg-[#16191E] border border-[#242830] rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-semibold font-mono text-text-primary uppercase">
              Recovery by Intervention Type
            </h3>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Payment Link', amount: 380000 },
                  { name: 'Recovery Seq', amount: 240000 },
                  { name: 'Mandate Retry', amount: 110000 },
                  { name: 'WhatsApp Link', amount: 50000 },
                ]}>
                  <XAxis dataKey="name" stroke="#636A79" fontSize={10} tickLine={false} />
                  <YAxis stroke="#636A79" fontSize={10} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#121418', borderColor: '#242830', fontSize: '12px' }}
                    formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Recovered']}
                  />
                  <Bar dataKey="amount" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recovery by Failure Reason */}
          <div className="bg-[#16191E] border border-[#242830] rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-semibold font-mono text-text-primary uppercase">
              Recovery Rate by Failure Reason
            </h3>
            <div className="space-y-4 pt-2 font-mono text-xs">
              <div>
                <div className="flex justify-between text-text-primary mb-1">
                  <span>Repeated Payment Failure</span>
                  <span className="text-gold font-bold">78.4%</span>
                </div>
                <div className="w-full bg-[#121418] h-2 rounded-full overflow-hidden border border-[#242830]">
                  <div className="bg-gold h-full" style={{ width: '78.4%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-text-primary mb-1">
                  <span>Subscription Card Failure</span>
                  <span className="text-emerald-400 font-bold">64.2%</span>
                </div>
                <div className="w-full bg-[#121418] h-2 rounded-full overflow-hidden border border-[#242830]">
                  <div className="bg-emerald-400 h-full" style={{ width: '64.2%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-text-primary mb-1">
                  <span>Checkout Abandonment</span>
                  <span className="text-amber-400 font-bold">52.1%</span>
                </div>
                <div className="w-full bg-[#121418] h-2 rounded-full overflow-hidden border border-[#242830]">
                  <div className="bg-amber-400 h-full" style={{ width: '52.1%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
