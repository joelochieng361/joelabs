import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/Signup.css';

const Signup = () => {
    // Hooks for user input
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    // Status hooks
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading("Creating your account...");
        setError("");

        try {
            const formdata = new FormData();
            formdata.append("username", name);
            formdata.append("email", email);
            formdata.append("password", password);
            formdata.append("phone", phone);

            // Connect to your API
            const response = await axios.post("https://modcom2026a.alwaysdata.net/api/signup", formdata);
            
            setLoading("");

            if (response.data) {
                // On success, redirect to login
                navigate("/signin");
            }
        } catch (err) {
            setLoading("");
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="signup-container">
            <div className="col-11 col-sm-8 col-md-6 col-lg-4 glass-card-signup p-5">
                <h1 className="text-center mb-4">Create Account</h1>
                
                {loading && <p className="text-info text-center">{loading}</p>}
                {error && <p className="text-warning text-center">{error}</p>}

                <form onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input 
                            type="text"
                            className="form-control glass-input"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input 
                            type="email"
                            className="form-control glass-input"
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input 
                            type="password"
                            className="form-control glass-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">phone</label>
                        <input 
                            type="number"
                            className="form-control glass-input"
                            placeholder="••••••••"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} 
                            required 
                        />
                    </div>

                    <button type="submit" className="btn btn-glass-signup btn-warning w-100 py-2 mb-3">
                        Register
                    </button>

                    <p className="text-center small mt-3">
                        Already have an account? <Link to='/signin' className="text-white fw-bold">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;