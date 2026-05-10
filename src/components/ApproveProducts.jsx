import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import '../css/Getproducts.css';

const ApproveProducts = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    // 1. Fetches from the temporary requests table
    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://modcom2026a.alwaysdata.net/api/get_pending_requests");
            setRequests(response.data);
        } catch (error) {
            console.error("Error fetching requests", error);
            setMsg("Could not load pending requests.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRequests(); }, []);

    // 2. This sends the data to the main platform (product_details)
    const handleApprove = async (id) => {
        setLoading(true);
        try {
            const response = await axios.post(`https://modcom2026a.alwaysdata.net/api/approve_request/${id}`);
            setMsg(response.data.Message);
            // Refresh the list to show the item is no longer "pending"
            fetchRequests(); 
        } catch (error) {
            setMsg("Approval failed. Ensure the API is running.");
        } finally {
            setLoading(false);
        }
    };

    // 3. Optional: Reject/Delete request without adding to main platform
    const handleReject = async (id) => {
        if (window.confirm("Are you sure you want to reject this request?")) {
            try {
                await axios.post(`https://modcom2026a.alwaysdata.net/api/delete_request/${id}`);
                setMsg("Request rejected.");
                fetchRequests();
            } catch (error) {
                setMsg("Failed to delete request.");
            }
        }
    };

    return (
        <div className="store-container py-5">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-info">Pending Product Approvals</h2>
                    <button className="btn btn-outline-info btn-sm" onClick={fetchRequests}>Refresh List</button>
                </div>
                
                {msg && <div className="alert alert-info border-0 shadow-sm">{msg}</div>}
                {loading && <Loader />}

                <div className="table-responsive glass-card p-4">
                    <table className="table table-dark table-hover align-middle">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Product Name</th>
                                <th>Proposed Cost (Kes)</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id}>
                                    <td>
                                        <img 
                                            src={`https://modcom2026a.alwaysdata.net/static/images/${req.product_photo}`} 
                                            alt="Pending" 
                                            style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px'}} 
                                        />
                                    </td>
                                    <td className="fw-bold">{req.product_name}</td>
                                    <td className="text-success">{Number(req.product_cost).toLocaleString()}</td>
                                    <td className="small opacity-75">{req.product_description?.slice(0, 50)}...</td>
                                    <td>
                                        <button 
                                            className="btn btn-success btn-sm me-2 fw-bold" 
                                            onClick={() => handleApprove(req.id)}
                                        >
                                            Approve & Post
                                        </button>
                                        <button 
                                            className="btn btn-outline-danger btn-sm" 
                                            onClick={() => handleReject(req.id)}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {requests.length === 0 && !loading && (
                        <div className="text-center py-5">
                            <p className="text-light opacity-50">No new product requests found.</p>
                        </div>
                    )}
                </div>
            </div>

            <footer className="footer mt-auto py-5 bg-transparent text-center">
                <div className="container">
                    <p className="fw-bold text-info mb-1">JOELABS LTD ADMIN</p>
                    <p className="text-muted small">Quality Control Dashboard • © {new Date().getFullYear()}</p>
                </div>
            </footer>
        </div>
    );
};

export default ApproveProducts;