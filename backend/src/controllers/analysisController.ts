import { Request, Response } from "express";
import { AnalysisService } from "../services/analysisService";
import { Analysis } from "../models/Analysis";
import { z } from "zod";

const analyzeSchema = z.object({
  text: z.string().min(1, "Le texte ne peut pas être vide"),
});

const analysisService = new AnalysisService();

export const analyzeText = async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = analyzeSchema.safeParse(req.body);
    
    if (!validation.success) {
      res.status(400).json({
        error: "Données invalides",
        details: validation.error.errors,
      });
      return;
    }

    const { text } = validation.data;
    const score = analysisService.analyzeText(text);

    await Analysis.create({ text, score });

    res.status(200).json({
      score,
      status: "ok",
    });
  } catch (error) {
    console.error("Erreur analyse:", error);
    res.status(500).json({
      error: "Erreur serveur lors de l'analyse",
    });
  }
};

export const getHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const analyses = await Analysis.findAll();

    const history = analyses.map((analysis) => ({
      id: analysis.id.toString(),
      text: analysis.text,
      score: analysis.score,
      createdAt: analysis.createdAt.toISOString(),
    }));

    res.status(200).json(history);
  } catch (error) {
    console.error("Erreur historique:", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération de l'historique",
    });
  }
};

