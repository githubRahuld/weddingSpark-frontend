import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function VenderRegister() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cPassword, setCPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/vendors/register", {
        name,
        email,
        password,
        cPassword,
      })
      .then((res) => {
        console.log(res);
        navigate("/vendors/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <img
              src="/img/register.svg"
              alt="Register img"
              style={{ width: "500px", height: "500px" }}
            />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="name"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  onChange={(e) => setCPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="confirm password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
                <Link to="/vendors/login" className="py-3 hover:text-slate-300">
                  Already have account?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default VenderRegister;
