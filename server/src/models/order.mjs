import connection from "../lib/db.mjs";

function getAll(callback) {
  const sql = "SELECT * FROM `orders`";
  connection.query(sql, async function (error, results) {
    callback(error, results);
  });
}
function getOne(id, callback) {
  const sql = "SELECT * FROM `orders` WHERE id=?";
  connection.query(sql, [id], async function (error, results) {
    callback(error, results);
  });
}
function add(order, callback) {
  const sql = "INSERT INTO `orders` SET ?";
  connection.query(sql, order, async function (error, results) {
    callback(error, results);
  });
}
function update(id, order, callback) {
  const sql = "UPDATE `orders` SET status=? WHERE id=?";
  connection.query(sql, [order.status, id], async function (error, results) {
    callback(error, results);
  });
}

const OrderModel = {
  getAll,
  getOne,
  add,
  update,
};
export default OrderModel;
