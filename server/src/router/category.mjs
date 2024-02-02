import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controller/category.mjs";
const routerCategories = Router();

routerCategories.route("/categories").get(getCategories).post(createCategory);
routerCategories.route("/categories/:id").get(getCategory).put(updateCategory).delete(deleteCategory);
export default routerCategories;
