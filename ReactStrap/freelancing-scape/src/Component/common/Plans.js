import React,{useEffect} from "react";
import { Badge,Button } from "reactstrap";
import {useNavigate} from 'react-router-dom';
import axios, { Axios } from "axios";
import { useState } from "react";

function Plans() {
  const [data, setdata] = useState([])
  const getData = () => {
    axios
      .get("http://localhost:8081/membership")
      .then((res) => {
        setdata(res.data);
      })
  }
  console.log(data);
  useEffect(() => {
    if (localStorage.getItem("loginStatus") === "false") {
      //navigate("/");
    } else {
      getData()
    }
  }, [localStorage.getItem("loginStatus")]);
  return (
    <React.Fragment>
      <div>
        <div className="con-items ">
          <div className="item item1">
           
            <section>
              <h3>{data[1].planName}</h3>
              <p>
                <b>{data[1].amount}$ / user</b>
              </p>
            </section>
            <ul>
              <li>
                <i className="bx bx-check" />
                Post Limit <b>{data[1].postLimit}</b>
              </li>
              <li>
                <i className="bx bx-check" />
                Bid Limit <b>{data[1].bidLimit}</b>
              </li>
              
            </ul>
            <Button className="border">Choose Plan</Button>
          </div>
          <div className="item color item2">
            <Badge color="primary">Popular</Badge>
            <section>
              <h3>{data[2].planName}</h3>
              <p>
                <b>{data[2].amount}$ / user</b>
              </p>
            </section>
            <ul>
              <li>
                <i className="bx bx-check" />
                Post Limit <b>{data[2].postLimit}</b>
              </li>
              <li>
                <i className="bx bx-check" />
                Bid Limit <b>{data[2].bidLimit}</b>
              </li>
              
            </ul>
            <Button className="border">Choose Plan</Button>
          </div>
          <div className="item item3">
            
          <section>
              <h3>{data[3].planName}</h3>
              <p>
                <b>{data[3].amount}$ / user</b>
              </p>
            </section>
            <ul>
              <li>
                <i className="bx bx-check" />
                Post Limit <b>{data[3].postLimit}</b>
              </li>
              <li>
                <i className="bx bx-check" />
                Bid Limit <b>{data[3].bidLimit}</b>
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
