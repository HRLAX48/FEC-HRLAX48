import React from "react";
import SizeDropdown from "./SizeDropdown";
import QuantityDropdown from "./QuantityDropdown";
import { v4 as uuidv4 } from "uuid";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useStateValue } from "./store/StateProvider";

export default function Dropdowns({ darkTheme }) {
  const [{ selected }, dispatch] = useStateValue();

  return (
    <>
      <Container fluid>
        <Row className="pt-3">
          <Col className="col-7 pe-2" style={{ padding: "0px", margin: "0px" }}>
            <DropdownButton
              id="dropdown-basic-button"
              variant={darkTheme ? "outline-light" : "outline-secondary"}
              title={selected.size || "Select Size"}
              disabled={selected.quantity === "Out Of Stock" ? true : false}
              size="large"
            >
              <SizeDropdown key={uuidv4()} darkTheme={darkTheme} />
            </DropdownButton>
          </Col>
          <Col style={{ padding: "0px", margin: "0px" }}>
            <DropdownButton
              id="dropdown-basic-button quantity"
              variant={darkTheme ? "outline-light" : "outline-secondary"}
              disabled={selected.disabled}
              title={selected.quantity || "-"}
              size="small"
            >
              <QuantityDropdown key={uuidv4()} darkTheme={darkTheme} />
            </DropdownButton>
          </Col>
        </Row>
      </Container>
    </>
  );
}
