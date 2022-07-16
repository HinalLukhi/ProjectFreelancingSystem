import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardSideBar from "../common/DashboardSideBar";
import DashboardTopNav from "../common/DashboardTopNav";
import { UserContext } from "../../UserContext";
import { useRef } from "react";

import {
  Row,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  Button,
  Label,
  FormText,
  InputGroupText,
  Alert,
  FormFeedback
} from "reactstrap";
import * as Faicons from "react-icons/fa";
import * as Mdicons from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
function PostProject() {
  var user = JSON.parse(localStorage.getItem("userData"));
  let navigate = useNavigate();
  const GoToTasksPage = () => {
    navigate("posttasks");
  };

  useEffect(() => {
    if (localStorage.getItem("loginStatus") === "false") {
      navigate("/");
    } else {
      loadSkills()
    }
  }, [localStorage.getItem("loginStatus")]);

  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([])
  const [disabled, setDisabled] = useState(true);
  const [isInvalid, setIsInvalid] = useState(false);

  const ref = useRef();

  const [formData, setFormData] = useState({
    user: { id: 0 },
    projectName: "",
    duration: "",
    projectDescription: "",
    attachment: "",
    postDate: "",
    completionDate: "",
    startDate: "",
    minBudget: "",
    maxBudget: "",
    skillLevel: { id: 1 },
    status: { id: 5 },
  });


  const [postStatus, setPostStatus] = useState(false)


  const loadSkills = () => {
    axios
      .get("http://localhost:8081/skill/all", {
      })
      .then((res) => {
        setAllSkills(res.data);
      });
  }

  const handleBlur = () => {
    let min = parseFloat(formData.minBudget);
    let max = parseFloat(formData.maxBudget);
    if (min > max) {
      setDisabled(true);
      setIsInvalid(true);
    } else {
      setDisabled(false);
      setIsInvalid(false);
    }
  }

  const addProject = () => {
    const date1 = new Date(formData.startDate);
    const date2 = new Date(formData.completionDate);
    var today = new Date().toISOString().slice(0, 10);
    formData.duration = daysDiff(date1, date2);
    formData.skillLevel.id = skillLevel;
    formData.user.id = user.id;
    formData.postDate = today;

    axios
      .post("http://localhost:8082/project/add", formData)
      .then((response) => {
        AddprojectSkills(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    clearField();
  };

  const AddprojectSkills = (pId) => {
    let skillObject = [];
    for (let index = 0; index < skills.length; index++) {

      skillObject.push({
        skill: { id: skills[index] },
        project: { id: pId }
      });

    }
    insertSkills(skillObject);
  }


  const insertSkills = (skills) => {
    axios
      .post("http://localhost:8082/project/addSkills", skills)
      .then((response) => {
        console.log(response);
        setPostStatus(true)
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  const clearField = () => {
    setFormData({
      user: { id: 0 },
      projectName: "",
      duration: "",
      projectDescription: "",
      attachment: "",
      postDate: "",
      completionDate: "",
      startDate: "",
      minBudget: "",
      maxBudget: "",
      skillLevel: { id: 1 },
      status: { id: 5 },
    })


  };


  const addSkill = () => {
    // console.log(skill);
    if (skill != "") {
      setSkills([...skills, skill]);
      //setLevels([...Levels, skillLevel]);
      setSkill("");
    }
  };
  const deleteSkill = (index) => {
    const updatedSkills = skills.filter((element, id) => {
      return index != id;
    });
    setSkills(updatedSkills);
  };

  let skillLevels = [
    { key: 1, value: "Beginner" },
    { key: 2, value: "Intermediate" },
    { key: 3, value: "Expert" },
  ];
  let [skillLevel, setSkillLevel] = useState();

  const handleSkillLevelChange = (e) => {
    setSkillLevel(e.target.value);
  };
  let [Levels, setLevels] = useState([]);

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };
  function daysDiff(dateFrom, dateTo) {
    const diffInMs = Math.abs(dateTo - dateFrom);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  return (
    <React.Fragment>
      <Container fluid style={{ padding: "0px" }} >
        <DashboardSideBar pageType="employer" />
        <Row id="post-project-form">
          <DashboardTopNav />
          <Col xs="10" id="form-col" className="flex-box">
            <section id="postproject-form">
              <section id="dashboardTitleEmp" className="dashboardTitleTextEmp">
                Post Project
                <Mdicons.MdOutlinePostAdd size={30} style={{ marginLeft: "1rem" }} color="blue" />
              </section>
              {postStatus && (
                <Alert color="success" onClick={() => { setPostStatus(false) }}>
                  Well done ! your project is successfully posted
                </Alert>
              )}
              <FormGroup floating className="mt-5">
                <Input
                  placeholder="Project Name"
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                />
                <Label for="exampleEmail">Project Name</Label>
              </FormGroup>
              <Row>
                <Col md="4">
                  <Label>Project Budget</Label>
                  <InputGroup>
                    <Input
                      placeholder="Minimum"
                      name="minBudget"
                      value={formData.minBudget}
                      type="number"
                      onChange={handleChange}
                    />
                    <InputGroupText className="lead">USD</InputGroupText>
                  </InputGroup>
                </Col>
                <Col md="4" style={{ marginTop: "2rem" }}>
                  <InputGroup>
                    <Input
                      placeholder="Maximum"
                      name="maxBudget"
                      value={formData.maxBudget}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      invalid={isInvalid}
                    />

                    <InputGroupText className="lead">USD</InputGroupText>
                    <FormFeedback>
                      Max budget is less than Min Budget
                    </FormFeedback>
                  </InputGroup>
                </Col>
                <Col md="4">
                  <Label>Skill Level Required</Label>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    onChange={handleSkillLevelChange}
                  >
                    {skillLevels.map((Level) => (
                      <option value={Level.key} key={Level.key}>
                        {Level.value}
                      </option>
                    ))}
                  </Input>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs="6" className="width-full">
                  <Label>Project Start Date</Label>
                  <Input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs="6" className="width-full">
                  <Label>Project End Date</Label>
                  <Input
                    type="date"
                    name="completionDate"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.completionDate}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col md="6" className="width-full">
                  <Label>Skills Required For Project</Label>
                  <InputGroup>
                    <Input
                      type="select"
                      placeholder="eg. CSS,HTML,JAVA"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                    >
                      {allSkills.map((Level) => (
                        <option name={Level.skillName} value={Level.id} key={Level.skillName} >
                          {Level.skillName}
                        </option>
                      ))}
                    </Input>
                    <Button
                      style={{ backgroundColor: "white", color: "#2A41E8" }}
                      onClick={addSkill} >
                      ADD
                    </Button>
                  </InputGroup>

                </Col>

                <Col md="6" style={{ marginTop: "2rem" }}>
                  <section style={{ display: "flex", flexWrap: "wrap" }}>
                    {skills.map((elementId, index) => {
                      return (
                        <span
                          className="skill-badge"
                          key={index}
                          style={{ margin: 0, width: "30%", margin: 2 }}
                        >
                          {allSkills.map(obj => {
                            if (obj.id == elementId) {
                              return obj.skillName
                            }
                          })}

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
              </Row>
              <Row className="mt-3"></Row>
              <Row className="mt-2">
                <Col xs="12">
                  <Label>Project Description</Label>
                  <Input
                    id="exampleText"
                    type="textarea"
                    rows="5"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col xs="12">
                  <FormGroup>
                    <Label for="exampleFile">File</Label>
                    <Input
                      id="exampleFile"
                      type="file"
                      name="attachment"
                      value={formData.attachment}
                      onChange={handleChange}
                    />
                    <FormText>
                      Images or documents that might be helpful in describing
                      your project
                    </FormText>
                  </FormGroup>
                </Col>
              </Row>
              <Button ref={ref} id="post-project" color="primary" disabled={disabled} onClick={addProject}>
                Add Project
              </Button>
            </section>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default PostProject;
