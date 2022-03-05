import React, { useState } from "react";
import Joi from "joi-browser";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { login } from "../services/userService";
import { toast } from "react-toastify";

function Login() {
  const Navigate = useNavigate();

  const schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const doSubmit = async () => {
    try {
      const { data: jwt } = await login(data.username, data.password);
      localStorage.setItem("token", jwt.access_token);
      if (jwt.isAdmin) localStorage.setItem("isAdmin", jwt.isAdmin);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        toast.error(ex.response.data.message, {
          theme: "colored",
        });
      }
    }
  };

  const [handleSubmit, renderButton, renderInput, renderSelect, data, setData] =
    useForm(
      {
        username: "",
        password: "",
      },
      schema,
      doSubmit
    );

  return (
    <div>
      <h1>Please login</h1>;
      <form onSubmit={handleSubmit} style={{ padding: "0 20% 0 20%" }}>
        {renderInput("username", "Username")}
        {renderInput("password", "Password", "password")}
        {renderButton("Login")}
        <div style={{ textAlign: "end" }}>
          <p> not a registered user ?</p>
          <button
            onClick={() => Navigate("/register-form")}
            className="btn btn-primary btn-sm m-2"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
