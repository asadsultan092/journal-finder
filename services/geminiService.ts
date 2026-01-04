
import { GoogleGenAI, Type } from "@google/genai";
import { Journal, SearchParams, SuggestionResult, GroundingSource } from "../types";

// Correct initialization using named parameter and direct environment variable access
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const JOURNAL_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "Official name of the journal" },
      publisher: { type: Type.STRING, description: "Journal publisher (e.g., Nature, Elsevier, IEEE)" },
      impactFactor: { type: Type.NUMBER, description: "Latest Impact Factor" },
      citeScore: { type: Type.NUMBER, description: "Latest CiteScore" },
      hIndex: { type: Type.NUMBER, description: "H-index of the journal" },
      openAccess: { type: Type.BOOLEAN, description: "Whether the journal is Open Access" },
      apcAmount: { type: Type.STRING, description: "Estimated Article Processing Charge in USD, e.g., '$2000' or 'Free'" },
      averageTurnaroundWeeks: { type: Type.NUMBER, description: "Estimated average time from submission to first decision in weeks" },
      scopeMatchReasoning: { type: Type.STRING, description: "Why this journal fits the title and keywords" },
      acceptanceRate: { type: Type.STRING, description: "Estimated acceptance rate percentage" },
      websiteUrl: { type: Type.STRING, description: "Official journal website URL" },
      quartile: { type: Type.STRING, description: "SJR Quartile (Q1, Q2, Q3, or Q4)" },
      subjects: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Main subject areas" }
    },
    required: ["name", "publisher", "impactFactor", "openAccess", "scopeMatchReasoning"]
  }
};

export const suggestJournals = async (params: SearchParams): Promise<SuggestionResult> => {
  const prompt = `Act as an expert academic publication consultant. Based on the following research paper details, suggest the top 50 most relevant academic journals for publication.
  
  CRITICAL REQUIREMENT: Focus exclusively on journals published by ACM, Springer, Elsevier, and IEEE.
  
  Paper Title: ${params.title}
  Keywords: ${params.keywords}
  
  Provide high-quality, realistic data for each journal including their metrics and fees. For each of the 50 recommendations, ensure you include:
  1. Journal Name and Publisher (strictly from the list above)
  2. Latest Impact Factor and CiteScore
  3. Acceptance rate and typical decision timeline
  4. Detailed reasoning why it matches the paper scope.
  
  Use Google Search results to ensure accuracy for the current year (2024-2025).`;

  try {
    // Use gemini-3-pro-preview for complex reasoning tasks
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: JOURNAL_SCHEMA,
        tools: [{ googleSearch: {} }]
      }
    });

    // Access text property directly (not as a method)
    const journals = JSON.parse(response.text || "[]") as Journal[];
    
    // Extract grounding chunks as required when using googleSearch tool
    const sources = (response.candidates?.[0]?.groundingMetadata?.groundingChunks || []) as GroundingSource[];

    return {
      journals,
      sources
    };
  } catch (error) {
    console.error("Error fetching journal suggestions:", error);
    throw error;
  }
};
