import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import '../css/Getproducts.css'; 

const Getproducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState(""); // New state for text feedback
    const [error, setError] = useState("");
    
    // Form States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    
    const navigate = useNavigate();
    const img_url = "https://modcom2026a.alwaysdata.net/static/images/";

    // Corrected Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatusMsg("Sending your inquiry...");
        setError("");

        try {
            const formdata = new FormData();
            formdata.append("name", name);
            formdata.append("email", email);
            formdata.append("message", message);

            const response = await axios.post("https://modcom2026a.alwaysdata.net/api/contact_us", formdata);
            
            if (response.status === 200 || response.data) {
                setStatusMsg("Message sent successfully!");
                // Clear form
                setName("");
                setEmail("");
                setMessage("");
                // Optional: Redirect after a delay
                setTimeout(() => navigate("/"), 2000);
            }
        } catch (err) {
            setError("Failed to send message. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://modcom2026a.alwaysdata.net/api/get_products");
            setProducts(response.data);
        } catch (error) {
            setError("Could not load products: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <div className='store-container'>
            {/* --- SECTION 1: HERO CAROUSEL (Updated Controls) --- */}
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
                {/* Added Carousel Controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#medicalHero" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#medicalHero" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>

            <div className="container">
                {/* --- SECTION 2: PRODUCT CATALOGUE --- */}
                <div className="text-center mb-5">
                    <h2 className="section-title text-info">Medical Equipment Store</h2>
                    <p className="text-light opacity-75">Browse our certified laboratory and clinical hardware</p>
                </div>

                {loading && <Loader />}
                {statusMsg && <p className="text-success text-center">{statusMsg}</p>}
                {error && <h4 className="text-danger text-center">{error}</h4>}

                <div className='row justify-content-center'>
                    {products.map((product, index) => (
                        <div className="col-md-4 col-lg-3 mb-4" key={product.id || index}>
                            <div className="card glass-card h-100 border-0">
                                <div className="img-wrapper">
                                    <img 
                                        src={img_url + product.product_photo} 
                                        alt={product.product_name} 
                                        className='card-img-top' 
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+Image'; }}
                                    />
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h5 className="text-info">{product.product_name}</h5>
                                    <p className="text-white small opacity-75 flex-grow-1">
                                        {product.product_description?.slice(0, 80)}...
                                    </p>
                                    <h4 className="text-warning mt-2">Kes. {Number(product.product_cost).toLocaleString()}</h4>
                                    <button 
                                        className='btn btn-outline-info w-100 mt-3 fw-bold' 
                                        onClick={() => navigate("/Makepayment", { state: { product } })}>
                                        Purchase Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- SECTION 3: FEATURED HIGHLIGHT --- */}
                <div className="row mt-5 p-5 glass-card align-items-center mx-1">
                    <div className="col-md-6">
                        <h3 className='text-info mb-3'>FEATURED: Advanced ECG Machine</h3>
                        <p className='text-light'>
                            Precision diagnostics for cardiac care. Features high-res interface and instant data sync.
                        </p>
                        <button className="btn btn-info mt-3 fw-bold">View Technical Specs</button>
                    </div>
                    <div className="col-md-6 text-center">
                         <div className="medical-icon-box display-1">🏥</div>
                    </div>
                </div>

                {/* --- SECTION 4: CONTACT FORM (Fixed Inputs) --- */}
                <div className="row mt-5 mb-5 p-4 glass-card align-items-stretch mx-1">
                    <div className="col-md-5 p-4 border-end border-secondary border-opacity-25">
                        <h2 className="text-info mb-4">Contact Specialists</h2>
                        <div className="contact-detail mb-3">
                            <span className="text-info fw-bold">📍 Location:</span>
                            <p className="small text-light">Medical Plaza, 4th Floor, Nairobi, Kenya</p>
                        </div>
                        <div className="contact-detail mb-3">
                            <span className="text-info fw-bold">✉️ Email:</span>
                            <p className="small text-light">support@joelabs.co.ke</p>
                        </div>
                    </div>

                    <div className="col-md-7 p-4">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control glass-input" 
                                        placeholder="Your Name" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input 
                                        type="email" 
                                        className="form-control glass-input" 
                                        placeholder="Your Email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <textarea 
                                    className="form-control glass-input" 
                                    rows="4" 
                                    placeholder="Your Message..." 
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-info w-100 fw-bold py-2" disabled={loading}>
                                {loading ? "Processing..." : "Send Inquiry"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Getproducts;