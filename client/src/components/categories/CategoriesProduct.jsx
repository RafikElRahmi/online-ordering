import React from "react";
import { Card, Col, Row } from "react-bootstrap";

function CategoriesProduct({ categories, handleFilter, selectedId }) {
  return (
    <Row className="mt-4">
      <h3 className="text-center">Available categories</h3>
      {categories.length ? (
        <>
          {categories.map((category) => (
            <Col
              key={category.id}
              md={3}
              className="mb-3"
              onClick={() => handleFilter(category.id)}
            >
              <Card
                style={{ cursor: "pointer", height: "100%" }}
                className={`${
                  selectedId === category.id && "bg-primary text-white"
                }`}
              >
                <Card.Body className="d-flex text-break  align-items-center justify-content-center">
                  <Card.Title>{category.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </>
      ) : (
        <p>No available categories</p>
      )}
    </Row>
  );
}

export default CategoriesProduct;
