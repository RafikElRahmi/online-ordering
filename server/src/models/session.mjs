import connection from "../lib/db.mjs";
export function getSessionById(sessionId, callback) {
  const sql = "SELECT * FROM `sessions` WHERE id = ?";
  connection.query(sql, [sessionId], async function (error, results) {
    callback(error, results[0]);
  });
}
export function invalidateSession(sessionId, callback) {
  const sql = "UPDATE `sessions` SET isValid=? WHERE id = ?";
  connection.query(sql, [false, username], async function (error, results) {
    callback(error, results[0]);
  });
}

export function createSession(callback) {
 const sql = "INSERT INTO `sessions` SET isValid = true"; 
  connection.query(sql,  async function (error, results) {
    callback(error, results);
  });
}
