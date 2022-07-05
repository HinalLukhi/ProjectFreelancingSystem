import React, { useContext, useEffect, useState } from "react";
import logo from "../../Images/logo-dark.png";
import { Container, Row, Col,Popover,PopoverHeader,PopoverBody } from "reactstrap";
import * as AIicons from "react-icons/ai";
import * as FIicons from "react-icons/fi"
import * as BSicons from "react-icons/bs"
import SideBar from "./SideBar";
import RegistrationContainer from "../Guest/RegistrationContainer";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
  const [sideBar, setSideBar] = useState(false);
  const [RegVisible, SetRegVisible] = useState(false);

  const toggleReg = () => {
    SetRegVisible(!RegVisible);
  };
  
  const userLink = props.pageType ? props.pageType : "DropDown";
  const user=JSON.parse(localStorage.getItem("userData"));

  let navigate = useNavigate();

  const [test,settest]= useState(false);
  const onHover = () => {
    settest(true)
  }
  
  const onHoverLeave = () => {
    settest(false)
  }
  const logOutbtnclicked = () =>{
    localStorage.setItem("loginStatus",false);
    localStorage.setItem("user","");
    localStorage.setItem("token","");
    navigate("/");
  }
  useEffect(() =>{
    if(localStorage.getItem('loginstatus')==false){
        navigate("/");
    }
  },[localStorage.getItem('loginstatus')]); 
  return (
    <React.Fragment>
      <header>
        <AnimatePresence>{sideBar ? <SideBar></SideBar> : ""}</AnimatePresence>
        <Container fluid tag="nav">
          <nav id="topMenu">
            {/***********************Guest Menu***********************/}
            {userLink == "Guest" && (
              <Row>
                <Col lg="1" sm="2" xs="3" id="logo-col">
                  <section id="logo-section">
                    <img src={logo} className="logo" />
                  </section>
                </Col>
                <Col lg="10" sm="8" xs="6">
                  <ul id="ulMain">
                    <li>
                      <Link to="home" className="headerLinkStyle">
                        Home
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="headerLinkStyle">
                        Dropdwon
                        <span className="material-icons arrow-icon">
                          arrow_drop_down
                        </span>
                      </a>
                      <ul>
                        <span className="arrow" />
                        <li>
                          <a href="#">list1</a>
                        </li>
                        <li>
                          <a href="#">list1</a>
                        </li>
                        <li>
                          <a href="#">list1</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#" className="headerLinkStyle">
                        Dropdwon
                        <span className="material-icons arrow-icon">
                          arrow_drop_down
                        </span>
                      </a>
                      <ul>
                        <span className="arrow" />
                        <li>
                          <a href="#">list1</a>
                        </li>
                        <li>
                          <a href="#">list1</a>
                        </li>
                        <li>
                          <a href="#">list1</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="plans" className="headerLinkStyle">
                        Membership Plans
                      </Link>
                    </li>
                    <li>
                      <Link to="contactus" className="headerLinkStyle">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </Col>
                <Col lg="1" sm="2" xs="3" id="login-col">
                  <section id="loginSection">
                    <a onClick={toggleReg}>
                      <FIicons.FiLogIn size={25} id="login-icon" />
                      <span id="loginText">Login</span>
                    </a>
                    <a
                      onClick={() => {
                        setSideBar((v) => !v);
                      }}
                    >
                      <AIicons.AiOutlineBars size={25} id="barIcon" />
                    </a>
                  </section>
                </Col>
              </Row>
            )}
            {/***********************Employer Menu***********************/}
            {userLink == "Employer" && (
              <Row>
                <Col lg="1" sm="2" xs="3" id="logo-col">
                  <section id="logo-section">
                    <img src={logo} className="logo" />
                  </section>
                </Col>
                <Col lg="10" sm="8" xs="5">
                  <ul id="ulMain">
                    <li>
                      <Link to="Home" className="headerLinkStyle">
                        Home
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="headerLinkStyle">
                        For Employer
                        <span className="material-icons arrow-icon">
                          arrow_drop_down
                        </span>
                      </a>
                      <ul>
                        <span className="arrow" />
                        <li>
                          <Link to="freelancerlist">Find Freelancer</Link>
                        </li>
                        <li>
                          <Link to="postproject">Post Project</Link>
                        </li>
                        <li>
                          <a href="#">View Projects</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="dashboard" className="headerLinkStyle">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="plans" className="headerLinkStyle">
                        Membership Plans
                      </Link>
                    </li>
                    <li>
                      <Link to="contactus" className="headerLinkStyle">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </Col>
                <Col lg="1" sm="2" xs="3" id="login-col">
                  <section id="loginSection">
                    <section onMouseEnter={onHover} onMouseLeave={onHoverLeave}>
                      <img
                        src={user.userprofiles[0].profileImage}
                        alt=""
                        id="userAvatar"
                      />
                      {test && (
                        <aside id="profile-popup">
                          <span className="arrow" style={{ left: "60%" }} />
                          <section>
                            <h5>{user.userprofiles[0].firstName}</h5>
                            <ul>
                              <li>Dashboard</li>
                              <li>Settings</li>
                              <li onClick={logOutbtnclicked}>Log Out</li>
                            </ul>
                          </section>
                        </aside>
                      )}
                    </section>
                    <a
                      onClick={() => {
                        setSideBar((v) => !v);
                      }}
                    >
                      <AIicons.AiOutlineBars size={25} id="barIcon" />
                    </a>
                  </section>
                </Col>
              </Row>
            )}
            {/**********************Freelancer Menu***********************/}
            {userLink == "Freelancer" && (
              <Row>
                <Col xs="1" lg="1" sm="2" id="logo-col">
                  <section id="logosection">
                    <img src={logo} className="logo" />
                  </section>
                </Col>

                <Col lg="10" sm="8" xs="5">
                  <ul id="ulMain">
                    <li>
                      <Link to="home" className="headerLinkStyle">
                        Home
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="headerLinkStyle">
                        For Freelancer
                        <span className="material-icons arrow-icon">
                          arrow_drop_down
                        </span>
                      </a>
                      <ul>
                        <span className="arrow" />
                        <li>
                          <Link to="browseproject">Browse Project</Link>
                        </li>
                        <li>
                          <a href="#">list1</a>
                        </li>
                        <li>
                          <a href="#">list1</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="dashboard" className="headerLinkStyle">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="plans" className="headerLinkStyle">
                        Membership Plans
                      </Link>
                    </li>
                    <li>
                      <Link to="contactus" className="headerLinkStyle">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </Col>
                <Col lg="1" sm="2" xs="3" id="login-col">
                  <section id="loginSection">
                    <section onMouseEnter={onHover} onMouseLeave={onHoverLeave}>
                      <img
                        src={user.userprofiles[0].profileImage}
                        alt=""
                        id="userAvatar"
                      />
                      {test && (
                        <aside id="profile-popup">
                          <span className="arrow" style={{ left: "60%" }} />
                          <section>
                            <h5>{user.userprofiles[0].firstName}</h5>
                            <ul>
                              <li>Dashboard</li>
                              <li>Settings</li>
                              <li onClick={logOutbtnclicked}>Log Out</li>
                            </ul>
                          </section>
                        </aside>
                      )}
                    </section>
                    <a
                      onClick={() => {
                        setSideBar((v) => !v);
                      }}
                    >
                      <AIicons.AiOutlineBars size={25} id="barIcon" />
                    </a>
                  </section>
                </Col>
              </Row>
            )}
          </nav>
        </Container>
      </header>
      {RegVisible ? (
        <RegistrationContainer toggleReg={toggleReg}></RegistrationContainer>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
export default NavBar;
