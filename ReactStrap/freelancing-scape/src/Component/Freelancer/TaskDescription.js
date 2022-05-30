import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Container,
 FormGroup,
 Label,
 Input,
  Button,
} from "reactstrap";
import avatar from "../../Images/user-avatar-small-02.jpg";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";
import * as RiIcons from "react-icons/ri";

function TaskDescription() {
  return (
    <div>
      <Container fluid>
        <Row id="single-task">
          <Col id="single-task-name" xs="6">
            <h3>NeedLogin form with registration page</h3>
            <h4 className="text-muted">ProjectName</h4>
          </Col>
          <Col xs="6">hello</Col>
        </Row>
        <Row>
          <Col xs="6" id="free-aboutme">
            <h3 style={{ fontWeight: "400", marginBottom: "3%" }}>
              Task Description
            </h3>
            <p style={{ lineHeight: "35px", textAlign: "left" }}>
              Leverage agile frameworks to provide a robust synopsis for high
              level overviews. Iterative approaches to corporate strategy foster
              collaborative thinking to further the overall value proposition.
              Organically grow the holistic world view of disruptive innovation
              via workplace diversity and empowerment. Capitalize on low hanging
              fruit to identify a ballpark value added activity to beta test.
              Override the digital divide with additional clickthroughs from
              DevOps. Nanotechnology immersion along the information highway
              will close the loop on focusing solely on the bottom line.
            </p>
            <section id="free-work-exp">
              <h3 style={{ fontWeight: "400", marginBottom: "3%" }}>
                Attachments
              </h3>
              <section id="attachment-span">
                <RiIcons.RiAttachmentLine size={30} />
              </section>
            </section>
            <section className="mt-4">
              <h3 style={{ fontWeight: "400", marginBottom: "3%" }}>Skills</h3>
              <article style={{ display: "flex", flexWrap: "wrap" }}>
                <span className="skill-badge" style={{ width: "100px" }}>
                  css
                </span>
                <span className="skill-badge" style={{ width: "100px" }}>
                  css
                </span>
                <span className="skill-badge" style={{ width: "100px" }}>
                  css
                </span>
              </article>
            </section>
          </Col>
          <Col id="free-job-details">
            <Row id="days-left">6 Days Left</Row>
            <Row id="budget" className="mt-2">
              1000$ - 2000$
            </Row>
            <Row id="bid-form" className="mt-2">
              <section id="bid-header">
                <h4 className="text-muted">Bid On This Task!</h4>
              </section>
              <article id="bid-controls" >
                <FormGroup style={{backgroundColor:""}}>
                   <h5><span className="text-muted">Set You'r Minimal</span> Rate</h5>
                  <Label for="exampleRange">Range</Label>
                  <Input id="exampleRange" name="range" type="range"/>
                </FormGroup>
                <h5><span className="text-muted">Set You'r </span> delivery time</h5>

              </article>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TaskDescription;
