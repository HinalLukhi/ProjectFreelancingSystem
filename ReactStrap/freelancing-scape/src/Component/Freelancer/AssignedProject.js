import React, { useState, useEffect } from "react";
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
} from "reactstrap";
import axios from "axios";
import DashboardSideBar from "../common/DashboardSideBar";
import DashboardTopNav from "../common/DashboardTopNav";
import * as Aiicons from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import * as RiIcons from "react-icons/ri";
import * as VscIcons from "react-icons/vsc";

function AssignedProject() {
  const navigate = useNavigate();
  var user = JSON.parse(localStorage.getItem("userData"));

  const [data, setdata] = useState([]);
  const setList = () => {
    setTimeout(() => {
      axios
        .get("http://localhost:8082/bids/accepted/freelancer/" + user.id)
        .then((res) => {
          setdata(res.data);
        });
    });
  };

  const [isDivided,setIsDivided] = useState(false)

 const gotoTaskList=(id)=>{
  navigate("TaskList",{ state: { id: id } })
 }

 const gotoAddTask=(id)=>{
  navigate("addtask",{ state: { id: id } })
 }

  useEffect(() => {
    if (localStorage.getItem("loginStatus") === "false") {
      navigate("/");
    } else {
      setList();
    }
  }, [localStorage.getItem("loginStatus")]);
  console.log(data);
  return (
    <React.Fragment>
      <Container fluid style={{ padding: "0px" }}>
        <DashboardSideBar pageType="freelancer" />
        <Row id="post-project-form">
          <DashboardTopNav />
          <Col xs="10" id="form-col" className="flex-box">
            <section id="postproject-form">
              <section id="dashboardTitle" className="dashboardTitleText">
                Projects
                <VscIcons.VscProject
                  size={30}
                  style={{ marginLeft: "1rem" }}
                  color="blue"
                />
              </section>
              {data.map((element) => {
                return (
                  <Card
                    style={{ marginBottom: ".5rem", borderRadius: "1rem" }}
                    className="mt-3"
                  >
                    <CardBody>
                      <Row>
                        <Col md="6">
                          <CardTitle tag="h5">
                            {element.project.projectName}
                          </CardTitle>
                          <CardSubtitle className="mb-2 text-muted" tag="h6">
                            {"Duration : "}
                            <span> {element.deliveryTime} Days</span>
                            <Aiicons.AiOutlineClockCircle
                              size={20}
                              style={{ margin: "10px" }}
                            />
                            <span>
                              Project Start Date : {element.project.startDate}
                            </span>
                          </CardSubtitle>
                          <CardText className="mt-3">
                            {element.project.projectDescription}
                            <section
                              className="inline mt-3"
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                              }}
                            >
                              <span
                                className="skill-badge"
                                style={{ width: "100px" }}
                              >
                                css
                              </span>
                              <span
                                className="skill-badge"
                                style={{ width: "100px" }}
                              >
                                Html
                              </span>{" "}
                              <span
                                className="skill-badge"
                                style={{ width: "100px" }}
                              >
                                Java
                              </span>
                            </section>
                          </CardText>
                        </Col>
                        <Col md="6" className="p-3  rounded" id="budget-card">
                          <Toast>
                            <ToastHeader className="text-center">
                              Your Bid
                            </ToastHeader>
                            <ToastBody className="text-center">
                              {element.amount}$
                            </ToastBody>
                          </Toast>
                          {element.project.tasks.length > 0 && (
                            <Button
                              color="primary"
                              className="mt-4"
                              style={{ width: "100%" }}
                              onClick={()=>gotoTaskList(element.project.id)}
                            >
                              View Tasks
                            </Button>
                          )}
                          {element.project.tasks.length==0&&
                            <Button
                              color="primary"
                              className="mt-4"
                              style={{ width: "100%" }}
                              onClick={() => gotoAddTask(element.project.id)}
                            >
                              Add Tasks
                            </Button>
                          }
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                );
              })}
            </section>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
export default AssignedProject;
