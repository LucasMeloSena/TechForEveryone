import retry from "async-retry";
import database from "infra/database";

async function waitForAllServices() {
  const waitForWebServer = async () => {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
      onRetry: (err, attempt) => {
        console.log(
          `Attempt ${attempt} - Failed to fetch status page: ${err.message}`,
        );
      },
    });
  };

  await waitForWebServer();

  async function fetchStatusPage() {
    const url = "http://localhost:3000/api/v1/status";

    const response = await fetch(url);
    if (!response.ok) {
      throw Error(`HTTP error ${response.status}`);
    }
    await response.json();
  }
}

async function clearDatabse() {
  await database.query("drop schema public cascade; create schema public;");
}

const orchestrator = {
  waitForAllServices,
  clearDatabse
};

export default orchestrator;
