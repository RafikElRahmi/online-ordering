import { Router } from "express";
import { createCategory, deleteCategory, getAvailableCategories, getCategories, getCategory, getOptions, updateCategory } from "../controller/category.mjs";
const routerCategories = Router();

routerCategories.route("/categories").get(getCategories).post(createCategory);
routerCategories.route("/options").get(getOptions)
routerCategories.route("/availablecategories").get(getAvailableCategories);
routerCategories.route("/categories/:id").get(getCategory).put(updateCategory).delete(deleteCategory);
export default routerCategories;
