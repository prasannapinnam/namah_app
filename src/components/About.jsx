import React from "react";
import { Link, Outlet } from "react-router-dom";

function About() {
  return (
    <div style={{ paddingTop: "20px" }}>
      <nav>
        <Link to="namah_theatres" className="m-3">
          namah_theatres
        </Link>
        <Link to="namah_filmschool">namah_filmschool</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default About;
