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

    //below is the search functionality
    const handleSearch = async (query) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://modcom2026a.alwaysdata.net/api/search_products?query=${encodeURIComponent(query)}`);
            setProducts(response.data);
            //delaying the loading state to show the loader for a better user experience
            setTimeout(() => setLoading(false), 3000);
        } catch (error) {
            setError("Search failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

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
                <div className='text-center mb-5'>
                    <h1>What do we do</h1>

                    <p className='text-center'>We provide high-quality medical equipment and supplies for modern healthcare facilities.</p>

                </div>

                <div className='row col-md-12 justify-content-center'>
                    <div className='text-center'><h2>Customer Stories</h2></div>
                    <div className='col-md-2 justify-content-center'>
                        <img src="data:image/jpeg;base64,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" alt="Image 2" />
                        
                    </div>
                    <div>
                        <br />
                        <p>
"I am using the Perneczky Aneurysm Clip 2™ for aneurysm surgery. The Perneczky Aneurysm Clip 2™ comes with a unique design where the clip instrument grasps the clip on the inside which goes in line with significant advantages compared to other Aneurysm Clips in the market. The second generation (Perneczky Aneurysm Clip 2™) was further improved, especially in regards to opening width and size. (Prof. Dr. Siamak Asgari, Director Neurosurgical Department, Klinikum Ingolstadt, Germany)"</p>
                    <b>John Doe, Neurosurgeon</b>
                    </div>

                </div>

                {/* --- SECTION 2: PRODUCT CATALOGUE --- */}
                <div className="text-center mb-5">
                    <h2 className="section-title text-info">Medical Equipment Store</h2>
                    <p className="text-light opacity-75">Browse our certified laboratory and clinical hardware</p>
                </div>

                {loading && <Loader />}
                {statusMsg && <p className="text-success text-center">{statusMsg}</p>}
                {error && <h4 className="text-danger text-center">{error}</h4>}

                <div className='row justify-content-center'>
                    <search className="mb-4 d-flex justify-content-center">
                        <input 
                            type="text"
                            className="form-control w-50 glass-input"
                            placeholder="Search products..."
                            onChange={(e) => { handleSearch(e.target.value); }}
                        />
                    </search>


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
                        <button className="btn btn-info mt-3 fw-bold"
                        onClick={() => navigate("/technical-specs")}>
                            View Technical Specs
                        </button>
                    </div>
                    <div className="col-md-6 text-center">
                         <div className="medical-icon-box display-1">🏥</div>
                    </div>
                </div>

                {/* --- SECTION 4: CONTACT FORM --- */}
                <div className="row mt-5 mb-5 p-4 glass-card align-items-stretch mx-1">
                    <div className="col-md-5 p-4 border-end border-secondary border-opacity-25">
                        <h2 className="text-info mb-4">Contact Specialists</h2>
                        <div className="contact-detail mb-3">
                            <span className="text-info fw-bold">📍 Location:</span>
                            <p className="small text-light">Medical Plaza, 4th Floor, Nairobi, Kenya</p>
                        </div>
                        <div className="contact-detail mb-3">
                            <span className="text-info fw-bold">✉️ Email:</span>
                            <p className="small text-light">joelabs@gmail.com</p>
                        </div>
                        <div className="contact-details mb-3">
                            <span className="text-info fw-bold">📞 Phone:</span>
                            <p className="small text-light">+254 769411754</p>
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
                            <button type="submit"
                            className="btn btn-info w-100 fw-bold py-2"
                            disabled={loading}>
                                {loading ? "Processing..." : "Send Inquiry"}
                            </button>
                        </form>
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
}

export default Getproducts;