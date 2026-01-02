import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResponse, Severity, IssueType } from "../types";

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A high-level executive summary of the contract analysis, highlighting major risks.",
    },
    issues: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          severity: { 
            type: Type.STRING, 
            enum: [Severity.CRITICAL, Severity.MODERATE, Severity.LOW] 
          },
          type: { 
            type: Type.STRING, 
            enum: [IssueType.CONTRADICTION, IssueType.AMBIGUITY, IssueType.RISK] 
          },
          title: { type: Type.STRING, description: "Short title of the issue" },
          description: { type: Type.STRING, description: "Detailed explanation of the contradiction or ambiguity" },
          sourceDoc1: { type: Type.STRING, description: "Relevant quote from the first document (or earlier clause)" },
          sourceDoc2: { type: Type.STRING, description: "Relevant quote from the second document (or conflicting clause)" },
          pageRef: { type: Type.STRING, description: "Page numbers or section references" },
          recommendation: { type: Type.STRING, description: "Legal advice on how to resolve this" },
        },
        required: ["id", "severity", "type", "title", "description"],
      },
    },
  },
  required: ["summary", "issues"],
};

export const analyzeContracts = async (
  base64Files: string[]
): Promise<AnalysisResponse> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const parts = base64Files.map((b64) => ({
      inlineData: {
        mimeType: "application/pdf",
        data: b64,
      },
    }));

    const promptText = `
      You are an expert Senior Legal Auditor and Contract Analyst. 
      Your task is to analyze the provided legal documents (contracts, policies, MSAs, SOWs) to identify:
      1. Logical contradictions between clauses (e.g., Clause A says X, Clause B says Y, and X != Y).
      2. Hidden liabilities or vague terms that pose a risk.
      3. Inconsistencies between a Master Agreement and a Statement of Work if two docs are provided.

      Classify each finding by Severity:
      - CRITICAL: Major legal risk, direct financial contradiction, or invalidating clause.
      - MODERATE: Ambiguity that could lead to disputes.
      - LOW: Minor formatting or slight inconsistency.

      Provide specific quotes to back up your findings.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [...parts, { text: promptText }],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(jsonText) as AnalysisResponse;
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};