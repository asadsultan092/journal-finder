
export interface Journal {
  name: string;
  publisher: string;
  impactFactor: number;
  citeScore: number;
  hIndex: number;
  openAccess: boolean;
  apcAmount: string; // Article Processing Charge
  averageTurnaroundWeeks: number;
  scopeMatchReasoning: string;
  acceptanceRate: string;
  websiteUrl: string;
  quartile: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  subjects: string[];
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
}

export interface SuggestionResult {
  journals: Journal[];
  sources: GroundingSource[];
}

export interface SearchParams {
  title: string;
  keywords: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
