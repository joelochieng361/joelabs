import React from 'react';
import '../css/Getproducts.css'; 

const AboutUs = () => {
    return (
        <div className="store-container">
            {/* --- Hero Section --- */}
            <div className="about-hero py-5 mb-5 text-center shadow-sm">
                <div className="container">
                    <h1 className="display-3 fw-bold text-info">Our Legacy in Healthcare</h1>
                    <p className="lead text-light opacity-75">
                        Driving the future of medical diagnostics and surgical precision since inception.
                    </p>
                </div>
            </div>

            <div className="container">
                {/* --- Mission & Vision --- */}
                <div className="row mb-5 g-4">
                    <div className="col-md-6">
                        <div className="card glass-card h-100 p-4 border-0">
                            <h2 className="text-warning mb-3">Our Mission</h2>
                            <p className="text-light">
                                To empower healthcare providers in East Africa by supplying world-class, 
                                certified medical equipment that enhances patient outcomes and streamlines 
                                diagnostic workflows. We believe that quality healthcare begins with 
                                quality tools.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card glass-card h-100 p-4 border-0">
                            <h2 className="text-info mb-3">Our Vision</h2>
                            <p className="text-light">
                                To be the leading hub for medical technology innovation in the region, 
                                bridging the gap between global engineering standards and local 
                                healthcare needs through sustainable partnerships and expert technical support.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- Core Values --- */}
                <div className="text-center mb-5">
                    <h2 className="section-title text-info mb-4">The JOELABS Standard</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="p-3">
                                <h1 className="display-4 text-info">🔬</h1>
                                <h5 className="text-white mt-2">Precision</h5>
                                <p className="text-light small opacity-75">Rigorous calibration for every diagnostic unit we deliver.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3">
                                <h1 className="display-4 text-info">🛡️</h1>
                                <h5 className="text-white mt-2">Reliability</h5>
                                <p className="text-light small opacity-75">ISO-certified hardware backed by 24/7 technical assistance.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3">
                                <h1 className="display-4 text-info">🌍</h1>
                                <h5 className="text-white mt-2">Accessibility</h5>
                                <p className="text-light small opacity-75">Ensuring rural and urban clinics have equal access to tech.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Our Story / Technical Edge --- */}
                <div className="row align-items-center mb-5 p-4 glass-card mx-1">
                    <div className="col-lg-7">
                        <h2 className="text-info">More Than Just a Supplier</h2>
                        <p className="text-light mt-3">
                            Founded on the principles of bio-engineering, **JOELABS LTD** has grown from a specialized 
                            distributor to a full-service healthcare partner. We don't just ship boxes; we 
                            install, train, and maintain. 
                        </p>
                        <p className="text-light">
                            Our team consists of certified biomedical engineers and clinical consultants who 
                            understand the high stakes of neurosurgery, cardiology, and orthopedics. 
                            When you choose JOELABS, you're choosing a lifetime of technical excellence.
                        </p>
                    </div>
                    <div className="col-lg-5 text-center">
                        <div className="p-4 border border-info border-opacity-25 rounded-circle d-inline-block">
                            <div className="bg-info bg-opacity-10 p-5 rounded-circle">
                                <h3 className="text-info mb-0">10+ Years</h3>
                                <small className="text-white">Of Excellence</small>
                            </div>
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

export default AboutUs;