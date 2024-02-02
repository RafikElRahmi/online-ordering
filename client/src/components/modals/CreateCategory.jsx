import ReactDOM from "react-dom";
import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axiosInstance from "../../config/axiosConfig";

function CreateCategory({ close, show }) {
  const name = useRef("");

  const handleCreate = async () => {
    axiosInstance
      .post(`/categories/`, {
        name: name.current.value,
      })
      .then((res) => close());
  };

  return ReactDOM.createPortal(
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Create new Category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category name"
            ref={name}
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

export default CreateCategory;
