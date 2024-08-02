import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();


    const [carts, setCarts] = useState([]);
    const [laptops, setLaptops] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [dataCarts,setDataCarts] = useState([]);

    const handleClickBuyNow = () => {
        if(dataCarts.length)
        {
            navigate('/checkout', { state: { dataCarts: dataCarts } });
        }
        else{
            toast.warning("Vui lòng chọn sản phẩm cần mua!", {
                position: 'top-right', // Sử dụng chuỗi để xác định vị trí
                autoClose: 3000
            });
        }
      };

    const handleOnchangeAllItem = (e) => {
        if (e.target.checked) {
            setDataCarts(carts);
          } else {
            // Checkbox is unchecked
            setDataCarts([]);
          }
    };

    const handleOnchangeItem = (index, e) => {
        if (e.target.checked) {
          // Checkbox is checked, thêm phần tử vào dataCarts
          setDataCarts(prev => [...prev, carts[index]]);
        } else {
          // Checkbox is unchecked, loại bỏ phần tử khỏi dataCarts
          setDataCarts(prev => prev.filter((item) => item!== carts[index]));
        }
      };

    const handleClickDelete = (index) => {
        setDataCarts(prev => prev.filter((item) => item!== carts[index]));
        const LocSCarts =carts.filter((item) => item!== carts[index])

        setCarts(LocSCarts);
        localStorage.setItem('carts', JSON.stringify(LocSCarts));

        toast.success("Đã xóa khỏi giỏ hàng!", {
            position: 'top-right', // Sử dụng chuỗi để xác định vị trí
            autoClose: 3000
        });
    };

    const handleClickIncreQuantity = (index) => {
       
        if (carts[index].quantity < carts[index].laptop.quantity) {

            const cart = { ...carts[index], quantity: carts[index].quantity + 1 };
    

            const newDataCarts = dataCarts.map(item => 
                item.id === carts[index].id ? cart : item
            );
            const newCarts = carts.map(item => 
                item.id === carts[index].id ? cart : item
            );
    
            setDataCarts(newDataCarts);
            setCarts(newCarts);
    
            // Cập nhật carts vào localStorage
            localStorage.setItem('carts', JSON.stringify(newCarts));
        } else {
            toast.warning("Vượt quá số lượng tối đa!", {
                position: 'top-right',
                autoClose: 3000
            });
        }
    };
    const handleClickDecreQuantity= (index) => {
        if(carts[index].quantity>1) {
            const cart = {...carts[index], quantity: carts[index].quantity-1}
            const newDataCarts = dataCarts.map(item => 
                item.id === carts[index].id ? cart : item
            );
            const newCarts = carts.map(item => 
                item.id === carts[index].id ? cart : item
            );
    
            setDataCarts(newDataCarts);
            setCarts(newCarts);
    
            
            localStorage.setItem('carts', JSON.stringify(newCarts));
        }
        else{
            toast.warning("Số lượng tối thiểu la 1!", {
                position: 'top-right', // Sử dụng chuỗi để xác định vị trí
                autoClose: 3000
            });
        }
    }
    console.log(dataCarts);

    useEffect(() => {
        const fetchCartProduct = async () => {

            
          try {
            const storedCarts = JSON.parse(localStorage.getItem('carts')) || [];
           

            const response = await axios.get(`http://localhost:8000/api/cart`,{
                params:{
                    carts: storedCarts,
                }
            });

            const cartsWithLaptops = storedCarts.map(cart => {
                // Nếu id trong carts là id của laptop, dùng nó để tìm laptop
                const laptop = response.data.find(laptop => laptop.id == cart.id);
                return { ...cart, laptop };
            });

            setCarts(cartsWithLaptops);
            setLaptops(response.data);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        };
    
        fetchCartProduct();
      }, []);


    if (isLoading) {
        return <div>Loading...</div>; // Hiển thị thông báo loading
    }

    return (
        <div className='page'>
        <div className="product-detail-header-container">
            <Header />
        </div>
        <div className='cart-body-container'>

            <div className='cart-title-container'>
                <div className='checkbox-container height-title'>
                    <input type="checkbox"  className='btn-checkbox'
                    onChange={(e)=>handleOnchangeAllItem(e)}
                    ></input>
                </div>
                <div className='product-container height-title' style={{color:'#0A0E29',fontSize:'15px'}}>
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
                <div className='veb-container height-title'>
                    Thao Tác
                </div>
            </div>

            <div className='cart-item-container'>
                {carts.map((cart,index)=>(
                    <div className='cart-item'>
                        <div className='checkbox-container '>
                            <input type="checkbox"  className='btn-checkbox'
                            checked={dataCarts.includes(cart)?true:false}
                            onChange={(e)=>handleOnchangeItem(index,e)}
                            ></input>
                        </div>
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
                            <div style={{display:'flex', flexDirection: 'row', marginLeft:'30px'}}> 
                                <div 
                                style={{width:'30px',height:'30px',Color:'rgb(170, 170, 173)', alignContent:'center',
                                    textAlign:"center",fontSize:'20px',border:'1px solid rgb(170, 170, 173)',
                                    borderTopLeftRadius:'2px',borderBottomLeftRadius:'2px'
                                    }}
                                className={`btn`}
                                onClick={()=>handleClickDecreQuantity(index)}
                                    >-</div>
                                <div 
                                style={{width:'50px',height:'30px', alignContent:'center',border:'1px solid rgb(170, 170, 173)',
                                    textAlign:"center",fontSize:'16px',color:'black'}}>{cart.quantity}</div>
                                <div 
                                style={{width:'30px',height:'30px',Color:'rgb(170, 170, 173)', alignContent:'center',
                                    textAlign:"center",fontSize:'20px', 
                                    borderBottomRightRadius:'2px',borderTopRightRadius:'2px',border:'1px solid rgb(170, 170, 173)',                      
                                    }}
                                    className={`btn `}
                                    onClick={()=>handleClickIncreQuantity(index)}
                                    >+</div>
                            </div>
                        </div>
                        <div className='amount-container '>
                        <div style={{fontSize:'15px',color:'#EE4D2D'}}>
                                {cart.laptop.sale_price * cart.quantity} $
                            </div>
                        </div>
                        <div className='veb-container '>
                            <div className='btn' 
                            onClick={() =>handleClickDelete(index)}
                            >Xóa</div>
                        </div>
                    </div>
                ))

                }
            </div>

            <div className='cart-bar-container'>
                <div className='checkbox-container ' style={{height:'50px'}}>
                    <input type="checkbox"  className='btn-checkbox'
                    
                    onChange={(e)=>handleOnchangeAllItem(e)}
                    ></input>
                </div>
                <div style={{alignContent:'center', width:'350px', height:'100%'}}>
                    Chọn Tất Cả
                </div>
                <div style={{alignContent:'center', width:'230px', height:'100%', marginLeft:'100px'}}>
                    Tổng thanh toán({dataCarts.length} Sản phẩm):
                </div>
                <div  style={{alignContent:'center', width:'150px', height:'100%',fontWeight:'600', textAlign: 'center',
                      color:'#F86E52', fontSize:'16px'}}>
                    {dataCarts.reduce((total, cart) => {
                        return total + (cart.quantity * cart.laptop.sale_price);
                        }, 0)} $
                </div>
                <div className='btn-buy-now' style={{marginRight:'10px'}}
                onClick={()=>handleClickBuyNow()}
                >
                    Mua Hàng
                </div>
            </div>

        </div>

        <div className="product-detail-footer-container">
          <Footer/>
        </div>
        <ToastContainer/>
      </div>
    );


}
export default Cart;