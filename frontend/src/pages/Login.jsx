import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // setError("");

    axios
      .post("http://localhost:3000/users/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data.data);
        const userData = res.data.data;

        if (userData) {
          dispatch(login(userData));
        }

        navigate("/users/home");
      })
      .catch((err) => {
        setError("Invalid email or password");
        // setError(err.message);
        console.log("Error is : ", err);
      });
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200 m-0 p-0">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <img
              src="/img/login.svg"
              alt="Login image"
              style={{ width: "500px", height: "500px" }}
            />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <h1 className="text-3xl front-small">Login Now</h1>
              {error && <p className="text-red-500">{error}</p>}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <a href="/users/register">Don't have account | Sign Up Here</a>
                <a href="/venders/login" className="hover:text-slate-300">
                  Login as Vendor
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
