let server = null;
const mongoClient = require("mongodb").MongoClient;
require("dotenv").config({ path: "../../.env" });

const connect = (callback) => {
  const database_url = process.env.NODE_ENV
    ? process.env.DB_PROD_URL
    : process.env.DB_DEV_URL;

  mongoClient.connect(
    database_url,
    { useUnifiedTopology: true },
    function (err, db) {
      if (err) {
        console.log(err);
        console.log("error connecting to database" + database_url);
      } else {
        console.log("connected to database");
        server = db;
        callback();
      }
    }
  );
};

function collection(value) {
  return server.db().collection(value);
}

function close() {
  server.close();
}

module.exports = {
  connect,
  collection,
  close,
};
