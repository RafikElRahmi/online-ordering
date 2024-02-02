import connection from "../lib/db.mjs";

function getAll(callback) {
  const sql = "SELECT * FROM `categories`";
  connection.query(sql, async function (error, results) {
    callback(error, results);
  });
}
function getOne(id, callback) {
  const sql = "SELECT * FROM `categories` WHERE id=?";
  connection.query(sql, [id], async function (error, results) {
    callback(error, results);
  });
}
function add(category, callback) {
  const sql = "INSERT INTO `categories` SET ?";
  connection.query(sql, category, async function (error, results) {
    callback(error, results);
  });
}
function update(id, category, callback) {
  const sql = "UPDATE `categories` SET name=? WHERE id=?";
  connection.query(sql, [category.name, id], async function (error, results) {
    callback(error, results);
  });
}
function remove(id, callback) {
  const sql = "DELETE FROM `categories` WHERE id = ?";
  connection.query(sql, [id], async function (error, results) {
    callback(error, results);
  });
}
const CategoryModel = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
export default CategoryModel;
