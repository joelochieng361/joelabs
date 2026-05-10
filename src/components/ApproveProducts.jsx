import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import '../css/Getproducts.css';

const ApproveProducts = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const fetchRequests = async () => {
        setLoading(true);
        try {
            // This should be your endpoint that returns user-submitted requests
            const response = await axios.get("https://modcom2026a.alwaysdata.net/api/get_requested_products");
            setRequests(response.data);
        } catch (error) {
            console.error("Error fetching requests", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRequests(); }, []);

    const handleAction = async (id, action) => {
        try {
            // Action would be 'approve' or 'delete'
            await axios.post(`https://modcom2026a.alwaysdata.net/api/manage_request/${id}`, { status: action });
            setMsg(`Product ${action}ed successfully!`);
            fetchRequests(); // Refresh list
        } catch (error) {
            setMsg("Action failed. Check server connection.");
        }
    };

    return (
        <div className="store-container py-5">
            <div className="container">
                <h2 className="text-info mb-4">Pending Equipment Approvals</h2>
                {msg && <div className="alert alert-info">{msg}</div>}
                {loading && <Loader />}

                <div className="table-responsive glass-card p-4">
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Product Name</th>
                                <th>Cost (Kes)</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id}>
                                    <td>
                                        <img src={`https://modcom2026a.alwaysdata.net/static/images/${req.product_photo}`} 
                                             alt="Request" style={{width: '50px', borderRadius: '5px'}} />
                                    </td>
                                    <td>{req.product_name}</td>
                                    <td>{Number(req.product_cost).toLocaleString()}</td>
                                    <td>{req.product_description?.slice(0, 50)}...</td>
                                    <td>
                                        <button className="btn btn-success btn-sm me-2" onClick={() => handleAction(req.id, 'approve')}>Approve</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleAction(req.id, 'delete')}>Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {requests.length === 0 && !loading && <p className="text-center text-light">No pending requests.</p>}
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

export default ApproveProducts;