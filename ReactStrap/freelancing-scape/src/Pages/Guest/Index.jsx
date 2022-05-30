import React from 'react'
import NavBar from "../../Component/common/NavBar";
import IntroBanner from '../../Component/Guest/IntroBanner';
function Index() {
  return (
   <React.Fragment>
       <NavBar pageType="Guest"/>
       <IntroBanner/>
   </React.Fragment>
  )
}

export default Index
