export interface AnalysisRules {
  minLengthBonus: number;
  minLengthThreshold: number;
  minLengthPenalty: number;
  minLengthPenaltyThreshold: number;
  forbiddenWords: string[];
  forbiddenWordPenalty: number;
  positiveWords: string[];
  positiveWordBonus: number;
  punctuationBonus: number;
  uppercasePenalty: number;
  uppercaseThreshold: number;
  structureBonus: number;
  minScore: number;
  maxScore: number;
}

export const defaultRules: AnalysisRules = {
  minLengthBonus: 20,
  minLengthThreshold: 100,
  minLengthPenalty: 15,
  minLengthPenaltyThreshold: 20,
  forbiddenWords: ["fraude", "illégal", "faux"],
  forbiddenWordPenalty: 10,
  positiveWords: ["conforme", "légal", "valide", "correct", "approuvé"],
  positiveWordBonus: 5,
  punctuationBonus: 10,
  uppercasePenalty: 15,
  uppercaseThreshold: 0.3,
  structureBonus: 5,
  minScore: 0,
  maxScore: 100,
};

