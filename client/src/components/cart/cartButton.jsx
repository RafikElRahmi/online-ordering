import React, { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from 'react-router-dom';

function CartButton({ product, items }) {
  const navigate = useNavigate()
  const { isLogged } = useAuth();
  const [logged, setLogged] = useState(true);
   useEffect(() => {
     isLogged().then((value) => {
       setLogged(value);
     });
   }, []);
  
  const handleCart = () => {
    product.quantity = 1;
    const productsCart = localStorage.getItem("products");
    if (productsCart) {
      const parsedProducts = JSON.parse(productsCart);
      const productExist = parsedProducts.find(
        (parsedProduct) => parsedProduct.name === product.name
      );
      if (!productExist) {
        items(parsedProducts.length+1);
        localStorage.setItem(
          "products",
          JSON.stringify([...parsedProducts, product])
        );
      }
    } else {
      localStorage.setItem("products", JSON.stringify([product]));
    }
  };
  return (
    <Row className="d-flex  justify-content-end">
      {logged ? (
        <Button
          variant="primary"
          style={{ width: "150px" }}
          className=" mx-2"
          onClick={handleCart}
        >
          Add to cart
        </Button>
      ) : (
        <Button
          variant="primary"
          style={{ width: "150px" }}
          className=" mx-2"
          onClick={()=>{navigate('/login')}}
        >
          Add to cart
        </Button>
      )}
    </Row>
  );
}

export default CartButton;
