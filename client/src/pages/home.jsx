import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axiosInstance from "./../config/axiosConfig";
import { useAuth } from "../context/useAuth";
import DeleteProduct from "../components/modals/DeleteProduct";

const Home = () => {
  // const [deletePM, setDeletePM] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { isAdmin } = useAuth();
  useEffect(() => {
    axiosInstance
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((error) => console.error("Error fetching categories:", error));

    axiosInstance
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <Container>
      <DeleteProduct />
      <DeleteProduct />
      <DeleteProduct />
      <DeleteProduct />
      <DeleteProduct />
      <DeleteProduct />
      <DeleteProduct />
      <DeleteProduct />
      <DeleteProduct />
      <DeleteProduct />
      <DeleteProduct />
      <DeleteProduct />
      <DeleteProduct />
      <DeleteProduct />
      <DeleteProduct />
      <Row className="mt-4">
        <h3>Categories</h3>
        <ul>
          {categories.length ? (
            categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))
          ) : (
            <p>No products</p>
          )}
        </ul>
      </Row>

      <Row className="mt-4">
        <h3>Products</h3>
        {products.length ? (
          products.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Price: {product.price} DT</Card.Text>
                  {isAdmin ? (
                    <div className="button-container">
                      <Button variant="danger">Delete</Button>
                      <Button variant="success">Update</Button>
                    </div>
                  ) : (
                    <Button variant="primary">Add to Cart</Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No products</p>
        )}
      </Row>
    </Container>
  );
};

export default Home;
