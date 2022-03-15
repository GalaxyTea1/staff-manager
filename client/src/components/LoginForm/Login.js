import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ setAuth }) {
  const [err, setErr] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  function showToast(text) {
    toast(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { username, password };
      const res = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const parseRes = await res.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        showToast("🦄 Logged in Successfully");
        navigate("/home");
      } else {
        showToast(`🦄 Logged in Failed`);
      }
    } catch (error) {
      localStorage.removeItem("token");
      console.log(error.message);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-main'>
        <h1 className='font-bold text-[24px]'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <input
              type='text'
              required={true}
              placeholder='Enter Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <small></small>
            <span></span>
          </div>
          <div className='form-control'>
            <input
              type='password'
              required={true}
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <small></small>
            <span></span>
          </div>
          <button className='btn-submit' type='submit'>
            Login
          </button>
        </form>
        <div className='check-error'>
          <span>{err}</span>
        </div>
        <div className='sign-up'>
          Not a member? <Link to='/register'>Sign Up</Link>
        </div>
        <div className='forgot-pass'>Forgot Password?</div>
      </div>
    </div>
  );
}

export default Login;
