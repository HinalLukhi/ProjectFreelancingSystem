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
  Badge,
} from "reactstrap";
import * as Aiicons from "react-icons/ai";
import * as Biicons from "react-icons/bi";
import DashboardSideBar from "../common/DashboardSideBar";
import DashboardTopNav from "../common/DashboardTopNav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditProject from "./EditProject";
import * as VcsIcons from "react-icons/vsc";

function AllProjects() {
  var user = JSON.parse(localStorage.getItem("userData"));
  const [spinner, SetSpinner] = useState(true);
  const [data, setdata] = useState([]);

  const setList = () => {
    axios.get("http://localhost:8082/project/user/" + user.id).then((res) => {
      setdata(res.data);
      SetSpinner(false);
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("loginStatus") === "false") {
      navigate("/");
    } else {
      setList();
    }
  }, [localStorage.getItem("loginStatus")]);
  const [isEdit, setIsEdit] = useState(false);
  const [editable, setEditable] = useState({
    projectId: "",
    user: { id: "" },
    projectName: "",
    duration: "",
    projectDescription: "",
    attachment: "",
    postDate: "",
    startDate: "",
    minBudget: "",
    maxBudget: "",
    skillLevel: { id: "" },
    status: { id: "" },
    completionDate: "",
  });
  const [projID, setProjID] = useState();
  const toggleForm = (element) => {
    setProjID(element.id);
    setIsEdit(!isEdit);
  };


  const goToTaskList=(id)=>{
    navigate("tasks",{state:{id:id}})
   }
   const deleteProject=(id)=>{
    console.log(id);
    axios.delete("http://localhost:8082/project/"+id).then((res) => {
      window.location.reload();
    });
  };
  return (
    <React.Fragment>
      <Container fluid style={{ padding: "0px" }}>
        <DashboardSideBar pageType="employer" />
        <Row id="post-project-form">
          <DashboardTopNav />
          <Col xs="10" id="form-col" className="flex-box">
            <section id="postproject-form">
              <section id="dashboardTitleEmp" className="dashboardTitleTextEmp">
                Projects
                <VcsIcons.VscProject
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
                          <CardTitle tag="h5">{element.projectName}</CardTitle>
                          <CardSubtitle className="mb-2 text-muted" tag="h6">
                            {"Duration : "}
                            <span>{element.duration} </span>
                            <Aiicons.AiOutlineClockCircle
                              size={20}
                              style={{ margin: "10px" }}
                            />
                            <span>Post Date : {element.postDate} </span>
                          </CardSubtitle>
                          <CardText className="mt-3">
                            {element.projectDescription}
                            <section
                              className="inline mt-3"
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                              }}
                            >
                              {element.projectskills.map((skill) => {
                                return (
                                  <span
                                    className="skill-badge"
                                    style={{ width: "100px" }}
                                  >
                                    {skill.name}
                                  </span>
                                );
                              })}
                            </section>
                          </CardText>
                          <Button
                            color="primary"
                            className="mt-4"
                            style={{ width: "100%" }}
                            onClick={() => goToTaskList(element.id)}
                          >
                            View Task
                          </Button>
                        </Col>
                        <Col md="6" className="p-3  rounded" id="budget-card">
                          <Badge
                            color={
                              element.status.id == 7
                                ? "success"
                                : element.status.id == 5
                                ? "primary"
                                : "danger"
                            }
                            style={{
                              height: "2rem",
                              fontWeight: "500",
                              width: "auto",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: "1rem",
                            }}
                          >
                            {element.status.id == 7
                              ? "In Progress"
                              : element.status.id == 5
                              ? "Active"
                              : "Inactive"}
                          </Badge>
                          <Toast className="mt-5">
                            <ToastHeader className="text-center">
                              Budget
                            </ToastHeader>
                            <ToastBody className="text-center">
                              {element.minBudget +
                                "$ - " +
                                element.maxBudget +
                                "$"}
                            </ToastBody>
                          </Toast>
                          <Row className="mt-4">
                            <Col md="4">
                              <Biicons.BiEdit
                                size={40}
                                color="blue"
                                onClick={() => toggleForm(element)}
                              />
                            </Col>
                            <Col md="4">
                              <Aiicons.AiOutlineDelete
                                size={40}
                                color="red"
                                onClick={() => deleteProject(element.id)}
                              />
                            </Col>
                            <Col md="4"></Col>
                          </Row>
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
      {isEdit && <EditProject open={toggleForm} projID={projID} />}
    </React.Fragment>
  );
}

export default AllProjects;
