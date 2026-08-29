import {
  mockPayments,
  mockCustomers,
  mockRecoveryCases,
  mockAIDecisions,
  mockAnalyticsSummary,
  mockAuditLogs
} from './data';
import { Payment, Customer, RecoveryCase, AIDecision, AnalyticsSummary, AuditLogEntry } from '@/types';

// In Phase 2, replace these functions with actual API / Database calls
export async function getPayments(): Promise<Payment[]> {
  return Promise.resolve(mockPayments);
}

export async function getCustomers(): Promise<Customer[]> {
  return Promise.resolve(mockCustomers);
}

export async function getCustomerById(id: string): Promise<Customer | undefined> {
  return Promise.resolve(mockCustomers.find(c => c.id === id || c.name.toLowerCase().includes(id.toLowerCase())));
}

export async function getRecoveryCases(): Promise<RecoveryCase[]> {
  return Promise.resolve(mockRecoveryCases);
}

export async function getRecoveryCaseById(caseId: string): Promise<RecoveryCase | undefined> {
  return Promise.resolve(mockRecoveryCases.find(c => c.caseId.toLowerCase() === caseId.toLowerCase() || c.id.toLowerCase() === caseId.toLowerCase()));
}

export async function getAIDecisions(): Promise<AIDecision[]> {
  return Promise.resolve(mockAIDecisions);
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  return Promise.resolve(mockAnalyticsSummary);
}

export async function getAuditLogs(): Promise<AuditLogEntry[]> {
  return Promise.resolve(mockAuditLogs);
}
