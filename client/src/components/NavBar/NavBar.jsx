import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./NavBar.css";
import { useAuth } from "../../context/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
    const { items } = useAuth();
    const [logged, setLogged] = useState(true);
    const { isLogged, logout, isAdmin } = useAuth();
    useEffect(() => {
        isLogged().then((value) => {
            setLogged(value);
        });
    }, []);
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg">
            <Container className="d-flex">
                <Navbar.Brand href="/">Online Ordering</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="navbarScroll" style={{flexGrow:'0'}}>
                    <Nav
                        variant="underline"
                        defaultActiveKey="/home"
                        style={{ maxHeight: "150px" }}
                        navbarScroll>
                        <Nav.Item>
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>
                        {logged ? (
                            <>
                                <Nav.Item>
                                    <Nav.Link href="/orders">orders</Nav.Link>
                                </Nav.Item>
                                {!isAdmin && (
                                    <Nav.Item>
                                        <Nav.Link
                                            href="/cart"
                                            style={{ position: "relative" }}>
                                            <FontAwesomeIcon
                                                icon={faCartShopping}
                                                size="1x"
                                                className="mx-3"
                                            />
                                            <span className="notifcation">
                                                {items}
                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>
                                )}
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
                                    <Nav.Link href="/register">
                                        Register
                                    </Nav.Link>
                                </Nav.Item>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
