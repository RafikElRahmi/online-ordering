import connection from "../lib/db.mjs";

function getSome(id, callback) {
  const sql = "SELECT * FROM `ordredProducts` WHERE order_id=?";
  connection.query(sql, [id], async function (error, results) {
    callback(error, results);
  });
}
function add(ordredProduct, callback) {
  const sql = "INSERT INTO `ordredProducts` SET ?";
  connection.query(sql, ordredProduct, async function (error, results) {
    callback(error, results);
  });
}

const OrderedProductModel = {
  getSome,
  add,
};
export default OrderedProductModel;
