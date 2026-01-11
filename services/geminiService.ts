import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResponse, Severity, IssueType, AnalysisMode } from "../types";

// Define the schema for structured output with "Plain English" constraints
const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A simple, non-technical summary of the 3 biggest problems. Write this like you are explaining it to a friend. No legal jargon.",
    },
    riskAssessment: {
      type: Type.OBJECT,
      properties: {
        score: { 
          type: Type.INTEGER, 
          description: "Risk score 0-100." 
        },
        level: { 
          type: Type.STRING, 
          enum: ["LOW", "MODERATE", "HIGH", "CRITICAL"],
          description: "Qualitative level."
        },
        financialImpact: { 
          type: Type.STRING, 
          description: "Simple money terms. (e.g., 'You pay for their mistakes', 'Unlimited Cost', '$50k Max')." 
        },
        legalDomain: { 
          type: Type.STRING, 
          description: "Simple category (e.g., 'Copying Rights', 'Safety', 'Deadlines')." 
        },
        primaryBeneficiary: { 
          type: Type.STRING, 
          description: "Who wins here? (e.g., 'Them', 'You', 'Both')." 
        },
        explanation: {
          type: Type.STRING,
          description: "Max 10 words. Simple reason (e.g., 'Too many unfair rules')."
        }
      },
      required: ["score", "level", "financialImpact", "legalDomain", "primaryBeneficiary", "explanation"]
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
            enum: [
              IssueType.CONTRADICTION, 
              IssueType.AMBIGUITY, 
              IssueType.RISK,
              IssueType.CHANGE,
              IssueType.MISSING
            ] 
          },
          title: { type: Type.STRING, description: "Simple title (e.g. 'They can cancel anytime'). Max 6 words." },
          description: { type: Type.STRING, description: "Explain the bad thing in simple, everyday language. Why does this matter? Max 2 sentences." },
          sourceDoc1: { type: Type.STRING, description: "Short quote from Document A." },
          sourceDoc2: { type: Type.STRING, description: "Short quote from Document B or conflicting clause." },
          pageRef: { type: Type.STRING, description: "Page/Section ref." },
          recommendation: { type: Type.STRING, description: "Simple advice (e.g. 'Ask them to remove this')." },
        },
        required: ["id", "severity", "type", "title", "description"],
      },
    },
  },
  required: ["summary", "issues", "riskAssessment"],
};

export const analyzeContracts = async (
  base64Files: string[],
  mode: AnalysisMode
): Promise<AnalysisResponse> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const parts = base64Files.map((b64) => ({
      inlineData: {
        mimeType: "application/pdf",
        data: b64,
      },
    }));

    let promptText = "";

    const toneInstructions = `
      CRITICAL INSTRUCTION: WRITE IN PLAIN, EVERYDAY ENGLISH.
      - Imagine you are explaining this to a non-expert friend.
      - Do NOT use legal jargon (avoid words like "indemnification", "pursuant", "force majeure", "jurisdiction").
      - Instead of legal terms, describe what actually happens (e.g., instead of "Indemnification", say "You have to pay if they get sued").
      - Keep text CONCISE and PUNCHY.
      - Focus on practical consequences: Money, Time, and Fairness.
    `;

    if (mode === 'COMPARISON') {
      promptText = `
        COMPARE the two documents (Original vs New).
        Focus on:
        1. sneaky changes.
        2. deleted protections.
        3. new costs or rules added.
        
        ${toneInstructions}

        Classify findings by Severity.
        Use IssueType: CHANGE, MISSING, RISK.
      `;
    } else {
      promptText = `
        ANALYZE the legal documents.
        Focus on:
        1. Unfair rules.
        2. Contradictions (things that don't make sense).
        3. Confusing parts.
        4. Missing protections that should be there.

        ${toneInstructions}

        Classify findings by Severity.
        Use IssueType: CONTRADICTION, AMBIGUITY, RISK.
      `;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: {
        parts: [...parts, { text: promptText }],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.1,
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
