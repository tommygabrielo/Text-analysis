import { AnalysisService } from "../analysisService";
import { defaultRules } from "../../config/analysisRules";

describe("AnalysisService", () => {
  let service: AnalysisService;

  beforeEach(() => {
    service = new AnalysisService();
  });

  test("devrait donner un bonus pour texte long", () => {
    const longText = "a".repeat(101);
    const score = service.analyzeText(longText);
    expect(score).toBeGreaterThan(50);
  });

  test("devrait pénaliser les mots interdits", () => {
    const text = "Ceci est une fraude";
    const score = service.analyzeText(text);
    expect(score).toBeLessThan(50);
  });

  test("devrait borner le score entre 0 et 100", () => {
    const veryBadText = "fraude illégal faux " + "a".repeat(200);
    const score = service.analyzeText(veryBadText);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  test("devrait retourner un score pour texte normal", () => {
    const text = "Ceci est un texte normal";
    const score = service.analyzeText(text);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  test("devrait pénaliser texte trop court", () => {
    const shortText = "Court";
    const score = service.analyzeText(shortText);
    expect(score).toBeLessThan(50);
  });

  test("devrait donner bonus pour mots positifs", () => {
    const text = "Ce document est conforme et valide";
    const score = service.analyzeText(text);
    expect(score).toBeGreaterThan(50);
  });

  test("devrait donner bonus pour ponctuation", () => {
    const text = "Texte avec ponctuation. Et virgules, aussi!";
    const score = service.analyzeText(text);
    expect(score).toBeGreaterThan(50);
  });

  test("devrait pénaliser texte en majuscules", () => {
    const uppercaseText = "CE TEXTE EST EN MAJUSCULES ET TRÈS AGRESSIF";
    const score = service.analyzeText(uppercaseText);
    expect(score).toBeLessThan(50);
  });
});

