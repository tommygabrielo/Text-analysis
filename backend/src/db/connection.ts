import { Pool } from "pg";

let pool: Pool | null = null;

export const getPool = (): Pool => {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    
    if (connectionString) {
      pool = new Pool({ connectionString });
    } else {
      pool = new Pool({
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432"),
        database: process.env.DB_NAME || "text_analysis",
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "postgres",
      });
    }
  }
  return pool;
};

export const connectDB = async (): Promise<void> => {
  const dbPool = getPool();
  
  try {
    await dbPool.query("SELECT NOW()");
    console.log("PostgreSQL connecté");
    
    await initTable();
  } catch (error) {
    console.error("Erreur connexion PostgreSQL:", error);
    process.exit(1);
  }
};

const initTable = async (): Promise<void> => {
  const dbPool = getPool();
  
  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS analyses (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL,
      score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  await dbPool.query(`
    CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON analyses(created_at DESC)
  `);
};
