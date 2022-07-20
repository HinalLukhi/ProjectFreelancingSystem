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
import axios from "axios";





function OfferForm(props) {
  
  const[mailInfo, setMailInfo] = useState({});
  const[message, setMessage] = useState("");
  const[subject, setSubject] = useState("");
  
  const sendOffer = () => {
    axios.post("http://localhost:8083/offer", mailInfo).then(res => res);
  }
  
  const subHandler = e => {
    setSubject(e.target.value);
  }
  
  const messageHandler = e => {
    setMessage(e.target.value);
  }
  
  const createOffer = () =>{
    setMailInfo(prev => ({
      sender: props.employerEmail,
      receiver: props.freelancerEmail,
      message: message,
      subject:subject
    }), sendOffer())
  }
  
  return (
    <React.Fragment>
      <Modal isOpen={props.formOpen}>
        <ModalHeader toggle={props.formOpen}>Make An Offer</ModalHeader>
        <ModalBody>
          <h4 className="text-muted mb-4" style={{ textAlign: "center" }}>
            DiscussYour Project With Devid
          </h4>
          <InputGroup className="mt-3">
            <InputGroupText>
              <Hiicons.HiOutlineMailOpen/>
            </InputGroupText>
            <Input placeholder="Subject" style={{ padding: "10px" }} onChange={subHandler}/>
          </InputGroup>

          <Input id="exampleText" onChange={messageHandler} className="mt-4" name="text" type="textarea" placeholder="Message" rows="6"/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>createOffer()}>Make An Offer</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default OfferForm;
