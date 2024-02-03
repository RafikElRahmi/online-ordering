import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import axiosInstance from "../../config/axiosConfig";

function UserDetails({ id }) {
  const [user, setUser] = useState({
    name: "",
    phone: "",
  });
  useEffect(() => {
    axiosInstance.get(`/user/${id}`).then((res) => setUser(res.data));
  }, []);
  return (
    <>
      <Col className="col-2" as={"h5"}>
        {user.name}
      </Col>
      <Col className="col-2" as={"h5"}>
        (+216){user.phone}
      </Col>
    </>
  );
}

export default UserDetails;
