import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function ResetPass() {
     
    const [credential, setCredential] = useState({ email: "" });
    const [resetSuccess, setResetSuccess] = useState(false);

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await fetch("http://localhost:5000/api/changePass", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email }),
        });
        const json = await data.json();
        console.log(json.status);
        if (json.status === "success") {
            setResetSuccess(true);
        } else {
            alert("Enter valid credentials");
        }
    }
  
    if (resetSuccess) {
        return <Navigate to="/confirmPass" />;
    }

    return (
        <form onSubmit={handleSubmit} method='post' action='/api/changePass'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="card text-center" style={{ width: "300px" }}>
                    <div className="card-header h5 text-white bg-primary">Password Reset</div>
                    <div className="card-body px-5">
                        <p className="card-text py-2">
                            Enter your email address and we'll send you an email with instructions to reset your password.
                        </p>
                        <div data-mdb-input-init className="form-outline">
                            <input name="email" value={credential.email} onChange={onChange} type="email" id="typeEmail" className="form-control my-3" />
                            <label className="form-label" htmlFor="typeEmail">Email input</label>
                        </div>
                        <button type='submit' className='m-3 btn btn-danger'>Reset Password</button>
                        <div className="d-flex justify-content-between mt-4">
                            <a className="" href="/login" mx-2>Login</a>
                            <a className="" href="/signup">Register</a>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
