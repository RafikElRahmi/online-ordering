import ProductModel from "../models/product.mjs";
import ProductCategoryModel from "../models/productCategory.mjs";

export async function getProducts(req, res, next) {
  try {
    ProductModel.getAll((err, result) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      } else if (result.length) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send("Not Found");
      }
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
export async function getProduct(req, res, next) {
  try {
    const id = req.params.id;
    ProductModel.getOne(id, (err, result) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      } else if (result.length) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send("Not Found");
      }
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
export async function createProduct(req, res, next) {
  try {
    const productData = req.body;
    ProductModel.add(
      { name: productData.name, price: productData.price },
      (err, result) => {
        if (err) return res.status(500).send("Internal Server Error");
        else if (result) {
          const insertValues = productData.categories.map((category) => {
            return { product_id: result.insertId, category_id: category.value };
          });
          insertValues.forEach((element) => {
            ProductCategoryModel.add(element, (err, result) => {
              if (err) return res.status(500).send("Internal Server Error");
            });
          });
          return res.status(201).send("created");
        }
      }
    );
  } catch (err) {
    return res.status(500).send("Internal Server Error5");
  }
}
export async function updateProduct(req, res, next) {
  try {
    const id = req.params.id;
    const productData = req.body;
    ProductModel.update(
      id,
      { name: productData.name, price: productData.price },
      (err, result) => {
        if (err) {
          return res.status(500).send("Internal Server Error");
        } else if (result.affectedRows === 1) {
          ProductCategoryModel.remove(id, (err, result) => {
            if (err) {
              return res.status(500).send("Internal Server Error");
            } else {
              const insertValues = productData.categories.map((category) => {
                return {
                  product_id: id,
                  category_id: category.value,
                };
              });
              insertValues.forEach((element) => {
                ProductCategoryModel.add(element, (err, result) => {
                  if (err) return res.status(500).send("Internal Server Error");
                  else {
                    if (
                      element.category_id ===
                      insertValues[insertValues.length - 1].category_id
                    ) {
                      return res.status(200).send("updated");
                    }
                  }
                });
              });
            }
          });
        } else {
          return res.status(404).send("Not Found");
        }
      }
    );
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
export async function deleteProduct(req, res, next) {
  try {
    const id = req.params.id;
    ProductModel.remove(id, (err, result) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      } else {
        return res.status(200).send("deleted");
      }
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
