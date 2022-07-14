import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
function UserProfile() {
  let navigate = useNavigate();
  const [userType, setuserType] = useState();
  const [UserData, setUserData] = useState({});
  const [profileData, setProfileData] = useState({});
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const [city, setCity] = useState({});
  const [cityID, setCityID] = useState({});
  const [profileImg, setProfileImg] = useState("");
  const [allSkills,setAllSkills] = useState([])
  var user = JSON.parse(localStorage.getItem("userData"));
  var userID = user.userprofiles[0].id;

  const toggleClass = () => {
    if (userType == 3) {
      setuserType("Employer");
    } else if (userType == 2) {
      setuserType("Freelancer");
    }
  };

  const loadSkills=()=>{
    axios
      .get("http://localhost:8081/skill/all", {
      })
      .then((res) => {
        setAllSkills(res.data);
      });
  }

  const getData = () => {
    axios.get("http://localhost:8083/" + user.id, {}).then((res) => {
      setUserData(res.data);
      var x = res.data.userprofiles;
      setuserType(res.data.userType.id);
      setProfileData(...x.slice(0, 1));
      toggleClass();
      loadSkills();
    });
  };

  const getCountry = () => {
    axios.get("http://localhost:8081/country/all").then((res) => {
      setCountry(res.data);
    });
  };

  const getState = (CountryID) => {
    axios
      .get("http://localhost:8081/state/country/" + CountryID)
      .then((res) => {
        setState(res.data);
      });
  };

  const getCity = (cityID) => {
    axios.get("http://localhost:8081/city/state/" + cityID).then((res) => {
      setCity(res.data);
    });
  };

  const [range, setRange] = useState("");
  const handleBudgetRange = (e) => {
    setRange(e.target.value);
  };
  const [skill, setSkill] = useState({});
  const [skills, setSkills] = useState([{}]);
  const addSkill = () => {
    if (skill != "") {
      setSkills([...skills, skill]);
      let fSkill = {
        skill: {id:skill},
        freelancer : {id: profileData.id}
      }
      setUpdateSkills([
          ...updateSkills,
          fSkill
        ]
      );
    }
  };
  const deleteSkill = (index) => {
    const updatedSkills = skills.filter((element, id) => {
      return index != id;
    });
    setSkills(updatedSkills);
  };

  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event;
    console.log(fileUploaded);
  };
  useEffect(() => {
    if (localStorage.getItem("loginStatus") === "false") {
      navigate("/");
    } else {
      getCountry();
      getData();
    }
  }, [localStorage.getItem("loginStatus")]);

  const onCountryChange = (e) => {
    getState(e.target.value);
  };

  const onStateChange = (e) => {
    getCity(e.target.value);
  };
  const onCitySelect = (e) => {
    setCityID(e.target.value);
  };

  const [updateData, setUpdateData] = useState({
    login: { id: user.id },
    firstName: "",
    lastName: "",
    profileImage: "",
    companyName: "",
    hourlyRate: "",
    tagLine: "",
    city: { id: "" },
    mobileNo: "",
    userDescription: "",
  });
  let name, value;
  const handleFormDataChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUpdateData({ ...updateData, [name]: value });
  };


  const [updateSkills, setUpdateSkills] = useState([{}]);


  useEffect(() => {
    toggleClass()
    updateData.firstName = profileData.firstName
    updateData.lastName=profileData.lastName
    updateData.mobileNo = profileData.mobileNo
    updateData.userDescription = profileData.userDescription
    updateData.profileImage = profileData.profileImage
    updateData.city.id = cityID
    updateData.hourlyRate = profileData.hourlyRate
    updateData.tagLine = profileData.tagLine
    updateData.mobileNo = profileData.mobileNo
  }, [userType])
  useEffect(() => {
    updateData.city.id = cityID
  }, [cityID])

  useEffect(() => {
    updateData.profileImage = profileImg
  }, [profileImg])

  const updateProfile=()=>{
    axios
        .put("http://localhost:8083/update/"+userID, updateData)
        .then((response) => {
          axios.post("http://localhost:8083/addSkills", updateSkills)
          .catch(error => console.error(error));
          alert("Your Profile Has Been Updated")
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
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
              </section> */
              }
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
                            name="email"
                            type="text"
                            value={UserData.email}
                            onChange={handleFormDataChange}
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
                          <Label>Hourly Rate</Label>
                          <br />
                          <Input
                            id="exampleRange"
                            name="hourlyRate"
                            type="text"
                            value={updateData.hourlyRate}
                            onChange={handleFormDataChange}
                          />
                        </Col>
                        <Col md="6">
                          <Label className="">Skills</Label>
                          <InputGroup>
                            <Input
                              type="select"
                              placeholder="php,reactjs"
                              value={skill}
                              onChange={(e) => setSkill(e.target.value)}
                            >
                              {allSkills.map((Level) => (
                                
                                <option name={Level.skillName} value={Level.id} key={Level.id} >
                                  {Level.skillName}
                                </option>
                    ))}
                            </Input>
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
                          
                          {allSkills.map(obj => {
                            if (obj.id == element){
                              return obj.skillName
                            }
                          })}

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
                              onChange={onCountryChange}
                            >
                              <option>Select Country</option>
                              {Array.isArray(country) &&
                                country.map((element) => {
                                  return (
                                    <option value={element.id}>
                                      {element.countryName}
                                    </option>
                                  );
                                })}
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
                              onChange={onStateChange}
                            >
                              <option>Select State</option>
                              {Array.isArray(state) &&
                                state.map((element) => {
                                  return (
                                    <option value={element.id}>
                                      {element.stateName}
                                    </option>
                                  );
                                })}
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
                              onChange={onCitySelect}
                            >
                              <option>Select City</option>
                              {Array.isArray(city) &&
                                city.map((element) => {
                                  return (
                                    <option value={element.id}>
                                      {element.cityName}
                                    </option>
                                  );
                                })}
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
                              name="tagLine"
                              type="email"
                              value={updateData.tagLine}
                              onChange={handleFormDataChange}
                            />
                            <Label for="exampleEmail">Tag Line</Label>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup floating>
                            <Input
                              name="mobileNo"
                              type="email"
                              value={updateData.mobileNo}
                              onChange={handleFormDataChange}
                            />
                            <Label for="exampleEmail">Mobile Number</Label>
                          </FormGroup>
                        </Col>
                      </Row>
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
                        onClick={()=>updateProfile()}
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
