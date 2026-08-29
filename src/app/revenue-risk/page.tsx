'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, ArrowUpDown, ShieldAlert, ArrowRight } from 'lucide-react';
import { Shell } from '@/components/layout/Shell';
import { mockRecoveryCases } from '@/lib/mock/data';

export default function RevenueRiskPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'amountAtRisk' | 'riskScore'>('amountAtRisk');

  const filteredCases = mockRecoveryCases.filter((c) => {
    if (filter === 'High' && c.riskLevel !== 'High') return false;
    if (filter === 'Medium' && c.riskLevel !== 'Medium') return false;
    if (filter === 'Low' && c.riskLevel !== 'Low') return false;
    if (filter === 'Payment Failure' && !c.reason.toLowerCase().includes('payment failure')) return false;
    if (filter === 'Subscription' && !c.reason.toLowerCase().includes('subscription')) return false;
    if (filter === 'Checkout Abandonment' && !c.reason.toLowerCase().includes('checkout abandonment')) return false;

    if (search) {
      const q = search.toLowerCase();
      return (
        c.caseId.toLowerCase().includes(q) ||
        c.customerName.toLowerCase().includes(q) ||
        c.reason.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => b[sortField] - a[sortField]);

  const totalAtRisk = mockRecoveryCases.reduce((sum, c) => sum + c.amountAtRisk, 0);
  const highRiskCount = mockRecoveryCases.filter((c) => c.riskLevel === 'High').length;
  const mediumRiskCount = mockRecoveryCases.filter((c) => c.riskLevel === 'Medium').length;
  const lowRiskCount = mockRecoveryCases.filter((c) => c.riskLevel === 'Low').length;

  return (
    <Shell pageTitle="Revenue Risk">
      <div className="space-y-6 pb-12">
        {/* Page Header */}
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight font-mono">Revenue Risk</h2>
          <p className="text-xs text-text-secondary mt-1">
            Prioritize the revenue most likely to slip away based on real-time telemetry algorithms.
          </p>
        </div>

        {/* Summary Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#16191E] border border-[#242830] rounded-lg p-4">
            <div className="text-xs font-mono uppercase text-text-muted">Total At Risk</div>
            <div className="text-2xl font-bold text-text-primary mt-2 font-mono">
              ₹{totalAtRisk.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-text-muted mt-1">across active merchant channels</div>
          </div>

          <div className="bg-[#16191E] border border-red-900/40 rounded-lg p-4">
            <div className="text-xs font-mono uppercase text-red-400 font-medium">High Risk Cases</div>
            <div className="text-2xl font-bold text-red-400 mt-2 font-mono">{highRiskCount}</div>
            <div className="text-[11px] text-text-muted mt-1">Immediate intervention needed</div>
          </div>

          <div className="bg-[#16191E] border border-amber-900/40 rounded-lg p-4">
            <div className="text-xs font-mono uppercase text-amber-400 font-medium">Medium Risk Cases</div>
            <div className="text-2xl font-bold text-amber-400 mt-2 font-mono">{mediumRiskCount}</div>
            <div className="text-[11px] text-text-muted mt-1">Automated sequence queued</div>
          </div>

          <div className="bg-[#16191E] border border-[#242830] rounded-lg p-4">
            <div className="text-xs font-mono uppercase text-text-muted">Low Risk Cases</div>
            <div className="text-2xl font-bold text-text-secondary mt-2 font-mono">{lowRiskCount}</div>
            <div className="text-[11px] text-text-muted mt-1">Passive monitoring</div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#121418] p-4 rounded-lg border border-[#242830]">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            {['All', 'High', 'Medium', 'Low', 'Payment Failure', 'Subscription', 'Checkout Abandonment'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded transition-colors ${
                  filter === tab
                    ? 'bg-gold text-[#0B0C0E] font-semibold'
                    : 'bg-[#16191E] text-text-secondary hover:text-text-primary border border-[#242830]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-text-muted" />
              <input
                type="text"
                placeholder="Search case, customer, reason..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#16191E] border border-[#242830] text-xs text-text-primary pl-9 pr-3 py-2 rounded focus:outline-none focus:border-gold/40 placeholder:text-text-muted"
              />
            </div>

            <button
              onClick={() => setSortField(sortField === 'amountAtRisk' ? 'riskScore' : 'amountAtRisk')}
              className="px-3 py-2 rounded bg-[#16191E] border border-[#242830] text-xs font-mono text-text-secondary hover:text-text-primary flex items-center gap-1.5"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-gold" />
              <span>Sort: {sortField === 'amountAtRisk' ? 'Amount' : 'Risk Score'}</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#16191E] border border-[#242830] rounded-lg overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#121418] text-text-muted font-mono uppercase border-b border-[#242830]">
                <tr>
                  <th className="py-3 px-4">Case ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Risk Score</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4">Probability</th>
                  <th className="py-3 px-4">Expected Recovery</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242830]">
                {filteredCases.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-text-muted font-mono">
                      No matching revenue risk cases found.
                    </td>
                  </tr>
                ) : (
                  filteredCases.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-[#1D2128] transition-colors group cursor-pointer"
                    >
                      <td className="py-3.5 px-4 font-mono font-medium text-gold">
                        <Link href={`/recovery/${c.caseId}`}>{c.caseId}</Link>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-text-primary font-medium">{c.customerName}</div>
                        <div className="text-[11px] text-text-muted">{c.customerEmail}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-text-primary">
                        ₹{c.amountAtRisk.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-[#121418] h-1.5 rounded-full overflow-hidden border border-[#242830]">
                            <div
                              className={`h-full ${c.riskScore > 80 ? 'bg-red-500' : 'bg-amber-500'}`}
                              style={{ width: `${c.riskScore}%` }}
                            />
                          </div>
                          <span className="font-mono text-text-secondary font-medium">{c.riskScore}/100</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-text-secondary">{c.reason}</td>
                      <td className="py-3.5 px-4 font-mono text-gold font-medium">{c.probabilityOfRecovery}%</td>
                      <td className="py-3.5 px-4 font-mono text-emerald-400 font-semibold">
                        ₹{c.expectedRecovery.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4">
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
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/recovery/${c.caseId}`}
                          className="inline-flex items-center gap-1 text-xs text-text-muted group-hover:text-gold font-mono transition-colors"
                        >
                          <span>Inspect</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Shell>
  );
}
