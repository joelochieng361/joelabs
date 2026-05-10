import React, { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import '../css/Getproducts.css'; 

const RequestProduct = () => {
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState("");
    const [error, setError] = useState("");

    // Form States
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [photo, setPhoto] = useState(null);

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatusMsg("Submitting your equipment request...");
        setError("");

        try {
            const formData = new FormData();
            formData.append("product_name", productName);
            formData.append("product_description", description);
            formData.append("product_cost", amount);
            formData.append("product_photos", photo);

            // Replace with your actual endpoint for user requests
            const response = await axios.post("https://modcom2026a.alwaysdata.net/api/request_product", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response.status === 200 || response.data) {
                setStatusMsg("Request sent! Admin will review your equipment shortly.");
                setProductName("");
                setDescription("");
                setAmount("");
                setPhoto(null);
            }
        } catch (err) {
            setError("Submission failed. Ensure all fields are filled correctly.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="store-container py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7">
                        <div className="card glass-card p-4 shadow-lg border-0">
                            <h2 className="text-info text-center mb-4">Request Equipment Listing</h2>
                            <p className="text-light text-center opacity-75 mb-4">
                                Are you a supplier? Submit new hardware details for admin approval.
                            </p>

                            {loading && <Loader />}
                            {statusMsg && <div className="alert alert-success">{statusMsg}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="text-info fw-bold">Equipment Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control glass-input" 
                                        placeholder="e.g., Digital X-Ray Scanner"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="text-info fw-bold">Estimated Cost (Kes)</label>
                                    <input 
                                        type="number" 
                                        className="form-control glass-input" 
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="text-info fw-bold">Technical Description</label>
                                    <textarea 
                                        className="form-control glass-input" 
                                        rows="4" 
                                        placeholder="Detail specs, manufacturer, and warranty..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <div className="mb-4">
                                    <label className="text-info fw-bold">Product Photo</label>
                                    <input 
                                        type="file" 
                                        className="form-control glass-input" 
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        required 
                                    />
                                    <small className="text-white-50">Upload a clear JPG/PNG of the device.</small>
                                </div>

                                <button type="submit" className="btn btn-info w-100 fw-bold py-2 shadow" disabled={loading}>
                                    {loading ? "Uploading..." : "Submit for Approval"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer py-5 bg-white">
        <div className="container text-center">
          <p className="fw-bold text-primary mb-2">JOELABS LTD.</p>
          <p className="text-muted small mb-0">
            Headquarters: Science Park, Medical Drive, Suite 402<br />
            © {new Date().getFullYear()} Joelabs Medical Solutions. All rights reserved.
          </p>
        </div>
      </footer>
        </div>
    );
};

export default RequestProduct;