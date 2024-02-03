import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';

function OrderHandler({ sendOrder, total }) {
  return (
    <>
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
  );
}

export default OrderHandler