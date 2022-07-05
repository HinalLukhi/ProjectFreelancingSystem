import React,{useState} from "react";

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
  Card,CardBody,CardTitle,CardSubtitle,CardText
} from "reactstrap";
import * as Fiicons from 'react-icons/fi'
import * as AIicons from 'react-icons/ai'

function AddTasks() {

    const [formData,SetFormData] = useState({
        TaskName:"",
        StartDate:"",
        EndDate:"",
        MinBudget:"",
        MaxBudget:"",
        TaskDesc:"",
        FilePath:""
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
          TaskName: "",
          StartDate: "",
          EndDate: "",
          MinBudget: "",
          MaxBudget: "",
          TaskDesc: "",
          FilePath: "",
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
          MinBudget: editMode[0].MinBudget,
          MaxBudget: editMode[0].MaxBudget,
          TaskDesc: editMode[0].TaskDesc,
          //FilePath: editMode[0].FilePath,
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
                    name="TaskName"
                    value={formData.TaskName}
                    onChange={handelChange}
                  />
                </Col>
                <Col md="4">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    name="StartDate"
                    value={formData.StartDate}
                    onChange={handelChange}
                  />
                </Col>
                <Col md="4">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    name="EndDate"
                    value={formData.EndDate}
                    onChange={handelChange}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Label>Budget</Label>
                <Col md="4">
                  <InputGroup>
                    <Input
                      placeholder="Min"
                      name="MinBudget"
                      value={formData.MinBudget}
                      onChange={handelChange}
                    />
                    <InputGroupText className="lead">USD</InputGroupText>
                  </InputGroup>
                </Col>
                <Col md="4">
                  <InputGroup>
                    <Input
                      placeholder="Max"
                      name="MaxBudget"
                      value={formData.MaxBudget}
                      onChange={handelChange}
                    />
                    <InputGroupText className="lead">USD</InputGroupText>
                  </InputGroup>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col xs="12">
                  <Label>Task Description</Label>
                  <Input
                    id="exampleText"
                    name="TaskDesc"
                    type="textarea"
                    ss
                    rows="7"
                    value={formData.TaskDesc}
                    onChange={handelChange}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs="12">
                  <FormGroup>
                    <Label for="exampleFile">File</Label>
                    <Input
                      id="exampleFile"
                      name="FilePath"
                      type="file"
                      value={formData.FilePath}
                      onChange={handelChange}
                    />
                    <FormText>
                      Images or documents that might be helpful in describing
                      your Task
                    </FormText>
                  </FormGroup>
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
                  <Button color="primary">Post Task</Button>
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
                          <CardTitle tag="h5">{element.TaskName}</CardTitle>
                          <CardSubtitle className="mb-2 text-muted" tag="h6">
                            {element.MinBudget +
                              "$" +
                              "-" +
                              element.MaxBudget +
                              "$"}
                          </CardSubtitle>
                          <CardText style={{ width: "50%" }}>
                            {element.TaskDesc.length > 250
                              ? element.TaskDesc.substring(0, 250) + "..."
                              : element.TaskDesc.substring(0, 250)}
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
