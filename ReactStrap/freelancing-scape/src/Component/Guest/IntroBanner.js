import React from "react";
import * as Ioicons from "react-icons/io5";
import * as FAicons from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  InputGroup,
  InputGroupText,
  ListGroup,
  ListGroupItem,
  Badge,
} from "reactstrap";
function IntroBanner() {
  return (
    <Container fluid className="introBanner" tag={"section"}>
      <section id="banner-content">
        <Row className="banner-headline">
          <article>
            <h3>
              <strong style={{ fontWeight: "600", color: "#333" }}>
                Hire experts or be hired for any job, any time.
              </strong>
              <br />
              <span>
                Thousands of small businesses use{" "}
                <strong style={{ color: "#2a41e8" }}>Hireo</strong> to turn
                their ideas into reality.
              </span>
            </h3>
          </article>
        </Row>
        <Row id="small-searchbar">
          <Col>
            <InputGroup style={{ marginBottom: "2%" }}>
              <InputGroupText
                style={{
                  color: "white",
                  width: "50px",
                  paddingLeft: "15px",
                  backgroundColor: "#2A41E8",
                }}
              >
                <Ioicons.IoLocationSharp></Ioicons.IoLocationSharp>
              </InputGroupText>
              <Input placeholder="Location" type="text" style={{}} />
            </InputGroup>
            <InputGroup>
              <InputGroupText
                style={{
                  color: "white",
                  width: "50px",
                  paddingLeft: "15px",
                  backgroundColor: "#2A41E8",
                }}
              >
                <FAicons.FaSearch />
              </InputGroupText>
              <Input placeholder="Job Title" type="text" style={{}} />
            </InputGroup>

            <Button
              type="button"
              style={{ marginTop: "2%", backgroundColor: "#2A41E8" }}
            >
              Click Me
            </Button>
          </Col>
        </Row>
        <Row id="search-bar">
          <Col>
            <Badge
              id="badge1-color"
              className={"mb-2"}
              style={{ height: "30px", width: "100px", fontSize: "16px" }}
            >
              Where ?
            </Badge>
            <InputGroup style={{ height: "50px", marginRight: "0px",position:"relative" }}>
              <InputGroupText
                style={{
                  color: "white",
                  width: "50px",
                  paddingLeft: "15px",
                  backgroundColor: "#2A41E8",
                }}
              >
                <Ioicons.IoLocationSharp></Ioicons.IoLocationSharp>
              </InputGroupText>
              <Input
                placeholder="JobTitle"
                type="text"
                style={{ padding: "15px" }}
              />
            </InputGroup>
          </Col>
          <Col>
            <Badge
              className={"mb-2"}
              id="badge2-color"
              style={{ height: "30px", width: "auto", fontSize: "16px" }}
            >
              What Job You Want ?
            </Badge>
            <InputGroup
              style={{ height: "50px", position: "relative", right: "5%" }}
            >
              <Input
                type="text"
                style={{ padding: "15px" }}
                placeholder="Job Title"
              />
              <Button style={{ width: "50px", backgroundColor: "#2A41E8" }}>
                <FAicons.FaSearch />
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row id="job-count">
          <ListGroup horizontal style={{ display: "flex" }}>
            <ListGroupItem className="justify-content-between banner-list-item">
              <section className="count">1000</section>
              Jobs Posted
            </ListGroupItem>
            <ListGroupItem className="justify-content-between banner-list-item">
              <section className="count">1000</section>
              Task Posted
            </ListGroupItem>
            <ListGroupItem className="justify-content-between banner-list-item">
              <section className="count">1000</section>
              Freelancer
            </ListGroupItem>
          </ListGroup>
        </Row>
      </section>
    </Container>
  );
}
export default IntroBanner;
