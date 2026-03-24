import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from  './Loader'
import { useNavigate } from 'react-router-dom';

const Getproducts = () => {

  //Initialize hooks to help you manage the state of your application
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //Declare use navigate
  const navigate = useNavigate()

  //Below we specify the image base URL
  const img_url = "https://modcom2026a.alwaysdata.net/static/images/"
  //create a function that will create an interaction with api
  const fetchProduct = async() => {
    try{
      //Update the loading hook
      setLoading(true)
      //Interact with end point for fetching the products
      const response = await axios.get("https://modcom2026a.alwaysdata.net/api/get_products")

      //Update the product hook with the response given from the API
      setProducts(response.data)

      //set the loading hook back to default
      setLoading(false)
        }
    catch(error){
      //If there is an error
      //Set the loading back to default
      setLoading(false)

      //Update the error hook with a message
      setError(error.message)

    }
  }

  //We shall use the useEffect hook to automatically rerender new features incase of any changes
  useEffect(() => {
    fetchProduct()
  }, [])

  // console.log(products)
  return (
    <div className='row'>
      <h3 className="text-light">JOELAB'S LIMITED MEDICAL EQUIPMENT STORE</h3>
      <p className='text-light'>Your trusted source for high-quality medical equipments</p>

      {loading && <Loader /> }
      <h4 className="text-danger">{error}</h4>
      
      {/* Map the products fetched fromthe API to the user interface */}

      {products.map((product) => (<div className="justify-content-center col-md-3 mb-3 m-5">
        <div className="card shadow">
          <img src={img_url + product.product_photo}
           alt="product name" className='product_img' />

          <div className="card-body">
            <h5 className="text-primary">{products.product_name}</h5>
            <p className="text-dark">{product.product_description.slice(0, 80)}...</p>
            <h4 className="text-info">kes. {product.product_cost}</h4>

            <button className='btn btn-outline-warning' onClick={() => navigate("/Makepayment",{state : {product}})}>Purchase now</button>
          </div>
        </div>
      </div>))}
      <h3 className='text-light'>FEATURED MEDICAL EQUIPMENTS</h3>
      <h5 className='text-light'>Explore out standard products designed to elevate healthcare standards</h5>
      <p className='text-info'>Advanced ECG machine</p>
      <p className='text-info'>The advanced ECG machines provide precise electrocardiogram readings, crutial for diagnosing heart conditions. It features a user-friendly interface comprehensive reporting capabilities and connectivity options for easy data transfer</p>
      <b className="text-center text-decoration-underline display-4 text-info">Common questions</b>
      <p className="text-center text-light">Find answers to the most frequently asked questions regarding our range of medical devices</p>
      <details className='text-light border-light-subtle' id='details'>
        <summary>What is the warranty period for your medical equipments?</summary>
        <div className="content">All our medical equipments comes with a standard warranty period of one year. This warranty covers any manufacturing defects and ensures that you received prompt service should any arise this time</div>
      </details> <br />
      <details className='text-light border-light-subtle' id='details'>
        <summary>Do you provide training for using equipments?</summary>
        <div className="content">Yes, we offer comprehensive training sessions for all our products. Our training includes hands-on demonstrations and user manuals to ensure that all users are comfortale and proficient with the equipments</div>
      </details> <br />
      <details className='text-light border-light-subtle' id='details'>
        <summary>How do I place an order?</summary>
        <div className="content">Placing and order is simple. You can browse our online catalogue, select the products you wish to perchase, and follow the checkout process. For bulk orders, special requests, please contact our customer service team directly</div>
      </details>
    </div>
    
  )
}

export default Getproducts;
