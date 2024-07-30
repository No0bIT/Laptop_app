import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import './Home.css'
import axios from "axios";


function Home() {
    const [laptops, setLaptops] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchLaptops(currentPage);
    }, [currentPage]);

    const fetchLaptops = async (page) => {
        try {
        const response = await axios.get(`http://localhost:8000/api/laptop?page=${page}`);
        setLaptops(response.data.data);
        setTotalPages(response.data.last_page);
        } catch (error) {
        console.error("Error fetching laptops:", error);
        }
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
      };
      console.log(laptops);

    return (
        <div className='fullScreen' style={{width:'100%',height:'2000px',}}>
            <div className="home-header-container">
                <Header  />
            </div>

            <div className="home-container">
               
                    <div className="home-laptops-container">
                        {laptops.map(laptop=>(
                            <div className="home-laptop" key={laptop.id}> 
                                <div className="home-laptop-img">
                                    <img
                                    style={{ width:'100%', height:'100%'}}
                                     src="https://cdn.tgdd.vn/Products/Images/44/313333/lenovo-ideapad-slim-3-15iah8-i5-83er00evn-glr-2.jpg">                                       
                                     </img>
                                </div>
                                <div className="home-laptop-profile">
                                    <div className="home-laptop-profile-name" style={{ }}>{laptop.name}</div>
                                    <div style={{color:'#636770',width:'100px',height:'18px',backgroundColor:"#EAEAEA",textAlign:'center', fontSize:'14px', borderRadius:'5px'}}>RAM {laptop.ram}</div>
                                    <div style={{color:'#636770',display:"flex",flexDirection:'row',fontSize:'14px'}}>
                                        <div style={{textDecoration:'line-through'}}>{laptop.price.toFixed(1)} $</div>
                                        <div style={{ marginLeft:'15px'}}>-{((100 - (laptop.sale_price / laptop.price) * 100) || 0).toFixed(0)} %</div>
                                    </div>
                                    <div style={{fontSize:'20px',fontWeight:'600',color:'red'}}>{laptop.sale_price.toFixed(1)} $</div>
                                    
                                    <div style={{color:'#636770',fontSize:'14px'}}>Kho: {laptop.quantity}</div>
                                    <div style={{color:'#636770',fontSize:'14px'}}>Đã bán {laptop.quantity}</div>
                                    <div style={{height:'16px', width:'80px', display:"flex", flexDirection:'row', position:'relative'}}>
                                        {
                                        Array.from({ length: 5 }).map((_, i) => (
                                            <div key={i} style={{ width: '16px', height: '16px'}}>
                                                <img src="/icons/star.png" alt="Star" style={{ width: '100%' }} />
                                            </div>
                                        ))
                                        }
                                        {/* sua so luong sao o day thay so 2 thanh rating*/}
                                        <div style={{position:'absolute',height:'16px',left:'100%',top:'0',width: `${1.5 * 16}px`,backgroundColor:'white',transform:'translate(-100%,0)' }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="home-navigate-container">
                        <button 
                            className="btn"
                            disabled={currentPage === 1} 
                            onClick={() => handlePageChange(currentPage - 1)}
                            >
                            &laquo; Previous
                            </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                        <button 

                            key={i + 1} 
                            onClick={() => handlePageChange(i + 1)} 
                            className= {currentPage === i + 1 ? 'active btn' : 'btn'}
                        >
                            {i + 1}
                        </button>
                        ))}
                        <button 
                         className="btn"
                        disabled={currentPage === totalPages} 
                        onClick={() => handlePageChange(currentPage + 1)}
                        >
                        Next &raquo;
                        </button>
                    </div>
            </div>

            <div style={{position:'relative', width:'100%',bottom:'0px', marginTop:'50px', minWidth:'1300px'}}>
                <Footer/>
            </div>
        </div>
    )
}

export default Home;