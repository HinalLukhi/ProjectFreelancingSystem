import React from "react";
import IntroBanner from "../../Component/Guest/IntroBanner";
import NavBar from "../../Component/common/NavBar";
import { Outlet } from "react-router-dom";

function Freelancer() {
    return (
        <>
            <NavBar pageType="Freelancer"/>
            {/* <IntroBanner /> */}
            <Outlet/>
        </>
    );
}

export default Freelancer;