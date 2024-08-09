
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import HomeBody from "../../components/HomeBody/HomeBody";

function Home() {
    

    return (
        <div className='page'>
            <div className="product-detail-header-container">
                <Header />
            </div>
            <div>
                
                <HomeBody ></HomeBody>
            </div>
            <div className="product-detail-footer-container">
            <Footer/>
            </div>
           
        </div>
    )
}

export default Home;