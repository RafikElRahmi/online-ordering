import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import axiosInstance from "../config/axiosConfig";
import { getCookie } from "../utils/cookies";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

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
    return products.reduce(
      (prev, actual) => prev + actual.price * actual.quantity,
      0
    );
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
              <Card
                key={product.id}
                className="m-3 p-3"
                style={{ width: "100%" }}
              >
                <Row className="d-flex  align-items-center">
                  <Col className="col-4" as={"h4"}>
                    {product.name}
                  </Col>
                  <Col className="text-end col-2">
                    <InputGroup className="mb-3 d-flex ">
                      <Button
                        variant="outline-secondary fw-bold"
                        style={{ width: "40px" }}
                        onClick={() => handleClick("decrement", product.id)}
                      >
                        -
                      </Button>
                      <Form.Control
                        className="text-center"
                        style={ { maxWidth: "50px" } }
                        value={product.quantity}
                      ></Form.Control>
                      <Button
                        variant="outline-secondary fw-bold"
                        style={{ width: "40px" }}
                        onClick={() => handleClick("increment", product.id)}
                      >
                        +
                      </Button>
                    </InputGroup>
                  </Col>
                  <Col className="col-3 text-end" as={"h5"}>
                    {product.price * product.quantity} DT
                  </Col>
                  <Col className="col-3 px-2 d-flex justify-content-end">
                    <Button
                      onClick={() => handleRemove(product.id)}
                      variant="danger"
                    >
                      Remove from cart
                    </Button>
                  </Col>
                </Row>
              </Card>
            );
          })}
          <Row className=" d-flex justify-content-end">
            <Card className=" col-4 p-3 fs-3">
              <Row>
                <Col className="col-6 ">Total to pay :</Col>
                <Col className="col-6">{total}</Col>
              </Row>
            </Card>
          </Row>

          <Row className=" d-flex justify-content-end">
            <Button className="m-3 col-3" onClick={sendOrder}>
              Send Order
            </Button>
          </Row>
        </>
      ) : (
        <h2 className="text-center my-3">Add some products to the Cart!</h2>
      )}
    </Container>
  );
}

export default Cart;
