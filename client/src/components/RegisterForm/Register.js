import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register({ setAuth }) {
  const [err, setErr] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { username, password };
      const res = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(res);

      if (res.status === 200) {
        toast.success("Register in Successfully");
        setAuth(false);
        navigate("/login");
      } else {
        alert("Error: " + res.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='register-container'>
      <div className='register-main'>
        <h1 className='font-bold text-[24px]'>Register</h1>
        <form>
          <div className='form-control'>
            <input
              name='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={true}
              placeholder='Enter Username'
            />
            <small></small>
            <span></span>
          </div>
          <div className='form-control'>
            <input
              name='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              placeholder='Enter Password'
            />
            <small></small>
            <span></span>
          </div>
          <button className='btn-submit' onClick={handleSubmit} type='submit'>
            Sign Up
          </button>
        </form>
        <div className='check-error'>
          <span>{err}</span>
        </div>
        <div className='sign-up'>
          You have an account? <Link to='/login'>Sign In</Link>
        </div>
        <div className='forgot-pass'>Forgot Password?</div>
      </div>
    </div>
  );
}

export default Register;
