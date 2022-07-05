import React from "react";
import NavBar from "../../Component/common/NavBar";
import IntroBanner from "../../Component/Employeer/IntroBanner";
import ListFreelancer from "../../Component/Employeer/ListFreelancer";
import { Outlet } from "react-router-dom";
import Footer from "../../Component/common/Footer";
import { useLocation } from "react-router-dom";
function Employeer() {
  const location = useLocation();
  return (
    <React.Fragment>
      <NavBar pageType="Employer" />
      <Outlet />
      {
      ( 
        location.pathname !== "/employer/postproject" &&
        location.pathname !== "/employer/managebidders" &&
        location.pathname !== "/employer/userprofile" &&
        location.pathname !== "/employer/allprojects" &&
        location.pathname !== "/employer/dashboard" 
        ) 
       && <Footer />}
    </React.Fragment>
  );
}

export default Employeer;
