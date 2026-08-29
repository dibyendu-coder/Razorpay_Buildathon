'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { History, ShieldCheck, Filter } from 'lucide-react';
import { Shell } from '@/components/layout/Shell';
import { mockAuditLogs } from '@/lib/mock/data';

export default function AuditTrailPage() {
  const [filter, setFilter] = useState('All');

  const filteredLogs = mockAuditLogs.filter((log) => {
    if (filter === 'All') return true;
    return log.category === filter;
  });

  return (
    <Shell pageTitle="Audit Trail">
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight font-mono">Audit Trail</h2>
          <p className="text-xs text-text-secondary mt-1">
            Every decision. Every action. Every outcome. Cryptographically verified event ledger.
          </p>
        </div>

        {/* Category Filters */}
        <div className="bg-[#121418] p-4 rounded-lg border border-[#242830] flex flex-wrap items-center gap-1.5 text-xs font-mono">
          {['All', 'AI', 'Policy', 'Execution', 'Webhook', 'Human'].map((tab) => (
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

        {/* Audit Stream */}
        <div className="bg-[#16191E] border border-[#242830] rounded-lg overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#121418] text-text-muted font-mono uppercase border-b border-[#242830]">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Case Ref</th>
                  <th className="py-3 px-4">Event</th>
                  <th className="py-3 px-4">Decision Details</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242830]">
                {filteredLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-[#1D2128] transition-colors font-mono">
                    <td className="py-3.5 px-4 text-text-muted">{log.timestamp}</td>
                    <td className="py-3.5 px-4 text-gold font-medium">{log.actor}</td>
                    <td className="py-3.5 px-4 text-text-primary font-semibold">
                      <Link href={`/recovery/${log.caseId}`} className="hover:underline">
                        {log.caseId}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-text-primary">{log.event}</td>
                    <td className="py-3.5 px-4 text-text-secondary">{log.decision || '—'}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#121418] border border-[#242830] text-text-muted">
                        {log.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="px-2.5 py-0.5 rounded text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 font-bold">
                        {log.result}
                      </span>
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
