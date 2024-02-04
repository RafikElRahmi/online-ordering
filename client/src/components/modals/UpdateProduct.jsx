import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axiosInstance from "../../config/axiosConfig";
import  AsyncSelect  from 'react-select/async';

function UpdateProduct({ close, product, show }) {
   const [selectedOptions, setSelectedOptions] = useState([]);

   const handleSelectChange = (selected) => {
     setSelectedOptions(selected);
   };
  const name = useRef("");
  const price = useRef("");

  const handleUpdate = async () => {
    axiosInstance
      .put(`/products/${product.id}`, {
        name: name.current.value,
        price: price.current.value,
        categories: selectedOptions,
      })
      .then((res) => close());
  };
  const handleOptions = (S, callback) => {
    axiosInstance.get("/options").then((res) => {
      callback(res.data);
    });
  };
  return ReactDOM.createPortal(
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update product</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            ref={name}
            defaultValue={product.name}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            ref={price}
            defaultValue={product.price}
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
        <Button variant="danger" onClick={handleUpdate}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>,
    document.body
  );
}

export default UpdateProduct;
