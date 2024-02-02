import ReactDOM from "react-dom";
import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axiosInstance from "../../config/axiosConfig";

function CreateProduct({ close, show }) {
  const name = useRef("");
  const price = useRef("");

  const handleCreate = async () => {
    axiosInstance
      .post(`/products/`, {
        name: name.current.value,
        price: price.current.value,
      })
      .then((res) => close());
  };

  return ReactDOM.createPortal(
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Create new product</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            ref={name}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            ref={price}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="danger" onClick={handleCreate}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>,
    document.body
  );
}

export default CreateProduct;
