import { FlatTree } from "framer-motion";
import React, { useState } from "react";
import { Container, Row, Col, ButtonGroup, Button } from "reactstrap";
import Login from "./Login";
import Registration from "./Registration";
function RegistrationContainer(props) {

  const [formActive,setFormActive]= useState(
    {
      Login:true,
      Registration:false
    }
  );

  const toggleForm =()=>{
    setFormActive(prevState=>({
      Login :!prevState.Login,
      Registration:!prevState.Registration
    }))
  }

  return (
    <React.Fragment>
      <Container id="reg-container">
        <Row id="user-select">
          <Col xs="6">
            <ButtonGroup style={{ height: "50px", width: "100%" }}>
              <Button outline 
              id={formActive.Login ? "form-type-button" :""}
              className="default-from-type-button"
              onClick={toggleForm}>
                Login
              </Button>
              <Button outline 
              id={formActive.Registration ? "form-type-button" :""}
              className="default-from-type-button"
              onClick={toggleForm}>
                Registration
              </Button>
            </ButtonGroup>
          </Col>
          <Col xs="4"></Col>
          <Col xs="1" style={{ marginLeft: "5%", paddingTop: "3%" }}>
            <Button close style={{}} onClick={()=>{props.toggleReg()}} />
          </Col>
        </Row>
        <Row id="login-reg-form">
          {
            formActive.Login &&   <Login />
          }
          {
          formActive.Registration && <Registration/>
          }
        
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default RegistrationContainer;
