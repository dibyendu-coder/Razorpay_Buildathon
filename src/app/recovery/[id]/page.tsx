'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Brain,
  FileText,
  Clock,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  Play
} from 'lucide-react';
import { Shell } from '@/components/layout/Shell';
import { mockRecoveryCases } from '@/lib/mock/data';
import { useToast } from '@/components/common/ToastProvider';

export default function AIDecisionInspectorPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { showToast } = useToast();

  const caseData = mockRecoveryCases.find(
    (c) => c.caseId.toLowerCase() === id.toLowerCase() || c.id.toLowerCase() === id.toLowerCase()
  );

  if (!caseData) {
    return (
      <Shell pageTitle="Case Not Found">
        <div className="text-center py-20 space-y-4">
          <h2 className="text-lg font-mono text-red-400">Case {id} not found</h2>
          <p className="text-xs text-text-muted">Return to recovery queue to inspect available active cases.</p>
          <Link href="/recovery" className="px-4 py-2 rounded bg-gold text-[#0B0C0E] text-xs font-mono inline-block">
            Back to Recovery Queue
          </Link>
        </div>
      </Shell>
    );
  }

  const isBlocked = caseData.policyState === 'BLOCKED';

  return (
    <Shell pageTitle={`AI Decision Inspector — ${caseData.caseId}`}>
      <div className="space-y-8 pb-16">
        {/* Back Link & Header */}
        <div className="space-y-4">
          <Link href="/recovery" className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-gold font-mono">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Queue
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#16191E] border border-[#242830] p-6 rounded-lg">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold font-mono text-text-primary tracking-tight">{caseData.caseId}</h1>
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono uppercase font-bold ${
                  caseData.riskLevel === 'High' ? 'bg-red-950/80 text-red-400 border border-red-800/50' : 'bg-amber-950/80 text-amber-400 border border-amber-800/50'
                }`}>
                  {caseData.riskLevel} RISK
                </span>
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono uppercase font-semibold ${
                  isBlocked ? 'bg-red-950/80 text-red-400 border border-red-800/50' : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50'
                }`}>
                  POLICY: {caseData.policyState}
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Customer: <strong className="text-text-primary font-mono">{caseData.customerName}</strong> ({caseData.customerEmail})
              </p>
            </div>

            <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-[#242830] pt-4 md:pt-0 md:pl-6">
              <div>
                <div className="text-[10px] font-mono text-text-muted uppercase">Amount At Risk</div>
                <div className="text-xl font-bold font-mono text-text-primary">₹{caseData.amountAtRisk.toLocaleString('en-IN')}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-text-muted uppercase">AI Confidence</div>
                <div className="text-xl font-bold font-mono text-gold">{caseData.probabilityOfRecovery}%</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-text-muted uppercase">Expected Recovery</div>
                <div className="text-xl font-bold font-mono text-emerald-400">₹{caseData.expectedRecovery.toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: WHY IS THIS REVENUE AT RISK */}
        <div className="bg-[#16191E] border border-[#242830] rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#242830] pb-3">
            <ShieldAlert className="w-4 h-4 text-gold" />
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-text-primary">
              Why is this revenue at risk?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#121418] border border-[#242830] p-4 rounded">
              <div className="text-[10px] font-mono text-text-muted uppercase">Failure Pattern</div>
              <div className="text-sm font-semibold text-text-primary mt-1">{caseData.evidenceNotes[0]}</div>
            </div>

            <div className="bg-[#121418] border border-[#242830] p-4 rounded">
              <div className="text-[10px] font-mono text-text-muted uppercase">Historic Profile</div>
              <div className="text-sm font-semibold text-text-primary mt-1">{caseData.evidenceNotes[1]}</div>
            </div>

            <div className="bg-[#121418] border border-[#242830] p-4 rounded">
              <div className="text-[10px] font-mono text-text-muted uppercase">Last Successful Payment</div>
              <div className="text-sm font-semibold text-gold mt-1 font-mono">
                ₹{(caseData.lastSuccessfulPaymentAmount || caseData.amountAtRisk).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2 & 3: AI DIAGNOSIS & AI RECOMMENDATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI DIAGNOSIS */}
          <div className="bg-[#16191E] border border-[#242830] rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#242830] pb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-gold" />
                <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-text-primary">AI Diagnosis</h3>
              </div>
              <span className="text-xs font-mono text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/30">
                {caseData.probabilityOfRecovery}% Confidence
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-text-muted font-mono block">Root Cause:</span>
                <span className="text-text-primary font-semibold text-sm">{caseData.reason}</span>
              </div>

              <div>
                <span className="text-text-muted font-mono block mb-1">Telemetry Evidence:</span>
                <ul className="space-y-1.5 list-disc list-inside text-text-secondary">
                  {caseData.evidenceNotes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* AI RECOMMENDATION */}
          <div className="bg-[#16191E] border border-[#242830] rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#242830] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gold" />
                <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-text-primary">AI Recommendation</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                Action: {caseData.actionType}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#121418] border border-[#242830] p-3 rounded">
                <p className="text-sm text-text-primary font-medium">{caseData.recommendedAction}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 font-mono">
                <div>
                  <span className="text-text-muted text-[10px] uppercase">Expected Recovery</span>
                  <div className="text-base font-bold text-emerald-400">₹{caseData.expectedRecovery.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <span className="text-text-muted text-[10px] uppercase">Success Probability</span>
                  <div className="text-base font-bold text-gold">{caseData.probabilityOfRecovery}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: POLICY CHECK ENGINE */}
        <div className={`bg-[#16191E] border ${isBlocked ? 'border-red-900/60 shadow-red-950/20' : 'border-gold/40'} rounded-lg p-6 space-y-5 shadow-2xl`}>
          <div className="flex items-center justify-between border-b border-[#242830] pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className={`w-5 h-5 ${isBlocked ? 'text-red-400' : 'text-emerald-400'}`} />
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-text-primary">
                Policy Engine Safety Verification
              </h3>
            </div>
            <div className={`px-3 py-1 rounded text-xs font-mono font-bold ${
              isBlocked ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
            }`}>
              {caseData.policyState}
            </div>
          </div>

          {/* Explanation Callout for Safety */}
          <div className="p-3 bg-[#121418] border border-[#242830] rounded text-xs text-text-secondary flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-text-primary">Safety Architecture Guarantee:</strong> The AI can recommend an action. The Policy Engine deterministically checks thresholds to ensure that action is allowed before execution.
            </p>
          </div>

          {/* Policy Checklist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {caseData.policyChecks.map((check, idx) => (
              <div key={idx} className="bg-[#121418] border border-[#242830] p-3 rounded flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  {check.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  )}
                  <span className={check.passed ? 'text-text-primary' : 'text-red-400 font-semibold'}>{check.label}</span>
                </div>
                <span className="text-[11px] text-text-muted">{check.details}</span>
              </div>
            ))}
          </div>

          {isBlocked && (
            <div className="p-4 bg-red-950/40 border border-red-800/60 rounded text-xs text-red-200 font-mono space-y-2">
              <div className="font-bold uppercase tracking-wider flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-400" /> Action Blocked by Safety Policy
              </div>
              <p>{caseData.blockedReason}</p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => showToast('Demo action: Human override request sent to admin approval queue.')}
                  className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white font-semibold text-xs"
                >
                  Request Human Operator Approval
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 5: EXECUTION STATUS & AUDIT TRAIL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Execution Box */}
          <div className="bg-[#16191E] border border-[#242830] rounded-lg p-6 space-y-4">
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-text-primary border-b border-[#242830] pb-3">
              Execution Dispatch Status
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between p-2.5 bg-[#121418] rounded border border-[#242830]">
                <span className="text-text-secondary">Payment Link Generator</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  caseData.executionStatus.paymentLink === 'READY' ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
                }`}>
                  {caseData.executionStatus.paymentLink}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-[#121418] rounded border border-[#242830]">
                <span className="text-text-secondary">Notification Dispatcher</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400">
                  {caseData.executionStatus.notification}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-[#121418] rounded border border-[#242830]">
                <span className="text-text-secondary">Recovery Status</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gold/20 text-gold border border-gold/40">
                  {caseData.executionStatus.recoveryStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Audit Trail Timeline */}
          <div className="lg:col-span-2 bg-[#16191E] border border-[#242830] rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#242830] pb-3">
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-text-primary">
                Case Telemetry Audit Trail
              </h3>
              <span className="text-xs font-mono text-text-muted">{caseData.auditTrail.length} events logged</span>
            </div>

            <div className="space-y-4">
              {caseData.auditTrail.map((log, idx) => (
                <div key={idx} className="flex items-start gap-4 text-xs font-mono relative pl-4 border-l border-[#242830]">
                  <div className="w-2 h-2 rounded-full bg-gold absolute -left-1 top-1.5" />
                  <div className="text-text-muted w-16 flex-shrink-0">{log.timestamp}</div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-gold font-semibold">{log.actor}</span>
                      <span className="text-text-primary">• {log.event}</span>
                    </div>
                    <div className="text-text-secondary text-[11px]">{log.decision}</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#121418] border border-[#242830] text-emerald-400">
                      {log.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
