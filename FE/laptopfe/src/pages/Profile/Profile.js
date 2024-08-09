import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format, parseISO } from "date-fns";

const Profile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token') || null;
    const navigate = useNavigate();

    const [user, setUser] = useState();
    const [address, setAddress] = useState({

    });

    const [isEdit, setIsEdit] = useState(false);

    
    // can xoa gi khi log out vao day xoa
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate('/login')
    }


    const handleOnchangeCity = (e)=>{
        const newAddress = {
            ...address,
            city: e.target.value
        }
        setAddress(newAddress);
    }
    const handleOnchangeDistrict = (e)=>{
        const newAddress = {
            ...address,
            district: e.target.value
        }
        setAddress(newAddress);
    }
    const handleOnchangeWard = (e)=>{
        const newAddress = {
            ...address,
            ward: e.target.value
        }
        setAddress(newAddress);
    }
    const handleOnchangeDetail = (e)=>{
        const newAddress = {
            ...address,
            detail: e.target.value
        }
        setAddress(newAddress);
    }




    const handleEdit = async ()=>{
        try {
            const response = await axios.post(
                'http://localhost:8000/api/address/update/user',
                { address: address },  // Dữ liệu gửi đến API
                { headers: { Authorization: 'Bearer ' + token } }  // Tiêu đề (header) chứa mã xác thực
            );
        

            if(response.status == 200){

                setAddress(response.data);
                toast.success("Thay đổi địa chỉ thành công!", {
                    position: 'top-right', // Sử dụng chuỗi để xác định vị trí
                    autoClose: 3000
                });     
            }
            else{
                toast.error(response.message, {
                    position: 'top-right', // Sử dụng chuỗi để xác định vị trí
                    autoClose: 3000
                });
            }
        }
        catch (err) {
            toast.error("Serve not found"+ err.message, {
                position: 'top-right', // Sử dụng chuỗi để xác định vị trí
                autoClose: 3000
            });


        }


        setIsEdit(false);
    }

    const getData = async () => {
        if(token){
            try {
                const response = await axios.get(`http://localhost:8000/api/user`,{
                    headers:{
                        Authorization: 'Bearer ' + token,
                    }
                })

                if(response.status == 200){
                    setUser(response.data);
                    if(response.data.address){
                        setAddress(response.data.address);
                    }                 
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
            setIsLoading(false);         
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
        <div className='page'>
            {/* <div className={isOnchangeAddress||isOnchangeUser?'body-fade':''} style={{width:'100%', height:'auto'}}> */}
            <div className="product-detail-header-container">
                <Header />
            </div>

            <div className="profile-body-container">
                    <div className="profile-nav-container">
                        <div style={{width:'100%',height:'70px', display:'flex',
                            flexDirection:'row', marginTop:'10px',justifyContent: 'center',
                            borderBottom : '1px solid #888888'
                            }}>
                            <div style={{width:'50px', height:'50px'}} >
                                <img src="https://i.pinimg.com/originals/1c/77/7c/1c777ccab76cd34a26a223bf5ccd71d8.png"
                                style={{width:'100%', height:'100%'}}
                                ></img>
                            </div>
                            <div style={{width:'200px',height:'50px', display:'flex',marginLeft:'10px',
                                flexDirection:'column',justifyContent:'space-evenly',
                                
                                }}>
                                <div>
                                    {user.email}
                                </div>
                                <div>
                                    {user.name}
                                </div>
                            </div>
                            
                        </div>
                        <div className="profile-nav-items">
                            <div className="profile-nav-item profile-nav-item-active">
                                Tài Khoản Của Tôi
                            </div>
                            <div className="profile-nav-item"
                                onClick={()=>navigate('/cart')}
                            >
                                Giỏ Hàng Của Của Tôi
                            </div>
                            <div className="profile-nav-item"
                             onClick={()=>navigate('/myorder')}
                            > 
                                Đơn Hàng Của Tôi
                            </div>
                            <div className="profile-nav-item" style={{color:'red'}}
                                onClick={()=>handleLogout()}
                            >
                                Đăng Xuất
                            </div>
                        </div>



                    </div>
                    {/* hien thi profile */}
                    <div className="profile-view-container">
                        <div className="profile-view-title">
                            Tài Khoản Của Tôi
                        </div>
                        <div className="profile-view-body">
                            <div >
                                <div style={{fontWeight:'600',margin:'10px 0 10px 0'}}>
                                    Thông Tin Cá Nhân
                                </div>
                                <div className="profile-view-item">
                                    <div className="profile-view-item-title">Email : </div>
                                    <div style={{paddingLeft: '15px'}}>{user.email} </div>

                                </div>
                                <div className="profile-view-item" >
                                    <div className="profile-view-item-title">Name : </div>
                                    <input className="profile-view-item-input" type="text" value={user.name} disabled={true}></input>
                                </div>
                                <div className="profile-view-item">
                                <div className="profile-view-item-title">Phone : </div>
                                    <input className="profile-view-item-input"  type="text" value={user.phone}  disabled={true}></input>
                                </div>
                            </div>
                            <div>
                                <div style={{fontWeight:'600',margin:'10px 0 10px 0'}}>
                                    Địa Chỉ Mặc Định
                                </div>
                                <div className="profile-view-item">
                                <div className="profile-view-item-title">Thành Phố/Tỉnh :  </div>
                                    <input className="profile-view-item-input"  type="text" value={address.city} disabled={isEdit?false:true}
                                    onChange={(e)=>handleOnchangeCity(e)}
                                    ></input>
                                </div>
                                <div className="profile-view-item">
                                <div className="profile-view-item-title">Quận/Huyện : </div>
                                    <input className="profile-view-item-input"  type="text" value={address.district} disabled={isEdit?false:true}
                                    onChange={(e)=>handleOnchangeDistrict(e)}
                                    ></input>
                                </div>
                                <div className="profile-view-item">
                                <div className="profile-view-item-title">Phường/Xã : </div>
                                    <input className="profile-view-item-input"  type="text" value={address.ward} disabled={isEdit?false:true}
                                    onChange={(e)=>handleOnchangeWard(e)}
                                    ></input>
                                </div>
                                <div className="profile-view-item">
                                <div className="profile-view-item-title">Chi Tiết : </div>
                                    <input className="profile-view-item-input"  type="text" value={address.detail} disabled={isEdit?false:true}
                                    onChange={(e)=>handleOnchangeDetail(e)}
                                    ></input>
                                </div>
                            </div>
                            {   !isEdit
                                ?
                                <div
                                    className="btn"
                                    style={{color:"#0b82f8", textDecoration:'underline'}}
                                    
                                    onClick={() =>setIsEdit(true)}
                                >Chỉnh Sửa</div>
                                :
                                <div className="profile-view-item">
                                    <div
                                    className="btn"
                                    style={{color:"red", textDecoration:'underline'}}
                                    onClick={() =>setIsEdit(false)}
                                    >Hủy</div>
                                    <div
                                    className="btn"
                                    style={{color:"#0b82f8", textDecoration:'underline', marginLeft:'20px'}}
                                    onClick={() =>handleEdit()}
                                    >Xác Nhận</div>
                                 </div>
                            }
                            
                        </div>
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
export default Profile;