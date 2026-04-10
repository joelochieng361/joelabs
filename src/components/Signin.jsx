import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import '../css/Signin.css';



const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const allocate = useNavigate(); 


    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const formdata = new FormData();
            formdata.append("email", email);
            formdata.append("password", password);

            const response = await axios.post("https://modcom2026a.alwaysdata.net/api/signin", formdata);
            
            setLoading(false);

            // Logic to handle the successful login
            if (response.data && response.data.user) {
                
                // 1. Save the user object to localStorage
                localStorage.setItem("user", JSON.stringify(response.data.user));
                
                // 2. Redirect to /home using window.location.href
                // This forces App.js to reload and show the "Logout" button immediately
                window.location.href = "/home"; 

            } else {
                setError(response.data.message || "Invalid credentials.");
            }
        } catch (err) {
            setLoading(false);
            const serverMessage = err.response?.data?.message || "Connection to server failed.";
            setError(serverMessage);
        }
    };

    return (
        <div className="signin-container d-flex align-items-center justify-content-center">
            <div className="col-11 col-sm-8 col-md-6 col-lg-4 glass-card p-5 shadow-lg">
                <h1 className="text-center mb-4 text-white">Sign In</h1>
                
                {loading && <p className="text-info text-center">Authenticating...</p>}
                {error && (
                    <div className="alert alert-danger bg-danger bg-opacity-25 border-0 text-white text-center py-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handlesubmit} className="mt-4 d-flex flex-column gap-3">
                    <div className="mb-3">
                        <label className="form-label text-white opacity-75">Email Address</label>
                        <input 
                            type="email"
                            className="form-control glass-input"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label text-white opacity-75">Password</label>
                        <input 
                            type="password"
                            className="form-control glass-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            disabled={loading}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-warning w-100 py-2 mb-3 fw-bold shadow"
                        disabled={loading}
                    >
                        {loading ? "Please Wait..." : "Sign In"}
                    </button>

                    <p className="text-center small mt-3 text-white">
                        Don't have an account? <Link to='/signup' className="text-warning fw-bold text-decoration-none">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signin;