import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import axiosInstance from "../../config/axiosConfig";
import { useAuth } from "../../context/useAuth";

function OrderDetails({ close, id, show }) {
  const {isAdmin}= useAuth()
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    axiosInstance.get(`orders/${id}`).then((res) => {
      setOrderData(res.data);
    });
    return;
  }, [id]);
  const handleOrder = async (action) => {
    axiosInstance
      .put(`/orders/${id}`, { status: action })
      .then((res) => close());
  };

  return ReactDOM.createPortal(
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "70vh", overflowY: "scroll" }}>
        {orderData && orderData.length > 0 ? (
          <>
            {orderData.map((product) => {
              return (
                <Card key={product.id} className="p-3 m-2">
                  <Row>
                    <Col className="col-6">{product.name}</Col>
                    <Col className="col-2 text-end">{product.quantity}</Col>
                    <Col className="col-4 text-end">
                      {product.quantity * product.price} DT
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </>
        ) : null}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        {isAdmin && <><Button variant="primary" onClick={() => handleOrder("waiting")}>
          waiting
        </Button>
        <Button variant="danger" onClick={() => handleOrder("delivered")}>
          delivered
        </Button>
        <Button variant="success" onClick={() => handleOrder("received")}>
          received
        </Button></>}
      </Modal.Footer>
    </Modal>,
    document.body
  );
}

export default OrderDetails;
