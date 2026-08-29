import { Payment, Customer, RecoveryCase, AIDecision, AnalyticsSummary, AuditLogEntry } from '@/types';

export const mockPayments: Payment[] = [
  {
    id: 'pay_1',
    paymentId: 'pay_N9x2kL0s',
    customerName: 'Rahul Mehta',
    customerEmail: 'rahul.m@techcorp.in',
    amount: 4999,
    currency: 'INR',
    method: 'UPI',
    status: 'Failed',
    failureReason: 'Repeated payment failure - Insufficient funds / Timeout',
    createdAt: '2026-08-29 21:41:02'
  },
  {
    id: 'pay_2',
    paymentId: 'pay_K8v1mP3q',
    customerName: 'Ananya Sen',
    customerEmail: 'ananya.sen@designstudio.io',
    amount: 18500,
    currency: 'INR',
    method: 'Card',
    status: 'Failed',
    failureReason: 'Subscription failure - Card expired',
    createdAt: '2026-08-29 20:15:11'
  },
  {
    id: 'pay_3',
    paymentId: 'pay_P3d9zX7w',
    customerName: 'Arjun Das',
    customerEmail: 'arjun.das@freelance.org',
    amount: 2499,
    currency: 'INR',
    method: 'Netbanking',
    status: 'Failed',
    failureReason: 'Checkout abandonment at OTP stage',
    createdAt: '2026-08-29 19:30:45'
  },
  {
    id: 'pay_4',
    paymentId: 'pay_H4f8sA2e',
    customerName: 'Enterprise Corp India',
    customerEmail: 'billing@enterprise.co.in',
    amount: 75000,
    currency: 'INR',
    method: 'Mandate',
    status: 'Failed',
    failureReason: 'Autopay debit failure - Exceeds autonomous limit',
    createdAt: '2026-08-29 18:05:00'
  },
  {
    id: 'pay_5',
    paymentId: 'pay_M9k3bC5n',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.s@innovate.in',
    amount: 12000,
    currency: 'INR',
    method: 'UPI',
    status: 'Captured',
    createdAt: '2026-08-29 17:40:22'
  },
  {
    id: 'pay_6',
    paymentId: 'pay_L2w7xV9t',
    customerName: 'Vikram Malhotra',
    customerEmail: 'vikram@cloudops.dev',
    amount: 32000,
    currency: 'INR',
    method: 'Card',
    status: 'Captured',
    createdAt: '2026-08-29 16:12:09'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'cust_1',
    name: 'Rahul Mehta',
    email: 'rahul.m@techcorp.in',
    phone: '+91 98765 43210',
    lifetimeValue: 145000,
    successfulPaymentsCount: 5,
    failedPaymentsCount: 3,
    revenueAtRisk: 4999,
    recoveryStatus: 'Active',
    recentPayments: [mockPayments[0]]
  },
  {
    id: 'cust_2',
    name: 'Ananya Sen',
    email: 'ananya.sen@designstudio.io',
    phone: '+91 98123 45678',
    lifetimeValue: 320000,
    successfulPaymentsCount: 12,
    failedPaymentsCount: 1,
    revenueAtRisk: 18500,
    recoveryStatus: 'Active',
    recentPayments: [mockPayments[1]]
  },
  {
    id: 'cust_3',
    name: 'Arjun Das',
    email: 'arjun.das@freelance.org',
    phone: '+91 97111 22334',
    lifetimeValue: 24500,
    successfulPaymentsCount: 3,
    failedPaymentsCount: 2,
    revenueAtRisk: 2499,
    recoveryStatus: 'Active',
    recentPayments: [mockPayments[2]]
  },
  {
    id: 'cust_4',
    name: 'Enterprise Corp India',
    email: 'billing@enterprise.co.in',
    phone: '+91 99000 11223',
    lifetimeValue: 1250000,
    successfulPaymentsCount: 18,
    failedPaymentsCount: 1,
    revenueAtRisk: 75000,
    recoveryStatus: 'Escalated',
    recentPayments: [mockPayments[3]]
  }
];

export const mockRecoveryCases: RecoveryCase[] = [
  {
    id: 'REC-82941',
    caseId: 'REC-82941',
    customerName: 'Rahul Mehta',
    customerEmail: 'rahul.m@techcorp.in',
    amountAtRisk: 4999,
    riskLevel: 'High',
    riskScore: 92,
    reason: 'Repeated payment failure',
    probabilityOfRecovery: 91,
    expectedRecovery: 4550,
    recommendedAction: 'Create payment link and send a recovery reminder.',
    actionType: 'Payment Link',
    status: 'Approved',
    policyState: 'APPROVED',
    lastSuccessfulPaymentAmount: 4999,
    successfulHistoryCount: 5,
    consecutiveFailuresCount: 3,
    evidenceNotes: [
      'Three consecutive payment failures detected within 24 hours.',
      'Customer previously completed 5 similar payments successfully.',
      'Last successful payment was ₹4,999 on 2026-07-29.'
    ],
    policyChecks: [
      { label: 'Amount within autonomous limit', passed: true, details: '₹4,999 <= ₹50,000 policy threshold' },
      { label: 'Customer eligible', passed: true, details: 'Active account, high historic LTV' },
      { label: 'Retry limit respected', passed: true, details: '3 retries under 5 max limit' },
      { label: 'Recovery window active', passed: true, details: 'Window active (expires in 48 hrs)' }
    ],
    executionStatus: {
      paymentLink: 'READY',
      notification: 'READY',
      recoveryStatus: 'AWAITING PAYMENT'
    },
    auditTrail: [
      { timestamp: '21:41:02', actor: 'Revenue Detection Agent', caseId: 'REC-82941', event: 'Revenue Detection', decision: '₹4,999 identified as revenue at risk', result: 'Identified', category: 'AI', amount: 4999 },
      { timestamp: '21:41:03', actor: 'Diagnosis Agent', caseId: 'REC-82941', event: 'Failure Diagnosis', decision: 'Repeated failure detected', result: 'Diagnosed', category: 'AI' },
      { timestamp: '21:41:04', actor: 'Strategy Agent', caseId: 'REC-82941', event: 'Action Recommendation', decision: 'Payment link recommended', result: '91% confidence', category: 'AI' },
      { timestamp: '21:41:04', actor: 'Policy Engine', caseId: 'REC-82941', event: 'Policy Verification', decision: 'Action approved', result: 'Allowed', category: 'Policy' },
      { timestamp: '21:41:05', actor: 'Action Executor', caseId: 'REC-82941', event: 'Intervention Execution', decision: 'Payment link prepared', result: 'Ready', category: 'Execution' }
    ]
  },
  {
    id: 'REC-88291',
    caseId: 'REC-88291',
    customerName: 'Enterprise Corp India',
    customerEmail: 'billing@enterprise.co.in',
    amountAtRisk: 75000,
    riskLevel: 'High',
    riskScore: 96,
    reason: 'Subscription failure / High Value Autopay',
    probabilityOfRecovery: 87,
    expectedRecovery: 71250,
    recommendedAction: 'Retry payment on secondary mandate',
    actionType: 'Retry Payment',
    status: 'Blocked',
    policyState: 'BLOCKED',
    blockedReason: 'Amount exceeds the autonomous recovery threshold of ₹50,000.',
    lastSuccessfulPaymentAmount: 75000,
    successfulHistoryCount: 18,
    consecutiveFailuresCount: 1,
    evidenceNotes: [
      'High-value subscription mandate debit failed.',
      'Amount of ₹75,000 requires human operator sign-off before retrying.',
      'Customer has 18 consecutive successful historic mandates.'
    ],
    policyChecks: [
      { label: 'Amount within autonomous limit', passed: false, details: '₹75,000 > ₹50,000 max policy limit' },
      { label: 'Customer eligible', passed: true, details: 'VIP Tier customer' },
      { label: 'Retry limit respected', passed: true, details: 'First attempt' },
      { label: 'Recovery window active', passed: true, details: 'Active' }
    ],
    executionStatus: {
      paymentLink: 'BLOCKED',
      notification: 'PENDING',
      recoveryStatus: 'ACTION BLOCKED'
    },
    auditTrail: [
      { timestamp: '21:42:01', actor: 'Revenue Detection Agent', caseId: 'REC-88291', event: 'Revenue Detection', decision: '₹75,000 identified at risk', result: 'Flagged', category: 'AI', amount: 75000 },
      { timestamp: '21:42:05', actor: 'Strategy Agent', caseId: 'REC-88291', event: 'Strategy Proposal', decision: 'Retry Payment on mandate', result: '87% confidence', category: 'AI' },
      { timestamp: '21:42:10', actor: 'Policy Engine', caseId: 'REC-88291', event: 'Safety Guard Check', decision: 'ACTION BLOCKED', result: 'Exceeds ₹50k limit', category: 'Policy' }
    ]
  },
  {
    id: 'REC-82942',
    caseId: 'REC-82942',
    customerName: 'Ananya Sen',
    customerEmail: 'ananya.sen@designstudio.io',
    amountAtRisk: 18500,
    riskLevel: 'High',
    riskScore: 88,
    reason: 'Subscription failure',
    probabilityOfRecovery: 85,
    expectedRecovery: 16800,
    recommendedAction: 'Recovery sequence (Email + SMS Payment Link)',
    actionType: 'Recovery sequence',
    status: 'Needs Review',
    policyState: 'PENDING_HUMAN_APPROVAL',
    lastSuccessfulPaymentAmount: 18500,
    successfulHistoryCount: 12,
    consecutiveFailuresCount: 1,
    evidenceNotes: [
      'Subscription renewal failed due to card expiration.',
      'Card updater service attempted but failed.'
    ],
    policyChecks: [
      { label: 'Amount within autonomous limit', passed: true, details: '₹18,500 <= ₹50,000 limit' },
      { label: 'Customer eligible', passed: true, details: 'Eligible' },
      { label: 'Retry limit respected', passed: true, details: 'Passed' },
      { label: 'Recovery window active', passed: true, details: 'Active' }
    ],
    executionStatus: {
      paymentLink: 'READY',
      notification: 'READY',
      recoveryStatus: 'AWAITING PAYMENT'
    },
    auditTrail: [
      { timestamp: '20:15:11', actor: 'Revenue Detection Agent', caseId: 'REC-82942', event: 'Detection', decision: '₹18,500 at risk', result: 'Detected', category: 'AI', amount: 18500 }
    ]
  },
  {
    id: 'REC-82943',
    caseId: 'REC-82943',
    customerName: 'Arjun Das',
    customerEmail: 'arjun.das@freelance.org',
    amountAtRisk: 2499,
    riskLevel: 'Medium',
    riskScore: 64,
    reason: 'Checkout abandonment',
    probabilityOfRecovery: 76,
    expectedRecovery: 1900,
    recommendedAction: 'Automated WhatsApp reminder with instant UPI intent',
    actionType: 'Reminder',
    status: 'In Progress',
    policyState: 'APPROVED',
    lastSuccessfulPaymentAmount: 2499,
    successfulHistoryCount: 3,
    consecutiveFailuresCount: 1,
    evidenceNotes: [
      'Dropped off at 2FA authentication screen.',
      'High intent customer, basket saved.'
    ],
    policyChecks: [
      { label: 'Amount within autonomous limit', passed: true, details: '₹2,499 <= ₹50,000' },
      { label: 'Customer eligible', passed: true, details: 'Eligible' },
      { label: 'Retry limit respected', passed: true, details: 'Passed' },
      { label: 'Recovery window active', passed: true, details: 'Active' }
    ],
    executionStatus: {
      paymentLink: 'SENT',
      notification: 'SENT',
      recoveryStatus: 'PROCESSING'
    },
    auditTrail: [
      { timestamp: '19:30:45', actor: 'Revenue Detection Agent', caseId: 'REC-82943', event: 'Detection', decision: '₹2,499 at risk', result: 'Detected', category: 'AI', amount: 2499 }
    ]
  }
];

export const mockAIDecisions: AIDecision[] = [
  {
    id: 'dec_1',
    timestamp: '21:41:04',
    caseId: 'REC-82941',
    agent: 'Strategy Agent',
    decision: 'Create Payment Link',
    confidence: 91,
    policyResult: 'Allowed'
  },
  {
    id: 'dec_2',
    timestamp: '21:42:10',
    caseId: 'REC-88291',
    agent: 'Strategy Agent',
    decision: 'Retry Payment',
    confidence: 87,
    policyResult: 'Blocked'
  },
  {
    id: 'dec_3',
    timestamp: '20:15:15',
    caseId: 'REC-82942',
    agent: 'Diagnosis Agent',
    decision: 'Trigger Card Update Sequence',
    confidence: 88,
    policyResult: 'Allowed'
  },
  {
    id: 'dec_4',
    timestamp: '19:31:00',
    caseId: 'REC-82943',
    agent: 'Engagement Agent',
    decision: 'Send WhatsApp Instant Link',
    confidence: 76,
    policyResult: 'Allowed'
  }
];

export const mockAnalyticsSummary: AnalyticsSummary = {
  revenueAtRisk: 1240000,
  recoveredRevenue: 780000,
  recoveryRate: 62.9,
  activeRecoveryCasesCount: 127,
  upliftAmount: 370000,
  withoutReviveRevenue: 210000,
  withReviveRevenue: 580000,
  chartData14Days: [
    { date: 'Aug 16', atRisk: 85000, recovered: 42000 },
    { date: 'Aug 17', atRisk: 92000, recovered: 58000 },
    { date: 'Aug 18', atRisk: 78000, recovered: 49000 },
    { date: 'Aug 19', atRisk: 110000, recovered: 72000 },
    { date: 'Aug 20', atRisk: 95000, recovered: 61000 },
    { date: 'Aug 21', atRisk: 105000, recovered: 68000 },
    { date: 'Aug 22', atRisk: 88000, recovered: 54000 },
    { date: 'Aug 23', atRisk: 99000, recovered: 63000 },
    { date: 'Aug 24', atRisk: 120000, recovered: 79000 },
    { date: 'Aug 25', atRisk: 115000, recovered: 74000 },
    { date: 'Aug 26', atRisk: 90000, recovered: 59000 },
    { date: 'Aug 27', atRisk: 102000, recovered: 66000 },
    { date: 'Aug 28', atRisk: 128000, recovered: 82000 },
    { date: 'Aug 29', atRisk: 124000, recovered: 78000 }
  ],
  funnelData: [
    { stage: 'Detected', count: 2500 },
    { stage: 'Diagnosed', count: 1284 },
    { stage: 'Recommended', count: 847 },
    { stage: 'Approved', count: 721 },
    { stage: 'Recovered', count: 564 }
  ]
};

export const mockAuditLogs: AuditLogEntry[] = [
  ...mockRecoveryCases[0].auditTrail,
  ...mockRecoveryCases[1].auditTrail,
  { timestamp: '19:30:45', actor: 'Webhook Listener', caseId: 'REC-82943', event: 'Razorpay Webhook: payment.failed', result: 'Captured', category: 'Webhook' },
  { timestamp: '18:10:00', actor: 'Human Operator (UrbanCart Admin)', caseId: 'REC-82910', event: 'Manual Approval Override', decision: 'Approved ₹60k retry', result: 'Submitted', category: 'Human' }
];
