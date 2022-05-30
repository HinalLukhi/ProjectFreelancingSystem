import React from "react";
import {
  Container,
  Col,
  Row,
  InputGroup,
  InputGroupText,
  Input,
  Button,
  Label,
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  List,
  ListInlineItem,
} from "reactstrap";
import * as FAicons from "react-icons/fa";
import * as Aiicons from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function TaskList() {
  const navigate = useNavigate();
  const goToTaskDesc = () => {
    navigate('taskdescription');
  }
  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col xs="5"></Col>
          <Col xs="7">
            <InputGroup>
              <Input placeholder="Task Name" />
              <InputGroupText style={{ backgroundColor: "white" }}>
                <FAicons.FaSearchLocation size={25} color="gray" />
              </InputGroupText>
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-3">
          <Card>
            <CardBody>
              <Row>
                {" "}
                <Col xs="9">
                  <CardTitle tag="h5">
                    Need An Login Page With Login Functionality
                  </CardTitle>
                  <CardSubtitle className="mb-2 text-muted lead" tag="h6">
                    <List type="inline">
                      <ListInlineItem className="mt-2">
                        <Aiicons.AiOutlineCalendar />
                        <span style={{ fontSize: "18px" }}>19 Deceber</span>
                      </ListInlineItem>
                    </List>
                  </CardSubtitle>
                  <CardText>
                    Excellent programmer - fully carried out my project in a
                    very professional manner.
                  </CardText>
                  <section
                    className="inline mt-3"
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <span className="skill-badge" style={{ width: "100px" }}>
                      css
                    </span>
                    <span className="skill-badge" style={{ width: "100px" }}>
                      css
                    </span>{" "}
                    <span className="skill-badge" style={{ width: "100px" }}>
                      css
                    </span>
                  </section>
                </Col>
                <Col xs="3" className="mt-4">
                  <span className="lead mb-5" style={{ margin: "32%" }}>
                    1000$-1500$
                  </span>
                  <Button
                    color="primary"
                    className="mt-3"
                    style={{ width: "100%" }} 
                    onClick={goToTaskDesc}
                    >
                    Bid Now
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default TaskList;
