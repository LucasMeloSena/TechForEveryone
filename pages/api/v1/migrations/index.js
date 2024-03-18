import migrationRunner from "node-pg-migrate";
import { join } from "node:path"

async function migrations(req, res) {
  if (req.method == "GET") {
      const migrations = await migrationRunner({
        databaseUrl: process.env.DATABASE_URL,
        dir: join("infra", "migrations"),
        dryRun: true,
        direction: 'up',
        verbose: true,
        migrationsTable: 'pgmigrations'
      });
    res.status(200).json(migrations);
  }
}

export default migrations;
