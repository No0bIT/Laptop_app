import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ProductDetail.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetailBody from "../../components/ProductDetailBody/ProductDetailBody";



const ProductDetail = () => {
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
      <div className='page'>
        <div className="product-detail-header-container">
            <Header />
        </div>
        
        <ProductDetailBody action='VIEW' ></ProductDetailBody>


        <div className="product-detail-footer-container">
          <Footer/>
        </div>
        <ToastContainer/>
      </div>
      );
};

export default ProductDetail;