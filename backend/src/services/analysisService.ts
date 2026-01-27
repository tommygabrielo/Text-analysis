import { AnalysisRules, defaultRules } from "../config/analysisRules";

export class AnalysisService {
  private rules: AnalysisRules;

  constructor(rules: AnalysisRules = defaultRules) {
    this.rules = rules;
  }

  analyzeText(text: string): number {
    let score = 50;

    if (text.length > this.rules.minLengthThreshold) {
      score += this.rules.minLengthBonus;
    }

    if (text.length < this.rules.minLengthPenaltyThreshold) {
      score -= this.rules.minLengthPenalty;
    }

    const lowerText = text.toLowerCase();
    const forbiddenCount = this.rules.forbiddenWords.filter((word) =>
      lowerText.includes(word.toLowerCase())
    ).length;

    if (forbiddenCount > 0) {
      score -= this.rules.forbiddenWordPenalty * forbiddenCount;
    }

    const positiveCount = this.rules.positiveWords.filter((word) =>
      lowerText.includes(word.toLowerCase())
    ).length;

    if (positiveCount > 0) {
      score += this.rules.positiveWordBonus * positiveCount;
    }

    const hasPunctuation = /[.!?,;:]/.test(text);
    if (hasPunctuation) {
      score += this.rules.punctuationBonus;
    }

    const uppercaseRatio = (text.match(/[A-Z]/g) || []).length / text.length;
    if (uppercaseRatio > this.rules.uppercaseThreshold && text.length > 10) {
      score -= this.rules.uppercasePenalty;
    }

    const hasStructure = /\n\n|\r\n\r\n/.test(text) || text.split(/[.!?]/).length > 2;
    if (hasStructure) {
      score += this.rules.structureBonus;
    }

    return Math.max(
      this.rules.minScore,
      Math.min(this.rules.maxScore, score)
    );
  }

  setRules(rules: Partial<AnalysisRules>): void {
    this.rules = { ...this.rules, ...rules };
  }
}

