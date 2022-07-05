import React, { useState } from "react";
import {
  Container,
  Col,
  Row,
  InputGroup,
  Input,
  Button,
  Label,
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardSubtitle,
  Toast,
  ToastBody,
  ToastHeader,
  Spinner,
  FormGroup,
  ButtonGroup,
} from "reactstrap";
import DashboardSideBar from "../common/DashboardSideBar";
import DashboardTopNav from "../common/DashboardTopNav";
import * as Cgicons from "react-icons/cg";
import * as Biicons from "react-icons/bi";
import * as Mdicons from "react-icons/md";
import * as FAicons from "react-icons/fa";

function UserProfile() {
  const [userType, setuserType] = useState("Freelancer");
  const toggleClass = () => {
    if (userType == "Freelancer") {
      setuserType("Employer");
    } else {
      setuserType("Freelancer");
    }
  };
  const [range, setRange] = useState("");
  const handleBudgetRange = (e) => {
    setRange(e.target.value);
  };
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const addSkill = () => {
    console.log("hello");
    if (skill != "") {
      setSkills([...skills, skill]);
      setSkill("");
    }
    console.log(skills);
  };
  const deleteSkill = (index) => {
    const updatedSkills = skills.filter((element, id) => {
      return index != id;
    });
    setSkills(updatedSkills);
  };


  const hiddenFileInput = React.useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileUploaded = event;
    console.log(fileUploaded);
  };
  return (
    <React.Fragment>
      <React.Fragment>
        <Container fluid style={{ padding: "0px" }}>
          <DashboardSideBar pageType="freelancer" />
          <Row id="post-project-form">
            <DashboardTopNav />
            <Col xs="10" id="form-col" className="flex-box">
              <section id="postproject-form" style={{ padding: "5%" }}>
              {/* <section id="dashboardTitle" className="dashboardTitleText">
                Profile
                <Biicons.BiUserCircle size={30} style={{marginLeft:"1rem"}} color="blue"/>
              </section> */}
                <Row id="user-profile">
                  <Col md="2">
                    <input 
                    type="file" 
                    style={{display:'none'}}  
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    />
                    <img
                      src="../images/profile/OIP.png"
                      height={150}
                      width={150}
                      onClick={handleClick}
                    />
                  </Col>
                  <Col md="10">
                    <Row className="mt-2">
                      <Col md="6">
                        <FormGroup floating>
                          <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="First Name"
                            type="text"
                          />
                          <Label for="exampleEmail">First Name</Label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup floating>
                          <Input
                            id="examplePassword"
                            name="text"
                            placeholder="Password"
                            type="password"
                          />
                          <Label for="examplePassword">Last Name</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <ButtonGroup style={{ width: "100%", height: "90%" }}>
                          <Button
                            className="user-button-defualt"
                            id={userType == "Employer" ? "user-button" : ""}
                            onClick={toggleClass}
                            outline
                          >
                            <span className="hide-in-small-screen">
                              <Mdicons.MdOutlineBusinessCenter
                                style={{
                                  marginRight: "10px",
                                  marginBottom: "2px",
                                }}
                                size={25}
                              />
                            </span>
                            Employer
                          </Button>
                          <Button
                            id={userType == "Freelancer" ? "user-button" : ""}
                            className="user-button-defualt"
                            onClick={toggleClass}
                            outline
                          >
                            <span className="hide-in-small-screen">
                              <Biicons.BiUserCircle size={25} />
                            </span>
                            Freelancer
                          </Button>
                        </ButtonGroup>
                      </Col>
                      <Col className="mt-2">
                        <FormGroup floating>
                          <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="First Name"
                            type="text"
                          />
                          <Label for="exampleEmail">Email</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Toast style={{ width: "100%" }}>
                    <ToastHeader>My Profile</ToastHeader>
                    <ToastBody>
                      <Row>
                        <Col md="6">
                          <Label>Hourly Rate</Label>
                          <br />
                          <Label>{range} $</Label>
                          <Input
                            id="exampleRange"
                            name="range"
                            type="range"
                            value={range}
                            onChange={handleBudgetRange}
                          />
                        </Col>
                        <Col md="6">
                          <Label className="">Skills</Label>
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="php,reactjs"
                              value={skill}
                              onChange={(e) => setSkill(e.target.value)}
                            />
                            <Button
                              style={{
                                backgroundColor: "white",
                                color: "#2A41E8",
                              }}
                              onClick={addSkill}
                            >
                              <FAicons.FaPlus size={25} />
                            </Button>
                          </InputGroup>
                          <section
                            style={{ display: "flex", flexWrap: "wrap" }}
                            className="mt-3"
                          >
                            {skills.map((element, index) => {
                              return (
                                <span
                                  className="skill-badge"
                                  key={index}
                                  style={{ margin: 0, width: "30%", margin: 2 }}
                                >
                                  {element}
                                  <Mdicons.MdClose
                                    size={25}
                                    style={{ margin: 10 }}
                                    onClick={() => deleteSkill(index)}
                                  />
                                </span>
                              );
                            })}
                          </section>
                        </Col>
                      </Row>
                    </ToastBody>
                  </Toast>
                </Row>
                <Row className="mt-4">
                  <Toast style={{ width: "100%" }}>
                    <ToastHeader>Address</ToastHeader>
                    <ToastBody>
                      <Row>
                        <Col md="4">
                          <FormGroup>
                            <Label for="exampleSelect">Nationality</Label>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="select"
                            >
                              <option>1</option>
                              <option>2</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label for="exampleSelect">State</Label>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="select"
                            >
                              <option>1</option>
                              <option>2</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label for="exampleSelect">City</Label>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="select"
                            >
                              <option>1</option>
                              <option>2</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </ToastBody>
                  </Toast>
                </Row>
                <Row className="mt-4">
                  <Toast style={{ width: "100%" }}>
                    <ToastHeader>My Self</ToastHeader>
                    <ToastBody>
                      <Row>
                        <Col md="6">
                          <FormGroup floating>
                            <Input
                              id="exampleEmail"
                              name="email"
                              placeholder="Email"
                              type="email"
                            />
                            <Label for="exampleEmail">Tag Line</Label>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup floating>
                            <Input
                              id="exampleEmail"
                              name="email"
                              placeholder="Email"
                              type="email"
                            />
                            <Label for="exampleEmail">Mobile Number</Label>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <FormGroup>
                          <Label for="exampleText">Description</Label>
                          <Input
                            id="exampleText"
                            name="text"
                            type="textarea"
                            Rows="8"
                          />
                        </FormGroup>
                      </Row>
                      <Button
                        color="primary"
                        style={{ width: "20%", float: "right" }}
                        className="mb-3"
                      >
                        Update Profile
                      </Button>
                    </ToastBody>
                  </Toast>
                </Row>
              </section>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    </React.Fragment>
  );
}

export default UserProfile;
