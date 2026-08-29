'use client';

import React from 'react';
import Link from 'next/link';
import { Play, RotateCcw, TrendingUp, ShieldAlert, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Shell } from '@/components/layout/Shell';
import { mockAnalyticsSummary, mockRecoveryCases } from '@/lib/mock/data';
import { useToast } from '@/components/common/ToastProvider';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const { runBatchSimulation, showToast } = useToast();

  return (
    <Shell pageTitle="Revenue Recovery Command Center">
      <div className="space-y-8 pb-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242830] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-text-primary tracking-tight font-mono">
                Revenue Recovery Command Center
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-gold/10 text-gold border border-gold/30">
                PROD-ACTIVE
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-1 max-w-2xl">
              Find revenue that&apos;s slipping away and turn recovery opportunities into measurable outcomes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                showToast('Demo data reloaded successfully.');
              }}
              className="px-3 py-2 rounded bg-[#16191E] border border-[#242830] text-xs font-medium text-text-secondary hover:text-text-primary hover:border-gold/30 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Load Demo Data</span>
            </button>

            <button
              onClick={runBatchSimulation}
              className="px-4 py-2 rounded bg-gold text-[#0B0C0E] text-xs font-semibold hover:bg-gold-light transition-all shadow-md flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Recovery Batch</span>
            </button>
          </div>
        </div>

        {/* 4 Primary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Revenue At Risk */}
          <div className="bg-[#16191E] border border-[#242830] rounded-lg p-5 hover:border-gold/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted">Revenue At Risk</span>
              <ShieldAlert className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-text-primary mt-3 font-mono">
              ₹{(mockAnalyticsSummary.revenueAtRisk / 100000).toFixed(1)}L
            </div>
            <div className="flex items-center gap-2 mt-2 text-[11px]">
              <span className="text-red-400 font-mono font-medium flex items-center">
                ↑ 4.2%
              </span>
              <span className="text-text-muted">from last 14-day window</span>
            </div>
          </div>

          {/* Recovered Revenue */}
          <div className="bg-[#16191E] border border-gold/30 rounded-lg p-5 gold-glow transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-gold font-medium">Recovered Revenue</span>
              <CheckCircle2 className="w-4 h-4 text-gold" />
            </div>
            <div className="text-2xl font-bold text-gold mt-3 font-mono">
              ₹{(mockAnalyticsSummary.recoveredRevenue / 100000).toFixed(1)}L
            </div>
            <div className="flex items-center gap-2 mt-2 text-[11px]">
              <span className="text-emerald-400 font-mono font-medium flex items-center">
                +₹3.7L
              </span>
              <span className="text-text-muted">ReviveAI Autonomous Uplift</span>
            </div>
          </div>

          {/* Recovery Rate */}
          <div className="bg-[#16191E] border border-[#242830] rounded-lg p-5 hover:border-gold/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted">Recovery Rate</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-text-primary mt-3 font-mono">
              {mockAnalyticsSummary.recoveryRate}%
            </div>
            <div className="flex items-center gap-2 mt-2 text-[11px]">
              <span className="text-emerald-400 font-mono font-medium">↑ +18.4%</span>
              <span className="text-text-muted">vs manual retries baseline</span>
            </div>
          </div>

          {/* Active Recovery Cases */}
          <div className="bg-[#16191E] border border-[#242830] rounded-lg p-5 hover:border-gold/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted">Active Recovery Cases</span>
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            </div>
            <div className="text-2xl font-bold text-text-primary mt-3 font-mono">
              {mockAnalyticsSummary.activeRecoveryCasesCount}
            </div>
            <div className="flex items-center gap-2 mt-2 text-[11px]">
              <span className="text-text-secondary font-mono">721 approved</span>
              <span className="text-text-muted">• 12 waiting review</span>
            </div>
          </div>
        </div>

        {/* Chart + Funnel Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Recovery Area Chart (2 cols) */}
          <div className="lg:col-span-2 bg-[#16191E] border border-[#242830] rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-text-primary font-mono">Revenue Recovery</h3>
                <p className="text-xs text-text-muted">At-risk vs recovered revenue (Last 14 Days)</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="text-text-secondary">At Risk</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold" />
                  <span className="text-gold font-medium">Recovered</span>
                </div>
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockAnalyticsSummary.chartData14Days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#636A79" fontSize={10} tickLine={false} />
                  <YAxis stroke="#636A79" fontSize={10} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#121418', borderColor: '#242830', borderRadius: '4px', fontSize: '12px' }}
                    formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
                  />
                  <Area type="monotone" dataKey="atRisk" stroke="#EF4444" fillOpacity={1} fill="url(#colorRisk)" name="At Risk" />
                  <Area type="monotone" dataKey="recovered" stroke="#D4AF37" fillOpacity={1} fill="url(#colorRecovered)" name="Recovered" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recovery Funnel (1 col) */}
          <div className="bg-[#16191E] border border-[#242830] rounded-lg p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-text-primary font-mono">Recovery Funnel</h3>
              <p className="text-xs text-text-muted mt-0.5">Automated pipeline progression</p>
            </div>

            <div className="space-y-3 my-4">
              {mockAnalyticsSummary.funnelData.map((item, idx) => (
                <div key={item.stage} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-text-secondary font-medium">{item.stage}</span>
                    <span className="font-mono text-text-primary font-semibold">{item.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-[#121418] h-2 rounded-full overflow-hidden border border-[#242830]">
                    <div
                      className={`h-full transition-all ${
                        idx === 4 ? 'bg-gold' : 'bg-[#3B4250]'
                      }`}
                      style={{ width: `${(item.count / 2500) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#121418] rounded border border-[#242830] text-[11px] text-text-muted flex justify-between items-center">
              <span>Overall Funnel Conversion</span>
              <span className="text-gold font-mono font-semibold">22.5%</span>
            </div>
          </div>
        </div>

        {/* Priority Recovery Cases Table */}
        <div className="bg-[#16191E] border border-[#242830] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-text-primary font-mono">Priority Recovery Cases</h3>
              <p className="text-xs text-text-muted">High value intervention queue awaiting processing</p>
            </div>
            <Link
              href="/recovery"
              className="text-xs text-gold hover:underline font-mono flex items-center gap-1"
            >
              <span>View All Cases</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#121418] text-text-muted font-mono uppercase border-b border-[#242830]">
                <tr>
                  <th className="py-2.5 px-3">Case</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Amount at Risk</th>
                  <th className="py-2.5 px-3">Risk Level</th>
                  <th className="py-2.5 px-3">Reason</th>
                  <th className="py-2.5 px-3">Expected Recovery</th>
                  <th className="py-2.5 px-3">AI Action</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242830]">
                {mockRecoveryCases.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-[#1D2128]/80 transition-colors group cursor-pointer"
                  >
                    <td className="py-3 px-3 font-mono font-medium text-gold">
                      <Link href={`/recovery/${c.caseId}`}>{c.caseId}</Link>
                    </td>
                    <td className="py-3 px-3 text-text-primary font-medium">{c.customerName}</td>
                    <td className="py-3 px-3 font-mono text-text-primary font-semibold">
                      ₹{c.amountAtRisk.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        c.riskLevel === 'High'
                          ? 'bg-red-950/60 text-red-400 border border-red-800/40'
                          : 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                      }`}>
                        {c.riskLevel}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-text-secondary">{c.reason}</td>
                    <td className="py-3 px-3 font-mono text-emerald-400 font-medium">
                      ₹{c.expectedRecovery.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3 text-text-secondary">{c.recommendedAction.split('.')[0]}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        c.status === 'Approved'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                          : c.status === 'Blocked'
                          ? 'bg-red-950/60 text-red-400 border border-red-800/40'
                          : 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href={`/recovery/${c.caseId}`}
                        className="px-2.5 py-1 rounded bg-[#121418] border border-[#242830] text-text-secondary hover:text-gold hover:border-gold/40 transition-colors text-[11px] font-mono"
                      >
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
