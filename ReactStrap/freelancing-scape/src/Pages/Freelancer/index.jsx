import React from "react";
import IntroBanner from "../../Component/Guest/IntroBanner";
import NavBar from "../../Component/common/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../../Component/common/Footer";
import { useLocation } from "react-router-dom";
function Freelancer() {
  const location = useLocation();
  return (
    <>
      <NavBar pageType="Freelancer" />
      <Outlet />
      {
        (
        location.pathname !== "/freelancer/assignedprojects" &&
        location.pathname !== "/freelancer/managebids" &&
        location.pathname !== "/freelancer/userprofile" &&
        location.pathname !== "/freelancer/dashboard" &&
        location.pathname !== "/freelancer/assignedprojects/addtask"
        ) && <Footer />}
    </>
  );
}

export default Freelancer;
