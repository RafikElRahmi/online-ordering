import React, { useEffect, useState } from "react";
import DeleteProduct from "../modals/DeleteProduct";
import UpdateProduct from "../modals/UpdateProduct";
import axiosInstance from "../../config/axiosConfig";
import { useAuth } from "../../context/useAuth";
import CreateProduct from "./../modals/CreateProduct";
import { Button, Col, Row } from "react-bootstrap";
import OneProduct from "./OneProduct";

function AllProducts() {
  const [deletePM, setDeletePM] = useState(false);
  const [updatePM, setUpdatePM] = useState(false);
  const [createPM, setCreatePM] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    price: "",
  });
  const [products, setProducts] = useState([]);
  const { isAdmin } = useAuth();
  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [selectedId, selectedProduct]);
  return (
    <Row className="mt-4">
      <DeleteProduct
        show={deletePM}
        id={selectedId}
        close={() => {
          setSelectedId(null);
          setDeletePM(false);
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
            <OneProduct
              product={product}
              update={() => {
                setSelectedProduct(product);
                setUpdatePM(true);
              }}
              ondelete={() => {
                setSelectedId(product.id);
                setDeletePM(true);
              }}
            />
          </Col>
        ))
      ) : (
        <p>No products</p>
      )}
    </Row>
  );
}

export default AllProducts;
