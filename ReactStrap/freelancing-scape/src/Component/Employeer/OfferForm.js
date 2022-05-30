import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 
{ 
Button,
Modal,ModalBody,ModalFooter,ModalHeader,
InputGroup,InputGroupText,Input
} from "reactstrap";
import * as Hiicons from "react-icons/hi";
import * as Aiicons from "react-icons/ai";
function OfferForm(props) {
  return (
    <React.Fragment>
      <Modal isOpen={props.formOpen}>
        <ModalHeader toggle={props.formOpen}>Make An Offer</ModalHeader>
        <ModalBody>
          <h4 className="text-muted mb-4" style={{ textAlign: "center" }}>
            DiscussYour Project With Devid
          </h4>
          <InputGroup style={{ marginBottom: "3%" }}>
            <InputGroupText style={{ padding: "15px" }}>
              <Aiicons.AiOutlineUser />
            </InputGroupText>
            <Input
              placeholder="FirstName And LastName"
              style={{ padding: "10px" }}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupText style={{ padding: "15px" }}>
              <Hiicons.HiOutlineMail />
            </InputGroupText>
            <Input placeholder="Email" style={{ padding: "10px" }} />
          </InputGroup>

          <InputGroup className="mt-3">
            <InputGroupText>
              <Hiicons.HiOutlineMailOpen/>
            </InputGroupText>
            <Input placeholder="Subject" style={{ padding: "10px" }} />
          </InputGroup>

          <Input id="exampleText" className="mt-4" name="text" type="textarea" placeholder="Message" rows="6"/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Make An Offer</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default OfferForm;
