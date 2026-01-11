import { defineConfig } from 'vite';

export enum Severity {
  CRITICAL = 'CRITICAL',
  MODERATE = 'MODERATE',
  LOW = 'LOW'
}

export enum IssueType {
  CONTRADICTION = 'CONTRADICTION',
  AMBIGUITY = 'AMBIGUITY',
  RISK = 'RISK',
  CHANGE = 'CHANGE',
  MISSING = 'MISSING'
}

export interface AnalysisIssue {
  id: string;
  severity: Severity;
  type: IssueType;
  title: string;
  description: string;
  sourceDoc1?: string; 
  sourceDoc2?: string; 
  pageRef?: string;
  recommendation?: string;
}

export interface RiskAssessment {
  score: number; 
  level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  financialImpact: string; 
  legalDomain: string; 
  primaryBeneficiary: string; 
  explanation: string; 
}

export interface AnalysisResponse {
  summary: string;
  riskAssessment: RiskAssessment;
  issues: AnalysisIssue[];
}

export interface UploadedFile {
  file: File;
  preview?: string;
  base64?: string;
}

export type AnalysisMode = 'ANALYSIS' | 'COMPARISON';

export default defineConfig({
  // Add your Vite configuration here
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
});
