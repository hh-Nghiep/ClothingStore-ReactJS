import React, { Fragment, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { USER_LOGIN } from '~/util/setting/config'
import './Header.css'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
export default function Header() {
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState(localStorage.getItem("isLogin"))

    const handleClicker = () => {
        localStorage.setItem("isLogin", false)
        setUserLogin(false);
        return navigate('/login')
    }

    const handleLogin = () => {
        if (userLogin === false) {
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

    useEffect(() => {
    }, [userLogin])


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
                                    <input type="text" className="form-control" placeholder="Tìm Theo Tên Sản Phẩm" style={{ float: "right" }} />
                                    <div className="input-group-append">
                                        <span className="input-group-text bg-transparent text-primary">
                                            <i className="fa fa-search" />
                                        </span>
                                    </div>
                                </div>
                            </form>
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
                                <a href='#' className="text-decoration-none d-block d-lg-none">
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
                                        <NavLink to='/contact' className="nav-item nav-link">Liên Hệ</NavLink>
                                    </div>
                                    <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                        <NavLink to='/cart' className="btn px-0 ml-3" >

                                            <Button variant="light" style={{ marginRight: "15px" }}>
                                                <FontAwesomeIcon icon={faCartShopping} style={{ color: "black", cursor: "pointer", fontSize: "20px", marginRight: "8px" }} />
                                                <Badge bg="secondary" style={{ fontSize: "15px" }}>{JSON.parse(localStorage.getItem("CART:" + JSON.parse(localStorage.getItem("infoUser")).maNguoiDung))?.length}</Badge>
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
        </Fragment>
    )
}
