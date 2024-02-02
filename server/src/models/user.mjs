import connection from "../lib/db.mjs";
export  function getUserById(userId, callback) {
  const sql = "SELECT * FROM `users` WHERE id = ?";
  connection.query(sql, [userId], async function (error, results) {
    callback(error, results[0]);
  });
}
export  function getUserByUsername(username, callback) {
  const sql = "SELECT * FROM `users` WHERE username = ?";
  connection.query(sql, [username], async function (error, results) {
    callback(error, results[0]);
  });
}

export function createUser(newUser, callback) {
  const sql = "INSERT INTO `users` SET ?";
  connection.query(sql, newUser, async function (error, results) {
    callback(error, results);
  });
}
