import connection from "../lib/db.mjs";

function getAll(callback) {
  const sql = "SELECT * FROM `products`";
  connection.query(sql, async function (error, results) {
    callback(error, results);
  });
}
function getOne(id, callback) {
  const sql = "SELECT * FROM `products` WHERE id=?";
  connection.query(sql, [id], async function (error, results) {
    callback(error, results);
  });
}
function add(product, callback) {
  const sql = "INSERT INTO `products` SET ?";
  connection.query(sql, product, async function (error, results) {
    callback(error, results);
  });
}
function update(id,product, callback) {
  const sql = "UPDATE `products` SET name=?,price=? WHERE id=?";
  connection.query(
    sql,
    [product.name, product.price, id],
    async function (error, results) {
      callback(error, results);
    }
  );
}
function remove(id, callback) {
  const sql = "DELETE FROM `products` WHERE id = ?";
  connection.query(sql, [id], async function (error, results) {
    callback(error, results);
  });
}
const ProductModel = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
export default ProductModel;
