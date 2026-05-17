// Store for managing the OSINT investigation state
import { createContext } from 'react';

export type CandidateVerdict = 'CLEAN' | 'SUSPICIOUS' | 'DANGEROUS' | 'ARREST_ON_SIGHT';

export interface InvestigationState {
  officerName: string;
  verdicts: Record<string, CandidateVerdict>;
  completed: boolean;
}

// We'll just use simple React state in App for this small app.
