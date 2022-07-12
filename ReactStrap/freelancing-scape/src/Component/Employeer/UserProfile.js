import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import * as Biicons from "react-icons/bi";
import * as Mdicons from "react-icons/md";

function UserProfile() {
  const [userType, setuserType] = useState();
  const [UserData, setUserData] = useState({})
  const [profileData, setProfileData] = useState({})

  var user = JSON.parse(localStorage.getItem("userData"));
  var userID = user.userprofiles[0].id
  // console.log(userID)
  let navigate = useNavigate();

  const toggleClass = () => {
    if (userType == 3) {
      setuserType("Employer");
    } else if (userType == 2) {
      setuserType("Freelancer");
    }
  };


  useEffect(() => {
    if (localStorage.getItem("loginStatus") === "false") {
      navigate("/");
    } else {
      getData()
    }
  }, [localStorage.getItem("loginStatus")]);

  useEffect(() => {
    toggleClass()
    console.log(updateData)
    updateData.firstName = profileData.firstName
    updateData.lastName=profileData.lastName
    updateData.mobileNo = profileData.mobileNo
    updateData.companyName = profileData.companyName
    updateData.userDescription = profileData.userDescription

  }, [userType])

  const getData = () => {
    // console.log(user.id);
    axios
      .get('http://localhost:8083/' + user.id, {
      })
      .then((res) => {
        setUserData(res.data);
        var x = res.data.userprofiles
        setuserType(res.data.userType.id)
        setProfileData(...x.slice(0, 1))
        toggleClass()
        //setuserType(res.data.userType.userType);
      });
  };
  const [range, setRange] = useState("");
  const handleBudgetRange = (e) => {
    setRange(e.target.value);
  };
  /*const [skill, setSkill] = useState("");
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
  };*/


  const hiddenFileInput = React.useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileUploaded = event;
    console.log(fileUploaded);
  };


  const [updateData, setUpdateData] = useState({
    login: { id: user.id },
    firstName: "",
    lastName: "",
    profileImage: "",
    companyName: "",
    hourlyRate: "",
    tagLine: "",
    city: { id: 3 },
    mobileNo: "",
    userDescription: ""
  })
  let name, value;
  const handleFormDataChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUpdateData({ ...updateData, [name]: value })
  }

  return (
    <React.Fragment>
      <React.Fragment>
        <Container fluid style={{ padding: "0px" }}>
          <DashboardSideBar pageType="employer" />
          <Row id="post-project-form">
            <DashboardTopNav />
            <Col xs="10" id="form-col" className="flex-box">
              <section id="postproject-form" style={{ padding: "5%" }}>
                <Row id="user-profile">
                  <Col md="2">
                    <input
                      type="file"
                      style={{ display: "none" }}
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
                            name="firstName"
                            placeholder="First Name"
                            type="text"
                            value={updateData.firstName}
                            onChange={handleFormDataChange}
                          />
                          <Label for="exampleEmail">First Name</Label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup floating>
                          <Input
                            name="lastName"
                            placeholder="Last Name"
                            type="text"
                            value={updateData.lastName}
                            onChange={handleFormDataChange}
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
                            outline>
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
                            name="email"
                            placeholder="Email"
                            type="text"
                            value={UserData.email}
                            readOnly
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
                          <FormGroup floating>
                            <Input
                              name="companyName"
                              type="text"
                              value={updateData.companyName}
                            onChange={handleFormDataChange}

                            />
                            <Label for="exampleEmail">Company Name</Label>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup floating>
                            <Input
                              name="mobileNo"
                              type="text"
                              value={updateData.mobileNo}
                              onChange={handleFormDataChange}
                            />
                            <Label for="exampleEmail">Mobile Number</Label>
                          </FormGroup>
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
                              type="select">
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
                        <FormGroup>
                          <Label for="exampleText">Description</Label>
                          <Input
                            name="userDescription"
                            type="textarea"
                            Rows="8"
                            value={updateData.userDescription}
                            onChange={handleFormDataChange}
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
