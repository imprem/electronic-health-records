import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Loginpage/login.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logimg from '../image/logimg.png';
import { connectToMetaMask } from '../Services/connectToMetaMask' 

function Register() {
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  function disconnectFromMetaMask() {
    setAccount(null);
    console.log("Disconnected from MetaMask");
  }

  async function handleReconnect() {
    disconnectFromMetaMask();
    let address = await connectToMetaMask();
    setAccount(address);
  }

  const handleSubmit = async () => {
    const userData = {
      name,
      gender,
      phone,
      email,
      password,
      publicKey: account
    };

    try {
      console.log(process.env.REACT_APP_API);
      const response = await axios.post(`${process.env.REACT_APP_API}/register`, userData);
      console.log('Registration successful:', response.data);
      navigate('/');
    } catch (error) {
      console.error('There was an error registering:', error);
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
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        {/* <span className="h2 fw-bold mb-0">Register Here...</span> */}
                      </div>

                      <h4 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        Create an account
                      </h4>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="name">Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control form-control-lg"/>
                      </div>

                      <div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="gender">Gender</label>
                        <div className="d-flex align-items-center gap-3">
                          <div>
                            <input type="radio" id="male" name="gender" value="Male" checked={gender === "Male"} onChange={handleGenderChange}/>
                            <label htmlFor="male" className="ms-1">Male</label>
                          </div>
                          <div>
                            <input type="radio" id="female" name="gender" value="Female" checked={gender === "Female"} onChange={handleGenderChange}/>
                            <label htmlFor="female" className="ms-1">Female</label>
                          </div>
                          <div>
                            <input type="radio" id="other" name="gender" value="Other" checked={gender === "Other"} onChange={handleGenderChange}/>
                            <label htmlFor="other" className="ms-1">Other</label>
                          </div>
                        </div>
                      </div>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="phone">Phone</label>
                        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control form-control-lg"/>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">Email address</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg"/>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg"/>
                      </div>

                      <div className="form-outline mb-4">
                        <button className="btn btn-dark btn-lg btn-block" id='key-btn' type="button" onClick={handleReconnect}>Select public key</button>
                      </div>

                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">Register</button>
                      </div>
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

export default Register;