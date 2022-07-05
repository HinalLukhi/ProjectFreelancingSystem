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

function Dashboard() {
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
                  <ToastHeader>Bid Won</ToastHeader>
                  <ToastBody style={{backgroundColor:"#DBF7FD"}}>
                    53
                  </ToastBody>
                </Toast>
                <Toast style={{margin:"1rem"}}>
                  <ToastHeader>Bid Limit Left</ToastHeader>
                  <ToastBody style={{backgroundColor:"#DBF7FD"}}>
                    53
                  </ToastBody>
                </Toast>
                <Toast style={{margin:"1rem"}}>
                  <ToastHeader>hello</ToastHeader>
                  <ToastBody style={{backgroundColor:"#DBF7FD"}}>
                    53
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
