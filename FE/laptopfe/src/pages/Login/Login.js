// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
  const [status, setStatus]=useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log(1);
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      navigate('/'); // Điều hướng về trang home sau khi đăng nhập thành công
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className='login-body-container fullScreen'>
      {status ?
        <div className='login-container'>
          <div className='login'>
            <h2>Login</h2>
            <div>
              <input
                style={{backgroundColor:'#EEEEEE', width:'200px', height:'40px', border:'none', borderRadius: '10px', padding: '0 10px 0  10px ' }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Your Email'
                required
              />
            </div>
            <div>
              <input
                style={{backgroundColor:'#EEEEEE', width:'200px', height:'40px', border:'none', borderRadius: '10px', padding: '0 10px 0  10px ' }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
              />
            </div>           
            <div 
              onClick={()=>handleSubmit()}
              className='btn btn-login-submit'
            >Login</div>
            <a>Forgot your password</a>
            </div>
        <div  className='sub-login'></div>
      </div>
    :
     <div>register</div>
     }
    </div>
  );
}

export default Login;
