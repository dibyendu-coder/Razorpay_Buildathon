'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  TrendingDown,
  Inbox,
  CreditCard,
  Users,
  Brain,
  BarChart3,
  History,
  Settings,
  ShieldCheck,
  Search,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { useToast } from '../common/ToastProvider';
import { CommandSearch } from '../common/CommandSearch';

const navItems = [
  { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Revenue Risk', path: '/revenue-risk', icon: TrendingDown },
  { label: 'Recovery Queue', path: '/recovery', icon: Inbox },
  { label: 'Payments', path: '/payments', icon: CreditCard },
  { label: 'Customers', path: '/customers', icon: Users },
  { label: 'AI Decisions', path: '/ai-decisions', icon: Brain },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Audit Trail', path: '/audit', icon: History },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export const Shell: React.FC<{ children: React.ReactNode; pageTitle?: string }> = ({ children, pageTitle }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { showToast } = useToast();

  const getTitleFromPath = () => {
    if (pageTitle) return pageTitle;
    if (pathname === '/dashboard') return 'Revenue Recovery Command Center';
    if (pathname === '/revenue-risk') return 'Revenue Risk';
    if (pathname === '/recovery') return 'Recovery Queue';
    if (pathname.startsWith('/recovery/')) return 'AI Decision Inspector';
    if (pathname === '/payments') return 'Payments Operations';
    if (pathname === '/customers') return 'Customer Profiles';
    if (pathname === '/ai-decisions') return 'AI Decisions & Safety Log';
    if (pathname === '/analytics') return 'Recovery Analytics';
    if (pathname === '/audit') return 'Audit Trail';
    if (pathname === '/settings') return 'Settings & Policies';
    return 'ReviveAI Operations';
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-text-primary flex flex-col md:flex-row antialiased">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#121418] border-r border-[#242830] sticky top-0 h-screen select-none z-30">
        {/* Header Logo */}
        <div className="h-16 px-6 border-b border-[#242830] flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            {/* Minimal Gold Abstract Mark */}
            <div className="w-5 h-5 rounded-sm bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-2 h-2 bg-[#0B0C0E] rounded-xs transform rotate-45" />
            </div>
            <span className="font-bold text-base tracking-widest uppercase text-text-primary font-mono">
              REVIVE<span className="text-gold">AI</span>
            </span>
          </Link>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gold/10 border border-gold/30">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-mono font-medium text-gold tracking-tight">DEMO</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#16191E] text-text-primary border-l-2 border-gold font-semibold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-[#16191E]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-text-muted'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <div className="w-1 h-1 rounded-full bg-gold" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer Merchant Card */}
        <div className="p-4 border-t border-[#242830] bg-[#0B0C0E]/50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Environment</div>
              <div className="text-xs font-medium text-text-primary flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Demo Mode</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Merchant</div>
              <div className="text-xs font-semibold text-gold font-mono">UrbanCart</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Top bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#121418] border-b border-[#242830] sticky top-0 z-40">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-xs bg-gold" />
          <span className="font-bold text-sm tracking-wider font-mono">REVIVEAI</span>
        </Link>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsSearchOpen(true)} className="p-2 text-text-secondary hover:text-text-primary">
            <Search className="w-4 h-4" />
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-text-secondary">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-12 bg-[#121418] border-b border-[#242830] z-30 p-4 space-y-2 shadow-2xl">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded text-sm text-text-primary hover:bg-[#16191E]"
            >
              <item.icon className="w-4 h-4 text-gold" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 px-6 bg-[#121418]/80 backdrop-blur border-b border-[#242830] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-semibold text-text-primary tracking-tight font-mono">{getTitleFromPath()}</h1>
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#16191E] border border-[#242830] text-[11px] text-text-secondary">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Systems operational</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded bg-[#16191E] border border-[#242830] text-xs text-text-muted hover:text-text-primary hover:border-gold/30 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-text-muted" />
              <span>Search cases...</span>
              <kbd className="px-1.5 py-0.5 bg-[#0B0C0E] border border-[#242830] rounded text-[10px] font-mono text-text-secondary">
                ⌘K
              </kbd>
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => showToast('Notifications cleared. System monitoring 127 active cases.')}
              className="p-2 rounded hover:bg-[#16191E] text-text-muted hover:text-text-primary transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-gold" />
            </button>

            {/* Merchant Avatar */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-[#242830]">
              <div className="w-7 h-7 rounded bg-[#16191E] border border-gold/40 flex items-center justify-center font-mono font-bold text-xs text-gold">
                UC
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-medium text-text-primary leading-none">UrbanCart</div>
                <div className="text-[10px] font-mono text-text-muted mt-0.5">Merchant ID: mid_8921</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Container */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">{children}</main>
      </div>

      {/* Global Command Search Overlay */}
      <CommandSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};
