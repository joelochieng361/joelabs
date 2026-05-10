import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import '../css/Addproducts.css'; // Import the new CSS

const Addproducts = () => {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const formdata = new FormData()
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photos", product_photo)

      const response = await axios.post("https://modcom2026a.alwaysdata.net/api/add_product", formdata)

      setLoading(false)
      setSuccess(response.data.message)
      
      // Clearing the hooks
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");
      
      setTimeout(() => {
        setSuccess("");
      }, 5000);

      e.target.reset()
    }
    catch (err) {
      setLoading(false)
      setError(err.message || "Failed to add product")
    }
  }

  return (
    <div className="add-products-container">
      <div className="glass-product-card col-11 col-md-6 col-lg-4 p-5">
        <h3>Inventory Management</h3>
        
        {loading && <Loader />}
        {success && <h5 className="text-success status-msg mb-3">{success}</h5>}
        {error && <h5 className="text-danger status-msg mb-3">{error}</h5>}

        <form onSubmit={handlesubmit}>
          <input type="text"
            placeholder='Product Name (e.g., MRI Scanner)'
            className='form-control glass-input mb-3'
            required
            value={product_name}
            onChange={(e) => setProductName(e.target.value)} />

          <textarea 
            placeholder='Technical Specifications'
            className='form-control glass-input mb-3'
            rows="3"
            required
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)} />

          <input type="number"
            placeholder='Unit Cost (Kshs.)'
            className='form-control glass-input mb-3'
            required
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)} />

          <label className='file-label'>Product Imagery</label>
          <input type="file"
            className='form-control glass-input mb-4'
            required
            accept="image/*"
            onChange={(e) => setProductPhoto(e.target.files[0])} />

          <input type="submit"
            value={loading ? "Processing..." : "Register Product"}
            className='btn btn-add-product w-100' 
            disabled={loading} />
        </form>
      </div>
    </div>
  )
}

export default Addproducts;