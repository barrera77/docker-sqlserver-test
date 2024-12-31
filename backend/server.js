import express from "express";
import dotenv from "dotenv";
import mssql from "mssql";
import session from "express-session";

dotenv.config();
const app = express();

//create configuration for MSSQL
const configMssql = {
  user: process.env.MSSQL_USER_NAME,
  password: process.env.MSSQL_PASSWORD,
  database: "BVC_Airlines_DB",
  server: "localhost",
  options: {
    encrypt: false,
    trustedconnection: true,
    enableArithAbort: true,
  },
};

const poolPromise = mssql.connect(configMssql);

poolPromise
  .then((pool) => {
    // create Request object
    const request = pool.request();

    request.query("SELECT * FROM RegisteredUser", function (err, recordset) {
      if (err) console.log(err);
      console.log(recordset);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Listen on port 5003
const PORT = /* process.env.PORT ||  */ 5003;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
