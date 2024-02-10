import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Cart from "../pages/cart";
import Orders from "../pages/orders";
import PageNotFound from "../pages/page404";
const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/cart", element: <Cart /> },
    { path: "/orders", element: <Orders /> },
    { path: "*", element: <PageNotFound /> },
]);
export default router;
