import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import jwt_decode from "jwt-decode"

import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  InputGroup,
  InputGroupText,
  Input,
  Alert
} from "reactstrap";
import * as Hiicons from "react-icons/hi";
import * as Aiicons from "react-icons/ai";
import { UserContext } from "../../UserContext";
function Login() {
  const [usercred,setUserCred] = useState({
    email: '',
    password: ''
  });

  const [errorAlert,setErrorAlert] = useState(false)

  let navigate = useNavigate();
  
  const check_login = () => {
    axios
      .post("http://localhost:8080/login", usercred)
      .then((res) => (res != "" ? loginsuccess(res) : loginfailure(res)))
      .catch(function (error) {
        setErrorAlert(true)
      });
  }

  const loginsuccess = (res) =>{
    let token = res.headers.authorization;
    localStorage.setItem("token",token);
    let user = jwt_decode(token.split(' ')[1])
    axios.post("http://localhost:8083/email",{"email":user.sub}).then((res) => {
      //console.log(res.data);
      setData(res.data);
    });
  }

  const setData = (data) =>{
    localStorage.setItem("loginStatus",true);
    localStorage.setItem("userData",JSON.stringify(data));
    if(data.userType.userType==="Employer")
    {
      navigate("/Employer/home");
    }
    else if(data.userType.userType==="Freelancer"){
      navigate("/Freelancer/home");
    }    
  }

  const loginfailure  = (res) =>{
    navigate("/");
  }
  
  const onValueChange=(e)=>{
    var name = e.target.name;
    var value = e.target.value;
    setUserCred({ ...usercred, [name]: value });
  }

  return (
    <React.Fragment>
      <Row id="welcome-text">
        <h3>We're glad to see you again!</h3>
        <span>
          Don't have an account? <a href="#">Sign Up!</a>
        </span>
      </Row>
      <Row id="login-form">
        <InputGroup>
          <InputGroupText style={{ padding: "15px" }}>
            <Hiicons.HiOutlineMail />
          </InputGroupText>
          <Input
            placeholder="Email"
            name="email"
            onChange={onValueChange}
            style={{ padding: "10px" }}
          />
        </InputGroup>
        <InputGroup className="mt-3">
          <InputGroupText>
            <Aiicons.AiOutlineLock></Aiicons.AiOutlineLock>
          </InputGroupText>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onValueChange}
            style={{ padding: "10px" }}
          />
        </InputGroup>
        <p className="mt-3">
          {errorAlert &&
            <Alert color="danger text-center">Your email or password is wrong</Alert>
          } 
        </p>
        <a
          href="#"
          style={{
            textDecoration: "none",
          }}
        >
          Forgot Password ?
        </a>
        <Button
          color="primary"
          style={{ marginTop: "5%", padding: "2%" }}
          onClick={() => {
            check_login();
          }}
        >
          Login
        </Button>
      </Row>
    </React.Fragment>
  );
}
export default Login;
