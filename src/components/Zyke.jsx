import React from 'react';
import '../css/Zyke.css';
import { Navigate, useNavigate } from 'react-router-dom';

const Zyke = () => {

  const navigate=useNavigate();

  return (
    <div className="medical-theme">
      {/* Top Navigation / Header */}
      <nav className="navbar navbar-light bg-white border-bottom sticky-top">
        <div className="container">
          <span className="navbar-brand fw-bold text-primary" id='Hugo'>
            <i className="bi bi-shield-plus me-2"></i>JOELABS LTD.
          </span>
          <div className="d-flex gap-3">
            <button className="btn btn-sm btn-primary" onClick={() => navigate('/contact')}>Support 🫴</button>
            <button className="btn btn-sm btn-primary" onClick={() => navigate('/store')}>My Account 💲</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section py-5 text-center">
        <div className="container">
          <h1 className="display-5 fw-bold text-dark">Advanced Medical Procurement Portal</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
            Empowering healthcare providers and medical suppliers with a secure, 
            high-integrity marketplace for laboratory equipment and clinical supplies.
          </p>
        </div>
      </header>

      {/* Main Action Cards */}
      <section className="container my-5">
        <div className="row g-4 justify-content-center">
          <div className="col-md-5">
            <div className="selection-card p-5 text-center h-100">
              <div className="icon-wrapper mb-4">
                <i className="bi bi-microscope">🏦</i>
              </div>
              <h3>Procurement Portal</h3>
              <p className="text-muted">Browse our verified catalog of clinical diagnostics and lab reagents.</p>
              <button className="btn btn-primary btn-lg w-100 mt-3"
              onClick={(e) => navigate('/store')}
              >Buy Medical Supplies</button>
            </div>
          </div>


          <div className="col-md-5">
            <div className="selection-card p-5 text-center h-100">
              <div className="icon-wrapper mb-4 secondary">
                <i className="bi bi-box-seam">🪙</i>
              </div>
              <h3>Vendor Gateway</h3>
              <p className="text-muted">Distribute your medical innovations to our network of healthcare facilities.</p>
              <button className="btn btn-outline-primary btn-lg w-100 mt-3"
                onClick={(e) => navigate('/requestproduct')}>
                Start Selling
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Compliance Section */}
      <section className="bg-light py-5 border-top border-bottom">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <h5 className="fw-bold"><i className="bi bi-check-circle-fill text-success me-2"></i>Verified Quality</h5>
              <p className="small text-muted">All products undergo strict quality control protocols.</p>
            </div>
            <div className="col-md-4">
              <h5 className="fw-bold"><i className="bi bi-truck text-success me-2"></i>Cold Chain Logistics</h5>
              <p className="small text-muted">Specialized handling for sensitive medical reagents.</p>
            </div>
            <div className="col-md-4">
              <h5 className="fw-bold"><i className="bi bi-lock-fill text-success me-2"></i>Secure Transactions</h5>
              <p className="small text-muted">Encrypted B2B payment processing and invoicing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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

export default Zyke;