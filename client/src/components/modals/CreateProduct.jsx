import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import axiosInstance from "../../config/axiosConfig";

function CreateProduct({ close, show }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };
  const name = useRef("");
  const price = useRef("");
  const handleCreate = async () => {
    axiosInstance
      .post(`/products/`, {
        name: name.current.value,
        price: price.current.value,
        categories: selectedOptions,
      })
      .then((res) => {
        close();
        location.reload();
      });
  };

  const handleOptions = (S, callback) => {
    axiosInstance.get("/options").then((res) => {
      callback(res.data);
    });
  };

  return ReactDOM.createPortal(
    <Modal show={show} onHide={close} centered>
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
        <AsyncSelect
          isMulti
          onChange={handleSelectChange}
          loadOptions={handleOptions}
          defaultOptions
          placeholder="Select Categories"
        />
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
