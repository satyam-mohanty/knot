export enum Severity {
  CRITICAL = 'CRITICAL',
  MODERATE = 'MODERATE',
  LOW = 'LOW'
}

export enum IssueType {
  CONTRADICTION = 'CONTRADICTION',
  AMBIGUITY = 'AMBIGUITY',
  RISK = 'RISK'
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

export interface AnalysisResponse {
  summary: string;
  issues: AnalysisIssue[];
}

export interface UploadedFile {
  file: File;
  preview?: string;
  base64?: string;
}