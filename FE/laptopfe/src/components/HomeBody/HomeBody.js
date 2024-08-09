import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import './HomeBody.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";


function HomeBody({role}) {
    const navigate = useNavigate();
    const [laptops, setLaptops] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [strSearch, setStrSearch] = useState('');
    const [isActive, setIsActive] = useState('');
    // const [dataFillters, setDataFillters] = useState([]);
    const [dataRams, setDataRams] = useState([]);
    const [dataCpus, setDataCpus] = useState([]);
    const [dataStorages, setDataStorages] = useState([]);

    // cac thuoc tinh de gui filter di
    const [filters, setFilters] = useState([]);
    const [rams, setRams] = useState([]);
    const [cpus, setCpus] = useState([]);
    const [storages, setStorages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [systems, setSystems] = useState([]);


    const handleKeyDownSearch = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleClickSearch();
        }
      };

    const handleRamClick = (ram, e) => {
        e.stopPropagation();
        setRams(prevRams => {
            // Tạo mảng mới với ram được thêm hoặc loại bỏ
            const updatedRams = prevRams.includes(ram)
                ? prevRams.filter(item => item !== ram) // Loại bỏ phần tử nếu đã có trong mảng
                : [...prevRams, ram]; // Thêm phần tử vào mảng nếu chưa có   
            // Cập nhật filters với giá trị mới của rams
                setFilters(prevFilters => ({
                    ...prevFilters, // Giữ lại các giá trị hiện tại của filters
                    ram: updatedRams // Cập nhật giá trị của rams
                }));      
            return updatedRams;
        });
        
        console.log(1);
        
    };

    const handleCpuClick = (cpu, e) => {
        e.stopPropagation();
        setCpus(prevCpus => {
            // Tạo mảng mới với cpu được thêm hoặc loại bỏ
            const updatedCpus = prevCpus.includes(cpu)
                ? prevCpus.filter(item => item !== cpu) // Loại bỏ phần tử nếu đã có trong mảng
                : [...prevCpus, cpu]; // Thêm phần tử vào mảng nếu chưa có
    
            // Cập nhật filters với giá trị mới của cpus
                setFilters(prevFilters => ({
                    ...prevFilters, // Giữ lại các giá trị hiện tại của filters
                    cpu: updatedCpus // Cập nhật giá trị của cpus
                }));
            return updatedCpus;
        });
    };
    const handleStorageClick = (storage, e) => {
        e.stopPropagation();
        setStorages(prevStorages => {
            // Tạo mảng mới với storage được thêm hoặc loại bỏ
            const updatedStorages = prevStorages.includes(storage)
                ? prevStorages.filter(item => item !== storage) // Loại bỏ phần tử nếu đã có trong mảng
                : [...prevStorages, storage]; // Thêm phần tử vào mảng nếu chưa có
    
            // Cập nhật filters với giá trị mới của storages
                setFilters(prevFilters => ({
                    ...prevFilters, // Giữ lại các giá trị hiện tại của filters
                    storage: updatedStorages // Cập nhật giá trị của storages
                })); 
            return updatedStorages;
        });
    };

    const handleClickClearFilter = () => {
        setRams([]);
        setCpus([]);
        setStorages([]);
        setFilters([]);
        setCurrentPage(1);
    }
    const handleClickSearch = () => {
        fetchLaptops();
    };
    const handleClickProduct = (id) => {
        if(role === 'ADMIN') {
            navigate('/product/' + id+'/admin');
        }
        else{
            navigate('/product/' + id);
        }
        
    };

    useEffect(() => {
        fetchLaptops(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchLaptops();
    }, [filters]);

    useEffect(() => {
        fetchDataFilter();
    }, []);


    const fetchDataFilter= async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/auth/filter`);
            // setDataFillters(response.data);
            setDataCpus(response.data.cpus); 
            setDataRams(response.data.rams);
            setDataStorages(response.data.storages);
            // console.log(response.data);

        } catch (error) {
            console.error("Error fetching dataFillters:", error);
        }
    };

    const fetchLaptops = async (page) => {
        try {
        const response = await axios.get(`http://localhost:8000/api/auth/laptop?page=${page}`,
        {   
            params:{
                strSearch:strSearch,
                filters:filters
            }
        });
        setLaptops(response.data.data);
        setTotalPages(response.data.last_page);
        } catch (error) {
            console.error("Error fetching laptops:", error);
        }
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    //   console.log(laptops);

    return (
       
            <div className="home-container">
                    <div className="home-search-filter-container">
                        {/* xu li cac thanh tim kiem o day */}
                        <div className="home-search-container">
                            <input
                                className="home-search-input"
                                type="text"
                                value={strSearch}
                                onChange={(e) => setStrSearch(e.target.value)}
                                onKeyDown={(e)=>handleKeyDownSearch(e)}
                                placeholder='Tìm kiếm ...'
                                required
                            />
                            <div className="home-search-btn" onClick={handleClickSearch}>Search</div>
                        </div>
                        {/*  xu li cac bo loc o day    */}
                        <div className="home-filter-container">
                            

                            <div className={`home-filter `}
                                style={{backgroundColor: !(rams.length==0&&cpus.length==0&&storages.length==0) ? '#F0CE17' : '#A8A8A8' }}
                                onClick={handleClickClearFilter}
                                >Clear filter
                                
                            </div>
                            {/* loc ram */}
                            <div className={`home-filter ${isActive == 'ram'?'home-filter-focus':''}`}
                                onClick={()=>setIsActive(pre=>(pre=='ram'?"":"ram"))}
                                >Ram {isActive == 'ram'?"▲":"▼"}
                                    {isActive == 'ram'?
                                    <div>
                                        <div className="home-filter-detail-point">▲</div>
                                        <div className="home-filter-detail-container">
                                                {dataRams.map(ram=>(
                                                    <div 
                                                        onClick={(e) => { handleRamClick(ram,e)}}
                                                        className={`home-filter-detail-item ${rams.includes(ram)?'home-filter-focus':''}`}
                                                    >{ram}</div>
                                                ))}
                                        </div>
                                    </div>
                                    :""}   
                            </div>
                             {/* loc ram */}
                             <div className={`home-filter ${isActive == 'cpu'?'home-filter-focus':''}`}
                                onClick={()=>setIsActive(pre=>(pre=='cpu'?"":"cpu"))}
                                >CPU {isActive == 'cpu'?"▲":"▼"}
                                    {isActive == 'cpu'?
                                    <div>
                                        <div className="home-filter-detail-point">▲</div>
                                        <div className="home-filter-detail-container">
                                                {dataCpus.map(cpu=>(
                                                    <div 
                                                        onClick={(e) => {handleCpuClick(cpu,e)}}
                                                        className={`home-filter-detail-item ${cpus.includes(cpu)?'home-filter-focus':''}`}
                                                    >{cpu}</div>
                                                ))}
                                        </div>
                                    </div>
                                    :""}   
                            </div>
                             {/* loc ram */}
                             <div className={`home-filter ${isActive == 'storage'?'home-filter-focus':''}`}
                                onClick={()=>setIsActive(pre=>(pre=='storage'?"":"storage"))}
                                >Storage {isActive == 'storage'?"▲":"▼"}
                                    {isActive == 'storage'?
                                    <div>
                                        <div className="home-filter-detail-point">▲</div>
                                        <div className="home-filter-detail-container">
                                                {dataStorages.map(storage=>(
                                                    <div 
                                                        onClick={(e) => {handleStorageClick(storage,e)}}
                                                        className={`home-filter-detail-item ${storages.includes(storage)?'home-filter-focus':''}`}
                                                    >{storage}</div>
                                                ))}
                                        </div>
                                    </div>
                                    :""}   
                            </div>
                        </div>
                    </div>
                    <div className="home-laptops-container">
                        {laptops.map(laptop=>(
                            <div className="home-laptop" key={laptop.id} onClick={()=>handleClickProduct(laptop.id)}> 
                                <div className="home-laptop-img">
                                    <img
                                    style={{ width:'100%', height:'100%'}}
                                     src={laptop.main_image}>                                       
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
                                    
                                    <div style={{color:'#636770',fontSize:'14px'}}>Kho: {laptop.quantity?laptop.quantity:"Hết hàng"}</div>
                                    <div style={{color:'#636770',fontSize:'14px'}}>Đã bán {laptop.total_sold}</div>
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
    )
}

export default HomeBody;