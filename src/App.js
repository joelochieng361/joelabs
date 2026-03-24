import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, link, Link, Links }from 'react-router-dom';
import Getproducts from './components/Getproducts';
import Addproducts from './components/Addproducts';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Notfound from './components/Notfound';
import 'bootstrap/dist/css/bootstrap.min.css'
import Makepayment from './components/Makepayment';
import Security from './components/Security';
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="logo-container"><h1>Welcome to Joelabs LTD.</h1></div>
        </header>
        <nav>
          <b className='text-light'>JOELABS LTD    </b>
          <Link to={"/"} className="btn btn-outline-success">Home</Link> 
          <Link to={"/signup"} className="btn btn-outline-success">signup</Link> 
          <Link to={"/security"} className='btn btn-outline-success'>Add product</Link>
        </nav>
        {/* Below are our different routes together with the rendered components */}
        <Routes>
          < Route path='/' element={<Getproducts />} />
          <Route path='/addproducts' element={<Addproducts />} />
          <Route path='signup' element={<Signup />} />
          <Route path='signin' element={<Signin />} />
          <Route path='*' element={<Notfound />} />
          <Route path='makepayment' element={<Makepayment /> } />
          <Route path='security' element = {<Security />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
