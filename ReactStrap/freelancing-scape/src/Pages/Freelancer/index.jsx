import React from "react";
import IntroBanner from "../../Component/Guest/IntroBanner";
import NavBar from "../../Component/common/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../../Component/common/Footer";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function Freelancer() {
  const location = useLocation();
  
  const path = location.pathname
  const [path1,setpath] = useState()
  return (
    <>
      <NavBar pageType="Freelancer" />
      <Outlet />
      {
        path !== "/freelancer/assignedprojects" &&
        path !== "/freelancer/managebids" &&
        path !== "/freelancer/userprofile" &&
        path !== "/freelancer/dashboard" &&
        path !== "/freelancer/assignedprojects/addtask" &&
        path !== "/freelancer/assignedprojects/TaskList" && <Footer />}
    </>
  );
}

export default Freelancer;
