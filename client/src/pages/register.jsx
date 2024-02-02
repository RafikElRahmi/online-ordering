import React, { useRef, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { tokenization } from "../utils/cookies";

function Register() {
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const username = useRef(null);
  const phone = useRef(null);
  const password = useRef(null);
  const handleLogin = () => {
    setUsernameError("");
    setPhoneError("");
    setPasswordError("");
    if (username.current.value.length >= 6) {
      if (phone.current.value >= 10000000 && phone.current.value < 100000000) {
        if (password.current.value.length >= 6) {
          axiosInstance
            .post("/register", {
              username: username.current.value,
              phone: phone.current.value,
              password: password.current.value,
            })
            .then((res) => {
              tokenization(res);
              window.location.replace("/");
            })
            .catch((err) => console.log("err", err));
        } else {
          setPasswordError("passwond should contain at least 6 characters.");
        }
      } else {
        setPhoneError("phone number should be 8 numbers.");
      }
    } else {
      setUsernameError("username should contain at least 6 characters.");
    }
  };
  return (
    <Container>
      <div className="login-box box">
        <Form>
          <h1 className="box-title">Register</h1>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              ref={username}
            />
            {usernameError.length > 0 && (
              <Form.Text className="text-muted">{usernameError}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your phone number"
              ref={phone}
            />
            {phoneError.length > 0 && (
              <Form.Text className="text-muted">{phoneError}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={password}
            />
            {passwordError.length > 0 && (
              <Form.Text className="text-muted">{passwordError}</Form.Text>
            )}
          </Form.Group>
          <Button variant="primary" onClick={handleLogin}>
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Register;
