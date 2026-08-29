export interface Payment {
  id: string;
  paymentId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  method: 'UPI' | 'Card' | 'Netbanking' | 'Mandate';
  status: 'Captured' | 'Failed' | 'Authorized' | 'Pending';
  failureReason?: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  lifetimeValue: number;
  successfulPaymentsCount: number;
  failedPaymentsCount: number;
  revenueAtRisk: number;
  recoveryStatus: 'Active' | 'Recovered' | 'Escalated' | 'None';
  recentPayments: Payment[];
}

export interface PolicyCheck {
  label: string;
  passed: boolean;
  details: string;
}

export interface AuditLogEntry {
  timestamp: string;
  actor: string;
  caseId: string;
  event: string;
  decision?: string;
  result: string;
  category: 'AI' | 'Policy' | 'Execution' | 'Webhook' | 'Human';
  amount?: number;
}

export interface RecoveryCase {
  id: string;
  caseId: string; // e.g. REC-82941
  customerName: string;
  customerEmail: string;
  amountAtRisk: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  riskScore: number; // 0-100
  reason: string;
  probabilityOfRecovery: number; // 0-100 %
  expectedRecovery: number;
  recommendedAction: string;
  actionType: 'Payment Link' | 'Recovery sequence' | 'Retry Payment' | 'Reminder';
  status: 'Needs Review' | 'Approved' | 'In Progress' | 'Recovered' | 'Blocked';
  policyState: 'APPROVED' | 'BLOCKED' | 'PENDING_HUMAN_APPROVAL';
  blockedReason?: string;
  lastSuccessfulPaymentAmount?: number;
  successfulHistoryCount?: number;
  consecutiveFailuresCount?: number;
  evidenceNotes: string[];
  policyChecks: PolicyCheck[];
  executionStatus: {
    paymentLink: 'READY' | 'SENT' | 'EXPIRED' | 'BLOCKED';
    notification: 'READY' | 'SENT' | 'PENDING' | 'BLOCKED';
    recoveryStatus: 'AWAITING PAYMENT' | 'ACTION BLOCKED' | 'RECOVERED' | 'PROCESSING';
  };
  auditTrail: AuditLogEntry[];
}

export interface AIDecision {
  id: string;
  timestamp: string;
  caseId: string;
  agent: string;
  decision: string;
  confidence: number;
  policyResult: 'Allowed' | 'Blocked' | 'Escalated';
}

export interface AnalyticsSummary {
  revenueAtRisk: number;
  recoveredRevenue: number;
  recoveryRate: number;
  activeRecoveryCasesCount: number;
  upliftAmount: number;
  withoutReviveRevenue: number;
  withReviveRevenue: number;
  chartData14Days: {
    date: string;
    atRisk: number;
    recovered: number;
  }[];
  funnelData: {
    stage: 'Detected' | 'Diagnosed' | 'Recommended' | 'Approved' | 'Recovered';
    count: number;
  }[];
}
