import connection from "../lib/db.mjs";

function add(data, callback) {
  const sql = "INSERT INTO `products_to_categories` SET ?";
  connection.query(sql, data, async function (error, results) {
    callback(error, results);
  });
}
function remove(id, callback) {
  const sql = "DELETE FROM `products_to_categories` WHERE product_id = ?";
  connection.query(sql, [id], async function (error, results) {
    callback(error, results);
  });
}
function getSome(id, callback) {
  const sql = "SELECT * FROM `products_to_categories` WHERE product_id = ?";
  connection.query(sql, [id], async function (error, results) {
    callback(error, results);
  });
}
function getAll(callback) {
  const sql = "SELECT * FROM `products_to_categories` ";
  connection.query(sql, async function (error, results) {
    callback(error, results);
  });
}
const ProductCategoryModel = {
  add,
  getAll,
  getSome,
  remove,
};
export default ProductCategoryModel;
