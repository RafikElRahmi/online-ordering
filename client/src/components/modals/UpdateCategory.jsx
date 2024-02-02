import ReactDOM from "react-dom";
import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axiosInstance from "../../config/axiosConfig";

function UpdateCategory({ close, category, show }) {
  const name = useRef("");

  const handleUpdate = async () => {
    axiosInstance
      .put(`/categories/${category.id}`, {
        name: name.current.value,
      })
      .then((res) => close());
  };

  return ReactDOM.createPortal(
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Update category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            ref={name}
            defaultValue={category.name}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="danger" onClick={handleUpdate}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>,
    document.body
  );
}

export default UpdateCategory;
