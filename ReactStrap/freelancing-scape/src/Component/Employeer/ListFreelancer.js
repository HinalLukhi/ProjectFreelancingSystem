import React,{useState,useEffect,useContext} from "react";
import avatar from "../../Images/user-avatar-small-02.jpg";
import { useNavigate } from "react-router-dom";
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
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import * as FAicons from "react-icons/fa";
import * as Mdicons from "react-icons/md";

import { UserContext } from "../../UserContext";

import axios from "axios";
function ListFreelancer() {
  const navigate = useNavigate();
  const {loginstat,usrname,token} = useContext(UserContext);
  const [loginstatus] = loginstat;
  const [tokenstr] = token;
  const goToProfileDesc = () => {
    /* console.log("ajbdashj")
    navigate('profiledesc'); */
  }
  const [data, setdata] = useState([]);
  const setList = () => {
    axios.get("/freelancer", { headers: {"Authorization" : `Bearer ${tokenstr}`} }).then((res) =>{
    setdata(res.data);
    /* console.log(data);
     data.map((e) => console.log(" data : " + e[0]));  */
    });
  }
  useEffect(() =>{
    if(!loginstatus){
        navigate("/");
    }else{
      setList();
      console.log(data);
    }
  },[loginstatus]);
  

  const [skill,setSkill] = useState("");

  const [skills,setSkills] = useState([]);

  const addSkill=()=>{
    if(skill!=""){
    setSkills([...skills,skill]);
    setSkill('')}
  }
  const deleteSkill=(index)=>{
  //  console.log(index)
    const updatedSkills = skills.filter((element,id)=>{
      return index != id;
    })
    setSkills(updatedSkills)
  }
  const [range,setRange]=useState("")

  const printRange=()=>{

  }
  return (
    <React.Fragment>
      <Container tag={"section"} className="list-freelancer-form" fluid>
        <Row className="mt-5">
          <Col lg="3" id="filter-form">
            <h3>Location</h3>
            <InputGroup>
              <Input placeholder="username" />
              <InputGroupText style={{ backgroundColor: "white" }}>
                <FAicons.FaSearchLocation size={25} color="gray" />
              </InputGroupText>
            </InputGroup>
            <h3>Hourly Rate</h3>
            <Label>0$ - {range}$</Label>
            <Input id="exampleRange" name="range" type="range" value={range} onChange={
            (e)=>{
              setRange(e.target.value)
            }
            } />
            <h3>Skills</h3>
            <InputGroup>
              <Input type="text" placeholder="php,reactjs" 
              value={skill} 
              onChange={(e)=>setSkill(e.target.value)}
              />
              <Button style={{ backgroundColor: "white", color: "#2A41E8" }}
              onClick={addSkill}
              >
                <FAicons.FaPlus size={25} />
              </Button>
            </InputGroup>
            <section style={{display:"flex",flexWrap:"wrap"}} className="mt-3">
              {
                skills.map((element,index)=>{
                  return (
                    <span className="skill-badge"  key={index}>
                      {element}
                      <Mdicons.MdClose size={25} style={{margin:10}} onClick={()=>deleteSkill(index)}/>
                    </span>
                  );
                })
              }
             
            </section>
          </Col>
          <Col lg="9" id="list-freelancer">
            <h3>Search</h3>
            <InputGroup>
              <Input />
              <Button color="primary">Search</Button>
            </InputGroup>
            <section className="mt-5">
              {data.map((e) => (
                <Card body id="free-profile-list-card">
                  <Row>
                    <Col xs="1" id="free-avatar">
                      <img
                        src={"../Images/" + e.profile_image}
                        alt=""
                        style={{
                          borderRadius: "100px",
                          width: "100px",
                          height: "100px",
                        }}
                      />
                    </Col>
                    <Col xs="5" className=" text-align-center" id="free-name">
                      <h5>{e.first_name + " " + e.last_name}</h5>
                      <h6 className="fw-lighter">{e.tag_line}</h6>
                    </Col>
                    <Col xs="6" id="free-list-button">
                      <CardText>
                        <ListGroup horizontal>
                          <ListGroupItem
                            className="justify-content-between banner-list-item border-left"
                            style={{ color: "black" }}
                          >
                            <section className="count">Job Sucess</section>
                            99%
                          </ListGroupItem>
                          <ListGroupItem
                            className="justify-content-between banner-list-item"
                            style={{ color: "black" }}
                          >
                            <section className="count">Rate</section>
                            {e.hourly_rate} $/hr
                          </ListGroupItem>
                          <ListGroupItem
                            className="justify-content-between banner-list-item"
                            style={{ color: "black" }}
                          >
                            <section className="count">Location</section>
                            London
                          </ListGroupItem>
                        </ListGroup>
                        <Button
                          color="primary"
                          className="mt-3"
                          style={{ width: "100%" }}
                          onClick={goToProfileDesc()}
                        >
                          View Profile
                        </Button>
                      </CardText>
                    </Col>
                  </Row>
                </Card>
              ))}
            </section>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default ListFreelancer;
