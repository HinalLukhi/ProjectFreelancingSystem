import React, { useState } from "react";
import { Row, Navbar, NavbarBrand, Nav, NavItem, NavLink,NavbarToggler,Collapse } from "reactstrap";

function DashboardTopNav() {
    const [navbar,setNavBar] = useState(false);

    const toggleNav=()=>{
        setNavBar(!navbar)
    }
  return (
  <Navbar
    id="dashboard-topnav"
    light
    >
    <NavbarBrand
      className="me-auto"
      href="/" style={{color:"white"}}>
    Dashboard
    </NavbarBrand>
    <NavbarToggler
      className="me-2"
      onClick={toggleNav} style={{color:"white",backgroundColor:"white"}} light/>
    <Collapse
      isOpen={navbar}
      navbar>
      <Nav navbar>
        <NavItem>
          <NavLink  style={{color:"white"}}>
            Manage Task
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink style={{color:"white"}}>
            Manage Bidders
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink style={{color:"white"}}>
           Post Task
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink style={{color:"white"}}>
           Settings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink style={{color:"white"}}>
          Logout
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
  );
}

export default DashboardTopNav;
