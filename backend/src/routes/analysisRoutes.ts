import { Router } from "express";
import { analyzeText, getHistory } from "../controllers/analysisController";

const router = Router();

router.post("/analyze", analyzeText);
router.get("/history", getHistory);

export default router;

