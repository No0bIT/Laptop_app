import logo from './logo.svg';
import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { BrowserRouter as   Router, Routes, Route   } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        
      </Routes>
    </Router>
  );
}

export default App;
