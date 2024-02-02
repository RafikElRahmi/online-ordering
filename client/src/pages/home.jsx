import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

// Dummy data for categories and products
const categories = ["Category 1", "Category 2", "Category 3"];
const products = [
  { id: 1, name: "Product 1", price: 10.99 },
  { id: 2, name: "Product 2", price: 19.99 },
  { id: 3, name: "Product 3", price: 8.99 },
  // Add more products as needed
];

// Home component
const Home = () => {
  return (
    <Container>
      <h1 className="mt-3">Welcome to KREATEK.TN Online Ordering</h1>

      {/* Display categories */}
      <Row className="mt-4">
        <h3>Categories</h3>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      </Row>

      {/* Display list of products */}
      <Row className="mt-4">
        <h3>Products</h3>
        {products.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: {product.price} DT</Card.Text>
                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
