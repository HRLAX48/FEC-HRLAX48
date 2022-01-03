import React from "react";
import BagItem from "./BagItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function Summary({ bag }) {
  const subtotal = bag
    .reduce(
      (amount, item) => parseInt(item.salePrice || item.originalPrice) + amount,
      0
    )
    .toFixed(2);

  const totalPrice = (subtotal * (1 + 0.1025)).toFixed(2);

  return (
    <>
      <Row>
        <Col>
          <>{`Subtotal`}</>
        </Col>
        <Col md={4}>
          <>{`$${subtotal}`}</>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>{`Estimated Tax`}</div>
        </Col>
        <Col md={4}>
          <div>10.25%</div>
        </Col>
      </Row>
      <hr className="mt-3"></hr>
      <Row>
        <Col>
          <div>
            <b>{`Total`}</b>
          </div>
        </Col>
        <Col md={4}>
          <div>
            <b>{`$${totalPrice}`}</b>
          </div>
        </Col>
      </Row>
      <hr className="mt-3"></hr>
      <Button variant="outline-secondary" size="lg" style={{ width: "100%" }}>
        Checkout
      </Button>
    </>
  );
}