import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import "./HomeSeller.css";
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import CheckRole from '../../../components/CheckRole/CheckRole';

const HomeSeller = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const token = localStorage.getItem('token') || null;
  const navigate = useNavigate();


  const getData = async () => {
      if(token){
          try {
              const response = await axios.get(`http://localhost:8000/api/user`,{
                  headers:{
                      Authorization: 'Bearer ' + token,
                  }
              })

              if(response.status == 200){
                  setRoles(response.data.roles);   
              }
              else{
                  navigate('/login');
              }
          }

          catch (err) {
              toast.error("Serve not found", {
                  position: 'top-right', // Sử dụng chuỗi để xác định vị trí
                  autoClose: 3000
              });
          }
          finally {
              setIsLoading(false);
          }
                   
      }
      else{
          navigate('/login');
      }    
  }

  useEffect(() => {
      getData();
  },[])


  if (isLoading) {
      return <div>Loading...</div>; // Hiển thị thông báo loading
  }



  return (
      <CheckRole roles={roles} requiredRole="SELLER">
      <div className='page'>
          <div className="product-detail-header-container">
              <Header />
          </div>
          <div className="product-detail-body-container">
              SellerHome
          </div>

          <div className="product-detail-footer-container">
          <Footer/>
          </div>
          <ToastContainer/>
      </div>
      </CheckRole>
  )


};

export default HomeSeller;