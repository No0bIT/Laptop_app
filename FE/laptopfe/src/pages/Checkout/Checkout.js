import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Checkout.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const localAddress = JSON.parse(localStorage.getItem('localAddress')) || {
        city: '',
        district: '',
        ward:'',
        detail: ''
    };
    const [dataCarts,setDataCarts] = useState(location.state?.dataCarts || []) ;
  
    const token = localStorage.getItem('token') || null;


    


    



   

    const [isLoading, setIsLoading] = useState(true);
    const [isOnchangeAddress, setIsOnchangeAddress] = useState(false);
    const [isOnchangeUser, setIsOnchangeUser] = useState(false);


    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    // address
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [detail, setDetail] = useState('');


    const [vouchers, setVouchers] = useState([]);
    const [note, setNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleOnclickConfirmOrder = async () => {
        setIsSubmitting(true);
        try {
            if(!(city==''||district==''||ward==''||detail=='',phone=='',name=='')){    
                const response = await axios.post(`http://localhost:8000/api/auth/order`,{
                    data:{
                        address:{
                            city: city,
                            ward:ward,
                            district:district,
                            detail:detail
                        },
                        carts:dataCarts,
                        user:{
                            phone: phone,
                            name: name
                        },
                        note: note,

                    }
                });


                // setIsSubmitting(false);
                if(response.data.status == 200){
                    console.log(JSON.stringify(response.data.data));
                    
                    toast.success("succes", {
                        position: 'top-right', // Sử dụng chuỗi để xác định vị trí
                        autoClose: 3000
                    });
                    // xu li xoa san pham trong gio hang khi da dat hang
                    const storedCarts = JSON.parse(localStorage.getItem('carts')) || [];
                    let updatedStoredCarts = [...storedCarts];
                    const filteredCarts = updatedStoredCarts.filter(storedCart => {
                                const exists = dataCarts.some(dataCart => dataCart.id === storedCart.id);
                                if (exists) {
                                    // nếu cart trong dataCarts tồn tại trong storedCarts, xóa nó
                                    return false;
                                }
                                return true;
                            });
                    localStorage.setItem('carts', JSON.stringify(filteredCarts));

                    setTimeout(() => {
                        setDataCarts([]);
                        navigate("/myorder") 
                        
                    }, 1000);
                }
                else {
                    toast.error(response.data.message, {
                        position: 'top-right', // Sử dụng chuỗi để xác định vị trí
                        autoClose: 3000
                    });
                }
            }
            else{
                toast.warning("Thông tin và địa chỉ người nhận không được để trống! :(", {
                    position: 'top-right', // Sử dụng chuỗi để xác định vị trí
                    autoClose: 3000
                });
            }

        } catch (error) {
            toast.error("Server not serve", {
                position: 'top-right', // Sử dụng chuỗi để xác định vị trí
                autoClose: 3000
            });
        }
        
    };


    const handleOnclickConfirmAddres = () => {
        if(!(city==''||district==''||ward==''||detail=='')){
            const newAddress ={
                city: city,
                district:district,
                ward:ward,
                detail:detail
              }
            localStorage.setItem('localAddress', JSON.stringify(newAddress));
            setIsOnchangeAddress(false);
        }
        else{
            toast.warning(`Không được để trống!`, {
                position: 'top-right', // Sử dụng chuỗi để xác định vị trí
                autoClose: 3000
              });
        }
    };

    const handleOnclickConfirmUser = () => {
        if(!(phone==''||name=='')){
            const newUser ={
                phone: phone,
                name:name,
              }
        //   setUser(newUser);
          setIsOnchangeUser(false);
        }
        else{
            toast.warning(`Không được để trống!`, {
                position: 'top-right', // Sử dụng chuỗi để xác định vị trí
                autoClose: 3000
              });
        }
        
    };
    const getUser = async () => {
        setCity(localAddress.city);
        setDistrict(localAddress.district);
        setWard(localAddress.ward);
        setDetail(localAddress.detail)
        if(token){
            try {
                const response = await axios.get('http://localhost:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                });
                setPhone(response.data.phone);
                setName(response.data.name);
                if(response.data.address !=null ){
                    console.log(response.data.address);
                    
                    setCity(response.data.address.city);
                    setDistrict(response.data.address.district);
                    setWard(response.data.address.ward);
                    setDetail(response.data.address.detail);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        setIsLoading(false);
    };

    useEffect(()=>{
        getUser();
    },[]);

    if(dataCarts.length == 0){
        navigate('/')
    }

    if (isLoading) {
        return <div>Loading...</div>; // Hiển thị thông báo loading
    }
    return (
        <div className='page'>
            <div className={isOnchangeAddress||isOnchangeUser?'body-fade':''} style={{width:'100%', height:'auto'}}>
            <div className="product-detail-header-container">
                <Header />
            </div>

            <div className='checkout-body-container'>
                <div className='checkout-body-infomation-container'>
                    <div className='xBNaac'></div>
                        <div style={{display:'flex',flexDirection:'row', color:'#EE4D2D', backgroundColor:'AppWorkspace', alignItems:'center',marginLeft:'20px' }}>
                            <svg height="24" viewBox="0 0 12 16" width="18" style={{fill:'#EE4D2D'}}><path d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z" fillRule="evenodd"></path></svg>
                            <div style={{marginLeft:'15px', fontSize:'24px',}}>
                                Địa chỉ nhận hàng
                            </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'row', height:'50px', fontSize:'14px',marginLeft:'20px'}}>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',width:'350px'}}>
                            <div style={{display:'flex',flexDirection:'row', color:'#888888'}}>Người Nhận:
                                <div
                                    style={{color:'blue', textDecoration:'underline', marginLeft:'10px'}}  
                                    className='btn'
                                    onClick={()=>setIsOnchangeUser(true)}>Thay Đổi</div>               
                                </div>
                            <div style={{display:'flex',flexDirection:'row' }}>
                                {phone==''||name==''?''
                                :
                                    <div style={{fontWeight:'600'}}>
                                        {name} (+84) {phone} 
                                    </div>
                                }

                            </div>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',marginLeft:'20px',width:'800px' }}>
                            <div style={{display:'flex',flexDirection:'row', color:'#888888'}}>Địa Chỉ:
                            <div
                                style={{color:'blue', textDecoration:'underline', marginLeft:'10px'}}  
                                className='btn'
                                 onClick={()=>setIsOnchangeAddress(true)}>Thay Đổi</div>
                            </div>
                            <div style={{display:'flex',flexDirection:'row' }}> 
                                {
                                    city==''||district==''||ward==''||detail==''
                                    ? '':
                                    <div style={{maxWidth:'700px',overflow:'hidden', textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                                        {`${detail}, phường/xã ${ward}, quận/huyện  ${district}, ${city}`}
                                    </div>
                                }  
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
                <div className='checkout-body-items-container'>
                    <div className='cart-title-container' style={{width:'1150px', boxShadow:'0px 0px 2px rgba(0, 0, 0, 0.2)'}}>
                       
                        <div className='product-container height-title' style={{color:'#0A0E29',fontSize:'15px',display:'flex', justifyContent:'center'}}>
                                Sản Phẩm
                        </div>
                        <div className='price-container height-title'>
                            Đơn Giá
                        </div>
                        <div className='quantity-container height-title'>
                            Số Lượng
                        </div>
                        <div className='amount-container height-title'>
                            Số Tiền
                        </div>                               
                    </div>

                    <div className='cart-item-container' style={{width:'1150px',minHeight:'100px'}}>
                        {dataCarts.map((cart,index)=>(
                            <div className='cart-item' key={index}>
                                <div className='product-container '>
                                        <div style={{width:'80px', height:"80px",marginLeft:'10px'}}>
                                            <img
                                            style={{ width:'100%', height:'100%'}}
                                            src={cart.laptop.main_image}>                                       
                                            </img>
                                        </div>
                                        <div style={{width:'250px', marginLeft:'10px'}}>{cart.laptop.name}</div>
                                </div>
                                <div className='price-container '>
                                    <div style={{display:'flex', flexDirection:'row', width:'150px', backgroundColor:'white',justifyContent:'center'}}>
                                        <div style={{textDecoration:'line-through', color:'#888888'}}>
                                            {cart.laptop.price} $
                                        </div>
                                        <div style={{fontSize:'15px',marginLeft:'10px'}}>
                                            {cart.laptop.sale_price} $
                                        </div>
                                    </div>

                                    <div style={{fontSize:'12px',width:'100px', backgroundColor:'#EE4D2D',
                                        color:'#ffffff', marginTop:'5px', paddingLeft:'5px',paddingRight:'5px', borderRadius:'5px'}}>
                                            Giá Đã Cập Nhật
                                    </div>
                                </div>
                                <div className='quantity-container '>
                                    <div style={{display:'flex',justifyContent:'center'}}> 
                                        {cart.quantity}
                                    </div>
                                </div>
                                <div className='amount-container '>
                                <div style={{fontSize:'15px',color:'#EE4D2D'}}>
                                        {cart.laptop.sale_price * cart.quantity} $
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div className='checkout-body-bar-container'>
                    <div className='checkout-body-bar-note-container'>
                        <div style={{color:"#888888", width:'100px',height:'40px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                            Lời Nhắn:
                        </div>
                        <input type='text' value={note} onChange={(e)=>setNote(e.target.value)} className='checkout-body-bar-note-input btn'></input>
                    </div>

                    <div className='checkout-body-bar-infomation-container'> 
                        <div className='checkout-body-bar-infomation' 
                        style={{height:'30px', display:'flex', justifyContent:'center'}}>
                            <div  className='btn-add-to-cart'  style={{width:'250px', marginLeft:'0', backgroundColor:'#ffffff', height:'30px'}}>
                                Thanh toán khi nhận hàng
                            </div>
                        </div>

                        <div className='checkout-body-bar-infomation'>
                            <div className='checkout-body-bar-infomation-title'>
                                Tổng  tiền hàng: 
                            </div>
                            <div  className='checkout-body-bar-infomation-value'>
                                {dataCarts.reduce((total, cart) => {
                                return total + (cart.quantity * cart.laptop.sale_price);
                                }, 0)} $
                            </div>
                        </div>
                        <div className='checkout-body-bar-infomation'>
                            <div className='checkout-body-bar-infomation-title'>
                                Phí vận chuyển: 
                            </div>
                            <div className='checkout-body-bar-infomation-value'>
                               Chưa bao gồm
                            </div>
                        </div>
                        <div className='checkout-body-bar-infomation'>
                            <div  className='checkout-body-bar-infomation-title'>
                                Tổng cộng Voucher giảm giá:
                            </div>
                            <div className='checkout-body-bar-infomation-value'>
                                {vouchers.reduce((total, voucher) => {
                                return total + voucher.amount;
                                }, 0)} $
                            </div>
                        </div >
                        <div className='checkout-body-bar-infomation'>
                            <div className='checkout-body-bar-infomation-title'>
                                Tổng thanh toán:
                            </div>
                            <div  className='checkout-body-bar-infomation-value'
                            
                            style={{color: '#EE4D2D' ,fontSize: '24px', fontWeight:'600'}}
                            >
                                {dataCarts.reduce((total, cart) => {
                                return total + (cart.quantity * cart.laptop.sale_price);
                                }, 0)-
                                vouchers.reduce((total, voucher) => {
                                return total + voucher.amount;
                                }, 0)} $
                            </div>
                        </div>
                        <div className='checkout-body-bar-infomation' 
                            style={{height:'50px', display:'flex', justifyContent:'center'}}>   
                            { isSubmitting 
                            ?
                            <div  className='btn-buy-now'  style={{width:'180px', marginLeft:'0', height:'40px',backgroundColor:'#F86E52'}}
                                >
                                    Đang Đặt Hàng ...
                                </div>
                            :
                            <div  className='btn-buy-now'  style={{width:'180px', marginLeft:'0', height:'40px'}}
                                onClick={()=>handleOnclickConfirmOrder()}
                                >
                                    Xác Nhận
                                </div>
                            }                      
                           
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-detail-footer-container">
                <Footer/>
            </div>
            
            </div>
            {/* viet cac fixed khong hien o day */}
            <ToastContainer/>
            {/* change address */}
            {isOnchangeAddress ?
                <div className={`change-address  fade ${isOnchangeAddress ? 'visible' : 'hidden'}`} >
                    <h2 style={{color:'#ffffff'}}> Địa Chỉ Người Nhận </h2>

                    <input type='text' value={city} name='' placeholder='Your City ' onChange={(e)=>setCity(e.target.value)}
                    style={{backgroundColor:'#EEEEEE', width:'200px', height:'40px', border:'none', borderRadius: '10px', padding: '0 10px 0  10px ' }}
                    ></input>

                    <input type='text' value={district} name='' placeholder='Your District ' onChange={(e)=>setDistrict(e.target.value)}
                    style={{backgroundColor:'#EEEEEE', width:'200px', height:'40px', border:'none', borderRadius: '10px', padding: '0 10px 0  10px ' }}
                    ></input>

                    <input type='text' value={ward} name='' placeholder='Your Ward ' onChange={(e)=>setWard(e.target.value)}
                    style={{backgroundColor:'#EEEEEE', width:'200px', height:'40px', border:'none', borderRadius: '10px', padding: '0 10px 0  10px ' }}
                    ></input>

                    <input type='text' value={detail} name='' placeholder='Detail ' onChange={(e)=>setDetail(e.target.value)}
                    style={{backgroundColor:'#EEEEEE', width:'200px', height:'40px', border:'none', borderRadius: '10px', padding: '0 10px 0  10px ' }}
                    ></input>

                    <div style={{width:'250px', height:'40px',display:'flex', flexDirection:'row'}} >
                        <div className='btn-add-to-cart' style={{width:'100px', height:'30px',marginLeft:'15px'}} onClick={()=>setIsOnchangeAddress(false)}>Hủy Bỏ</div>
                        <div className='btn-buy-now' style={{width:'100px', height:'30px', marginLeft:'15px'}} onClick={()=>handleOnclickConfirmAddres()}>Xác Nhận</div>
                    </ div >
                </ div>
                :""
            }
            {/* change address */}
            {isOnchangeUser ?
                <div className={`change-address  fade ${isOnchangeUser ? 'visible' : 'hidden'}`} >
                    <h2 style={{color:'#ffffff'}}> Thông tin Người Nhận </h2>

                    <input type='text' value={name} name='' placeholder='Your Full Name ' onChange={(e)=>setName(e.target.value)}
                    style={{backgroundColor:'#EEEEEE', width:'200px', height:'40px', border:'none', borderRadius: '10px', padding: '0 10px 0  10px ' }}
                    ></input>

                    <input type='text' value={phone} name='' placeholder='Your Phone Number ' onChange={(e)=>setPhone(e.target.value)}
                    style={{backgroundColor:'#EEEEEE', width:'200px', height:'40px', border:'none', borderRadius: '10px', padding: '0 10px 0  10px ' }}
                    ></input>


                    <div style={{width:'250px', height:'40px',display:'flex', flexDirection:'row'}} >
                        <div className='btn-add-to-cart' style={{width:'100px', height:'30px',marginLeft:'15px'}} onClick={()=>setIsOnchangeUser(false)}>Hủy Bỏ</div>
                        <div className='btn-buy-now' style={{width:'100px', height:'30px', marginLeft:'15px'}} onClick={()=>handleOnclickConfirmUser()}>Xác Nhận</div>
                    </ div >
                </ div>
                :""
            }
        </div>
    );
}

export default Checkout;