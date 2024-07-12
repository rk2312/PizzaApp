import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [credential, setcredential] = useState({ name: "", email: "", password: "", location: "" });
  const onChange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value })
  }
  //console.log(credential)
  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password, location: credential.location }),
    })
    const json = await data.json();
    console.log(json);
    if (!json.success) {
      alert("enter valid credentials");
    }
  }
  // return (
  //   <>
  //     <div className='container' style={{
  //     height: "90vh",
  //     backgroundImage:
  //         'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMhTGGLmUY7ae046oUj_bNr4eaK2s92t68Kw&s")',
  //     backgroundSize: "cover",
  // }}>
  //       <form onSubmit={handlesubmit} action='/api/signup' method='post'>
  //         <div className="mb-3">
  //           <label htmlFor="name" className="form-label">Name</label>
  //           <input type="text" className="form-control" name="name" value={credential.name} onChange={onChange} id="name" />
  //         </div>
  //         <div className="mb-3">
  //           <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
  //           <input type="email" className="form-control" name="email" value={credential.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
  //           <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  //         </div>
  //         <div className="mb-3">
  //           <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
  //           <input type="password" className="form-control" name="password" value={credential.password} onChange={onChange} id="exampleInputPassword1" />
  //         </div>
  //         <div className="mb-3">
  //           <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
  //           <input type="text" className="form-control" name="location" value={credential.location} onChange={onChange}  />
  //         </div>
  //         <button type="submit" className=" m-3 btn btn-primary">Submit</button>
  //         <Link to='/login' className='m-3 btn btn-danger' >Already a User</Link>
  //       </form>
  //     </div>
  //   </>
  //);
  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
    
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{ color: "white" }}>Sign up</p>
    
                    <form onSubmit={handlesubmit} action='/api/signup' method='post' className="mx-1 mx-md-4">
    
                      <div className="d-flex flex-row align-items-center mb-1">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <input name="name" value={credential.name} onChange={onChange} type="text" id="form3Example1c" className="form-control" />
                          <label className="form-label" htmlFor="form3Example1c" style={{ color: "white" }}>Your Name</label>
                        </div>
                      </div>
    
                      <div className="d-flex flex-row align-items-center mb-1">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <input name="email" value={credential.email} onChange={onChange}  type="email" id="form3Example3c" className="form-control" />
                          <label className="form-label" htmlFor="form3Example3c" style={{ color: "white" }}>Your Email</label>
                        </div>
                      </div>
    
                      <div className="d-flex flex-row align-items-center mb-1">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <input name='password' value={credential.password} onChange={onChange}  type="password" id="form3Example4c" className="form-control" />
                          <label className="form-label" htmlFor="form3Example4c" style={{ color: "white" }}>Password</label>
                        </div>
                      </div>
    
                      <div className="d-flex flex-row align-items-center mb-1">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <input name="location" value={credential.location} onChange={onChange} type="text" id="form3Example4cd" className="form-control" />
                          <label className="form-label" htmlFor="form3Example4cd" style={{ color: "white" }}>Address</label>
                        </div>
                      </div>
    
                      <div className="form-check d-flex justify-content-center mb-1">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" style={{ transform: 'scale(0.6)' }} />
                        <label className="form-check-label" htmlFor="form2Example3" style={{ fontSize: '0.8rem' }}>
                          I agree all statements in <a href="#!">Terms of service</a>
                        </label>
                      </div>
    
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Register</button>
                        <Link to='/login' className='m-3 btn btn-danger' >Already a User</Link>
                      </div>
                      
                    </form>
    
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
    
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample image" />
    
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
