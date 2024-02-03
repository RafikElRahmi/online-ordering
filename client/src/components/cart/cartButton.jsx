import React from "react";
import { Button } from "react-bootstrap";

function CartButton({ product, items }) {
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
    <Button variant="primary" onClick={handleCart}>
      Add to cart
    </Button>
  );
}

export default CartButton;
