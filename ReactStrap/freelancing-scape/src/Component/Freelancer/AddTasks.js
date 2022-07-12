import React,{useState} from "react";
import axios from "axios";
import DashboardSideBar from "../common/DashboardSideBar";
import DashboardTopNav from "../common/DashboardTopNav";
import { useNavigate } from "react-router-dom";
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
  Card,CardBody,CardTitle,CardSubtitle,CardText
} from "reactstrap";
import * as Fiicons from 'react-icons/fi'
import * as AIicons from 'react-icons/ai'
import { Navigate, useLocation } from "react-router-dom";
function AddTasks() {
  const navigate = useNavigate();
  const location = useLocation();
  var today = new Date().toISOString().slice(0, 10);
    const [formData,SetFormData] = useState({
        project: {"id":location.state.id},
        taskName:"",
        startDate:"",
        endDate:"",
        taskDescription:"",
        postDate: today,
        paymentStatus: {"id" : 9},
        status: {"id": 13}
    })
    const [Tasks,setTasks] = useState([])

    const [addButtonStatus,setAddButtonStatus] = useState(true)
    let name,value;
    const handelChange=(e)=>{
        name = e.target.name;
        value=e.target.value;
        SetFormData({...formData,[name]:value})
    }

    const addTasks=()=>{
        setTasks([...Tasks,formData])
        SetFormData({
        project: {"id":location.state.id},
        taskName:"",
        startDate:"",
        endDate:"",
        taskDescription:"",
        postDate: today,
        paymentStatus: {"id" : 9},
        status: {"id": 13}
        });
    }
    
    const addTasksList = () => {
      console.log(Tasks);
      axios
      .post("http://localhost:8082/task/add", Tasks)
      .then((response) => {
        navigate("tasklist")
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
    const deleteTask=(index)=>{
        const updatedTasks = Tasks.filter((element,id)=>{
            return index != id;
          })
          setTasks(updatedTasks)
    }
   
    const editTask=(index)=>{
        const editMode = Tasks.filter((element,id)=>{
            return index == id;
          })
          setAddButtonStatus(false)
        console.log(editMode)
        SetFormData({
          TaskName: editMode[0].TaskName,
          StartDate: editMode[0].StartDate,
          EndDate: editMode[0].EndDate,
          TaskDesc: editMode[0].TaskDesc,
        }); 
    }
    const updateTask=()=>{
        setAddButtonStatus(true)
    }
  return (
    <React.Fragment>
      <Container fluid style={{ padding: "0px" }}>
        <DashboardSideBar pageType="freelancer" />
        <Row id="post-project-form">
          <DashboardTopNav />
          <Col xs="10" id="form-col" className="flex-box">
            <section id="postproject-form">
              <Row>
                <Col md="4">
                  <Label>Task Name</Label>
                  <Input
                    type="text"
                    name="taskName"
                    value={formData.taskName}
                    onChange={handelChange}
                  />
                </Col>
                <Col md="4">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handelChange}
                  />
                </Col>
                <Col md="4">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handelChange}
                  />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col xs="12">
                  <Label>Task Description</Label>
                  <Input
                    id="exampleText"
                    name="taskDescription"
                    type="textarea"
                    ss
                    rows="7"
                    value={formData.taskDescription}
                    onChange={handelChange}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs="4" md="2">
                  {addButtonStatus ? (
                    <Button color="primary" onClick={addTasks}>
                      Save Tasks
                    </Button>
                  ) : (
                    <Button color="primary" onClick={updateTask}>Edit</Button>
                  )}
                </Col>
                <Col xs="4" md="2">
                  <Button color="primary" onClick={addTasksList}>Post Task</Button>
                </Col>
                <Col xs="4" md="2">
                  <Button
                    color="danger"
                    onClick={() => {
                      setTasks([]);
                    }}
                  >
                    Clear All
                  </Button>
                </Col>
              </Row>
              <Row className="mt-3">
                <section id="task-list">
                  {Tasks.map((element, index) => {
                    return (
                      <Card
                        color="light"
                        style={{ width: "50%" }}
                        id="task-card"
                      >
                        <CardBody>
                          <CardTitle tag="h5">{element.taskName}</CardTitle>
                          {/* <CardSubtitle className="mb-2 text-muted" tag="h6">
                            {element.MinBudget +
                              "$" +
                              "-" +
                              element.MaxBudget +
                              "$"}
                          </CardSubtitle> */}
                          <CardText style={{ width: "50%" }}>
                            {element.taskDescription.length > 250
                              ? element.taskDescription.substring(0, 250) + "..."
                              : element.taskDescription.substring(0, 250)}
                          </CardText>
                          <Fiicons.FiEdit
                            size={30}
                            color="green"
                            onClick={() => editTask(index)}
                          />
                          <AIicons.AiOutlineDelete
                            size={32}
                            color="red"
                            style={{ marginLeft: "1%" }}
                            onClick={() => deleteTask(index)}
                          />
                        </CardBody>
                      </Card>
                    );
                  })}
                </section>
              </Row>
            </section>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
export default AddTasks;
