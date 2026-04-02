import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import '../css/Makepayments.css'; 

const Makepayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Destructure product with a fallback to prevent crashes on page refresh
    const { product } = location.state || {};
    
    const img_url = "https://modcom2026a.alwaysdata.net/static/images/";

    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // Redirect if no product is found (e.g., direct URL access)
    useEffect(() => {
        if (!product) {
            navigate("/");
        }
    }, [product, navigate]);

    const handlesubmit = async (e) => {
        e.preventDefault();
        
        // Basic Validation
        if (number.length < 10) {
            setError("Please enter a valid M-Pesa number (e.g., 254712345678)");
            return;
        }

        setLoading(true);
        setError(""); // Clear previous errors
        setSuccess(""); // Clear previous success

        try {
            const formdata = new FormData();
            // Ensure number is sent without '+' sign if user added one
            const cleanNumber = number.startsWith('+') ? number.substring(1) : number;
            
            formdata.append("phone", cleanNumber);
            formdata.append("amount", product.product_cost);

            // API Call
            const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/mpesa_payment", formdata);
            
            setLoading(false);
            
            // Check if API returned a success message
            if (response.data && response.data.message) {
                setSuccess(response.data.message);
                // Optional: Clear phone number on success
                setNumber(""); 
            } else {
                setSuccess("STK Push sent! Please check your phone to enter your PIN.");
            }

        } catch (err) {
            setLoading(false);
            // Provide a more user-friendly error message
            setError(err.response?.data?.message || "Payment request failed. Please try again.");
        }
    };

    // If product is missing during redirect, return null to avoid rendering errors
    if (!product) return null;

    return (
        <div className='payment-container'>
            <div className="container">
                <div className="row justify-content-center pt-5">
                    <div className="col-md-8 text-center mb-4">
                        <h1 className="text-white">Secure Checkout</h1>
                        <p className="text-light opacity-75">Joelabs LTD. Medical Equipment Portal</p>
                    </div>

                    <div className="col-md-6 glass-payment-card p-0 overflow-hidden shadow-lg">
                        {/* Product Visual */}
                        <div className="payment-img-container">
                            <img 
                                src={img_url + product.product_photo} 
                                alt={product.product_name} 
                                className='payment-product-img w-100'
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Product+Image'; }}
                            />
                        </div>

                        <div className="p-4 bg-glass-dark text-white">
                            <h2 className="mb-2 text-info"> {product.product_name} </h2>
                            <p className="opacity-75 small mb-4"> {product.product_description} </p>
                            
                            <div className="d-flex justify-content-between align-items-center mb-4 bg-dark bg-opacity-25 p-3 rounded">
                                <h3 className="text-warning mb-0">Kes {Number(product.product_cost).toLocaleString()} </h3>
                                <span className="badge bg-success p-2">STK Push Ready ⚡</span>
                            </div>

                            <form onSubmit={handlesubmit}>
                                {loading && <Loader />}
                                {success && <div className="alert alert-success border-0 bg-success bg-opacity-25 text-white">{success}</div>}
                                {error && <div className="alert alert-danger border-0 bg-danger bg-opacity-25 text-white">{error}</div>}

                                <div className="form-group mb-3">
                                    <label className="small mb-2 fw-bold opacity-75">M-PESA PHONE NUMBER</label>
                                    <input 
                                        type="text" // Changed to text to handle 254... strings properly
                                        className='form-control glass-input py-2'
                                        placeholder='e.g. 254712345678'
                                        required
                                        disabled={loading}
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)} 
                                    />
                                </div>

                                <div className="d-flex gap-2">
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-light px-4" 
                                        disabled={loading}
                                        onClick={() => navigate("/")}>
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className='btn btn-success flex-grow-1 fw-bold py-2 shadow-sm'>
                                        {loading ? "Processing..." : "Pay via M-Pesa"}
                                    </button>
                                </div>
                            </form>
                            
                            <p className="text-center mt-3 small opacity-50">
                                Enter your M-Pesa PIN on your phone after clicking pay.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Makepayment;