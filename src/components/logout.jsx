import React, { useEffect } from "react";

function Logout() {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    window.location = "/";
  }, []);

  return <div>logout</div>;
}

export default Logout;
