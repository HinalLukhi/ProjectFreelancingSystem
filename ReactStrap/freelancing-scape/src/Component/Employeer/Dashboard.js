import React from "react";
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
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import { useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  var user = JSON.parse(localStorage.getItem("userData"));
  const [data, setdata] = useState([]);
  const [projectWin, setprojectWin] = useState([])
  const getData = () => {
      axios
        .get("http://localhost:8081/membership/user/"+user.id)
        .then((res) => {
          setdata(res.data);
        });
  };

  const getProjectData = () => {
    axios
      .get("http://localhost:8082/project/activeprojects/"+user.id)
      .then((res) => {
        setprojectWin(res.data);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("loginStatus") === "false") {
      navigate("/");
    } else {
      getData()
      getProjectData()
    }
  }, [localStorage.getItem("loginStatus")]);

  return (
    <React.Fragment>
      <Container fluid style={{ padding: "0px" }}>
        <DashboardSideBar pageType="employer" />
        <Row id="post-project-form">
          <DashboardTopNav />
          <Col xs="10" id="form-col" className="flex-box">
            <section id="postproject-form" className="">
            <section id="dashboardTitleEmp" className="dashboardTitleTextEmp">
                Dashboard
                <RiIcons.RiDashboardLine size={30} style={{marginLeft:"1rem"}} color="blue"/>
              </section>
                <Toast style={{margin:"1rem"}}>
                  <ToastHeader>Active Project</ToastHeader>
                  <ToastBody style={{backgroundColor:"#DBF7FD"}}>
                    {projectWin.length}
                  </ToastBody>
                </Toast>
                <Toast style={{margin:"1rem"}}>
                  <ToastHeader>Post Limit Left</ToastHeader>
                  <ToastBody style={{backgroundColor:"#DBF7FD"}}>
                    {data.postsRemaining}
                  </ToastBody>
                </Toast>
                
            </section>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Dashboard;
