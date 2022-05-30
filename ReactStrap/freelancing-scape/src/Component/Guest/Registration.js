import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import * as Hiicons from "react-icons/hi";
import * as Aiicons from "react-icons/ai";
import * as Biicons from "react-icons/bi";
import * as Mdicons from "react-icons/md";
import * as Faicons from "react-icons/fa";

function Registration() {
  let navigate = useNavigate();
  const [userType, setuserType] = useState("Freelancer");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [usrType, setusrType] = useState(3);
  const [usercred,setusercred] = useState({
    email: "",
    password: "",
    status:11,
    usrtype:usrType
  });
  

  const toggleClass = () => {
    if(userType=="Freelancer"){
      setuserType("Employer");
    }
    else{
      setuserType("Freelancer");
    }
  };
  

  const onRegistrationBtnClick = () => {
    if(userType=="Freelancer"){
       setusrType(2);
    }
    else{
      setusrType(3);
    }
    
    if(confirmPassword==usercred.password){
      axios.post("/auth/register",usercred).then((res) => res.data.data=="Record Inserted." ? registersuccess():"");
    }
    const registersuccess = () =>{
      alert("User registered successfully.");
      window.location.reload();
    }
  }

  return (
    <React.Fragment>
      <Row>
        <h3 style={{ textAlign: "center" }}>Let's create your account!</h3>
      </Row>
      <Row>
        <ButtonGroup>
          <Button
            className="user-button-defualt"
            id={userType=="Employer" ? "user-button" : ""}
            onClick={toggleClass}
            outline
          >
            <span className="hide-in-small-screen">
              <Mdicons.MdOutlineBusinessCenter
                style={{ marginRight: "10px", marginBottom: "2px" }}
                size={25}
              />
            </span>
            Employer
          </Button>
          <Button
            id={userType=="Freelancer" ? "user-button" : ""}
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
      </Row>
      <Row id="login-form">
        <InputGroup>
          <InputGroupText style={{ padding: "15px" }}>
            <Hiicons.HiOutlineMail />
          </InputGroupText>
          <Input placeholder="Email" style={{ padding: "10px" }} onChange={(e) => { setusercred({ ...usercred, email: e.target.value }) }} />
        </InputGroup>
        <InputGroup className="mt-3">
          <InputGroupText>
            <Aiicons.AiOutlineLock></Aiicons.AiOutlineLock>
          </InputGroupText>
          <Input type="password" placeholder="Password" style={{ padding: "10px" }} onChange={(e) => { setusercred({ ...usercred, password: e.target.value }) }}  />
        </InputGroup>
        <InputGroup className="mt-3">
          <InputGroupText>
            <Aiicons.AiOutlineLock></Aiicons.AiOutlineLock>
          </InputGroupText>
          <Input type="password" placeholder="confirm Password" style={{ padding: "10px" }} onChange={(e) => setconfirmPassword(e.target.value)} />
        </InputGroup>
        <a
          href="#"
          style={{
            textDecoration: "none",
            position: "relative",
            marginTop: "5%",
          }}
        >
          Already Have Account Login?
        </a>
        <Button color="primary" style={{ marginTop: "5%", padding: "2%" }} onClick={() => onRegistrationBtnClick()}>
          Register
        </Button>
      </Row>
      <Row style={{ marginTop: "2%" }}>
        <hr></hr>
        <Col xs="6">
          <Button color="primary" style={{ width: "100%" }} outline>
            <Faicons.FaFacebookF size={20}/>
            <span className="hide-in-small-screen">Register Via Facebook</span>
          </Button>
        </Col>
        <Col xs="6">
          <Button color="danger" style={{ width: "100%" }} outline>
            <Aiicons.AiOutlineGooglePlus size={25} />
            <span className="hide-in-small-screen"> Register Via Google+</span>
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Registration;
