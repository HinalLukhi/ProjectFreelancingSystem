import React from "react";
import DashboardSideBar from "../common/DashboardSideBar";
import DashboardTopNav from "../common/DashboardTopNav";
import { Row, Col, Container,FormGroup,Input,InputGroup,Button,Label,FormText } from "reactstrap";
import * as Faicons from 'react-icons/fa'
function PostProject() {
  return (
    <React.Fragment>
      <Container fluid style={{ padding: "0px" }}>
        <DashboardTopNav />
        <Row>
          <Col id="sidebarul" style={{ color: "gray", margin: "0%" }} xs="2">
            <DashboardSideBar />
          </Col>
          <Col xs="10" id="form-col">
            <section id="postproject-form">
              <FormGroup floating>
                <Input
                  id="exampleEmail"
                  name="txtprojectname"
                  placeholder="Project Name"
                  type="text"
                />
                <Label for="exampleEmail">Project Name</Label>
              </FormGroup>
              <Row>
                <Col xs="6">
                  <Label>From</Label>
                  <Input type="date" />
                </Col>
                <Col xs="6">
                  <Label>To</Label>

                  <Input type="date" />
                </Col>
              </Row>
              <Row className="mt-4">
                <Label>Skills Required For Project</Label>
                <Col xs="6">
                  <InputGroup>
                    <Input type="text" placeholder="eg. Task Title" />
                    <Button
                      style={{ backgroundColor: "white", color: "#2A41E8" }}
                    >
                      <Faicons.FaPlus size={25} />
                    </Button>
                  </InputGroup>
                </Col>
                <Col xs="6">skills</Col>
              </Row>
              <Row className="mt-4">
                <Col xs="12">
                  <Label>Skills Required For Project</Label>
                  <Input
                    id="exampleText"
                    name="text"
                    type="textarea"
                    rows="5"
                  />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col xs="12">
                  <FormGroup>
                    <Label for="exampleFile">File</Label>
                    <Input id="exampleFile" name="file" type="file" />
                    <FormText>
                    Images or documents that might be helpful in describing your project
                    </FormText>
                  </FormGroup>
                </Col>
              </Row>
            </section>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default PostProject;
