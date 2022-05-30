import React from 'react'
import NavBar from '../../Component/common/NavBar'
import IntroBanner from '../../Component/Employeer/IntroBanner'
import ListFreelancer from '../../Component/Employeer/ListFreelancer'
import { Outlet } from "react-router-dom";

function Employeer() {
  return (
    <React.Fragment>
      <NavBar pageType="Employer"/>
      <Outlet/>
    </React.Fragment>
  );
}

export default Employeer