import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PassConfermation() {
    const { id, token } = useParams();
    console.log(id, token);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await fetch(`http://localhost:5000/api/resetPassword/${id}/${token}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password, password_confirmation: confirmPassword }),
        });
        const json = await data.json();
        if (json.status === "success") {
            alert("Password changed successfully");
        } else {
            alert("Enter valid credentials");
        }
    }

    return (
        <form onSubmit={handleSubmit} method='post'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="card text-center" style={{ width: "300px" }}>
                    <div className="card-header h5 text-white bg-primary">Password Reset</div>
                    <div className="card-body px-5">
                        <div data-mdb-input-init className="form-outline">
                            <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className="form-control my-1" />
                            <label className="form-label" htmlFor="form2Example27" style={{ fontSize: '0.8rem' }}>Password</label>
                        </div>
                        <div data-mdb-input-init className="form-outline">
                            <input name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={showPassword ? "text" : "password"} className="form-control my-1" />
                            <label className="form-label" htmlFor="form2Example27" style={{ fontSize: '0.8rem' }}>Confirm Password</label>
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                            <label className="form-check-label" htmlFor="showPassword">
                                Show Password
                            </label>
                        </div>
                        <div>
                            <button type='submit' className="btn btn-primary mt-3">Submit</button>
                        </div>
                        <div className="mt-4">
                            <hr />
                            <div className="d-flex justify-content-between mt-4">
                                <a className="" href="/login">Login</a>
                                <a className="" href="/register">Register</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
 