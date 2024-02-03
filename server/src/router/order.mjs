import { Router } from "express";
import { createOrder, getOrder, getOrders, updateOrder } from "../controller/order.mjs";

const routerOrders = Router();

routerOrders.route("/orders").get(getOrders).post(createOrder);
routerOrders.route("/orders/:id").get(getOrder).put(updateOrder);
export default routerOrders;
