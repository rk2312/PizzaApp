import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function Login() {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch("https://pizzaapp-api.onrender.com/api/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credential.email, password: credential.password }),
    });
    const json = await data.json();
    console.log(json);
   // console.log(json.user._id);
    //  console.log(json.token);
    //console.log(json.token);
    if (!json.success) {
      alert("Enter valid credentials");
    } else {
      localStorage.setItem("token", json.token);
      localStorage.setItem("email", json.user.email);
      localStorage.setItem("isAdmin", json.user.isAdmin);
      localStorage.setItem("userId", json.user._id);
      console.log(json.user._id);
      setLoggedIn(true);
    }
  };

  if (loggedIn) {
    return <Navigate to="/" replace />;
  }
  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                    <div className="card" style={{ borderRadius: "1rem" }}>
                        <div className="row g-0">
                            <div className="col-md-6 col-lg-5 d-none d-md-block">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                    alt="login form"
                                    className="img-fluid"
                                    style={{ borderRadius: "1rem 0 0 1rem" }}
                                />
                            </div>
                            <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                <div className="card-body p-4 p-lg-5 text-black">

                                    <form onSubmit={handleSubmit}>

                                        <div className="d-flex align-items-center mb-3 pb-1">
                                            <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                                            <span className="h1 fw-bold mb-0">Logo</span>
                                        </div>

                                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>

                                        <div data-mdb-input-init className="form-outline mb-1">
                                            <input type="email" name="email" value={credential.email}  onChange={onChange} id="form2Example17" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="form2Example17">Email address</label>
                                        </div>

                                        <div data-mdb-input-init className="form-outline mb-1">
                                            <input type="password" name="password" value={credential.password}  onChange={onChange} id="form2Example27" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="form2Example27">Password</label>
                                        </div>

                                        <div className="pt-1 mb-1">
                                            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                                        </div>

                                        <Link to="/resetPass" className="small text-muted">Forgot password?</Link>

                                        <p className="mb-1 pb-lg-2" style={{ color: "#393f81" }}>
    Don't have an account?  <Link to="/signup" className="btn btn-link">Register Now</Link></p>

                                        <a href="#!" className="small text-muted">Terms of use.</a>
                                        <a href="#!" className="small text-muted">Privacy policy</a>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)

  
}
