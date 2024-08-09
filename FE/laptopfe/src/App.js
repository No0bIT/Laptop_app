import logo from './logo.svg';
import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { BrowserRouter as   Router, Routes, Route   } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import MyOrder from './pages/MyOrder/MyOrder';
import Profile from './pages/Profile/Profile';
import HomeAdmin from './pages/Admin/HomeAdmin/HomeAdmin';
import HomeSeller from './pages/Seller/HomeSeller/HomeSeller';
import ProductDetailAdmin from './pages/Admin/ProductDetailAdmin/ProductDetailAdmin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/myorder" element={<MyOrder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin" element={<ProductDetailAdmin />} />
        <Route path="/product/:id/admin" element={<ProductDetailAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
