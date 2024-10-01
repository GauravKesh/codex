const mongoose = require("mongoose");
const logger = require("../src/utils/logger");
require("dotenv").config();

let mainDbConnection;
let forumsDbConnection;

const mainDbUri = process.env.API_URI;
const forumsDBUri = process.env.FORUM_URI_DB;

const connectToDatabases = async () => {
  try {
    mainDbConnection = mongoose.createConnection(mainDbUri, {
      serverSelectionTimeoutMS: 30000,
    });

    forumsDbConnection = mongoose.createConnection(forumsDBUri, {
      serverSelectionTimeoutMS: 30000,
    });

    mainDbConnection.on("connected", () =>
      logger.info("Connected to main MongoDB database")
    );
    mainDbConnection.on("error", (err) =>
      logger.error("Error connecting to main MongoDB database:", err)
    );

    forumsDbConnection.on("connected", () =>
      logger.info("Connected to forums MongoDB database")
    );
    forumsDbConnection.on("error", (err) =>
      logger.error("Error connecting to forums MongoDB database:", err)
    );

    await Promise.all([
      mainDbConnection.asPromise(),
      forumsDbConnection.asPromise(),
    ]);
  } catch (err) {
    logger.error("Error connecting to MongoDB databases:", err);
    throw err;
  }
};

const getMainDb = () => mainDbConnection;
const getForumsDb = () => forumsDbConnection;

const closeConnections = async () => {
  try {
    await mainDbConnection.close();
    await forumsDbConnection.close();
    logger.info("All MongoDB connections closed");
  } catch (err) {
    logger.error("Error closing MongoDB connections:", err);
  }
};

connectToDatabases().catch((err) => {
  logger.error("Failed to initialize database connections:", err);
  process.exit(1);
});

module.exports = {
  connectToDatabases,
  getMainDb,
  getForumsDb,
  closeConnections,
};
