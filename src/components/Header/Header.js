import React, { Fragment, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Header.css'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    var today = new Date();
    const [time, setTime] = useState(today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds());
    const cart = useSelector(state => state.cart.carts)
    const [userLogin, setUserLogin] = useState(localStorage.getItem("isLogin"))
    const [showDrop, setShowDrop] = useState("");
    const [arrProdcutSearch, setArrProductSearch] = useState([]);

    const handleClicker = () => {
        localStorage.setItem("isLogin", false)
        setUserLogin(false);
        var infoUser = {
            maNguoiDung: "",
            hoTen: "",
            email: "",
            sdt: "",
            diaChi: "",
            maQuyen: 0,
        }
        localStorage.setItem("infoUser", JSON.stringify(infoUser));
        dispatch({
            type: 'GET_CART',
            payload: {}
        })

        dispatch({
            type: 'SET_LOGIN',
            payload: {}
        })
        return navigate('/login')
    }

    const handleLogin = () => {
        if (userLogin !== 'true') {
            return (
                <Fragment>
                    <NavLink to='/login' className="dropdown-item">Đăng Nhập</NavLink>
                    <NavLink to='/register' className="dropdown-item">Đăng Ký</NavLink>
                </Fragment>
            )
        } else {
            return (
                <>
                    <button onClick={() => navigate('/account')} className="dropdown-item">Tài Khoản</button>
                    <button onClick={() => navigate('/order')} className="dropdown-item">Đơn Hàng</button>
                    <button onClick={() => handleClicker()} className="dropdown-item">Đăng Xuất</button>
                </>
            )
        }
    }

    const handleSearch = (e) => {
        if (e !== "") {
            axios({
                method: 'POST',
                url: `http://localhost:3001/product/find`,
                data: {
                    tenSP: e,
                    trangThai: 1
                }
            }).then((data) => {
                setArrProductSearch(data.data)
            }).catch((err) => {
                console.log("Lỗi lấy thể loại :", err)
            })
            setShowDrop("block")
        } else {
            setShowDrop("")
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((new Date()).getHours() + ' : ' + (new Date()).getMinutes() + ' : ' + (new Date()).getSeconds());
            if ((new Date()).getHours() === 0 && (new Date()).getMinutes() === 0 && (new Date()).getSeconds() === 0) {
                window.location.reload(false);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arrProdcutSearch?.length])


    return (
        <Fragment>
            <div>
                {/* Topbar Start */}
                <div className="container-fluid">
                    <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                        <div className="col-lg-4">
                            <NavLink to='/' className="text-decoration-none">
                                <span className="h1 text-uppercase text-primary bg-dark px-2">Multi</span>
                                <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Shop</span>
                            </NavLink>
                        </div>
                        <div className="col-lg-4 col-6 text-left">
                            <form>
                                <div className="input-group">
                                    <input type="text" onChange={e => handleSearch(e.target.value)} className="form-control" placeholder="Tìm Theo Tên Sản Phẩm" style={{ float: "right" }} />
                                    <div className="input-group-append">
                                        <span className="input-group-text bg-transparent text-primary">
                                            <i className="fa fa-search" />
                                        </span>
                                    </div>
                                </div>
                            </form>
                            <ul className='dropdown_search' style={{ display: `${showDrop}` }}>
                                {arrProdcutSearch.map((item, index) => {
                                    return (
                                        <li style={{ marginBottom: "15px" }}>
                                            <img src={item.hinhAnh1} alt="imageProduct" style={{ width: "20%" }}></img>
                                            <a href={`http://localhost:3000/product/${item.maSP}`} style={{ color: "black" }}>{item.tenSP}</a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="col-lg-4 col-6 text-right">
                            <p className="m-0">LIÊN HỆ HỖ TRỢ ZALO</p>
                            <h5 className="m-0">+84 981 171 271</h5>
                        </div>
                    </div>
                </div>
                {/* Topbar End */}
                {/* Navbar Start */}
                <div className="container-fluid bg-dark mb-30">
                    <div className="row px-xl-5" style={{ display: "block" }}>
                        <div className="col-lg-9" style={{ maxWidth: "100%" }}>
                            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                                <a href='/' className="text-decoration-none d-block d-lg-none">
                                    <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                                    <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                                </a>
                                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                    <span className="navbar-toggler-icon" />
                                </button>
                                <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                    <div className="navbar-nav mr-auto py-0">
                                        <NavLink to='/' className="nav-item nav-link active">Trang Chủ</NavLink>
                                        <NavLink to='/shop' className="nav-item nav-link">Sản Phẩm</NavLink>
                                        <NavLink to='/' className="nav-item nav-link disabled" style={{ color: "red", fontSize: "18px", fontWeight: "bold" }}>{time}</NavLink>
                                    </div>
                                    <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                        <NavLink to='/cart' className="btn px-0 ml-3" style={{ marginRight: "15px", padding: "0 0" }}>
                                            <Button variant="light" style={{ paddingRight: "15px" }}>
                                                <FontAwesomeIcon icon={faCartShopping} style={{ color: "black", cursor: "pointer", fontSize: "20px", marginRight: "8px" }} />
                                                <Badge bg="secondary" style={{ fontSize: "15px" }}>{cart?.length}</Badge>
                                            </Button>
                                        </NavLink>
                                        <div className="d-inline-flex align-items-center">
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">{userLogin ? `Chào ${JSON.parse(localStorage.getItem("infoUser")).hoTen}` : "Tài Khoản"}</button>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    {handleLogin()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* Navbar End */}
            </div>
        </Fragment >
    )
}
