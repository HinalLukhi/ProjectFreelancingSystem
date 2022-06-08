import React, { useState } from "react";
import axios from "axios";
import DashboardSideBar from "../common/DashboardSideBar";
import DashboardTopNav from "../common/DashboardTopNav";
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
} from "reactstrap";
import * as Faicons from "react-icons/fa";
import * as Mdicons from "react-icons/md";
import { useNavigate } from "react-router-dom";

function PostProject() {
  let navigate = useNavigate();
  const GoToTasksPage = () => {
    navigate("posttasks");
  };

  const [skill, setSkill] = useState("");

  const [skills, setSkills] = useState([]);

  const [formData, setFormData] = useState({
    user:{
      id:1
    },
    projectName: "",
    duration:"",
    projectDescription:"",
    attachment:"",
    postDate:"",
    completionDate:"",
    status:{
      id:5
    }
  });


  let projectID
  const addProject=()=>{
    const date1 = new Date(formData.FormDate);
    const date2 = new Date(formData.EndDate);
    formData.Duration = daysDiff(date1, date2)

    axios.post('http://localhost:8082/project/add', formData)
        .then(response => {
          projectID=response.data.id
          console.log(projectID)
        })
        .catch(error => {
            console.error('There was an error!', error);
        });

  }

  const  addSkill =  () => {
    if (skill != "") {
      setSkills([...skills, skill]);
      setLevels([...Levels,skillLevel])
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
  let [Levels,setLevels]=useState([])

  const [checkbox, setCheckBox] = useState(false);
  const handleDivideCheckBox = () => {
    setCheckBox(!checkbox);
  };
  let name,value
  const handleChange=(e)=>{
    name = e.target.name;
    value=e.target.value;
    setFormData({...formData,[name]:value})
  }
  function daysDiff(dateFrom, dateTo) {
    const diffInMs = Math.abs(dateTo - dateFrom);
    return diffInMs / (1000 * 60 * 60 * 24);
   }

  return (
    <React.Fragment>
      <Container fluid style={{ padding: "0px" }}>
        <DashboardSideBar />
        <Row id="post-project-form">
          <DashboardTopNav />
          <Col xs="10" id="form-col">
            <section id="postproject-form">
              <FormGroup floating>
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
                      name="MinBudget"
                      //value={formData.MinBudget}
                      //onChange={handelChange}
                    />
                    <InputGroupText className="lead">USD</InputGroupText>
                  </InputGroup>
                </Col>
                <Col md="4" style={{marginTop:"2rem"}}>
                  <InputGroup>
                    <Input
                      placeholder="Maximum"
                      name="MaxBudget"
                      // value={formData.MaxBudget}
                      //onChange={handelChange}
                    />
                    <InputGroupText className="lead">USD</InputGroupText>
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
                      <option value={Level.value} key={Level.key}>
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
                    name="postDate"
                    value={formData.postDate}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs="6" className="width-full">
                  <Label>Project End Date</Label>
                  <Input
                    type="date"
                    name="EndDate"
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
                      type="text"
                      placeholder="eg. CSS,HTML,JAVA"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                    />
                    <Button
                    style={{ backgroundColor: "white", color: "#2A41E8" }}
                    onClick={addSkill}
                  >
                    ADD
                  </Button>
                  </InputGroup>
                </Col>

                <Col md="6" style={{ marginTop: "2rem" }}>
                  <section style={{ display: "flex", flexWrap: "wrap" }}>
                  {skills.map((element, index) => {
                    return (
                      <span
                        className="skill-badge"
                        key={index}
                        style={{ margin: 0, width: "30%", margin: 2 }}>
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
              </Row>
              <Row className="mt-3">
             
              </Row>
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
              <Button color="primary" onClick={addProject}>
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
