import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connection";
import analysisRoutes from "./routes/analysisRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", analysisRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
};

startServer().catch(console.error);

