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
import { DOMAIN } from '~/util/setting/config'
import { useDispatch, useSelector } from 'react-redux'

import { USER_LOGIN } from './util/setting/config';
import { Fragment, useEffect } from 'react';
import axios from 'axios';

function App() {
  const user = JSON.parse(localStorage.getItem(USER_LOGIN))
  const { product } = useSelector(state => state.ProductReducer || null);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${DOMAIN}/product`,
      data: product
    }).then((data) => {
      dispatch({
        type: "GET_ALL_PRODUCT",
        product: data.data
      })
    }).catch((err) => {
      // console.log("err")
    })
  }, [])

  // console.log(user)
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
        </Routes>
        <Footer />
      </>)
    } else {//&& user.role === 1
      return (<div id='wrapper'>
        <Sidebar />
        <Routes>
          <Route path='/admin/product' element={<Products />} />
          <Route path='/admin/account' element={<AccountAdmin />} />
          <Route path='/admin/revenue' element={<Revenue />} />
          <Route path='/admin/managerUser' element={<ManagerUser />} />
          <Route path='/admin/category' element={<Category />} />
        </Routes>
      </div>)
    }
    // if (user === null) {
    //   return (<>
    //     <Header />
    //     <Routes>
    //       <Route path='/' element={<HomePage />} />
    //       <Route path='/shop' element={<Shop />} />
    //       <Route path='/product/:id' element={<ShopDetails />} />
    //       <Route path='/cart' element={<Cart />} />
    //       <Route path='/checkout' element={<Checkout />} />
    //       <Route path='/contact' element={<Contact />} />
    //       <Route path='/login' element={<Login />} />
    //       <Route path='/register' element={<Register />} />
    //     </Routes>
    //     <Footer />
    //   </>)
    // } else if (user !== null) {//&& user.role === 1
    //   return (<div id='wrapper'>
    //     <Sidebar />
    //     <Routes>
    //       <Route path='/admin/product' element={<Products />} />
    //       <Route path='/admin/account' element={<AccountAdmin />} />
    //       <Route path='/admin/revenue' element={<Revenue />} />
    //       <Route path='/admin/managerUser' element={<ManagerUser />} />
    //     </Routes>
    //   </div>)
    // } else {
    //   alert("Role gi la the?")
    // }
  }
  return (
    <Fragment>
      {handleHomePage()}
    </Fragment>
  )
}

export default App;