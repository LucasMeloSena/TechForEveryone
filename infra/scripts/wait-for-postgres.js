const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker inspect techforeveryone-postgres-1", (error, stdout) => {
    if (error) {
      checkPostgres();
      console.log("🔴 Aguardando Postgres Aceitar Conexões...");
      return;
    }

    console.log("🟢 Postgres Aceitando Conexões...");
  });
}

checkPostgres();
