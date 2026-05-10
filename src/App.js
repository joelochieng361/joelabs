import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Getproducts from './components/Getproducts';
import Addproducts from './components/Addproducts';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Notfound from './components/Notfound';
import 'bootstrap/dist/css/bootstrap.min.css';
import Makepayment from './components/Makepayment';
import Security from './components/Security';
import Zyke from './components/Zyke';
import { CartProvider } from './components/CartContext'; // Ensure this path is correct
import SupportUs from './components/SupportUs';
import AboutUs from './components/AboutUs';
import RequestProduct from './components/RequestProduct';
import ApproveProducts from './components/ApproveProducts';

function App() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const isAdmin = user && user.role === "admin";

  return (
    // Wrap the entire Router in CartProvider so cart state persists across all pages
    <CartProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="logo-container"><h1>Welcome to Joelabs LTD.</h1></div>
          </header>
          
          <nav className="p-3 bg-dark d-flex align-items-center gap-3">
            <b className='text-light me-3'>JOELABS LTD</b>
            
            {/* Standard Navigation Links */}
            {user && (
              <>
                <Link to="/zyke" className="btn btn-outline-success">Home</Link>
                <Link to="/about" className="btn btn-outline-info">About Us</Link>
                <Link to="/contact" className="btn btn-outline-info">Support Us</Link>
              
              </>
            )}
            
            {!user && <Link to="/" className="btn btn-outline-success">Signin</Link>}
            
            {/* Admin Links */}
            {isAdmin && (
              <>
                <Link to="/security" className='btn btn-outline-warning text-dark fw-bold'>
                  Admin: Add Products
                </Link>
                <Link to="/approveproducts" className='btn btn-outline-warning text-dark fw-bold'>
                  Admin: Approve Requests
                </Link>
              </>
            )}

            {user && (
              <button 
                className="btn btn-outline-danger ms-auto" 
                onClick={() => { 
                  localStorage.removeItem("user");
                  window.location.href = "/"; 
                }}>
                Logout
              </button>
            )}
          </nav>

          <Routes>
            <Route path='/' element={user ? <Navigate to="/zyke " /> : <Signin />} />
            <Route path='/store' element={<Getproducts />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/makepayment' element={<Makepayment /> } />
            <Route path='/zyke' element={<Zyke />} />
            <Route path='/requestproduct' element={<RequestProduct />} />
            <Route path='/approveproducts' element={isAdmin ? <ApproveProducts /> : <Navigate to="/zyke" />} />
            
            
            {/* New Routes */}
            <Route path='/contact' element={<SupportUs />} />
            <Route path='/about' element={<AboutUs />} />

            {/* Protected Routes */}
            <Route 
              path='/security' 
              element={isAdmin ? <Security /> : <Navigate to="/store" />} 
            />
            <Route 
              path='/addproducts' 
              element={isAdmin ? <Addproducts /> : <Navigate to="/store" />} 
            />
            <Route path='*' element={<Notfound />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;