import React from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';

function OneCart({product,handleClick,handleRemove}) {
  return (
    <Card key={product.id} className="m-3 p-3" style={{ width: "100%" }}>
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
              style={{ maxWidth: "50px" }}
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
          <Button onClick={() => handleRemove(product.id)} variant="danger">
            Remove from cart
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default OneCart