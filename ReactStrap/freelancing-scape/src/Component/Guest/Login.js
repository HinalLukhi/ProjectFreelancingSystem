import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
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
import * as Hiicons from "react-icons/hi";
import * as Aiicons from "react-icons/ai";
import { UserContext } from "../../UserContext";
function Login() {
  const usercred = {
    email: '',
    password: ''
  };
  const {loginstat,usrname,token,userid,image} = useContext(UserContext);
  const [username,setusername] = usrname;
  const [loginmsg,setloginmsg] = useState("");
  const [tokenstr, settokenstr] = token;
  const [loginstatus, setloginstatus] = loginstat;
  const [id, setid] = userid;
  const [img, setimg] = image;
  let navigate = useNavigate();
  
  const check_login = () => {
    axios.post("/auth/login",usercred).then((res) => res.data.msg == "Logged in!" ? loginsuccess(res):loginfailure(res));
  }

  const loginsuccess = (res) =>{
    setusername(res.data.user[0].first_name + " " + res.data.user[0].last_name); 
    setloginstatus(true);
    settokenstr(res.data.token);
    setid(res.data.user[0].id);
    setimg(res.data.user[0].profile_image);
    if(res.data.userType=="Employer")
    {
      navigate("/Employer/home");
    }
    else if(res.data.userType=="Freelancer"){
      navigate("/Freelancer/home");
    }    
  }

  const loginfailure  = (res) =>{
    setloginmsg(res.data.data);
    navigate("/");
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
          <Input placeholder="Email" name="email" onChange={(e) => usercred.email = e.target.value}  style={{ padding: "10px" }} />
        </InputGroup>
        <InputGroup className="mt-3">
          <InputGroupText>
            <Aiicons.AiOutlineLock></Aiicons.AiOutlineLock>
          </InputGroupText>
          <Input type="password" placeholder="Password" name="password" onChange={(e) => usercred.password = e.target.value} style={{ padding: "10px" }} />
        </InputGroup>
        <p className="wrongcred">
          {loginmsg}
        </p> 
        <a
          href="#"
          style={{
            textDecoration: "none",
            position: "relative",
            marginTop: "5%",
          }}>
          Forgot Password ?
        </a>
        <Button color="primary" style={{marginTop:"5%",padding:"2%"}} onClick={() => { check_login() }}>Login</Button>
      </Row>
    </React.Fragment>
  );
}
export default Login;
