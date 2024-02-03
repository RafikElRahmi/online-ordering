import React from 'react'
import CartButton from '../cart/cartButton';
import { useAuth } from '../../context/useAuth';
import { Button, Card } from 'react-bootstrap';

function OneProduct({ product,update,ondelete }) {
  const { isAdmin, setitems } = useAuth();

  return (
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
              onClick={ondelete}
            >
              Delete
            </Button>
            <Button
              variant="primary"
              onClick={update}
            >
              Update
            </Button>
          </div>
        ) : (
          <CartButton product={product} items={setitems} />
        )}
      </Card.Body>
    </Card>
  );
}

export default OneProduct