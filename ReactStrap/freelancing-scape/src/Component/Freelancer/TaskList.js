import React, { useEffect, useState } from "react";
import axios from "axios";
import * as FAicons from "react-icons/fa";
import * as Aiicons from "react-icons/ai";
import {
  Container,
  Col,
  Row,
  InputGroup,
  InputGroupText,
  Input,
  Button,
  Label,
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardSubtitle,
  Tooltip,
  Badge
} from "reactstrap";
import { useLocation } from "react-router-dom";

import * as VscIcons from "react-icons/vsc";
import * as Biicons from "react-icons/bi";
import * as Ioicons from "react-icons/io";

import { useNavigate } from "react-router-dom";
import DashboardSideBar from "../common/DashboardSideBar";
import DashboardTopNav from "../common/DashboardTopNav";
function TaskList() {
  var user = JSON.parse(localStorage.getItem("userData"));
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setdata] = useState([]);
  const setList = () => {
    setTimeout(() => {
      axios
        .get("http://Localhost:8082/task/project/" + location.state.id)
        .then((res) => {
          setdata(res.data);
        });
    });
  };

  const goToTaskDesc = () => {
    navigate("taskdescription");
  };
  useEffect(() => {
    if (localStorage.getItem("loginStatus") === "false") {
      navigate("/");
    } else {
      setList();
    }
  }, [localStorage.getItem("loginStatus")]);

  const[tooltipOpen,setTooltipOpen] =useState(false)

  const markTaskAsDone = (id) => {
    console.log(id);
    axios
      .put('http://localhost:8082/task/markTaskAsDone/'+id)
      .then((response) => {
        window.location.reload();
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
  }
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
                          <CardTitle tag="h5">{element.taskName}</CardTitle>
                          {/* <Aiicons.AiOutlineClockCircle
                              size={20}
                              style={{ margin: "10px" }}
                            /> */}
                          <CardSubtitle className="mb-2 text-muted" tag="h6">
                            From :{element.startDate}
                            <span>To : {element.endDate}</span>
                          </CardSubtitle>
                          <CardText>{element.taskDescription}</CardText>
                        </Col>
                        <Col md="6" className="text-center">
                          
                        <Badge color={element.status.statusName=="complete"?"success":"primary"}>
                            {element.status.statusName}
                        </Badge>
                          <Biicons.BiEdit
                            size={40}
                            color="blue"
                            style={{ margin: "2rem" }}
                          />
                          <Aiicons.AiOutlineDelete
                            size={40}
                            color="red"
                            style={{ margin: "2rem" }}
                          />
                          {element.status.statusName=="complete"?
                            <Aiicons.AiOutlineReload
                            size={30}
                            color="blue"
                            style={{ margin: "2rem" }}
                            id="done"
                            onClick={() => markTaskAsDone(element.id)}
                            /> 
                          :
                            <Ioicons.IoMdDoneAll
                            size={40}
                            color="green"
                            style={{ margin: "2rem" }}
                            id="done"
                            onClick={() => markTaskAsDone(element.id)}
                            />
                          }
                          <Tooltip
                            isOpen={tooltipOpen}
                            placement="bottom"
                            target="done"
                            toggle={() => {
                              setTooltipOpen(!tooltipOpen);
                            }}
                          >
                           Mark as done
                          </Tooltip>
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

export default TaskList;
