import connection from "../lib/db.mjs";

function deleteAndInsert(productId, categories, callback) {
  const deleteSql = "DELETE FROM 'products_to_categories' WHERE product_id=?";
  connection.query(
    deleteSql,
    [productId],
    function (deleteError, deleteResults) {
      if (deleteError) {
        callback(deleteError);
      } else {
        const insertSql = "INSERT INTO 'products_to_categories' SET ?";
        const insertValues = categories.map((category) => {
          return { product_id: productId, category_id: category.value };
        });
        connection.query(
          insertSql,
          insertValues,
          function (insertError, insertResults) {
            callback(insertError, insertResults);
          }
        );
      }
    }
  );
}
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
function getAll( callback) {
  const sql = "SELECT * FROM `products_to_categories` ";
  connection.query(sql, async function (error, results) {
    callback(error, results);
  });
}
const ProductCategoryModel = {
  deleteAndInsert,
  add,
  getAll,
  remove,
};
export default ProductCategoryModel;
