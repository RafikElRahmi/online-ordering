import { Router } from "express";
const routerCategories = Router();

routerCategories.route("/categories").get().post();
routerCategories.route("/categories/:id").get().put().delete();
export default routerCategories;
