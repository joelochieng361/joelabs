import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import '../css/Getproducts.css'; // Ensure you create this CSS file

const Getproducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const img_url = "https://modcom2026a.alwaysdata.net/static/images/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading("Sending your message...");
        setError("");

        try {
            const formdata = new FormData();
            formdata.append("name", name);
            formdata.append("email", email);
            formdata.append("message", message);

            // Connect to your API
            const response = await axios.post("https://modcom2026a.alwaysdata.net/api/contact_us", formdata);
            
            setLoading("");

            if (response.data) {
                // On success, redirect to login
                navigate("/");
            }
        } catch (err) {
            setLoading("");
            setError("Failed to send message. Please try again.");
        }
    };

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://modcom2026a.alwaysdata.net/api/get_products");
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <div className='store-container'>
            {/* --- SECTION 1: HERO CAROUSEL --- */}
            <div id="medicalHero" className="carousel slide mb-5 shadow-lg" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active hero-slide-1">
                        <div className="carousel-caption glass-caption">
                            <h1>JOELABS LIMITED</h1>
                            <p>Precision Engineering for Healthcare Excellence.</p>
                        </div>
                    </div>
                    <div className="carousel-item hero-slide-2">
                        <div className="carousel-caption glass-caption">
                            <h1>Advanced Diagnostics</h1>
                            <p>Equipping modern laboratories with cutting-edge tech.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* --- SECTION 2: PRODUCT CATALOGUE --- */}
                <div className="text-center mb-5">
                    <h2 className="section-title">Medical Equipment Store</h2>
                    <p className="text-light opacity-75">Browse our certified laboratory and clinical hardware</p>
                </div>

                {loading && <Loader />}
                {error && <h4 className="text-danger text-center">{error}</h4>}

                <div className='row justify-content-center'>
                    {products.map((product, index) => (
                        <div className="col-md-4 col-lg-3 mb-4" key={index}>
                            <div className="card glass-card h-100">
                                <div className="img-wrapper">
                                    <img src={img_url + product.product_photo} alt={product.product_name} className='card-img-top' />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="text-info">{product.product_name}</h5>
                                    <p className="text-white small opacity-75 flex-grow-1">
                                        {product.product_description.slice(0, 80)}...
                                    </p>
                                    <h4 className="text-warning mt-2">Kes. {product.product_cost}</h4>
                                    <button 
                                        className='btn btn-outline-info w-100 mt-3' 
                                        onClick={() => navigate("/Makepayment", { state: { product } })}>
                                        Purchase Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- SECTION 3: FEATURED HIGHLIGHT --- */}
                <div className="row mt-5 p-5 glass-card align-items-center">
                    <div className="col-md-6">
                        <h3 className='text-info mb-3'>FEATURED: Advanced ECG Machine</h3>
                        <p className='text-light'>
                            Our advanced ECG machines provide precise electrocardiogram readings, crucial for diagnosing heart conditions. 
                            Features include a high-res interface, comprehensive reporting, and instant data sync.
                        </p>
                        <button className="btn btn-primary mt-3">View Technical Specs</button>
                    </div>
                    <div className="col-md-6 text-center">
                         <div className="medical-icon-box">🏥</div>
                    </div>
                </div>
                

                {/* --- SECTION 4: FAQ --- */}
                <div className="mt-5 mb-5">
                    <h2 className="text-center text-info mb-4">Common Questions</h2>
                    <div className="faq-wrapper">
                        <details className='glass-faq mb-3'>
                            <summary>What is the warranty period for your equipment?</summary>
                            <div className="content">All equipment comes with a standard 12-month manufacturer warranty covering defects and technical support.</div>
                        </details>
                        <details className='glass-faq mb-3'>
                            <summary>Do you provide staff training?</summary>
                            <div className="content">Yes, Joelabs provides hands-on clinical training and digital manuals for all hardware installations.</div>
                        </details>
                        <details className='glass-faq mb-3'>
                            <summary>How do I place a bulk order?</summary>
                            <div className="content">For hospital-wide procurement or bulk quantities, please contact our corporate sales team through the Portal.</div>
                        </details>
                    </div>
                </div>

                <div className="row mt-5 mb-5 p-4 glass-card align-items-stretch">
                    <div className="col-md-5 p-4 border-end border-secondary border-opacity-25">
                        <h2 className="text-info mb-4">Contact Our Specialists</h2>
                        <p className="text-light opacity-75 mb-4">
                            Have questions about technical specifications or bulk hospital orders? 
                            Our support team is available 24/7.
                        </p>
                        
                        <div className="contact-detail mb-3">
                            <span className="text-info fw-bold">📍 Location:</span>
                            <p className="small text-light">Medical Plaza, 4th Floor, Nairobi, Kenya</p>
                        </div>
                        <div className="contact-detail mb-3">
                            <span className="text-info fw-bold">📞 Direct Line:</span>
                            <p className="small text-light">+254 700 000 000</p>
                        </div>
                        <div className="contact-detail">
                            <span className="text-info fw-bold">✉️ Email:</span>
                            <p className="small text-light">support@joelabs.co.ke</p>
                        </div>
                    </div>

                    <div className="col-md-7 p-4">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" className="form-control glass-input" placeholder="Your Name" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="email" className="form-control glass-input" placeholder="Your Email" required />
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <textarea className="form-control glass-input" rows="4" placeholder="Your Message..." required></textarea>
                            </div>
                            <button type="submit" className="btn btn-info w-100 fw-bold py-2">
                                Send Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Getproducts;