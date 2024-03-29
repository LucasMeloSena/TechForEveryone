import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

async function migrations(req, res) {
  const defaultMigrationsOptions = {
    databaseUrl: process.env.DATABASE_URL,
    dir: join("infra", "migrations"),
    dryRun: true,
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  }

  if (req.method === "GET") {
    const pendingMigrations = await migrationRunner(defaultMigrationsOptions);
    return res.status(200).json(pendingMigrations);
  }
  if (req.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false
    });

    if (migratedMigrations.length > 0) {
      return res.status(201).json(migratedMigrations);  
    }

    return res.status(200).json(migratedMigrations);
  }
  return res.status(405).json({ message: "Método não permitido!" });
}

export default migrations;
