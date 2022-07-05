import React from "react";
import "./css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Guest from "./Pages/Guest/Index.jsx";
import Employer from "./Pages/Employer/Index.jsx";
import { Route, Link, Routes, BrowserRouter as Router } from "react-router-dom";
import Freelancer from "./Pages/Freelancer";
import IntroBanner from "./Component/Employeer/IntroBanner";
import GuestIntroBanner from "./Component/Guest/IntroBanner";
import ListFreelancer from "./Component/Employeer/ListFreelancer";
import ProfileDescription from "./Component/Employeer/ProfileDescription";
import PostProject from "./Component/Employeer/PostProject";
import FindProject from "./Component/Freelancer/FindProject";
import TaskList from "./Component/Freelancer/TaskList";
import TaskDescription from "./Component/Freelancer/ProjectDescription";
import { UserContext } from "./UserContext";
import { useState } from "react";
import AddTasks from "./Component/Freelancer/AddTasks";
import ManageBidders from "./Component/Employeer/ManageBidders";
import Plans from "./Component/common/Plans";
import ContactUs from "./Component/common/ContactUs";
import AssignedProject from "./Component/Freelancer/AssignedProject";
import ManageBids from "./Component/Freelancer/ManageBids";
import UserProfile from "./Component/Freelancer/UserProfile";
import UserProfileEmployer from "./Component/Employeer/UserProfile";
import MyAllProjects from "./Component/Employeer/AllProjects"
import EditProject from "./Component/Employeer/EditProject";
import FreeDashboard from "./Component/Freelancer/Dashboard";
import EmpDashboard from "./Component/Employeer/Dashboard";
function App() {

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element={<Guest />} >
            <Route path="home"  element={<GuestIntroBanner />} />
            <Route path="plans" element={<Plans />} />
            <Route path="contactus" element={<ContactUs />}/>
          </Route>
          <Route path="Employer" element={<Employer />}>
            <Route path="Home" element={<IntroBanner />} />
            <Route path="freelancerlist" element={<ListFreelancer />}/>
            <Route path="freelancerlist/profiledesc" element={<ProfileDescription/>}/>
            <Route path="postproject" element={<PostProject/>}/>
            <Route path="managebidders" element={<ManageBidders/>}/>
            <Route path="plans" element={<Plans />} />
            <Route path="contactus" element={<ContactUs />}/>
            <Route path="userprofile" element={<UserProfileEmployer />}/>
            <Route path="allprojects" element={<MyAllProjects />}/>
            <Route path="dashboard" element={<EmpDashboard />}/>

          </Route>
          <Route path="/freelancer" element={<Freelancer />} >
             <Route path="Home" element={<GuestIntroBanner />} />
             <Route path="browseproject" element={<FindProject/>}/>
             <Route path="browseproject/tasklist" element={<TaskList/>}/>
             <Route path="browseproject/projectdescription" element={<TaskDescription/>}/>
             <Route path="plans" element={<Plans />} />
             <Route path="contactus" element={<ContactUs />}/>
             <Route path="assignedprojects" element={<AssignedProject />}/>
             <Route path="managebids" element={<ManageBids />}/>
             <Route path="userprofile" element={<UserProfile />}/>
             <Route path="dashboard" element={<FreeDashboard />}/>
             <Route path="assignedprojects/addtask" element={<AddTasks/>}/>
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
