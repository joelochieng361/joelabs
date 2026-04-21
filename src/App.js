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

function App() {
  // Retrieve user from localStorage
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const isAdmin = user && user.role === "admin";

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="logo-container"><h1>Welcome to Joelabs LTD.</h1></div>
        </header>
        
        <nav className="p-3 bg-dark d-flex align-items-center gap-3">
          <b className='text-light'>JOELABS LTD</b>
          
          {/* Home Link: Only visible if logged in */}
          {user && <Link to="/home" className="btn btn-outline-success">Home</Link>}
          
          {/* Signin Link: Only visible if NOT logged in */}
          {!user && <Link to="/" className="btn btn-outline-success">Signin</Link>}
          
          {/* Admin Links */}
          {isAdmin && (
            <>
              <Link to="/security" className='btn btn-outline-success'>Add products</Link>
            </>
          )}

          {user && (
            <button 
              className="btn btn-outline-danger ms-auto" 
              onClick={() => { 
                localStorage.removeItem("user"); // Clear only user data
                window.location.href = "/"; 
              }}>
              Logout
            </button>
          )}
        </nav>

        <Routes>
          {/* Root path is the Signin page */}
          <Route path='/' element={user ? <Navigate to="/home" /> : <Signin />} />
          
          <Route path='/home' element={<Getproducts />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/makepayment' element={<Makepayment /> } />

          {/* Protected Routes */}
          <Route 
            path='/security' 
            element={isAdmin ? <Security /> : <Navigate to="/home" />} 
          />
          <Route 
            path='/addproducts' 
            element={isAdmin ? <Addproducts /> : <Navigate to="/home" />} 
          />
          
          <Route path='*' element={<Notfound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;