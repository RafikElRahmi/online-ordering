import OrderModel from "../models/order.mjs";
import OrderedProductModel from "../models/orderedProducts.mjs";
import ProductModel from "../models/product.mjs";
import { decodeToken } from "../utils/token.mjs";

export async function getOrders(req, res, next) {
  try {
    OrderModel.getAll((err, result) => {
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
export async function getOrder(req, res, next) {
  try {
    const id = req.params.id;
    OrderModel.getOne(id, (err, result) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      } else if (result.length) {
        OrderedProductModel.getSome(id, (err, result) => {
          if (err) {
            return res.status(500).send("Internal Server Error");
          } else {
            let products = [];
            result.forEach((ele, _, arr) => {
              ProductModel.getOne(ele.product_id, (err, result) => {
                if (err) {
                  return res.status(500).send("Internal Server Error");
                } else {
                  ele.name = result[0].name;
                  products.push(ele);
                  if (products.length == arr.length) {
                    return res.status(200).send(products);
                  }
                }
              });
            });
          }
        });
      } else {
        return res.status(404).send("Not Found");
      }
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
export async function createOrder(req, res, next) {
  try {
    const OrderData = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";
    const tokenData = decodeToken(token);
    OrderModel.add(
      {
        client_id: tokenData.userId,
        total_price: OrderData.total,
        date: OrderData.date,
        status: "waiting",
      },
      (err, result) => {
        if (err) return res.status(500).send("Internal Server Error");
        else {
          OrderData.products.forEach((ele) => {
            OrderedProductModel.add(
              {
                order_id: result.insertId,
                price: ele.price,
                quantity: ele.quantity,
                product_id: ele.id,
              },
              (err, result) => {}
            );
          });
          return res.status(201).send("created");
        }
      }
    );
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
export async function updateOrder(req, res, next) {
  try {
    const id = req.params.id;
    const OrderData = req.body;
    OrderModel.update(id, OrderData.status, (err, result) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      } else if (result.affectedRows === 1) {
        return res.status(200).send("updated");
      } else {
        return res.status(404).send("Not Found");
      }
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
