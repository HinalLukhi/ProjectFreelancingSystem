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
} from "reactstrap";
import * as FAicons from "react-icons/fa";
import * as Mdicons from "react-icons/md";
import * as Aiicons from "react-icons/ai";
import { useNavigate,Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";


function FindProject() {
  const navigate = useNavigate();
  const { loginstat, usrname, token } = useContext(UserContext);
  const [loginstatus] = loginstat;
  const [tokenstr] = token;
  const goToProjectDesc = (id) => {
    navigate('projectdescription',{state:{id:id}});
  };
  const [data, setdata] = useState([]);
  const setList = () => {
    axios
      .get("http://localhost:8082/project/all", {
        headers: { Authorization: `Bearer ${tokenstr}` },
      })
      .then((res) => {
        setdata(res.data);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("loginStatus") === "false") {
      navigate("/");
    } else {
      setList();
    }
  }, [loginstatus]);

  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const  addSkill =  () => {
    console.log("hello")
    if (skill != "") {
      setSkills([...skills, skill]);
      setSkill("");
    }
    console.log(skills)
  };
  const deleteSkill = (index) => {
    const updatedSkills = skills.filter((element, id) => {
      return index != id;
    });
    setSkills(updatedSkills);
  };

  const [range,setRange] = useState("")
  const handleBudgetRange=(e)=>{
    setRange(e.target.value)
  }
  const [state,setState] = useState({
    
  });
  const fetchMoreData = () => {
    setTimeout(() => {
      setState({
        
      });
    }, 1500);
  };


  return (
    <React.Fragment>
      <Container tag={"section"} className="list-freelancer-form">
        <Row className="mt-2">
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
            <section className="mt-2">
              <Row>
                <Col md="12">
                  <InfiniteScroll
                    dataLength={data.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                  >

                  {data.map((e) => (
                    <Card body style={{ marginBottom: ".5rem" }} key={e.id}>
                      <CardBody>
                        <Row>
                          <Col md="6">
                            <CardTitle tag="h5">{e.projectName}</CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">
                              {"Duration : "}
                              <span>{e.duration + "  Days"}</span>
                              <Aiicons.AiOutlineClockCircle
                                size={20}
                                style={{ margin: "10px" }}
                              />
                              <span>{e.postDate}</span>
                            </CardSubtitle>
                            <CardText className="mt-3">
                              {e.projectDescription}
                              <section
                                className="inline mt-3"
                                style={{ display: "flex", flexWrap: "wrap" }}
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
                                Budget of the project
                              </ToastHeader>
                              <ToastBody className="text-center">
                                {e.minBudget + "$" + e.maxBudget + "$"}
                              </ToastBody>
                            </Toast>

                            <Button
                              color="primary"
                              className="mt-4"
                              style={{ width: "100%" }}
                              onClick={() => goToProjectDesc(e.id)}
                            >
                              Bid Now
                            </Button>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  ))}
                  </InfiniteScroll>
                 
                </Col>
              </Row>
            </section>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default FindProject;
