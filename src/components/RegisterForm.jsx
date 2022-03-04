import React from "react";
import Joi from "joi-browser";
import useForm from "../hooks/useForm";
import { register } from "../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const Navigate = useNavigate();

  const schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  const doSubmit = async () => {
    try {
      const response = await register(data);
      localStorage.setItem("token", response.data.token);
      window.location("/");
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
        name: "",
      },
      schema,
      doSubmit
    );
  return (
    <div>
      <h1>Please Register</h1>;
      <form onSubmit={handleSubmit} style={{ padding: "0 20% 0 20%" }}>
        {renderInput("username", "Username")}
        {renderInput("password", "Password", "password")}
        {renderInput("name", "Name")}
        {renderButton("Register")}
      </form>
    </div>
  );
}

export default RegisterForm;
