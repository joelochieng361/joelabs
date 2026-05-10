import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Getproducts.css'; // Reusing your existing glass styles

const SupportUs = () => {
    const navigate = useNavigate();

    return (
        <div className="store-container">
            {/* Header Section */}
            <div className="container py-5">
                <div className="text-center mb-5 mt-4">
                    <h1 className="display-4 fw-bold text-info">Support Our Mission</h1>
                    <p className="text-light opacity-75 fs-5">
                        Helping us bridge the gap in healthcare technology across East Africa.
                    </p>
                </div>

                <div className="row g-4 justify-content-center">
                    {/* Option 1: Strategic Partnerships */}
                    <div className="col-md-4">
                        <div className="card glass-card h-100 p-4 border-0 text-center">
                            <div className="display-3 mb-3">🤝</div>
                            <h3 className="text-info">Partner With Us</h3>
                            <p className="text-light opacity-75">
                                We collaborate with international manufacturers to bring certified medical 
                                hardware to local clinics.
                            </p>
                            <button 
                                className="btn btn-outline-info mt-auto"
                                onClick={() => navigate("/Contact")}>
                                Become a Partner
                            </button>
                        </div>
                    </div>

                    {/* Option 2: Knowledge Sharing */}
                    <div className="col-md-4">
                        <div className="card glass-card h-100 p-4 border-0 text-center">
                            <div className="display-3 mb-3">🔬</div>
                            <h3 className="text-info">Share Expertise</h3>
                            <p className="text-light opacity-75">
                                Join our network of consultants to help train medical staff on 
                                advanced diagnostic machinery.
                            </p>
                            <button 
                                className="btn btn-outline-info mt-auto"
                                onClick={() => navigate("/Contact")}>
                                Join Network
                            </button>
                        </div>
                    </div>

                    {/* Option 3: Spread the Word */}
                    <div className="col-md-4">
                        <div className="card glass-card h-100 p-4 border-0 text-center">
                            <div className="display-3 mb-3">📢</div>
                            <h3 className="text-info">Refer a Clinic</h3>
                            <p className="text-light opacity-75">
                                Know a facility in need of a tech upgrade? Help them access 
                                quality equipment through our platform.
                            </p>
                            <button 
                                className="btn btn-outline-info mt-auto"
                                onClick={() => navigate("/Getproducts")}>
                                Browse Catalog
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Call to Action */}
                <div className="mt-5 p-5 glass-card text-center mx-1">
                    <h2 className="text-info mb-3">Why Support JOELABS?</h2>
                    <div className="row text-start mt-4">
                        <div className="col-md-6 mb-3">
                            <h5 className="text-warning">✓ Quality Assurance</h5>
                            <p className="text-light small">Every piece of equipment is ISO certified and calibrated for precision diagnostics.</p>
                        </div>
                        <div className="col-md-6 mb-3">
                            <h5 className="text-warning">✓ Local Support</h5>
                            <p className="text-light small">We don't just sell; we provide on-site maintenance and technical training for hospital staff.</p>
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

export default SupportUs;