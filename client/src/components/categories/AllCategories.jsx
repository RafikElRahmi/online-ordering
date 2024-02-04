import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import axiosInstance from "../../config/axiosConfig";
import DeleteCategory from "./../modals/DeleteCategory";
import UpdateCategory from "./../modals/UpdateCategory";
import CreateCategory from "./../modals/CreateCategory";
import OneCategory from "./OneCategory";

function AllCategories() {
  const [deleteCM, setDeleteCM] = useState(false);
  const [updateCM, setUpdateCM] = useState(false);
  const [createCM, setCreateCM] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, [selectedId, selectedCategory]);
  return (
    <Row className="mt-4">
      <DeleteCategory
        show={deleteCM}
        id={selectedId}
        close={() => {
          setSelectedId(null);
          setDeleteCM(false);
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
      <CreateCategory
        show={createCM}
        close={() => {
          setSelectedCategory({
            name: "",
          });
          setCreateCM(false);
        }}
      />
      <h3 className="text-center">Categories</h3>
      <Col xs={12} md={12} className="pos-end">
        <Button
          variant="success"
          className="my-3 "
          onClick={() => {
            setCreateCM(true);
          }}
        >
          Create new category
        </Button>
      </Col>
      {categories.length ? (
        categories.map((category) => (
          <Col key={category.id} md={4} className="mb-4">
            <OneCategory
              ondelete={() => {
                setDeleteCM(true);
                setSelectedId(category.id);
              }}
              onupdate={() => {
                setSelectedCategory(category);
                setUpdateCM(true);
              }}
              category={category}
            />
          </Col>
        ))
      ) : (
        <p>No categories</p>
      )}
    </Row>
  );
}

export default AllCategories;
