// src/pages/Login.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactNotification, { store } from 'react-notifications-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Login.css'
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function Login() {
  const storedAccount = JSON.parse(localStorage.getItem('account')) || null;
  const [status, setStatus]=useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  // const [roles, setRoles] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('account', JSON.stringify({
        email:email,
        password:password
      }));
      const roles = response.data.data.roles;
      const maxRole = roles.reduce((highestRole, currentRole) => {
                                              return (currentRole.id < highestRole.id) ? currentRole : highestRole;
                                          }, roles[0]);

      


      if(maxRole.role_name =="ADMIN"){
        navigate('/admin');
      }
      else if(maxRole.role_nam =="SELLER"){
        navigate('/seller');
      }
      else{
        navigate('/'); // Điều hướng về trang home sau khi đăng nhập thành công
      }

      
    } catch (error) {
      toast.error("Đăng nhập thất thất bại hãy kiểm tra lại tài khoản!", {
        position: 'top-right', // Sử dụng chuỗi để xác định vị trí
        autoClose: 3000
      });
    }
  };
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register',
         { email, password, phone,name });


      setStatus(pre=>!pre);
      toast.success("Tạo tài khoản thành công!", {
        position: 'top-right', // Sử dụng chuỗi để xác định vị trí
        autoClose: 3000
      });
      handleLogin();  
      // setName('');
      // setPhone('');
      // store.addNotification({
      //   title: "Register",
      //   message: "Resgister Successfully",
      //   type: "success", // 'default', 'success', 'info', 'warning'
      //   container: "top-right", // 'top-left', 'top-right', 'bottom-left', 'bottom-right'
      //   dismiss: {
      //     duration: 3000,
      //     onScreen: true
      //   }
      // });
  
  
    } catch (error) {
      toast.error("Tạo tài khoản thất bại!", {
        position: 'top-right', // Sử dụng chuỗi để xác định vị trí
        autoClose: 3000
      });
    }
  };
  useEffect(() => {
    if(storedAccount){
      setEmail(storedAccount.email);
      setPassword(storedAccount.password);
    }
  },[]);
  return (
    <div className='fullScreen'>
      <div>
        <Header />
      </div>
      <div className='login-body-container'>
        {status ?
          <div className='login-container'>
            <div className='login'>
              <h2>Login</h2>
              <div className='login-input-container'>
                <input
                  style={{backgroundColor:'#EEEEEE', width:'200px', height:'40px', border:'none', borderRadius: '10px', padding: '0 10px 0  10px ' }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Your Email'
                  required
                />
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
                onClick={()=>handleLogin()}
                className='btn btn-login-submit'
              >Login</div>
              <a>Forgot your password</a>
              </div>
          <div  className='sub-login'>
            <div></ div >
            <div>
              <h2>Wellcome !</h2>
              <h5>Thoa suc mua sam tai laptop</h5>
            </div>
            <div 
                onClick={()=>setStatus(pre=>!pre)}
                style={{backgroundColor:'#ffffff', color:'#FF8E6D'}}
                className='btn btn-login-submit'
              >Register</div>
            <div></ div >
          </div>

        </div>
      :
      <div className='login-container'>
          <div  className='sub-login'>
            <div></ div >
            <div>
              <h2>Wellcome !</h2>
              <h5>Thoa suc mua sam tai laptop</h5>
            </div>
            <div 
                onClick={()=>setStatus(pre=>!pre)}
                style={{backgroundColor:'#ffffff', color:'#FF8E6D'}}
                className='btn btn-login-submit'
              >Login</div>
            <div></ div >
          </div>
          <div className='register'>
            <h2>Register</h2>
            <div className='register-input-container'>
              <input
                style={{backgroundColor:'#EEEEEE', width:'200px', height:'40px', border:'none', borderRadius: '10px', padding: '0 10px 0  10px ' }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Your Email'
                required
              />
              <input
                style={{backgroundColor:'#EEEEEE', width:'200px', height:'40px', border:'none', borderRadius: '10px', padding: '0 10px 0  10px ' }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
              />
              <input
                style={{backgroundColor:'#EEEEEE', width:'200px', height:'40px', border:'none', borderRadius: '10px', padding: '0 10px 0  10px ' }}
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Phone'
                required
              />
              <input
                style={{backgroundColor:'#EEEEEE', width:'200px', height:'40px', border:'none', borderRadius: '10px', padding: '0 10px 0  10px ' }}
                type="text"
                value={name}
                onChange={(e) =>setName(e.target.value)}
                placeholder='name'
                required
              />
            </div>           
            <div 
              onClick={()=>handleRegister()}
              className='btn btn-login-submit'
            >Register</div>
            <div></div>
            
            </div>
        

      </div>
      }
      
      </div>
      <div style={{position:'relative', width:'100%', bottom:'0'}}>
          <Footer/>
        </div>
      <ToastContainer/>
    </div>
  );
}

export default Login;
