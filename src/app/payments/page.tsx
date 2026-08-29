'use client';

import React, { useState } from 'react';
import { CreditCard, Search, ArrowUpDown, Filter, X } from 'lucide-react';
import { Shell } from '@/components/layout/Shell';
import { mockPayments } from '@/lib/mock/data';
import { Payment } from '@/types';

export default function PaymentsPage() {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredPayments = mockPayments.filter((p) => {
    if (filter === 'Captured' && p.status !== 'Captured') return false;
    if (filter === 'Failed' && p.status !== 'Failed') return false;
    if (filter === 'UPI' && p.method !== 'UPI') return false;
    if (filter === 'Card' && p.method !== 'Card') return false;

    if (search) {
      const q = search.toLowerCase();
      return (
        p.paymentId.toLowerCase().includes(q) ||
        p.customerName.toLowerCase().includes(q) ||
        p.customerEmail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <Shell pageTitle="Payments Operations">
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight font-mono">Payments Operations</h2>
          <p className="text-xs text-text-secondary mt-1">
            Real-time transaction log synced with payment gateway webhooks.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#121418] p-4 rounded-lg border border-[#242830]">
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            {['All', 'Failed', 'Captured', 'UPI', 'Card'].map((tab) => (
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

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-text-muted" />
            <input
              type="text"
              placeholder="Search payment ID, customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#16191E] border border-[#242830] text-xs text-text-primary pl-9 pr-3 py-2 rounded focus:outline-none focus:border-gold/40 placeholder:text-text-muted font-mono"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#16191E] border border-[#242830] rounded-lg overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#121418] text-text-muted font-mono uppercase border-b border-[#242830]">
                <tr>
                  <th className="py-3 px-4">Payment ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Failure Reason</th>
                  <th className="py-3 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242830]">
                {filteredPayments.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedPayment(p)}
                    className="hover:bg-[#1D2128] transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-mono font-medium text-gold">{p.paymentId}</td>
                    <td className="py-3.5 px-4">
                      <div className="text-text-primary font-medium">{p.customerName}</div>
                      <div className="text-[11px] text-text-muted">{p.customerEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-text-primary">
                      ₹{p.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-text-secondary">{p.method}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        p.status === 'Captured'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                          : 'bg-red-950/60 text-red-400 border border-red-800/40'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-text-muted truncate max-w-xs">{p.failureReason || '—'}</td>
                    <td className="py-3.5 px-4 font-mono text-text-muted text-right">{p.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment Detail Modal/Drawer */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#16191E] border border-[#242830] rounded-lg max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedPayment(null)}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-[10px] font-mono text-text-muted uppercase">Payment Details</div>
              <h3 className="text-lg font-bold font-mono text-gold">{selectedPayment.paymentId}</h3>
            </div>

            <div className="space-y-2 text-xs font-mono border-t border-b border-[#242830] py-3">
              <div className="flex justify-between">
                <span className="text-text-muted">Customer:</span>
                <span className="text-text-primary font-semibold">{selectedPayment.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Email:</span>
                <span className="text-text-primary">{selectedPayment.customerEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Amount:</span>
                <span className="text-text-primary font-bold">₹{selectedPayment.amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Payment Method:</span>
                <span className="text-text-secondary">{selectedPayment.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Status:</span>
                <span className={selectedPayment.status === 'Captured' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                  {selectedPayment.status}
                </span>
              </div>
              {selectedPayment.failureReason && (
                <div className="pt-2">
                  <span className="text-text-muted block text-[10px]">Failure Reason:</span>
                  <p className="text-red-300 bg-red-950/40 p-2 rounded border border-red-900/40 text-[11px] mt-1">
                    {selectedPayment.failureReason}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedPayment(null)}
                className="px-4 py-2 bg-[#121418] border border-[#242830] text-xs font-mono text-text-secondary hover:text-text-primary rounded"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}
