import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ProductDetailBody.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ProductDetailBody = ({action,role}) => {


    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);


    const [laptop, setLaptop] = useState(null);
    const [images, setImgages] = useState([]);



    const [feedbacks, setFeedbacks] = useState([]);

    const [imageActive, setImgageActive] = useState(0);
    const [imagesActive, setImgagesActive] = useState(0);

    
    const [quantity, setQuantity] = useState(1);
    const [showAllcoment, setShowAllcoment] = useState(false);

    const handleClickArrowLeft = () => {
      if(imagesActive>0){
        setImgagesActive(pre=>pre-1);
      }
    };
    const handleClickArrowRight = () => {
      if(imagesActive +5 <images.length ){
        setImgagesActive(pre=>pre+1);
      }
    };
    const handleClickSlideShowItem = (index) => {
      setImgageActive(index);
    };
    const handleClickIncreQuantity = () => {
      if(quantity<laptop.quantity){
        setQuantity(pre=>pre+1);
      }
    };
    const handleClickDecreQuantity = () => {
      if(quantity>1){
        setQuantity(pre=>pre-1);
      }
    };
    const handleClickBuyNow = () => {
      const dataCarts = [
        {
          laptop: laptop,
          quantity: quantity,
          id:laptop.id
        }
      ];

      navigate('/checkout', { state: { dataCarts: dataCarts } });
    };
    const handleClickAddToCart = () => {
      let carts = JSON.parse(localStorage.getItem('carts')) || [];

      const newCartItem = {
        id: id, // ID của sản phẩm
        quantity: quantity // Số lượng sản phẩm
      };

      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
      const existingCartItemIndex = carts.findIndex(cartItem => cartItem.id === newCartItem.id);

      if (existingCartItemIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        carts[existingCartItemIndex].quantity += newCartItem.quantity;
      }else {
        // Thêm sản phẩm mới vào giỏ hàng
        carts.push(newCartItem);
      }

      localStorage.setItem('carts', JSON.stringify(carts));

      toast.success("Đã thêm vào giỏ hàng!", {
        position: 'top-right', // Sử dụng chuỗi để xác định vị trí
        autoClose: 3000
      });

      console.log(carts);

    };



    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/api/auth/laptop/${id}`);
            setLaptop(response.data);
            setImgages(response.data.images);
            setFeedbacks(response.data.feedbacks);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        };
    
        fetchProduct();
      }, [id]);

    if (isLoading) {
      return <div>Loading...</div>; // Hiển thị thông báo loading
    }

    return (
        <div className="product-detail-body-container">
            <div className="product-detail-body-view-container">
              <div className="product-detail-view-img-container">
                  <div style={{width:'450px', height:'450px',boxShadow :'0px 2px 5px rgba(0, 0, 0, 0.2)', borderRadius:'10px'}}>
                      <img src={ images[imageActive].link} style={{height:'100%',width:'100%'}}></img>
                  </div>

                  <div style={{width:'500px', height:'100px', position:'relative'}}>
                    <div className="product-detail-view-slider-arrows arrow-left" onClick={()=>handleClickArrowLeft()}>◀</div>
                    <div style={{width:'500px', height:'100px', display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}  
                    >
                      { Array.from({ length: laptop.images.length <5?laptop.images.length:5 }).map((_, i) => (
                          <div 
                          className={` slide-shows-img btn ${imagesActive + i ==imageActive ?"slide-shows-active-img  ":''}` }
                            onClick={()=>handleClickSlideShowItem(imagesActive + i)}>
                            <img src={ images[imagesActive + i].link} style={{height:'100%',width:'100%'}}></img>
                          </div>
                      ))
                      }
                    </div>
                    <div className="product-detail-view-slider-arrows arrow-right" onClick={()=>handleClickArrowRight()}>▶</div>
                  </div>
              </div>
              <div className="product-detail-view-name">
                <div style={{fontSize:'20px', fontWeight:'600',color:'black'}}>{laptop.name}</div>
                <div style={{display:'flex', flexDirection:'row'}}>
                  <div style={{height:'16px', width:'80px', display:"flex", flexDirection:'row', position:'relative'}}>
                                          {
                                          Array.from({ length: 5 }).map((_, i) => (
                                              <div key={i} style={{ width: '16px', height: '16px'}}>
                                                  <img src="/icons/star.png" alt="Star" style={{ width: '100%' }} />
                                              </div>
                                          ))
                                          }
                                          {/* sua so luong sao o day thay so 2 thanh rating*/}
                                          <div style={{position:'absolute',height:'16px',left:'100%',top:'0',width: `${ (5-laptop.average_rating) * 16}px`,backgroundColor:'white',transform:'translate(-100%,0)' }}></div>
                  </div>
                  <div style={{marginLeft:'25px'}}>Số lượt đánh giá: {feedbacks.length}</div>
                </div>

                
                <div style={{color:'#636770',display:"flex",flexDirection:'row',fontSize:'14px'}}>
                  <div style={{textDecoration:'line-through'}}>{laptop.price.toFixed(1)} $</div>
                  <div style={{ marginLeft:'16px'}}>-{((100 - (laptop.sale_price / laptop.price) * 100) || 0).toFixed(0)} %</div>
                </div>
                <div style={{fontSize:'30px',fontWeight:'600',color:'red'}}>{laptop.sale_price.toFixed(1)} $</div>     


                <div>Kho: {laptop.quantity ==0 ?"Hết hàng" :laptop.quantity}</div>
                <div>Đã bán: {laptop.total_sold}</div>  

                <div style={{display:'flex', flexDirection: 'row', alignItems:"center"}}>
                  <div> Số lượng: </div>
                  <div style={{display:'flex', flexDirection: 'row', marginLeft:'30px'}}> 
                    <div 
                      style={{width:'30px',height:'30px',backgroundColor:'rgb(170, 170, 173)', alignContent:'center',
                        textAlign:"center",fontSize:'20px', fontWeight:'600',color:'white',border:'1px solid rgb(170, 170, 173)',
                        borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px'
                        }}
                      className={`btn incre`}
                      onClick={()=>handleClickDecreQuantity()}
                        >-</div>
                    <div 
                      style={{width:'50px',height:'30px', alignContent:'center',border:'1px solid rgb(170, 170, 173)',
                        textAlign:"center",fontSize:'16px',color:'black'}}>{quantity}</div>
                    <div 
                      style={{width:'30px',height:'30px',backgroundColor:'rgb(170, 170, 173)', alignContent:'center',
                        textAlign:"center",fontSize:'20px', fontWeight:'600',color:'white',
                        borderBottomRightRadius:'10px',borderTopRightRadius:'10px',border:'1px solid rgb(170, 170, 173)',                      
                        }}
                        className={`btn incre`}
                        onClick={()=>handleClickIncreQuantity()}
                        >+</div>
                  </div>
                </div>  
                <div style={{display:'flex', flexDirection: 'row'}}>
                  <div className={`btn-add-to-cart ${laptop.quantity>0?'':"btn-disable"}`} onClick={()=>handleClickAddToCart()}>Thêm Vào Giỏ Hàng</div>
                  <div className={`btn-buy-now ${laptop.quantity>0?'':"btn-disable"}`} onClick={()=>handleClickBuyNow()} >Mua Ngay</div>

                </div>                          
              </div>
              
            </div>
            <div className="product-detail-body-profile-container">
                <div className="product-detail-body-title">CHI TIẾT SẢN PHẨM</div>
                <div>
                  <div className="profile-detail-item">
                          <div className="profile-detail-item-title">Kho</div>         
                          <div style={{marginLeft:'20px'}}>{laptop.quantity}</div>
                    </div>
                    <div className="profile-detail-item">
                          <div className="profile-detail-item-title">
                            Hãng</div>
                          <div style={{marginLeft:'20px'}}>{laptop.brand.name}</div>
                    </div>
                  <div className="profile-detail-item">
                        <div style={{color:'#9999BA',width:'150px', height:'auto',alignContent:'center',
                          minHeight:'30px', overflowWrap:'break-word'}}>
                          Model</div>
                        <div style={{marginLeft:'20px'}}>{laptop.model}</div>
                  </div>

                  <div className="profile-detail-item">
                          <div className="profile-detail-item-title">
                            Chiều ngang</div>
                          <div style={{marginLeft:'20px'}}>{laptop.width}</div>
                    </div>
                  
                  <div className="profile-detail-item">
                          <div className="profile-detail-item-title">
                            Chiều dọc</div>
                          <div style={{marginLeft:'20px'}}>{laptop.height}</div>
                    </div>
                  <div className="profile-detail-item">
                          <div className="profile-detail-item-title">
                            Cân nặng</div>
                          <div style={{marginLeft:'20px'}}>{laptop.weight} Kg</div>
                    </div>
                  <div className="profile-detail-item">
                          <div className="profile-detail-item-title">
                            Ram</div>
                          <div style={{marginLeft:'20px'}}>{laptop.ram}</div>
                    </div>
                  <div className="profile-detail-item">
                          <div className="profile-detail-item-title">
                            Hệ thống</div>
                          <div style={{marginLeft:'20px'}}>{laptop.system}</div>
                    </div>

                  <div className="profile-detail-item">
                          <div className="profile-detail-item-title">
                            Chiều ngang màn hình</div>
                          <div style={{marginLeft:'20px'}}>{laptop.width_screen}</div>
                    </div>
                  <div className="profile-detail-item">
                          <div className="profile-detail-item-title">
                            Chiều dọc màn hình</div>
                          <div style={{marginLeft:'20px'}}>{laptop.height_screen}</div>
                    </div>
                    <div className="profile-detail-item">
                          <div className="profile-detail-item-title">
                            FPS</div>
                          <div style={{marginLeft:'20px'}}>{laptop.fps_max}</div>
                    </div>
                    <div className="profile-detail-item">
                          <div className="profile-detail-item-title">
                            Độ phân giải tối đa</div>
                          <div style={{marginLeft:'20px'}}>{laptop.resolution_max}</div>
                    </div>
                    <div className="profile-detail-item">
                          <div className="profile-detail-item-title">
                            CPU</div>
                          <div style={{marginLeft:'20px'}}>{laptop.cpu}</div>
                    </div>
                    <div className="profile-detail-item">
                          <div className="profile-detail-item-title">
                            GPU</div>
                          <div style={{marginLeft:'20px'}}>{laptop.gpu}</div>
                    </div>
                    <div className="profile-detail-item">
                          <div className="profile-detail-item-title">
                            Ổ cứng</div>
                          <div style={{marginLeft:'20px'}}>{laptop.storage}</div>
                    </div>
                    <div className="profile-detail-item">
                          <div className="profile-detail-item-title">
                            Pin</div>
                          <div style={{marginLeft:'20px'}}>{laptop.pin}</div>
                    </div>
                    <div className="profile-detail-item">
                          <div className="profile-detail-item-title">
                            Wifi</div>
                          <div style={{marginLeft:'20px'}}>{laptop.wifi}</div>
                    </div>


                  
                </div>
            </div>
            <div className="product-detail-body-description-container">
              <div className="product-detail-body-title">MÔ TẢ SẢN PHẨM</div>
              <div style={{marginLeft:'30px'}}>Chúng tôi sẽ cập nhật sau</div>
            </div>
            <div className="product-detail-body-feedback-container">
              <div className="product-detail-body-title">ĐÁNH GIÁ VÀ PHẢN HỒI</div>
                  {feedbacks.length ==0 
                  ?
                    <div>Chưa có phản hồi nào</div>
                  :
                    <div style={{display:'flex', flexDirection:'column', marginLeft:'30px'}}>
                      {
                       feedbacks.map(feedback=>(
                        <div style={{margin:'10px 0px 10px 10px'}}>
                          <div style={{display:'flex', flexDirection:"row"}}>
                            <div style={{width:'50px',height:'50px', borderRadius:'50%'}}>
                              <img style={{width:'100%',height:'100%', borderRadius:'50%'}} src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" ></img>
                            </div>
                            <div style={{width:'auto',height:'50px', marginLeft:'15px', alignContent:'center'}}>
                              <div style={{}}>
                                {feedback.user.name}
                              </div>
                              <div style={{display:'flex', flexDirection:'row', marginTop:'5px'}}>
                                {
                                  Array.from({ length: feedback.star }).map((_, i) => (
                                    <div key={i} style={{ width: '16px', height: '16px'}}>
                                      <img src="/icons/star.png" alt="Star" style={{ width: '100%' }} />
                                    </div>
                                  ))
                                }                                
                              </div>
                            </div>
                          </div>
                          <div style={{width:'1000px', marginLeft:'65px', height:'auto',color: '#757575', fontSize:'15px', overflowWrap:'break-word'}}>
                            {feedback.content}
                          </div>                        
                        </div>
                       ))
                      }
                    </div>
                  }  
              <div className="btn-feedback">Viết Đánh Giá</div>      
            </div>
            <ToastContainer/>
        </div>
      );
};

export default ProductDetailBody;