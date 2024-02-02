import connection from "./db.mjs";

export default async function checkAndCreateTables() {
  try {
    connection.execute(
      "CREATE TABLE IF NOT EXISTS  users(id int AUTO_INCREMENT,username VARCHAR(64) UNIQUE, phone int, password VARCHAR(255),PRIMARY KEY (id) )"
    );
    connection.execute(
      "CREATE TABLE IF NOT EXISTS  sessions(id int AUTO_INCREMENT, isValid boolean DEFAULT true ,PRIMARY KEY (id) )"
    );
  } catch (error) {
    console.error("Error checking or creating table:", error);
  }
}
