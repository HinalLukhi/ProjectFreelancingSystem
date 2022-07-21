import React,{useEffect} from "react";
import { Badge,Button } from "reactstrap";
import {useNavigate} from 'react-router-dom';
import axios, { Axios } from "axios";
import { useState } from "react";

function Plans() {
  const [data, setdata] = useState({})
  const getData = () => {
    axios
      .get("http://localhost:8081/membership")
      .then((res) => {
        setdata(res.data);
      })
  }
  useEffect(() => {
    if (localStorage.getItem("loginStatus") === "false") {
      //navigate("/");
    } else {
      getData()
    }
  }, []);
  return (
    <React.Fragment>
     * <div>
        <div className="con-items ">
          <div className="item item1">
            <section>
              <h3>{Array.isArray(data) && data[1].planName}</h3>
              <p>
                <b>{Array.isArray(data) && data[1].amount}$ / user</b>
              </p>
            </section>
            <ul>
              <li>
                <i className="bx bx-check" />
                Post Limit <b>{Array.isArray(data) && data[1].postLimit}</b>
              </li>
              <li>
                <i className="bx bx-check" />
                Bid Limit <b>{Array.isArray(data) && data[1].bidLimit}</b>
              </li>
              
            </ul>
            <Button className="border">Choose Plan</Button>
          </div>
           <div className="item color item2">
            <Badge color="primary">Popular</Badge>
            <section>
              <h3>{Array.isArray(data) && data[2].planName}</h3>
              <p>
                <b>{Array.isArray(data) && data[2].amount}$ / user</b>
              </p>
            </section>
            <ul>
              <li>
                <i className="bx bx-check" />
                Post Limit <b>{Array.isArray(data) && data[2].postLimit}</b>
              </li>
              <li>
                <i className="bx bx-check" />
                Bid Limit <b>{Array.isArray(data) && data[2].bidLimit}</b>
              </li>
              
            </ul>
            <Button className="border">Choose Plan</Button>
          </div>
          <div className="item item3">
            
          <section>
              <h3>{Array.isArray(data) && data[3].planName}</h3>
              <p>
                <b>{Array.isArray(data) && data[3].amount}$ / user</b>
              </p>
            </section>
            <ul>
              <li>
                <i className="bx bx-check" />
                Post Limit <b>{Array.isArray(data) && data[3].postLimit}</b>
              </li>
              <li>
                <i className="bx bx-check" />
                Bid Limit <b>{Array.isArray(data) && data[3].bidLimit}</b>
              </li>
              
            </ul>
            <Button className="border">Choose Plan</Button>
          </div> 
        </div>
      </div> 
    </React.Fragment>
  );
}

export default Plans;
