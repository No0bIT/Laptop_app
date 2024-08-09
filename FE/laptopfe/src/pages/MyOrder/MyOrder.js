import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MyOrder.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format, parseISO } from "date-fns";

const MyOrder = () => {
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('token') || null;
    const navigate = useNavigate();
    const [active,setActive]= useState(0);
    const [orders,setOrders]= useState([]);

    const statuses = [
        {
            value:"ALL",
            title:"Tất cả"
        },
        {
            value:"WAIT_CONFIRM",
            title:"Chờ Xác Nhận"
        },
        {
            value:"CONFIRMED",
            title:"Đã Xác Nhận"
        },
        {
            value:"DELEVERY",
            title:"Đang giao hàng"
        },
        {
            value:"PENDING",
            title:"Chờ Thanh toán"
        },
        {
            value:"PARTIALLY_PAID",
            title:"Đang Trả Góp"
        },
        {
            value:"PAID",
            title:"Đã Thanh Toán"
        },
        {
            value:"CANCEL",
            title:"Đã Hủy"
        },
    ]
    const handleOnclickTitle = (index) => {
        setActive(index)
    }

    const getData = async () => {
        if(token){
            try {
                const response = await axios.get(`http://localhost:8000/api/order/${statuses[active].value}`,{
                    headers:{
                        Authorization: 'Bearer ' + token,
                    }
                })
                if(response.status == 200){
                    setOrders(response.data.data);
                    setIsLoading(false);                  
                }
                else if(response.status ==500){
                    navigate('/login');
                }
                else{
                    toast.error(response.message, {
                        position: 'top-right', // Sử dụng chuỗi để xác định vị trí
                        autoClose: 3000
                    });
                }
            }
            catch (err) {
                toast.error("Serve not found", {
                    position: 'top-right', // Sử dụng chuỗi để xác định vị trí
                    autoClose: 3000
                });
                navigate('/login')
            }
        }
        else{
            navigate('/login');
        }    
    }



    useEffect(() => {
        getData();
    },[active])



    if (isLoading) {
        return <div>Loading...</div>; // Hiển thị thông báo loading
    }
    return (
        <div className='page'>
            {/* <div className={isOnchangeAddress||isOnchangeUser?'body-fade':''} style={{width:'100%', height:'auto'}}> */}
                <div className="product-detail-header-container">
                    <Header />
                </div>
                <div className="myorder-body-container">
                    <div className="myorder-title-container">
                        
                        { statuses.map((status,index) =>(
                            <div className={`myorder-title ${index==active?"myorder-title-ative":""}`}
                            onClick={()=>handleOnclickTitle(index)}
                            >
                                {status.title}
                            </div> 
                        ))}
                    </div>

                    <div className="myorder-item-container">
                        {orders.length==0?
                        <div style={{height:"450px", width:"100%",
                            textAlign:'center',alignContent:"center",
                            color:'#888888'
                        }}
                        > Bạn chưa có sản phẩm nào!</ div>
                        :""

                        }
                        { orders.map((order,index) =>(
                            <div className={`myorder-order`}>
                                { order.status == 'WAIT_CONFIRM'|| order.status=='CONFIRMED'?
                                <div className="btn-buy-now"
                                    style={{width:'150px', height:'40px', position:'absolute',top:'10px',right:'50px', zIndex:'1000'}}
                                    // onClick={}
                                >
                                    Hủy Đơn
                                    </ div >
                                :""     
                                }

                                <div className="myorder-order-code">
                                    Mã Đơn Hàng: {order.id}  
                                           <span style={{marginLeft:'20px'}}>Thời gian đặt hàng:  {format(parseISO(order.created_at), 'yyyy-MM-dd HH:mm:ss')}</span>
                                </div>
                                <div className="myorder-order-product-container">
                                    { 
                                        order.order_details.map((orderDetail,index) =>(
                                            <div className="myorder-order-product btn"
                                                onClick={()=>navigate(`/product/${orderDetail.laptop.id}`)}
                                            >
                                                <div className="myorder-order-product-img">
                                                    <img src={orderDetail.laptop.main_image} style={{width:'100%',height:'100%'}}></img>
                                                </div>
                                                <div className="myorder-order-product-name">
                                                    <div
                                                    >{orderDetail.laptop.name}</div>
                                                    <div
                                                    >x {orderDetail.quantity}</div>
                                                </div>
                                                <div className="myorder-order-product-price">
                                                    <div 
                                                    style={{color:'#888888', textDecoration:'line-through'}}
                                                    >{orderDetail.laptop.price} $</div>
                                                    <div
                                                     style={{color:'#EE4D2D',fontSize:'16px', marginLeft:"10px"}}
                                                    >{orderDetail.price_sold} $</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="myorder-order-amount-container">
                                    <div  style={{ width:'700px', marginLeft:'40px'}}> 
                                        Ghi chú: {order.note}
                                    </div>
                                    <div
                                        style={{display: 'flex', flexDirection: 'row', width:'300px', alignItems: 'center'}}
                                    >             
                                        <div>Thành tiền:</div>
                                        <div
                                        style={{color:'#EE4D2D',fontSize:'18px', marginLeft:"10px", fontWeight:'600', }}
                                        >{order.amount} $</div>
                                    </ div >
                                </div>
                            </div> 
                        ))}
                    </div>
                </div>







                <div className="product-detail-footer-container">
                    <Footer/>
                </div>
            {/* </div> */}
            {/* viet cac fixed khong hien o day */}
            <ToastContainer/>

        </div>
    );
}
export default MyOrder;