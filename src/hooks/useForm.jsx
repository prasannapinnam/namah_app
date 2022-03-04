import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import Input from "../common/input";
import Select from "../common/Select";

function useForm(initialvalue, schema, func) {
  const [data, setData] = useState(initialvalue);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const { error } = Joi.validate(data, schema, {
      abortEarly: false,
    });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemae = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemae);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors({ errors: errors || {} });

    if (errors) return;

    func();
  };

  const handleChange = ({ currentTarget: input }) => {
    const errore = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errore[input.name] = errorMessage;
    else delete errore[input.name];

    const datae = { ...data };
    datae[input.name] = input.value;
    setErrors(errore);
    setData(datae);
  };

  const renderButton = (label) => {
    return (
      <button className="btn btn-primary m-2" disabled={validate()}>
        {label}
      </button>
    );
  };

  const renderInput = (name, label, type = "text") => {
    return (
      <Input
        type={type}
        label={label}
        value={data[name]}
        name={name}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const renderSelect = (name, label, options) => {
    return (
      <Select
        label={label}
        value={data[name]}
        name={name}
        onChange={handleChange}
        error={errors[name]}
        options={options}
      />
    );
  };

  return [
    handleSubmit,
    renderButton,
    renderInput,
    renderSelect,
    data,
    setData,
    errors,
    setErrors,
  ];
}

export default useForm;
