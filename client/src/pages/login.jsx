import React, { useRef, useState } from "react";
import { Container } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosInstance from "./../config/axiosConfig";
import { tokenization } from "../utils/cookies";
import { useNavigate } from 'react-router-dom';
function Login() {
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const username = useRef(null);
  const password = useRef(null);
  const handleLogin = () => {
    setUsernameError("");
    setPasswordError("");
    if (username.current.value.length >= 6) {
      if (password.current.value.length >= 6) {
        axiosInstance.post("/login", {
            username: username.current.value,
            password: password.current.value,
        }).then((res) => {
          tokenization(res)
          window.location.replace('/')
          })
          .catch((err) => console.log("err", err));
      } else {
        setPasswordError("passwond should contain at least 6 characters.");
      }
    } else {
      setUsernameError("username should contain at least 6 characters.");
    }
  };
  return (
    <Container>
      <div className="login-box box">
        <Form>
          <h1 className="box-title">Login</h1>
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

export default Login;
