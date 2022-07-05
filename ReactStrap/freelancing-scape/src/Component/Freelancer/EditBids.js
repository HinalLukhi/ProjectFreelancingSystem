import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  Input,
  FormGroup,
  Label,
  Row,
  Col,
} from "reactstrap";
import * as Hiicons from "react-icons/hi";
import * as Aiicons from "react-icons/ai";

function EditBids(props) {
  const [range, setRange] = useState(0);
  const handleBudgetRange = (e) => {
    setRange(e.target.value);
  };
  const [projectData, setProjectData] = useState([]);
  const [deleveryTime, setDelevryTime] = useState(1);
  const [typeDuration, setTypeDuration] = useState();
  //   const [formData, setFormData] = useState({
  //     project: { id: location.state.id },
  //     user: { id: user.id },
  //     amount: range,
  //     bidDate: new Date().toISOString().slice(0,10),
  //     deliveryTime: 1,
  //     status: { id: 9 },
  //   });
  const setValues = () => {
    // formData.amount = range;
    // if (typeDuration == "Months") {
    //   formData.deliveryTime = deleveryTime * 30;
    // } else if (typeDuration == "Year") {
    //   formData.deliveryTime = deleveryTime * 365;
    // } else {
    //   formData.deliveryTime = deleveryTime;
    // }
  };
  return (
    <React.Fragment>
      <Modal toggle isOpen={props.toggle}>
        <ModalHeader toggle={props.toggle}>Edit Your Bid</ModalHeader>
        <ModalBody id="modalHeight">
          <section id="bid-header">
            <h4 className="text-muted">Edit Your Bid Now !</h4>
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
                    onClick={() => setDelevryTime(parseInt(deleveryTime) + 1)}
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
          </article>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Update</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default EditBids;
