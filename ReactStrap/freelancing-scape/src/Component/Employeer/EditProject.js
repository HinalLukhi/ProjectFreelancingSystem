import React,{useState,useEffect} from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  InputGroupText,
  Alert,
  FormText,
  Input,
  FormGroup,
  Label,
  Row,
  Col,
  FormFeedback
} from "reactstrap";
import * as Mdicons from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
function EditProject(props) {
  var user = JSON.parse(localStorage.getItem("userData"));
  let navigate = useNavigate();
  var projID = props.projID;
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [allSkills,setAllSkills] = useState([])
  const [formData, setFormData] = useState({
    user: { id: user.id },
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


  const loadSkills=()=>{
    axios
      .get("http://localhost:8081/skill/all", {
      })
      .then((res) => {
        setAllSkills(res.data);
      });
  }
  
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

  const [editData,setEditData] = useState({})
  const [isInvalid, setIsInvalid] = useState(false);
  const [disabled, setDisabled] = useState(true);
  
  const loadProject= async ()=>{
    await axios
      .get("http://localhost:8082/project/"+props.projID, {
      })
      .then((res) => {
        setEditData(res.data) 
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

    
  useEffect(()=>{
   setFormData({
   projectName : editData.projectName,
   attachment : editData.attachment,
   completionDate : editData.completionDate,
   duration : editData.duration,
   maxBudget : editData.maxBudget,
   minBudget : editData.minBudget,
   projectDescription : editData.projectDescription,
  //  skillLevel : {id:editData.skillLevel.id},
   postDate : editData.postDate,
   startDate:editData.startDate
   })
},[editData]);
let name,value
const handleChange = (e) => {
  name = e.target.name;
  value = e.target.value;
  setFormData({ ...formData, [name]: value });
};


let [skillLevel, setSkillLevel] = useState();
useEffect(() => {
  if (localStorage.getItem("loginStatus") === "false") {
    navigate("/");
  } else {
    loadSkills()
    loadProject()

    }
  }, [localStorage.getItem("loginStatus")]);

   
  return (
    <React.Fragment>
      <Modal isOpen={props.open} toggle={true} id="EditProjectModal">
        <ModalHeader toggle={props.open}>Edit Project</ModalHeader>
        <ModalBody>
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
                  name="minBudget"
                  value={formData.minBudget}
                  onChange={handleChange}
                  type="number"
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
                  invalid={isInvalid}
                  onBlur={handleBlur}
                  type="number"
                />
                <InputGroupText className="lead">USD</InputGroupText>
                <FormFeedback>
                      Max budget is less than Min Budget
                  </FormFeedback>
              </InputGroup>
            </Col>
            <Col md="4">
              <Label>Skill Level Required</Label>
              <Input id="exampleSelect" name="select" type="select">
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
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </Col>
            <Col xs="6" className="width-full">
              <Label>Project End Date</Label>
              <Input
                type="date"
                name="completionDate"
                value={formData.completionDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
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
                    <option
                      name={Level.skillName}
                      value={Level.id}
                      key={Level.skillName}
                    >
                      {Level.skillName}
                    </option>
                  ))}
                </Input>
                <Button
                  style={{ backgroundColor: "white", color: "#2A41E8" }}
                  onClick={addSkill}
                >
                  ADD
                </Button>
              </InputGroup>
            </Col>
            <section
              style={{ display: "flex", flexWrap: "wrap" }}
              className="mt-3"
            >
              {skills.map((elementId, index) => {
                return (
                  <span
                    className="skill-badge"
                    key={index}
                    style={{ margin: 0, width: "30%", margin: 2 }}
                  >
                    {allSkills.map((obj) => {
                      if (obj.id == elementId) {
                        return obj.skillName;
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
                <Input id="exampleFile" type="file" name="attachment" />
                <FormText>
                  Images or documents that might be helpful in describing your
                  project
                </FormText>
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={disabled}>Update</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default EditProject;
