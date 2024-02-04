import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../components/modals/modals.css";
import AllCategories from "../components/categories/AllCategories";
import AllProducts from "../components/products/AllProducts";
import { useAuth } from "../context/useAuth";
import CategoriesProduct from "../components/categories/CategoriesProduct";
import axiosInstance from "../config/axiosConfig";

const Home = () => {
  const { isAdmin } = useAuth();
  const [categories, setCategories] = useState([]);
  const [relations, setRelations] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  useEffect(() => {
    axiosInstance
      .get("/availablecategories")
      .then((res) => {
        setCategories(res.data.categories);
        setRelations(res.data.relations);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleFilter = (id) => {
    if (id === selectedId) {
      setSelectedId(0);
    } else {
      setSelectedId(id);
    }
  };
  return (
    <Container>
      {isAdmin && <AllCategories />}
      <CategoriesProduct
        selectedId={selectedId}
        categories={categories}
        handleFilter={handleFilter}
      />
      <AllProducts relations={relations} selectId={selectedId} />
    </Container>
  );
};

export default Home;
