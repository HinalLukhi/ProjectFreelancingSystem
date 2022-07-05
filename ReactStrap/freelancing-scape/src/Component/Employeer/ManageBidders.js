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

function ManageBidders() {

  const [activeProjects, setActiveProjects] = useState([]);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('userData')).id; 
    axios.get(`http://localhost:8082/project/activeprojects/${user}`)
      .then((res) => {
        setActiveProjects(res.data);
      });
  }, localStorage.getItem("loginStatus"));

  
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
                <Toast style={{ width: "100%" }} className="mb-1 mt-4"> 
                <ToastHeader>{d.projectName}</ToastHeader>
                <ToastBody>
                  <Row>
                    <Col md="6">
                      {d.projectDescription}
                      <section>Budget: {d.minBudget}$ - {d.maxBudget}$</section>
                    </Col>
                    <Col md="6">
                      <Toast>
                        <ToastHeader>Bids on this project</ToastHeader>
                        <ToastBody>{d.bids.length}</ToastBody>
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
