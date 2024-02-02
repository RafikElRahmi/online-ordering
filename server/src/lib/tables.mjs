import { createUser, getUserByUsername } from "../models/user.mjs";
import hash from "../utils/hash.mjs";
import connection from "./db.mjs";

export default async function checkAndCreateTables() {
  try {
    connection.execute(
      "CREATE TABLE IF NOT EXISTS  users(id int AUTO_INCREMENT,username VARCHAR(64) UNIQUE, phone int, password VARCHAR(255),PRIMARY KEY (id) )"
    );
    connection.execute(
      "CREATE TABLE IF NOT EXISTS  sessions(id int AUTO_INCREMENT, isValid boolean DEFAULT true ,PRIMARY KEY (id) )"
    );
    connection.execute(
      "CREATE TABLE IF NOT EXISTS  products(id int AUTO_INCREMENT, name VARCHAR(100) UNIQUE , price INT ,PRIMARY KEY (id) )"
    );
    connection.execute(
      "CREATE TABLE IF NOT EXISTS  categories(id int AUTO_INCREMENT , name VARCHAR(64) UNIQUE , PRIMARY KEY (id) )"
    );
    const hashed = await hash(`${process.env.PASSWORD}`.toString());
    getUserByUsername(
      `${process.env.USERNAME}`.toString(),
      async function (err, result) {
        if (err) return;
        else if (result) return;
        else {
          createUser(
            {
              username: `${process.env.USERNAME}`,
              phone: 54973460,
              password: hashed,
            },
            function (error, result) {
              return;
            }
          );
        }
      }
    );
  } catch (error) {
    console.error("Error checking or creating table:", error);
  }
}
