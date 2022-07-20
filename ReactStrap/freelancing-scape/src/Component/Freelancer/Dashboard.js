import React,{useEffect} from "react";
import {
  Container,
  Col,
  Row,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";
import DashboardSideBar from "../common/DashboardSideBar";
import DashboardTopNav from "../common/DashboardTopNav";
import * as RiIcons from 'react-icons/ri'
import {useNavigate} from 'react-router-dom';

import axios, { Axios } from "axios";
import { useState } from "react";

function Dashboard() {
  //const navigate = useNavigate()
  //let user = localStorage.getItem("loginStatus")
  // Free.updateFooter()
  const navigate = useNavigate();
  var user = JSON.parse(localStorage.getItem("userData"));
  const [data, setdata] = useState([]);
  const [bidWin, setbidWin] = useState([])
  const getData = () => {
      axios
        .get("http://localhost:8081/membership/user/"+user.id)
        .then((res) => {
          //console.log(res);
          setdata(res.data);
        });
  };

  const getBidData = () => {
    axios
      .get("http://localhost:8082/bids/accepted/freelancer/"+user.id)
      .then((res) => {
        setbidWin(res.data);
      });
};
  useEffect(() => {
    if (localStorage.getItem("loginStatus") === "false") {
      //navigate("/");
    } else {
      getData()
      getBidData()
    }
  }, [localStorage.getItem("loginStatus")]);


  return (
    <React.Fragment>
      <Container fluid style={{ padding: "0px" }}>
        <DashboardSideBar pageType="freelancer" />
        <Row id="post-project-form">
          <DashboardTopNav />
          <Col xs="10" id="form-col" className="flex-box">
            <section id="postproject-form">
              <section id="dashboardTitle" className="dashboardTitleText">
                Dashboard
                <RiIcons.RiDashboardLine size={30} style={{marginLeft:"1rem"}} color="blue"/>
              </section>
              <Toast style={{ margin: "1rem" }}>
                <ToastHeader>Bid Won</ToastHeader>
                <ToastBody style={{ backgroundColor: "#DBF7FD" }}>{bidWin.length}</ToastBody>
              </Toast>
              <Toast style={{ margin: "1rem" }}>
                <ToastHeader>Bid Limit Left</ToastHeader>
                <ToastBody style={{ backgroundColor: "#DBF7FD" }}>{data.bidsRemaining}</ToastBody>
              </Toast>
              
            </section>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Dashboard;
