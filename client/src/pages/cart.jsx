import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axiosInstance from "../config/axiosConfig";
import { getCookie } from "../utils/cookies";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import OneCart from "../components/cart/oneCart";
import OrderHandler from "../components/cart/orderHandler";

function Cart() {
  const { setitems } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const cartProducts = JSON.parse(localStorage.getItem("products"));
    if (cartProducts) {
      setProducts(cartProducts);
    }
    setTotal(getTotal(cartProducts));
    return;
  }, []);
  const getTotal = (products) => {
    if (!products || products.length === 0) return 0;
    const Net = products.reduce(
      (prev, actual) => prev + actual.price * actual.quantity,
      0
    );
    if (Net >= 100) {
      return Net * 0.75
    } else {
      return Net
    }
  };
  const handleClick = (action, id) => {
    products.forEach((p) => {
      if (p.id === id) {
        if (action === "increment") {
          p.quantity += 1;
        } else if (action === "decrement") {
          if (p.quantity > 1) {
            p.quantity -= 1;
          }
        }
        localStorage.setItem("products", JSON.stringify(products));
        setProducts([...products], () => {});
      }
      setTotal(getTotal(products));
    });
  };
  const handleRemove = (id) => {
    let newList = products.filter((product) => product.id !== id);
    localStorage.setItem("products", JSON.stringify(newList));
    setProducts(newList);
    setTotal(getTotal(newList));
    setitems(newList.length);
  };
  const sendOrder = () => {
    const token = getCookie("token");
    const date = Date.now();
    axiosInstance
      .post(
        "/orders",
        { products, total, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        localStorage.removeItem("products");
        setProducts([]);
        setitems(0);
        navigate("/");
      });
  };
  return (
    <Container>
      <h1 className="text-center my-3">Shopping Cart</h1>
      {products.length ? (
        <>
          {products.map((product) => {
            return (
              <OneCart
                product={product}
                handleClick={handleClick}
                handleRemove={handleRemove}
              />
            );
          })}
          <OrderHandler sendOrder={sendOrder} total={total} />
        </>
      ) : (
        <h2 className="text-center my-3">Add some products to the Cart!</h2>
      )}
    </Container>
  );
}

export default Cart;
