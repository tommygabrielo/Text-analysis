import { Pool } from "pg";
import { getPool } from "../db/connection";

export interface IAnalysis {
  id: number;
  text: string;
  score: number;
  createdAt: Date;
}

export class Analysis {
  private static pool: Pool = getPool();

  static async create(data: { text: string; score: number }): Promise<IAnalysis> {
    const result = await this.pool.query(
      `INSERT INTO analyses (text, score) 
       VALUES ($1, $2) 
       RETURNING id, text, score, created_at as "createdAt"`,
      [data.text, data.score]
    );
    return result.rows[0];
  }

  static async findAll(): Promise<IAnalysis[]> {
    const result = await this.pool.query(
      `SELECT id, text, score, created_at as "createdAt" 
       FROM analyses 
       ORDER BY created_at DESC`
    );
    return result.rows;
  }
}
