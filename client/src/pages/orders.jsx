import React from "react";
import AdminOrders from "../components/admin/adminOrders";
import { useAuth } from "../context/useAuth";
import UserOrders from "../components/user/UserOrders";

function Orders() {
  const { isAdmin } = useAuth();
  return <>{isAdmin ? <AdminOrders /> : <UserOrders />}</>;
}

export default Orders;
