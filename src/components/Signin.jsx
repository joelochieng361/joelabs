import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/Signin.css'; // <--- Import your new CSS file here

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading("Authenticating...");
        try {
            const formdata = new FormData();
            formdata.append("email", email);
            formdata.append("password", password);

            const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/signin", formdata);
            setLoading("");

            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/");
            } else {
                setError("Invalid credentials.");
            }
        } catch (err) {
            setLoading("");
            setError("Something went wrong.");
        }
    };

    return (
        <div className="signin-container">
            <div className="col-11 col-sm-8 col-md-6 col-lg-4 glass-card p-5">
                <h1 className="text-center mb-4">Sign In</h1>
                
                {loading && <p className="text-info text-center">{loading}</p>}
                {error && <p className="text-warning text-center">{error}</p>}

                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input 
                            type="email"
                            className="form-control glass-input"
                            placeholder="Enter your email"
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

                    <button type="submit" className="btn btn-glass btn-warning w-100 py-2 mb-3">
                        Sign In
                    </button>

                    <p className="text-center small mt-3">
                        Don't have an account? <Link to='/signup' className="text-white fw-bold">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signin;