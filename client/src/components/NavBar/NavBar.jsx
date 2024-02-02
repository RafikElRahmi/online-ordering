import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap"
import "./NavBar.css"
import { useAuth } from "../../context/useAuth";

function NavBar() {
  const [logged, setLogged] = useState(true);
  const { isLogged, logout } = useAuth()
  console.log(logged)
  useEffect(() => {
    isLogged().then((value) => {
      setLogged(value);
    })
  }, [])
    return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Online Ordering</Navbar.Brand>
          <Nav variant="underline" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>

            {logged ? (
              <>
                <Nav.Item>
                  <Nav.Link onClick={logout}>logout</Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/register">Register</Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    );
}

export default NavBar;
