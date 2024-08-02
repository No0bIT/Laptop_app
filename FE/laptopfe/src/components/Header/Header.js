import React, { useEffect, useState } from 'react';
import './Header.css';
import axios from 'axios';



const Header = () => {
  const token = localStorage.getItem('token') || null;
  // const [isLogin,setIslogin]= useState(false);
  // const [user, setUser] = useState({});

  // const getUser = async () => {
  //   if(token){
  //     try {
  //       const response = await axios.get('http://localhost:8000/api/user', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setUser(response.data);
  //       setIslogin(true);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <header className="header">
      <div className="logo">
        <h1>VMH Shop</h1>
      </div>
      <nav className="nav" style={{marginRight:'50px'}}>
        <ul>
          <li><a href="/">Trang Chủ</a></li>
          <li><a href="/cart">Giỏ hàng</a></li>
          {token ?
           <li><a href="/profile">Tài Khoản Của Tôi</a></li>
           :<li><a href="/login">Đăng nhập</a></li>
          }
          
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;