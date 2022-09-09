import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Admin/sb-admin-2.min.css'
import Cart from './pages/Cart/Cart';
import Header from './components/Header/Header';
import Checkout from './pages/Checkout/Checkout';
import Contact from './pages/Contact/Contact';
import Shop from './pages/Shop/Shop';
import ShopDetails from './pages/ShopDetails/ShopDetails';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Products from '~/pages/Admin/product/product';
import Sidebar from '~/components/Admin/sidebar/sidebar';
import AccountAdmin from '~/pages/Admin/account/account'
import Revenue from '~/pages/Admin/revenue/revenue';
import ManagerUser from '~/pages/Admin/managerUser/managerUser';
import Category from "./pages/Admin/category/category"
import Order from './pages/Order/order';
import AdminOrder from './pages/Admin/Order/order'
import Account from './pages/Account/index';
import Sale from './pages/Admin/sale/index';
import Forgotpassword from './pages/Forgotpassword';

import { Fragment, useEffect } from 'react';

function App() {
  const location = useLocation();

  useEffect(() => {
  }, [])

  const handleHomePage = () => {
    if (location.pathname.slice(0, 6) !== "/admin") {
      return (<>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/product/:id' element={<ShopDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/order' element={<Order />} />
          <Route path='/account' element={<Account />} />
          <Route path='/forgotpassword' element={<Forgotpassword />} />
        </Routes>
        <Footer />
      </>)
    } else {
      return (<div id='wrapper'>
        <Sidebar />
        <Routes>
          <Route path='/admin/order' element={<AdminOrder />} />
          <Route path='/admin/product' element={<Products />} />
          <Route path='/admin/account' element={<AccountAdmin />} />
          <Route path='/admin/revenue' element={<Revenue />} />
          <Route path='/admin/managerUser' element={<ManagerUser />} />
          <Route path='/admin/category' element={<Category />} />
          <Route path='/admin/sale' element={<Sale />} />
        </Routes>
      </div>)
    }
  }
  return (
    <Fragment>
      {handleHomePage()}
    </Fragment>
  )
}

export default App;