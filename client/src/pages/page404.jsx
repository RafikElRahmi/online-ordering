import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate =useNavigate()
  return (
      <Container style={{minHeight:"80vh"}}>
          <Card className='p-4 m-5'>
              <Card.Title as={'h1'} className='text-center'>Error 404</Card.Title>
              <Card.Body>
                  <h3 className="text-center">Page Not Found!</h3>
                  <p className='text-center'>Sorry, the page you are looking for</p>
              </Card.Body>
              <Card.Footer style={{width:'100%'}} className='d-flex justify-content-end'>
                  <Button variant='primary' className='p-1 m-2' onClick={()=>navigate('/')}>back to home page</Button>
              </Card.Footer>
          </Card>
    </Container>
  )
}

export default PageNotFound