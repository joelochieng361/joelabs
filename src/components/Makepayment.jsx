import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import '../css/Makepayments.css'; // <--- Import the CSS here

const Makepayment = () => {
    const { product } = useLocation().state || {};
    const navigate = useNavigate();
    const img_url = "https://kbenkamotho.alwaysdata.net/static/images/";

    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formdata = new FormData();
            formdata.append("phone", number);
            formdata.append("amount", product.product_cost);

            const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/mpesa_payment", formdata);
            setLoading(false);
            setSuccess(response.data.message);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    }

    return (
        <div className='payment-container'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center mb-4">
                        <h1 className="text-white">Secure Checkout</h1>
                        <p className="text-light opacity-75">Joelabs LTD. Medical Equipment Portal</p>
                    </div>

                    <div className="col-md-6 glass-payment-card p-0">
                        {/* Product Visual */}
                        <img 
                            src={img_url + product.product_photo} 
                            alt={product.product_name} 
                            className='payment-product-img'
                        />

                        <div className="p-4">
                            <h2 className="mb-2"> {product.product_name} </h2>
                            <p className="opacity-75 mb-4"> {product.product_description} </p>
                            
                            <div className="d-flex justify-content-center align-items-center mb-4">
                                <h3 className="text-price mb-0">Kes {product.product_cost} </h3>
                                <span className="badge bg-success p-2">STK Push Active😁</span>
                            </div>

                            <form onSubmit={handlesubmit}>
                                {loading && <Loader />}
                                {success && <div className="alert alert-success">{success}</div>}
                                {error && <div className="alert alert-danger">{error}</div>}

                                <label className="small mb-2 fw-bold">M-PESA PHONE NUMBER</label>
                                <input type="number"
                                    className='form-control glass-input mb-3'
                                    placeholder='2547XXXXXXXX'
                                    required
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)} />

                                <div className="d-flex gap-2">
                                    <button 
                                        type="button" 
                                        className="btn btn-back px-4" 
                                        onClick={() => navigate("/")}>
                                        Back
                                    </button>
                                    <button 
                                        type="submit" 
                                        className='btn btn-mpesa flex-grow-1'>
                                        {loading ? "Requesting..." : "Pay via M-Pesa"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Makepayment;