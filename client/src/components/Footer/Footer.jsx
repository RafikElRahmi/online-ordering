import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Contact Information</h5>
            <p>Address: tunis, Tunisia</p>
            <p>Email: rafikrahmi10@gmail.com</p>
            <p>Phone: +216 54 973 460</p>
          </Col>
          <Col md={6}>
            <h5>Follow Us</h5>
            <p>Stay connected on social media:</p>
            <a
              href="https://www.linkedin.com/in/rahmi-rafik/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" className="m-3" />
            </a>
            <a
              href="https://github.com/RafikElRahmi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" className="m-3" />
            </a>
          </Col>
        </Row>
      </Container>
      <div className="text-center py-3">
        <p>
          &copy; {new Date().getFullYear()} Online Ordering. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
