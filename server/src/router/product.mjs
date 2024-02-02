import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/product.mjs";
const routerProducts = Router();

routerProducts.route("/products").get(getProducts).post(createProduct);
routerProducts.route("/products/:id").get(getProduct).put(updateProduct).delete(deleteProduct);
export default routerProducts;
