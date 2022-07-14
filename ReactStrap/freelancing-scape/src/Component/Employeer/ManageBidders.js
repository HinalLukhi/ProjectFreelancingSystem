import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Toast,
  ToastHeader,
  ToastBody
} from "reactstrap";
import DashboardSideBar from "../common/DashboardSideBar";
import DashboardTopNav from "../common/DashboardTopNav";
import * as RiIcons from 'react-icons/ri'
import { useNavigate } from "react-router-dom";

function ManageBidders() {

  const navigate = useNavigate();

  const [activeProjects, setActiveProjects] = useState([]);
  const [allSkills, setAllSkills] = useState({});

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('userData')).id; 
    axios.get(`http://localhost:8082/project/activeprojects/${user}`)
      .then((res) => {
        setActiveProjects(res.data);
      });
  }, localStorage.getItem("loginStatus"));

  const handleBidsListing = (id) => {
    navigate("/employer/bids", {state: {projectId : id}});
  }

  return (
    <React.Fragment>
      <Container fluid style={{ padding: "0px" }}>
        <DashboardSideBar pageType='employer'/>
        <Row id="post-project-form">
          <DashboardTopNav />
          <Col xs="10" id="form-col" className="flex-box">
            <section id="postproject-form">
            <section id="dashboardTitleEmp" className="dashboardTitleTextEmp">
                Active Bids
                <RiIcons.RiAuctionLine size={30} style={{marginLeft:"1rem"}} color="blue"/>
              </section>
              {activeProjects.map((d) => (
                <Toast key={d.id} style={{ width: "100%" }} className="mb-1 mt-4" onClick={() => handleBidsListing(d.id)}> 
                <ToastHeader>{d.projectName}</ToastHeader>
                <ToastBody>
                  <Row>
                    <Col md="6">
                      {d.projectDescription}
                      <section>Budget: {d.minBudget}$ - {d.maxBudget}$</section>
                      <section>{
                          d.projectskills.map((s) => (
                            <span className="skill-badge"
                            key={s.id}
                            style={{ margin: 0, width: "30%", margin: 2 }}>
                              {s.name}
                            </span>
                          ))
                        }</section>
                    </Col>
                    <Col md="6">
                      <Toast>
                        <ToastHeader>Bids on this project</ToastHeader>
                        <ToastBody>{d.bids.filter(bid => bid.status.id === 6).length}</ToastBody>
                      </Toast>
                    </Col>
                  </Row>
                </ToastBody>
              </Toast>
              ))}
            </section>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default ManageBidders;
