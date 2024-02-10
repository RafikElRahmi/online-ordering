import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axiosInstance from "./../../config/axiosConfig";
import OrderDetails from "./../modals/OrderDetails";
import UserDetails from "./../user/UserDetails";
import sortingData from "./../../utils/sortingOrders";
import { getCookie } from "../../utils/cookies";

function UserOrders() {
    const [orders, setOrders] = useState([]);
    const [detailsM, setDetailsM] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const variants = {
        waiting: "primary",
        received: "success",
        delivered: "danger",
    };
    useEffect(() => {
        setLoaded(false);
        const token = getCookie("token");
        axiosInstance
            .get("userorders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setOrders(sortingData(res.data));
                setLoaded(true);
            });
    }, [selectedId]);
    return (
        <Container>
            <OrderDetails
                show={detailsM}
                id={selectedId}
                close={() => {
                    setDetailsM(false);
                    setSelectedId(null);
                }}
            />
            <h1 className="text-center my-3">Orders</h1>
            {loaded && (
                <>
                    {orders.length ? (
                        <>
                            {orders.map((order) => {
                                return (
                                    <Card
                                        key={order.id}
                                        className="m-3 p-3"
                                        style={{ width: "100%" }}>
                                        <Row className="d-flex  align-items-center">
                                            <UserDetails id={order.client_id} />
                                            <Col className="col-3" as={"h5"}>
                                                {new Date(
                                                    order.date
                                                ).toLocaleString()}
                                            </Col>
                                            <Col className="col-2" as={"h4"}>
                                                {order.total_price}
                                            </Col>
                                            <Col
                                                className={`col-1.5 text-${
                                                    variants[order.status]
                                                }`}
                                                as={"h4"}>
                                                {order.status}
                                            </Col>
                                            <Col className="col-1.5" as={"h4"}>
                                                <Button
                                                    variant="primary"
                                                    onClick={() => {
                                                        setDetailsM(true);
                                                        setSelectedId(order.id);
                                                    }}>
                                                    View more
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                );
                            })}
                        </>
                    ) : (
                        <h2 className="text-center my-3">
                            There is no order yet!
                        </h2>
                    )}
                </>
            )}
        </Container>
    );
}

export default UserOrders;
