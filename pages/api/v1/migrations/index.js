import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

async function migrations(req, res) {
  if (req.method === "GET") {
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dir: join("infra", "migrations"),
      dryRun: true,
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    return res.status(200).json(migrations);
  }
  if (req.method === "POST") {
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dir: join("infra", "migrations"),
      dryRun: false,
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });

    return res.status(200).json(migrations);
  }
  return res.status(405).json({ message: "Método não permitido!" });
}

export default migrations;
