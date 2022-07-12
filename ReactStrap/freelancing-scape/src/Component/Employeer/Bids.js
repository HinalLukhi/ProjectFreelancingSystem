import React from "react";
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
import * as FAicons from "react-icons/fa";
import * as Mdicons from "react-icons/md";
import * as Aiicons from "react-icons/ai";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import axios, { Axios } from "axios";

function Bids() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tokenstr] = localStorage.getItem("token");
  const goToProjectDesc = (id) => {
    navigate("projectdescription", { state: { id: id } });
  };
  const [data, setdata] = useState([]);
  const setList = () => {
    setTimeout(() => {
      axios
        .get("http://localhost:8082/bids/project/" + location.state.projectId, {
          headers: { Authorization: `Bearer ${tokenstr}` },
        })
        .then((res) => {
          setdata(res.data);
          SetSpinner(false);
        });
    }, 1500);
    console.log(data)
  };
  useEffect(() => {
    if (localStorage.getItem("loginStatus") === "false") {
      navigate("/");
    } else {
      setList();
    }
  }, [localStorage.getItem("loginStatus")]);

  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const addSkill = () => {
    console.log("hello");
    if (skill != "") {
      setSkills([...skills, skill]);
      setSkill("");
    }
    console.log(skills);
  };
  const deleteSkill = (index) => {
    const updatedSkills = skills.filter((element, id) => {
      return index != id;
    });
    setSkills(updatedSkills);
  };

  const [range, setRange] = useState("");
  const handleBudgetRange = (e) => {
    setRange(e.target.value);
  };
  const [state, setState] = useState({});
  const fetchMoreData = () => {
    setTimeout(() => {
      setState({});
    }, 1500);
  };

  const [spinner, SetSpinner] = useState(true);
  return (
    <React.Fragment>
      <Container tag={"section"} className="list-freelancer-form">
        <Row className="mt-2" id="FindProject">
          <Col xs="3" id="filter-form">
            <h3>Search</h3>
            <InputGroup>
              <Input />
              <Button color="primary">Search</Button>
            </InputGroup>
            <h3>Budget </h3>
            <Label>0 - {range} $</Label>
            <Input
              id="exampleRange"
              name="range"
              type="range"
              value={range}
              onChange={handleBudgetRange}
            />
            <h3>Skills</h3>
            <InputGroup>
              <Input
                type="text"
                placeholder="php,reactjs"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
              />
              <Button
                style={{ backgroundColor: "white", color: "#2A41E8" }}
                onClick={addSkill}
              >
                <FAicons.FaPlus size={25} />
              </Button>
            </InputGroup>
            <section style={{ display: "flex", flexWrap: "wrap" }}>
              {skills.map((element, index) => {
                return (
                  <span
                    className="skill-badge"
                    key={index}
                    style={{ margin: 0, width: "30%", margin: 2 }}
                  >
                    {element}
                    <Mdicons.MdClose
                      size={25}
                      style={{ margin: 10 }}
                      onClick={() => deleteSkill(index)}
                    />
                  </span>
                );
              })}
            </section>
          </Col>
          <Col xs="9" id="list-freelancer">
            {spinner ? (
              <section style={{ marginTop: "20%", marginLeft: "50%" }}>
                <Spinner>Loading...</Spinner>
              </section>
            ) : (
              <section className="mt-2">
                <Row>
                  <Col md="12">
                    {data.map((e) => (
                        
                      <Card body style={{ marginBottom: ".5rem" }} key={e.id}>
                        <CardBody>
                          <Row>
                            <Col md="6">
                              <CardTitle tag="h5">{e.user.userprofiles[0].firstName + " " +e.user.userprofiles[0].lastName}</CardTitle>
                              <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                              >
                                {"Duration : "}
                                <span>{e.deliveryTime + "  Days"}</span>
                                <Aiicons.AiOutlineClockCircle
                                  size={20}
                                  style={{ margin: "10px" }}
                                />
                                <span>{e.bidDate}</span>
                              </CardSubtitle>
                              <CardText className="mt-3">
                                {e.projectDescription}
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
                            <Col
                              md="6"
                              className="p-3  rounded"
                              id="budget-card"
                            >
                              <Toast>
                                <ToastHeader className="text-center">
                                  Bid Amount
                                </ToastHeader>
                                <ToastBody className="text-center">
                                  {e.amount + " $"}
                                </ToastBody>
                              </Toast>

                              <Button
                                color="primary"
                                className="mt-4"
                                style={{ width: "50%" }}
                                onClick={() => {
                                    SetSpinner(true);
                                    axios.put("http://localhost:8082/bids/accept/"+e.id).then(
                                        alert("Bid has been accepted!!!")
                                );
                                  navigate("/employer/managebidders");
                            }}
                              >
                                Accept
                              </Button>
                              <Button
                                color="danger"
                                className="mt-4"
                                style={{ width: "50%" }}
                                onClick={() => { 
                                    axios.put("http://localhost:8082/bids/reject/"+e.id).then(
                                    alert("Bid rejected!")
                                )
                                navigate("/employer/managebidders");
                            }
                            }
                              >
                                Reject
                              </Button>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    ))}
                  </Col>
                </Row>
              </section>
            )}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Bids;
