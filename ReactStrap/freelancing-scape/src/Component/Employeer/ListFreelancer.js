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
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import * as FAicons from "react-icons/fa";
import * as Mdicons from "react-icons/md";
import Footer from "../common/Footer";
import axios from "axios";
function ListFreelancer() {
  const navigate = useNavigate();
  const goToProfileDesc = (id) => {
    navigate('profiledesc',{ state: { id: id } }); 
  }
  const [spinner, SetSpinner] = useState(true);
  const [data, setdata] = useState([]);
  const setList = () => {
    setTimeout(()=>{
      axios
      .get("http://localhost:8083/freelancer",{
      })
      .then((res) => {
        setdata(res.data);
        SetSpinner(false);
      });
    })
  };
  useEffect(() => {
    if (localStorage.getItem("loginStatus") === "false") {
      navigate("/");
    } else {
      setList();
    }
  }, [localStorage.getItem("loginStatus")]);
  

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
  const [searchField, setSearchField] = useState("")
  return (
    <React.Fragment>
      <Container tag={"section"} className="list-freelancer-form" fluid>
        <Row className="mt-5">
          <Col
            id="list-freelancer"
            style={{ marginLeft: "10rem", marginRight: "10rem" }}
          >
            <h3>Search</h3>
            <InputGroup>
              <Input
                type="text"
                onChange={(event) => {
                  setSearchField(event.target.value);
                }}
              />
              <Button color="primary">Search</Button>
            </InputGroup>
            <section className="mt-5">
              {data
                .filter((val) => {
                  if (searchField == "") {
                    return val;
                  } else if (
                    val.userprofiles[0].firstName
                      .toLowerCase()
                      .includes(searchField.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((val,e) => (
                  <Card body id="free-profile-list-card">
                    <Row className="text-center">
                      <Col xs="1" id="free-avatar">
                        <img
                          src={val.userprofiles[0].profileImage}
                          alt=""
                          style={{
                            borderRadius: "100px",
                            width: "100px",
                            height: "100px",
                          }}
                        />
                      </Col>
                      <Col xs="5" className=" text-align-center" id="free-name">
                        <h5>
                          {val.userprofiles[0].firstName +
                            " " +
                            val.userprofiles[0].lastName}
                        </h5>
                        <h6 className="fw-lighter">{val.tag_line}</h6>
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
                              {val.userprofiles[0].hourlyRate} $/hr
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
                            onClick={() => goToProfileDesc(val.id)}
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
      <Footer />
    </React.Fragment>
  );
}

export default ListFreelancer;
