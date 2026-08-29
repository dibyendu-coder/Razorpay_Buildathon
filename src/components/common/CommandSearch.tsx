'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ShieldAlert, CreditCard, Users, ArrowRight } from 'lucide-react';
import { mockRecoveryCases, mockPayments, mockCustomers } from '@/lib/mock/data';

interface CommandSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandSearch: React.FC<CommandSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = React.useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via custom logic or keyboard
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCases = mockRecoveryCases.filter(
    (c) => c.caseId.toLowerCase().includes(query.toLowerCase()) || c.customerName.toLowerCase().includes(query.toLowerCase())
  );
  const filteredPayments = mockPayments.filter(
    (p) => p.paymentId.toLowerCase().includes(query.toLowerCase()) || p.customerName.toLowerCase().includes(query.toLowerCase())
  );
  const filteredCustomers = mockCustomers.filter(
    (cust) => cust.name.toLowerCase().includes(query.toLowerCase()) || cust.email.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="bg-[#16191E] border border-[#242830] rounded-lg max-w-xl w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-[#242830] gap-3">
          <Search className="w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Type to search cases, payments, or customers (e.g. REC-82941, Rahul)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent text-text-primary text-sm focus:outline-none flex-1 placeholder:text-text-muted"
            autoFocus
          />
          <button onClick={onClose} className="text-text-muted hover:text-text-primary text-xs bg-[#121418] px-2 py-1 rounded border border-[#242830]">
            ESC
          </button>
        </div>

        {/* Results Stream */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* Cases */}
          <div>
            <div className="text-[11px] font-semibold tracking-wider text-text-muted uppercase px-3 py-1.5 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-gold" /> Recovery Cases
            </div>
            {filteredCases.length === 0 ? (
              <div className="text-xs text-text-muted px-3 py-1">No matching cases</div>
            ) : (
              filteredCases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => navigate(`/recovery/${c.caseId}`)}
                  className="w-full text-left px-3 py-2.5 rounded hover:bg-[#1D2128] flex items-center justify-between text-xs transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-gold font-medium">{c.caseId}</span>
                    <span className="text-text-primary font-medium">{c.customerName}</span>
                    <span className="text-text-muted">₹{c.amountAtRisk.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-mono ${c.riskLevel === 'High' ? 'bg-red-950/60 text-red-400 border border-red-800/40' : 'bg-amber-950/60 text-amber-400 border border-amber-800/40'}`}>
                      {c.riskLevel}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-gold transition-colors" />
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Payments */}
          <div>
            <div className="text-[11px] font-semibold tracking-wider text-text-muted uppercase px-3 py-1.5 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-text-muted" /> Operations Payments
            </div>
            {filteredPayments.length === 0 ? (
              <div className="text-xs text-text-muted px-3 py-1">No matching payments</div>
            ) : (
              filteredPayments.map((p) => (
                <button
                  key={p.id}
                  onClick={() => navigate(`/payments`)}
                  className="w-full text-left px-3 py-2.5 rounded hover:bg-[#1D2128] flex items-center justify-between text-xs transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-text-secondary">{p.paymentId}</span>
                    <span className="text-text-primary">{p.customerName}</span>
                  </div>
                  <span className="text-text-muted font-mono">₹{p.amount.toLocaleString('en-IN')}</span>
                </button>
              ))
            )}
          </div>

          {/* Customers */}
          <div>
            <div className="text-[11px] font-semibold tracking-wider text-text-muted uppercase px-3 py-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-text-muted" /> Customers
            </div>
            {filteredCustomers.length === 0 ? (
              <div className="text-xs text-text-muted px-3 py-1">No matching customers</div>
            ) : (
              filteredCustomers.map((cust) => (
                <button
                  key={cust.id}
                  onClick={() => navigate(`/customers`)}
                  className="w-full text-left px-3 py-2.5 rounded hover:bg-[#1D2128] flex items-center justify-between text-xs transition-colors group"
                >
                  <div>
                    <div className="text-text-primary font-medium">{cust.name}</div>
                    <div className="text-[11px] text-text-muted">{cust.email}</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-text-secondary">LTV ₹{cust.lifetimeValue.toLocaleString('en-IN')}</div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#121418] border-t border-[#242830] text-[11px] text-text-muted flex justify-between items-center">
          <span>Use <kbd className="px-1 py-0.5 bg-[#16191E] border border-[#242830] rounded text-[10px]">Cmd</kbd> + <kbd className="px-1 py-0.5 bg-[#16191E] border border-[#242830] rounded text-[10px]">K</kbd> to open anytime</span>
          <span>REVIVEAI Frontend Search</span>
        </div>
      </div>
    </div>
  );
};
