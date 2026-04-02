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
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin";

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="logo-container"><h1>Welcome to Joelabs LTD.</h1></div>
        </header>
        
        <nav className="p-3 bg-dark d-flex align-items-center gap-3">
          <b className='text-light'>JOELABS LTD</b>
          <Link to={"/"} className="btn btn-outline-success">Home</Link> 
          
          {!user && <Link to={"/signup"} className="btn btn-outline-success">Signup</Link>}
          {!user && <Link to={"/signin"} className="btn btn-outline-success">Signin</Link>}
          
          {/* Only show Add Product link if the user is an admin */}
          {isAdmin && (
            <Link to={"/security"} className='btn btn-outline-success'>add products</Link>
          )}

          {user && (
            <button 
              className="btn btn-outline-danger ms-auto" 
              onClick={() => { localStorage.clear(); window.location.href = "/signin"; }}>
              Logout
            </button>
          )}
        </nav>

        <Routes>
          <Route path='/' element={<Getproducts />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/makepayment' element={<Makepayment /> } />
          <Route path='*' element={<Notfound />} />

          {/* Protected Routes: If not admin, redirect to Home */}
          <Route 
            path='/security' 
            element={isAdmin ? <Security /> : <Navigate to="/" />} 
          />
          <Route 
            path='/addproducts' 
            element={isAdmin ? <Addproducts /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;