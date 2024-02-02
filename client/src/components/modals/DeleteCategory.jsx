import ReactDOM from "react-dom";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import axiosInstance from "../../config/axiosConfig";

function DeleteCategory({ close, id, show }) {
  const handleDelete = async () => {
    axiosInstance.delete(`/categories/${id}`).then((res) => close());
  };

  return ReactDOM.createPortal(
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Deletion Box</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>You sure want to delete this Category!</p>
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

export default DeleteCategory;
