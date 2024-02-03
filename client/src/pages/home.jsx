import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axiosInstance from "./../config/axiosConfig";
import { useAuth } from "../context/useAuth";
import DeleteProduct from "../components/modals/DeleteProduct";
import "../components/modals/modals.css";
import UpdateProduct from "../components/modals/UpdateProduct";
import CreateProduct from "../components/modals/CreateProduct";
import CreateCategory from "../components/modals/CreateCategory";
import DeleteCategory from "../components/modals/DeleteCategory";
import UpdateCategory from "../components/modals/UpdateCategory";
import CartButton from "../components/Button/cartButton";

const Home = () => {
  const [deletePM, setDeletePM] = useState(false);
  const [updatePM, setUpdatePM] = useState(false);
  const [createPM, setCreatePM] = useState(false);
  const [deleteCM, setDeleteCM] = useState(false);
  const [updateCM, setUpdateCM] = useState(false);
  const [createCM, setCreateCM] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "",
  });
  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    price: "",
  });
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
  }, [selectedId, selectedProduct, selectedCategory]);

  return (
    <>
      <DeleteProduct
        show={deletePM}
        id={selectedId}
        close={() => {
          setSelectedId(null);
          setDeletePM(false);
        }}
      />
      <DeleteCategory
        show={deleteCM}
        id={selectedId}
        close={() => {
          setSelectedId(null);
          setDeleteCM(false);
        }}
      />
      <UpdateProduct
        show={updatePM}
        product={selectedProduct}
        close={() => {
          setSelectedProduct({
            name: "",
            price: "",
          });
          setUpdatePM(false);
        }}
      />
      <UpdateCategory
        show={updateCM}
        category={selectedCategory}
        close={() => {
          setSelectedCategory({
            name: "",
          });
          setUpdateCM(false);
        }}
      />
      <CreateProduct
        show={createPM}
        close={() => {
          setSelectedProduct({
            name: "",
            price: "",
          });
          setCreatePM(false);
        }}
      />
      <CreateCategory
        show={createCM}
        close={() => {
          setSelectedCategory({
            name: "",
          });
          setCreateCM(false);
        }}
      />
      <Container>
        <Row className="mt-4">
          <h3 className="text-center">Categories</h3>
          <Col xs={12} md={12} className="pos-end">
            {isAdmin && (
              <Button
                variant="success"
                className="my-3 "
                onClick={() => {
                  setCreateCM(true);
                }}
              >
                Create new category
              </Button>
            )}
          </Col>
          {categories.length ? (
            categories.map((category) => (
              <Col key={category.id} md={3} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{category.name}</Card.Title>
                    <Card.Text className="pos-end"></Card.Text>
                    {isAdmin ? (
                      <div className="button-container">
                        <Button
                          variant="danger"
                          onClick={() => {
                            setDeleteCM(true);
                            setSelectedId(category.id);
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setSelectedCategory(category);
                            setUpdateCM(true);
                          }}
                        >
                          Update
                        </Button>
                      </div>
                    ) : (
                      <Button variant="primary">Add to Cart</Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No categories</p>
          )}
        </Row>

        <Row className="mt-4">
          <h3 className="text-center">Products</h3>
          <Col xs={12} md={12} className="pos-end">
            {isAdmin && (
              <Button
                variant="success"
                className="my-3 "
                onClick={() => {
                  setCreatePM(true);
                }}
              >
                Create new product
              </Button>
            )}
          </Col>
          {products.length ? (
            products.map((product) => (
              <Col key={product.id} md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="pos-end">
                      <span>{product.price}DT</span>
                    </Card.Text>
                    {isAdmin ? (
                      <div className="button-container">
                        <Button
                          variant="danger"
                          onClick={() => {
                            setSelectedId(product.id);
                            setDeletePM(true);
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setSelectedProduct(product);
                            setUpdatePM(true);
                          }}
                        >
                          Update
                        </Button>
                      </div>
                    ) : (
                      <CartButton product={product} />
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
    </>
  );
};

export default Home;
