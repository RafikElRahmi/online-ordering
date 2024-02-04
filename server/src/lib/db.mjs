import { config } from "dotenv";
import { createConnection } from "mysql2";
const host = process.env.HOST || config().parsed.HOST
const user = process.env.USERNAME_DB || config().parsed.USERNAME_DB;
const password = process.env.PASSWORD_DB || config().parsed.PASSWORD_DB;
const database = process.env.DB || config().parsed.DB;
const connection = createConnection({
  host ,
  user ,
  password ,
  database,
});

export default connection;
