import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Row,
  Col,
  Container,
  List,
  ListInlineItem,
  Badge,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Button,
  Progress,
} from "reactstrap";
import avatar from "../../Images/user-avatar-small-02.jpg";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";
import StarRatingComponent from "react-star-rating-component";
import OfferForm from "./OfferForm";
import Footer from "../common/Footer";
import {useLocation} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProfileDescription(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const [offerForm, setOfferForm] = useState(false);
  const toggleOfferForm = () => {
    setOfferForm(!offerForm);
    console.log(offerForm);
  };
  const [range,setRange] = useState("")
  const handleBudgetRange=(e)=>{
    setRange(e.target.value)
  }
  const [spinner, SetSpinner] = useState(true);
  const [data, setdata] = useState([]);
  const [profile, setProfile] = useState({});
  const [freelancerSkills, setFreelancerSkills] = useState([]);
  const [fEmail, setFEmail] = useState("");
  const [employer, setEmployer] = useState({});
  const [eEmail, setEEmail] = useState("");

  const setList =  () => {
    let response =  axios
      .get("http://localhost:8083/"+location.state.id,{
      })
      .then((res) => {
        axios.get("http://localhost:8083/skill/"+res.data.userprofiles[0].id
        ).then(res => {
          setFreelancerSkills(res.data);
        });
        setdata(res.data,
          setFEmail(res.data.email));
        setProfile(res.data.userprofiles[0]);
        SetSpinner(false);
      });
  };


  var FirstName;
  

  useEffect(() => {
    if (localStorage.getItem("loginStatus") === "false") {
      navigate("/");
    } else {
      setList();
      let emp = JSON.parse(localStorage.userData)
      // axios.get("http://localhost:8083/"+ localStorage.userData.id)
      //   .then(res => setEEmail(res))
      setEEmail(emp.email);
    }
  },[location.state.id]);
  return (
    <React.Fragment>
      <Container fluid >
            { offerForm && (<OfferForm formOpen={toggleOfferForm} freelancerEmail={fEmail} employerEmail={eEmail}/>)}
        <Row id="single-freelancer"  >
          <section id="background-white" className="mt-5">
            <Col
              xs="2"
              id="profile-section"
              style={{ backgroundColor: "", textAlign: "center" }}
            >
              <img src={profile.profileImage} alt="" id="big-avatar" />
            </Col>
            <Col id="single-free-name">
              <h3>{profile.firstName + " " +profile.lastName}</h3>
              <h4 className="text-muted">{profile.tagLine}</h4>

              <List type="inline">
                <ListInlineItem>
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={3}
                    id="star"
                  />
                </ListInlineItem>
                <ListInlineItem>London</ListInlineItem>
                <ListInlineItem>
                  <Badge color="success">Verified</Badge>
                </ListInlineItem>
              </List>
            </Col>
          </section>
        </Row>
        <Row>
          <Col xs="6" id="free-aboutme">
            <h3 style={{ fontWeight: "400", marginBottom: "3%" }}>About Me</h3>
            <p style={{ lineHeight: "35px", textAlign: "left" }}>
             {profile.userDescription}
            </p>
            <section id="free-work-exp">
              <h3 style={{ fontWeight: "400", marginBottom: "3%" }}>
                History Of Work
              </h3>
              <Card>
                <CardBody>
                  <CardTitle tag="h5">
                    Web, Database and API Developer
                  </CardTitle>
                  <CardSubtitle className="mb-2 text-muted lead" tag="h6">
                    Rated as Freelancer
                    <List type="inline">
                      <ListInlineItem className="mt-2">
                        <AiIcons.AiOutlineCalendar />
                        <span style={{ fontSize: "18px" }}>19 Deceber</span>
                      </ListInlineItem>
                    </List>
                  </CardSubtitle>
                  <CardText>
                    Excellent programmer - fully carried out my project in a
                    very professional manner.
                  </CardText>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle tag="h5">
                    Web, Database and API Developer
                  </CardTitle>
                  <CardSubtitle className="mb-2 text-muted lead" tag="h6">
                    Rated as Freelancer
                    <List type="inline">
                      <ListInlineItem className="mt-2">
                        <AiIcons.AiOutlineCalendar />
                        <span style={{ fontSize: "18px" }}>19 Deceber</span>
                      </ListInlineItem>
                    </List>
                  </CardSubtitle>
                  <CardText>
                    Excellent programmer - fully carried out my project in a
                    very professional manner.
                  </CardText>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle tag="h5">
                    Web, Database and API Developer
                  </CardTitle>
                  <CardSubtitle className="mb-2 text-muted lead" tag="h6">
                    Rated as Freelancer
                    <List type="inline">
                      <ListInlineItem className="mt-2">
                        <AiIcons.AiOutlineCalendar />
                        <span style={{ fontSize: "18px" }}>19 Deceber</span>
                      </ListInlineItem>
                    </List>
                  </CardSubtitle>
                  <CardText>
                    Excellent programmer - fully carried out my project in a
                    very professional manner.
                  </CardText>
                </CardBody>
              </Card>
            </section>
          </Col>

          <Col id="free-job-details">
            <Row style={{ display: "" }}>
              <ListGroup
                horizontal
                style={{
                  height: "70px",
                  fontSize: "20px",
                  paddingRight: "10%",
                  paddingLeft: "10%",
                }}
              >
                <ListGroupItem
                  className="justify-content-between banner-list-item border-left"
                  style={{ color: "black", textAlign: "center" }}
                >
                  <section className="count">Hourly Rate</section>
                  {profile.hourlyRate}$
                </ListGroupItem>
                <ListGroupItem
                  className="justify-content-between banner-list-item"
                  style={{ color: "black", textAlign: "center" }}
                >
                  <section className="count">Jobe Done</section>
                  80%
                </ListGroupItem>
                <ListGroupItem
                  className="justify-content-between banner-list-item"
                  style={{ color: "black", textAlign: "center" }}
                >
                  <section className="count">Hired</section>
                  13 Times
                </ListGroupItem>
              </ListGroup>
            </Row>
            <Row>
              <Button
                color="primary"
                style={{ height: "55px" }}
                id="makeanoffer"
                onClick={toggleOfferForm}
              >
                Make An Offer
              </Button>
            </Row>
            <Row className="mt-5">
              <Col xs="6">
                <h4 className="lead">88%</h4>
                <Progress animated value={88} />
                <h4 className="lead mt-2">Job Sucess</h4>
                <h4 className="lead mt-4">60%</h4>
                <Progress animated value={60} />
                <h4 className="lead mt-2">OnTime</h4>
              </Col>
              <Col xs="6">
                <h4 className="lead">98%</h4>
                <Progress animated value={98} />
                <h4 className="lead mt-2">Recomendation</h4>
                <h4 className="lead mt-4">50%</h4>
                <Progress animated value={50} />
                <h4 className="lead mt-2">On Budget</h4>
              </Col>
            </Row>
            <Row>
              <h3
                style={{ fontWeight: "400", marginBottom: "3%" }}
                className="mt-4"
              >
                Social Profiles
              </h3>
              <List type="inline">
                <ListInlineItem>
                  <AiIcons.AiFillLinkedin size={25} color="gray" />
                </ListInlineItem>
                <ListInlineItem>
                  <AiIcons.AiFillFacebook size={25} color="gray" />
                </ListInlineItem>
                <ListInlineItem>
                  <CgIcons.CgWebsite size={25} color="gray" />
                </ListInlineItem>
              </List>
            </Row>
            <Row className="mt-2">
              <h3
                style={{ fontWeight: "400", marginBottom: "3%" }}
                className="mt-4"
              >
                Skills
              </h3>
              {freelancerSkills.map(s => (
                (
                  <span className="skill-badge"
                  key={s.skill.id}>
                    {s.skill.skillName}
                  </span>
                )
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default ProfileDescription;
