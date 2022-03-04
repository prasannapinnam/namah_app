import React from "react";
import { useNavigate } from "react-router-dom";

import Movies from "./Movies";

function HomePage() {
  const navigate = useNavigate();
  const isLoggedIN = localStorage.getItem("token");

  return (
    <div>
      <div>HomePage</div>
      <button
        className="btn btn-primary btn-sm m-2"
        onClick={
          isLoggedIN ? () => navigate("/movies") : () => navigate("/login")
        }
      >
        search-movies
      </button>
    </div>
  );
}

export default HomePage;
