import React,{useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Row,
    Col,
    Container,
    FormGroup,
    Label,
    Input,
    Button,
    InputGroup,
    Alert
} from "reactstrap";
import * as RiIcons from "react-icons/ri";
import {useLocation} from 'react-router-dom';
import axios from "axios";
import { useNavigate} from "react-router-dom";

function TaskDescription() {
  var user = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate()
  const location = useLocation()
  const [range,setRange] = useState(0)
  const handleBudgetRange=(e)=>{
    setRange(e.target.value)
  }
  const [projectData, setProjectData] = useState([]);
  const [isAlertOn,setAlert] = useState(false);
  const [bidMessage, setBidMessage] = useState("");
  const setList = () => {
   let response =  axios
      .get("http://localhost:8082/project/"+location.state.id)
      .then((res) => {
        setProjectData(res.data);
        setRange(res.data.minBudget)
      });
  };
  useEffect(() => {
    if (localStorage.getItem("loginStatus") === "false") {
      navigate("/");
    } else {
      setList();
    }
  }, [localStorage.getItem("loginStatus")]);

  function daysDiff(dateTo) {
      let today = new Date();
      var cmas = new Date(today.getFullYear(),today.getMonth(), today.getDate()).toISOString().slice(0,10);
      console.log(cmas)
      // var today = new Date().toISOString().slice(0, 10);
      // let t = new Date(today);
      // console.log(t);
      // const diffInMs = Math.abs(dateTo - t);
      // var x = diffInMs / (1000 * 60 * 60 * 24);
      // console.log(x);
  }

  const [deleveryTime,setDelevryTime] = useState(1)
  const [typeDuration,setTypeDuration] = useState()

  

  const [formData, setFormData] = useState({
    project: { id: location.state.id },
    user: { id: user.id },
    amount: range,
    bidDate: new Date().toISOString().slice(0,10),
    deliveryTime: 1,
    status: { id: 6 },
  });
  const [postStatus,setPostStatus]=useState(false)
  const [postMessage,setPostMessage] =useState(false)

  const insertBid=()=>{
    axios
    .post("http://localhost:8082/bids/add", formData)
    .then((response) => {
      if(response.data == ""){
        setBidMessage("Your bid is already there!!");
        setPostStatus(true)
        setPostMessage(false)
      } else {
        setBidMessage("Bid posted successfully");
        setPostStatus(true);
        setPostMessage(true)
      }
      
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  }

  const setValues=()=>{
    formData.amount = range;
    if (typeDuration == "Months") {
      formData.deliveryTime = deleveryTime * 30;
    } else if (typeDuration == "Year") {
      formData.deliveryTime = deleveryTime * 365;
    } else {
      formData.deliveryTime = deleveryTime;
    }
    addBid();
  }
  const addBid=()=>{
    insertBid()
  }
  return (
    <div>
      <Container fluid style={{ paddingTop: "4rem" }}>
        <Row id="single-task">
          <Col id="single-task-name" xs="6">
            <h3>{projectData.projectName}</h3>
          </Col>
        </Row>
        <Row>
          <Col xs="6" id="free-aboutme">
            <h3 style={{ fontWeight: "400", marginBottom: "3%" }}>
              Project Description
            </h3>
            <p style={{ lineHeight: "35px", textAlign: "left" }}>
              {projectData.projectDescription}
            </p>
            <section id="free-work-exp">
              <h3 style={{ fontWeight: "400", marginBottom: "3%" }}>
                Attachments
              </h3>
              <section id="attachment-span">
                <RiIcons.RiAttachmentLine size={30} />
              </section>
            </section>
            <section className="mt-4">
              <h3 style={{ fontWeight: "400", marginBottom: "3%" }}>Skills</h3>
              <article style={{ display: "flex", flexWrap: "wrap" }}>
              {Array.isArray(projectData.projectskills) && projectData.projectskills.map(s => {
                return(
                  <span
                                className="skill-badge"
                                style={{ width: "100px" }}
                              >
                                {s.name}
                              </span>
                )
              })}
              </article>
            </section>
          </Col>
          <Col id="free-job-details">
            <Row>
              {postStatus &&
              <Alert color={postMessage?"success":"danger"} className="text-center" onClick={()=>setPostStatus(!postStatus)}>{bidMessage}</Alert>
              }
            </Row>
            <Row id="days-left">{daysDiff(projectData.startDate)} 6 days</Row>
            <Row id="budget" className="mt-2">
              {projectData.minBudget + "$ - " + projectData.maxBudget + "$"}
            </Row>
            <Row id="bid-form" className="mt-2">
              <section id="bid-header">
                <h4 className="text-muted">Bid On This Task!</h4>
              </section>
              <article id="bid-controls" className="mt-5">
                <FormGroup style={{ backgroundColor: "" }}>
                  <h5>
                    <span className="text-muted">Set You'r Minimal</span> Rate
                  </h5>
                  <Label for="exampleRange">{range} $</Label>
                  <Input
                    id="exampleRange"
                    max={projectData.maxBudget}
                    min={projectData.minBudget}
                    name="range"
                    type="range"
                    value={range}
                    onChange={handleBudgetRange}
                  />
                </FormGroup>
                <h5>
                  <span className="text-muted">Set You'r </span> delivery time
                </h5>
                <Row className="mt-4 display-flex">
                  <Col md="6">
                    <InputGroup>
                      <Button
                        color="primary"
                        onClick={() => setDelevryTime(deleveryTime - 1)}
                      >
                        -
                      </Button>
                      <Input
                        className="text-center"
                        style={{ width: "10%" }}
                        readOnly
                        name="deleveryTime"
                        value={deleveryTime}
                        onChange={(e) => setDelevryTime(e.target.value)}
                      />
                      <Button
                        color="primary"
                        onClick={() =>
                          setDelevryTime(parseInt(deleveryTime) + 1)
                        }
                      >
                        +
                      </Button>
                    </InputGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                        onChange={(e) => {
                          setTypeDuration(e.target.value);
                        }}
                      >
                        <option>Days</option>
                        <option>Months</option>
                        <option>Year</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <section className="display-flex">
                  <Button
                    color="primary"
                    style={{ width: "60%" }}
                    onClick={setValues}
                  >
                    Place Bid
                  </Button>
                </section>
              </article>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TaskDescription;
