import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../../context/useAuth';

function OneCategory({ category, onupdate, ondelete }) {
  const { isAdmin } = useAuth();
    
  return (
    <Card>
      <Card.Body>
        <Card.Title>{category.name}</Card.Title>
        <Card.Text className="pos-end"></Card.Text>
        {isAdmin ? (
          <div className="button-container">
            <Button variant="danger" onClick={ondelete}>
              Delete
            </Button>
            <Button variant="primary" onClick={onupdate}>
              Update
            </Button>
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
}

export default OneCategory