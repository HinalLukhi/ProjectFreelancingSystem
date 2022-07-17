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
  const [country,setCountry] = useState({})
  const [state,setState] = useState({})
  const [city,setCity] = useState({})
  const [cityID,setCityID] = useState({})
  const [profileImg,setProfileImg] = useState("")
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
  const getData = () => {
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
 console.log(UserData)
  const getCountry=()=>{
    axios
    .get('http://localhost:8081/country/all')
    .then((res) => {
      setCountry(res.data)
    });
  }

  const getState=(CountryID)=>{
    axios
    .get('http://localhost:8081/state/country/'+CountryID)
    .then((res) => {
      setState(res.data)
    });
  }

  const getCity=(cityID)=>{
    axios
    .get('http://localhost:8081/city/state/'+cityID)
    .then((res) => {
      setCity(res.data)
    });
  }
  
  const hiddenFileInput = React.useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileUploaded = event;
    //console.log(fileUploaded.target.value);
    setProfileImg(fileUploaded.target.value)
  };
  console.log(profileImg)

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
    userDescription: ""
  })
  let name, value;
  const handleFormDataChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUpdateData({ ...updateData, [name]: value })
  }
  useEffect(() => {
    if (localStorage.getItem("loginStatus") === "false") {
      navigate("/");
    } else {
      getCountry()
      getData()
    }
  }, [localStorage.getItem("loginStatus")]);

  useEffect(() => {
    toggleClass()
    updateData.firstName = profileData.firstName
    updateData.lastName=profileData.lastName
    updateData.mobileNo = profileData.mobileNo
    updateData.companyName = profileData.companyName
    updateData.userDescription = profileData.userDescription
    updateData.profileImage = profileData.profileImage
    updateData.city.id = cityID
  }, [userType])
  useEffect(() => {
    updateData.city.id = cityID
  }, [cityID])

  useEffect(() => {
    updateData.profileImage = profileImg
  }, [profileImg])

  const onCountryChange=(e)=>{
    getState(e.target.value);
  }

  const onStateChange=(e)=>{
    getCity(e.target.value)
  }
 const onCitySelect=(e)=>{
   setCityID(e.target.value)
 }
 
 const updateProfile=()=>{
  axios
      .put("http://localhost:8083/update/"+userID, updateData)
      .then((response) => {
        console.log("test");
        alert("Your Profile Has Been Updated")
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
};
 

 console.log(updateData)
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
                              maxLength="10"
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
