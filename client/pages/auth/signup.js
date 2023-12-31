import Router from "next/router";
import React, { useState } from "react";
import useRequest from "../../hooks/use-request";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: { email, password },
    successCallback: () => Router.push("/"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className='form-group'>
        <label>Email Address</label>
        <input
          className='form-control'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
          className='form-control'
          onChange={(e) => setPassword(e.target.value)}
          type='password'
        />
      </div>
      {errors}
      <button className='btn btn-primary' type='submit'>
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
