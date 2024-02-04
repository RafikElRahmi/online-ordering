import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

function OrderHandler({ sendOrder, total }) {
  return (
    <>
      <Row className=" d-flex justify-content-end">
        {total >= 75 && (
          <>
            <Row className=" d-flex justify-content-end my-2">
              <Card className=" col-4 p-3 fs-3">
                <Row>
                  <Col className="col-6 ">Total :</Col>
                  <Col className="col-6">{total / 0.75}DT</Col>
                </Row>
              </Card>
            </Row>
            <Row className=" d-flex justify-content-end my-2">
              <Card className=" col-4 p-3 fs-3">
                <Row>
                  <Col className="col-6 ">Discount :</Col>
                  <Col className="col-6">{total / 3}DT</Col>
                </Row>
              </Card>
            </Row>
          </>
        )}
        <Card className=" col-4 p-3 fs-3">
          <Row>
            <Col className="col-6 ">Net to pay :</Col>
            <Col className="col-6">{total}DT</Col>
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

export default OrderHandler;
