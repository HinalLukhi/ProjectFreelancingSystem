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
import DashboardSideBar from "../common/DashboardSideBar";
import DashboardTopNav from "../common/DashboardTopNav";
import * as Aiicons from "react-icons/ai";
import * as Biicons from "react-icons/bi";
import EditBids from "./../Freelancer/EditBids";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as RiIcons from 'react-icons/ri'

function ManageBids() {
  const navigate = useNavigate();
  var user = JSON.parse(localStorage.getItem("userData"));
  const [tokenstr] = localStorage.getItem("token");
  useEffect(() => {
    if (localStorage.getItem("loginStatus") === "false") {
      navigate("/");
    } else {
      setList();
      console.log(data)
    }
  }, [localStorage.getItem("loginStatus")]);
  const [data, setdata] = useState([]);
  const setList = () => {
    setTimeout(()=>{
      axios
      .get("http://localhost:8082/bids/freelancer/"+ user.id,{
      })
      .then((res) => {
        setdata(res.data);
      });
    })
  };
  const [editForm, setEditForm] = useState(false);
  const[editData,setEditData] = useState({})
  const toggleOfferForm = (element) => {
    setEditData(element);
    setEditForm(!editForm);
  };
  console.log(data)

  const deleteBid = (id) => {
    axios
      .delete("http://localhost:8082/bids/delete/" + id, {})
      .then((res) => {
        window.location.reload();
      });
  };

  return (
    <React.Fragment>
      <Container fluid style={{ padding: "0px" }}>
        <DashboardSideBar pageType="freelancer" />
        <Row id="post-project-form">
          <DashboardTopNav />
          <Col xs="10" id="form-col" className="flex-box">
            <section id="postproject-form">
            <section id="dashboardTitle" className="dashboardTitleText">
                Your Bids !
                <RiIcons.RiAuctionLine size={30} style={{marginLeft:"1rem"}} color="blue"/>
              </section>

              { data.map((element)=>{
                return (
                  <Card
                    style={{ marginBottom: ".5rem", borderRadius: "1rem" }}
                    className="mt-4"
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
                            <span>date : {element.bidDate}</span>
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
                              {element.project.projectskills.map((skill) => (
                                <span
                                  className="skill-badge"
                                  style={{ width: "100px" }}
                                >
                                  {skill.name}
                                </span>
                              ))}
                            </section>
                          </CardText>
                        </Col>
                        <Col md="6" className="p-3  rounded" id="budget-card">
                          <Badge
                            color={
                              element.status == 7
                                ? "success"
                                : element.status == 8
                                ? "danger"
                                : "primary"
                            }
                            style={{
                              height: "2rem",
                              fontWeight: "500",
                              width: "5rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: "1rem",
                            }}
                          >
                            {element.status == 7
                              ? "Accepted"
                              : element.status == 8
                              ? "Rejected"
                              : "Placed"}
                          </Badge>

                          <Toast className="mt-5">
                            <ToastHeader className="text-center">
                              Your Bid
                            </ToastHeader>
                            <ToastBody className="text-center">
                              {element.amount} $
                            </ToastBody>
                          </Toast>
                          <Row className="mt-4">
                            <Col md="6">
                              <Biicons.BiEdit
                                size={40}
                                color="blue"
                                onClick={() => toggleOfferForm(element)}
                              />
                            </Col>
                            <Col md="6">
                              <Aiicons.AiOutlineDelete size={40} color="red" onClick={() => deleteBid(element.id)}/>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                );
              })

              }
              {editForm && <EditBids toggle={toggleOfferForm} data={editData}/>}
            </section>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default ManageBids;
