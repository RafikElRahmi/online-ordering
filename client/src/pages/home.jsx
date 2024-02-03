import React from "react";
import { Container} from "react-bootstrap";
import "../components/modals/modals.css";
import AllCategories from "../components/categories/AllCategories";
import AllProducts from "../components/products/AllProducts";

const Home = () => {
 

  return (
    <Container>
      <AllCategories />
      <AllProducts />
    </Container>
  );
};

export default Home;
