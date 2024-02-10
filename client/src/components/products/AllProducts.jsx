import React, { useEffect, useState } from "react";
import DeleteProduct from "../modals/DeleteProduct";
import UpdateProduct from "../modals/UpdateProduct";
import axiosInstance from "../../config/axiosConfig";
import { useAuth } from "../../context/useAuth";
import CreateProduct from "./../modals/CreateProduct";
import { Button, Col, Row } from "react-bootstrap";
import OneProduct from "./OneProduct";

function AllProducts({ selectId, relations }) {
    const [deletePM, setDeletePM] = useState(false);
    const [updatePM, setUpdatePM] = useState(false);
    const [createPM, setCreatePM] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [selectedProduct, setSelectedProduct] = useState({
        name: "",
        price: "",
    });
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState([]);
    const { isAdmin } = useAuth();
  useEffect(() => {
      setLoaded(false)
        axiosInstance
            .get("/products")
            .then((res) => {
                setProducts(res.data);
              setShowProducts(res.data);
              setLoaded(true);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, [deletePM, updatePM, createPM]);
    useEffect(() => {
        if (selectId !== 0) {
            const productIds = relations.map((ids) => {
                if (ids.category_id === selectId) return ids.product_id;
            });
            const productsToShow = products.filter((prod) => {
                return productIds.includes(prod.id);
            });
            setShowProducts(productsToShow);
        } else {
            setShowProducts(products);
        }
    }, [selectId]);
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
                id={selectedId}
                close={() => {
                    setSelectedId(null);
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
                        }}>
                        Create new product
                    </Button>
                )}
            </Col>
            {loaded && (
                <>
                    {showProducts.length ? (
                        showProducts.map((product) => (
                            <Col key={product.id} md={4} className="mb-4">
                                <OneProduct
                                    product={product}
                                    update={() => {
                                        setSelectedProduct(product);
                                        setSelectedId(product.id);
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
                </>
            )}
        </Row>
    );
}

export default AllProducts;
