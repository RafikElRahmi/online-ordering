import React from "react";
import CartButton from "../cart/cartButton";
import { useAuth } from "../../context/useAuth";
import { Button, Card } from "react-bootstrap";

function OneProduct({ product, update, ondelete }) {
    const { isAdmin, setitems } = useAuth();

    return (
        <Card style={{ height: "100%" }}>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
            </Card.Body>
            <Card.Footer
                className="border-top-0"
                style={{ backgroundColor: "white" }}>
                <Card.Text className="pos-end fs-5 fw-bold">
                    <span>{product.price}DT</span>
                </Card.Text>
                {isAdmin ? (
                    <div className="button-container">
                        <Button variant="danger" onClick={ondelete}>
                            Delete
                        </Button>
                        <Button variant="primary" onClick={update}>
                            Update
                        </Button>
                    </div>
                ) : (
                    <CartButton
                        product={product}
                        items={setitems}
                        style={{ bottom: "0" }}
                    />
                )}
            </Card.Footer>
        </Card>
    );
}

export default OneProduct;
