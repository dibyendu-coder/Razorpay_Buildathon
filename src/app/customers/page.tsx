'use client';

import React, { useState } from 'react';
import { Users, Search, ArrowRight, X } from 'lucide-react';
import { Shell } from '@/components/layout/Shell';
import { mockCustomers } from '@/lib/mock/data';
import { Customer } from '@/types';

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [search, setSearch] = useState('');

  const filteredCustomers = mockCustomers.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  return (
    <Shell pageTitle="Customer Profiles">
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight font-mono">Customer Profiles</h2>
          <p className="text-xs text-text-secondary mt-1">
            Customer lifetime revenue, risk exposure, and recovery interventions.
          </p>
        </div>

        {/* Search */}
        <div className="bg-[#121418] p-4 rounded-lg border border-[#242830]">
          <div className="relative max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-text-muted" />
            <input
              type="text"
              placeholder="Search customer name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#16191E] border border-[#242830] text-xs text-text-primary pl-9 pr-3 py-2 rounded focus:outline-none focus:border-gold/40 placeholder:text-text-muted font-mono"
            />
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-[#16191E] border border-[#242830] rounded-lg overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#121418] text-text-muted font-mono uppercase border-b border-[#242830]">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Lifetime Value</th>
                  <th className="py-3 px-4">Successful Payments</th>
                  <th className="py-3 px-4">Failed Payments</th>
                  <th className="py-3 px-4">Revenue At Risk</th>
                  <th className="py-3 px-4">Recovery Status</th>
                  <th className="py-3 px-4 text-right">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242830]">
                {filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    onClick={() => setSelectedCustomer(cust)}
                    className="hover:bg-[#1D2128] transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="text-text-primary font-bold">{cust.name}</div>
                      <div className="text-[11px] text-text-muted font-mono">{cust.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-gold">
                      ₹{cust.lifetimeValue.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400 font-medium">
                      {cust.successfulPaymentsCount}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-red-400 font-medium">
                      {cust.failedPaymentsCount}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-text-primary">
                      ₹{cust.revenueAtRisk.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        cust.recoveryStatus === 'Active'
                          ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                          : cust.recoveryStatus === 'Escalated'
                          ? 'bg-red-950/60 text-red-400 border border-red-800/40'
                          : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                      }`}>
                        {cust.recoveryStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono">
                      <span className="text-text-muted group-hover:text-gold text-xs">View →</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detailed Customer Profile Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#16191E] border border-[#242830] rounded-lg max-w-lg w-full p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-[10px] font-mono text-gold uppercase tracking-wider font-semibold">Customer Profile</div>
              <h3 className="text-xl font-bold font-mono text-text-primary">{selectedCustomer.name}</h3>
              <p className="text-xs text-text-muted font-mono">{selectedCustomer.email} • {selectedCustomer.phone}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs bg-[#121418] p-4 rounded border border-[#242830]">
              <div>
                <span className="text-text-muted text-[10px] block">Lifetime Value</span>
                <span className="text-base font-bold text-gold">₹{selectedCustomer.lifetimeValue.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-text-muted text-[10px] block">Revenue At Risk</span>
                <span className="text-base font-bold text-red-400">₹{selectedCustomer.revenueAtRisk.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-text-muted text-[10px] block">Successful Payments</span>
                <span className="text-emerald-400 font-semibold">{selectedCustomer.successfulPaymentsCount}</span>
              </div>
              <div>
                <span className="text-text-muted text-[10px] block">Failed Attempts</span>
                <span className="text-red-400 font-semibold">{selectedCustomer.failedPaymentsCount}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold text-text-primary uppercase border-b border-[#242830] pb-2 mb-3">
                Recent Customer Payments
              </h4>
              <div className="space-y-2 text-xs font-mono">
                {selectedCustomer.recentPayments.map((p) => (
                  <div key={p.id} className="p-3 bg-[#121418] rounded border border-[#242830] flex items-center justify-between">
                    <div>
                      <div className="text-gold font-semibold">{p.paymentId}</div>
                      <div className="text-text-muted text-[10px]">{p.createdAt}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-text-primary font-bold">₹{p.amount.toLocaleString('en-IN')}</div>
                      <div className={p.status === 'Captured' ? 'text-emerald-400 text-[10px]' : 'text-red-400 text-[10px]'}>
                        {p.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-[#121418] border border-[#242830] text-xs font-mono text-text-secondary hover:text-text-primary rounded"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}
