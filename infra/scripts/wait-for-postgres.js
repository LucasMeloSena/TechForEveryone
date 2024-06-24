const { exec } = require("node:child_process");

function checkPostgres() {
  exec(
    "docker exec postgres-dev pg_isready --host localhost",
    (error, stdout) => {
      if (stdout.search("accepting connections") === -1) {
        checkPostgres();
        console.log("🔴 Aguardando Postgres Aceitar Conexões...");
        return;
      }

      console.log("🟢 Postgres Aceitando Conexões...");
    },
  );
}

checkPostgres();
