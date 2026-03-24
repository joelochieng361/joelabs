import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import '../css/Security.css'; // Import the new CSS

const Security = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(""); 
    const [inputToken, setInputToken] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleGenerateToken = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);

            const response = await axios.post("http://modcom2026a.alwaysdata.net/api/security_protocol", formData);

            if(response.data.message) setMessage(response.data.message);
            if(response.data.token) {
                setToken(response.data.token);
                setMessage("Token generated! Copy it into the field below.");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Failed to generate token");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='security-container'>
            <div className="col-11 col-md-6 col-lg-5 glass-security-card p-5">
                <h3 className="text-center mb-4">Security Protocol</h3>
                
                {loading && <Loader />}
                {message && <div className="alert alert-success py-2">{message}</div>}
                {error && <div className="alert alert-danger py-2">{error}</div>}
                {token && <div className="alert alert-info py-2">Your Key: <strong>{token}</strong></div>}
                
                <form>
                    <label className="mb-1">Credentials</label>
                    <input type="email"
                        placeholder='Enter email'
                        className='form-control glass-input mb-2'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />

                    <input type="password"
                        placeholder='Enter password'
                        className='form-control glass-input mb-3'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />

                    <button 
                        type="button" 
                        className='btn btn-generate w-100 mb-4 py-2' 
                        onClick={handleGenerateToken}
                        disabled={loading}>
                        {loading ? "Generating..." : "Generate Token"}
                    </button>

                    <hr className="bg-light opacity-25" />

                    <label className="mb-1">Access Control</label>
                    <input type="text"
                        placeholder='Paste your token here to unlock'
                        className='form-control glass-input mb-3'
                        value={inputToken}
                        onChange={(e) => setInputToken(e.target.value)}
                        required />

                    <button 
                        type="button" 
                        className='btn btn-access w-100 py-2' 
                        disabled={!inputToken}
                        onClick={() => navigate("/addproducts")}>
                        Submit & Access
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Security;