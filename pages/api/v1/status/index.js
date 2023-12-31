import database from "infra/database.js";

async function status(request, response) {
  response.status(200).json({ message: "Página de status ok" });
}

export default status;