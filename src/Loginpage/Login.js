import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../Loginpage/login.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logimg from '../image/logimg.png';
import axios from 'axios';
import { connectToMetaMask } from '../Services/connectToMetaMask'
import { getUserDetailsByPublickey } from '../Services/dbServices'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  function disconnectFromMetaMask() {
    setAccount(null);
    console.log("Disconnected from MetaMask");
  }

  async function handleReconnect() {
    disconnectFromMetaMask();
    let address = await connectToMetaMask();
    setAccount(address);
  }
  
  const handleLogin = async () => {
    try {
      const userResponse = await getUserDetailsByPublickey(account);
      console.log("=====pp===== ", userResponse.data);
      if(email === userResponse.data[0].EMAIL && userResponse.data[0].PASSWORD === password){
        if(userResponse.data[0].ROLE === 'Admin'){
          navigate("/admin");
        }else if(userResponse.data[0].ROLE === 'Doctor'){
          navigate('/doctor');
        }else{
          navigate('/user');
        }
      }else{
        Swal.fire({
          title: 'Error!',
          text: `User and Password is wrong`,
          allowOutsideClick: false,
          icon: 'error',
        });
      }
    }catch(error){
      console.error("Error :: ", error);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={logimg}
                    alt="login form"
                    className="login-image"
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        {/* <span className="h1 fw-bold mb-0">Logo</span> */}
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        Sign into your account
                      </h5>
                      
                      <div className="form-outline mb-4">
                        <button className="btn btn-dark btn-lg btn-block" id='key-btn' type="button" onClick={handleReconnect}>Select public key</button>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg"/>
                        <label className="form-label" htmlFor="email">
                          Email address
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg"/>
                        <label className="form-label" htmlFor="password">Password</label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                      </div>
                      <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: '#393f81' }}>
                          Register here
                        </Link>
                      </p>
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
