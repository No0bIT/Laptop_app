import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import './Home.css'


function Home() {
    return (
        <div className='fullScreen'>
            <div>
                <Header />
            </div>
            <div className="home-container">

            </div>

            <div style={{position:'relative', width:'100%', bottom:'0'}}>
                <Footer/>
            </div>
        </div>
    )
}

export default Home;