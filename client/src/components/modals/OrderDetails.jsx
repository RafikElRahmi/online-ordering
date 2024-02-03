import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axiosInstance from "../../config/axiosConfig";

function OrderDetails({ close, id, show }) {
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    axiosInstance.get(`orders/${id}`).then((res) => {
      setOrderData(res.data.products);
      console.log(res);
    });
    return;
  }, [id]);
  const handleDelete = async () => {
    // axiosInstance.delete(`/products/${id}`).then((res) => close());
  };

  return ReactDOM.createPortal(
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {orderData && orderData.length > 0 ? (
          <>
            {orderData.map((product) => {
              return <h1>me</h1>;
            })}
          </>
        ) : null}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>,
    document.body
  );
}

export default OrderDetails;
