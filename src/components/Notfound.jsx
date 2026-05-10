import React from 'react'
import '../css/Notfound.css'

const Notfound = () => {
  return (
    <div className='Notfound'>
      <h1>Sorry page not founf</h1>
      <h1>404</h1>
      <a href='/'>Back home</a>
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
    
  )
}

export default Notfound
