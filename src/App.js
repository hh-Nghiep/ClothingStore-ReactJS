import './App.css';
import './components/Admin/sb-admin-2.min.css'
import Cart from './pages/Cart/Cart';
import Header from './components/Header/Header';
import Checkout from './pages/Checkout/Checkout';
import Contact from './pages/Contact/Contact';
import Shop from './pages/Shop/Shop';
import ShopDetails from './pages/ShopDetails/ShopDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Admin from './pages/Admin/Admin';
import Sidebar from './components/Admin/sidebar/sidebar';
import { useLocation } from 'react-router-dom';
import AccountAdmin from './pages/Admin/account/account'

function App() {
  let location = useLocation();
  console.log('current Pathname 👉️', location.pathname.slice(0, 6));
  return (
    <div className="App">
      {location.pathname.slice(0, 6) !== '/admin' ? (
        <>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/details' element={<ShopDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/admin' element={<Admin />} />
          </Routes>
          <Footer />
        </>) : (
        <div id='wrapper'>
          <Sidebar />
          <Routes>
            <Route path='/admin/product' element={<Admin />} />
            <Route path='/admin/account' element={<AccountAdmin />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;