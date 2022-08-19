import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { USER_LOGIN } from '~/util/setting/config'
import './Header.css'
export default function Header() {

    const { carts } = useSelector(state => state.CartReducer)

    const navigate = useNavigate()
    const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));

    const handleClicker = () => {
        localStorage.removeItem(USER_LOGIN)
        return navigate('/')
    }
    const handleLogin = () => {
        if (!userLogin) {
            return (
                <Fragment>
                    <NavLink to='/login' className="dropdown-item">Đăng Nhập</NavLink>
                    <NavLink to='/register' className="dropdown-item">Đăng Ký</NavLink>
                </Fragment>
            )
        } else {
            return <button onClick={() => handleClicker()} className="dropdown-item">Logout</button>
        }
    }
    const showSearch = () => {
    }

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
                    <div className="row px-xl-5">
                        {/* <div className="col-lg-3 d-none d-lg-block">
                            <a className="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse" href="#navbar-vertical" style={{ height: 65, padding: '0 30px' }}>
                                <h6 className="text-dark m-0"><i className="fa fa-bars mr-2" />Categories</h6>
                                <i className="fa fa-angle-down text-dark" />
                            </a>
                            <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{ width: 'calc(100% - 30px)', zIndex: 999 }}>
                                <div className="navbar-nav w-100">
                                    <div className="nav-item dropdown dropright">
                                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Dresses <i className="fa fa-angle-right float-right mt-1" /></a>
                                        <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                                            <a href='#' className="dropdown-item">Men's Dresses</a>
                                            <a href='#' className="dropdown-item">Women's Dresses</a>
                                            <a href='#' className="dropdown-item">Baby's Dresses</a>
                                        </div>
                                    </div>
                                    <a href='#' className="nav-item nav-link">Shirts</a>
                                    <a href='#' className="nav-item nav-link">Jeans</a>
                                    <a href='#' className="nav-item nav-link">Swimwear</a>
                                    <a href='#' className="nav-item nav-link">Sleepwear</a>
                                    <a href='#' className="nav-item nav-link">Sportswear</a>
                                    <a href='#' className="nav-item nav-link">Jumpsuits</a>
                                    <a href='#' className="nav-item nav-link">Blazers</a>
                                    <a href='#' className="nav-item nav-link">Jackets</a>
                                    <a href='#' className="nav-item nav-link">Shoes</a>
                                </div>
                            </nav>
                        </div> */}
                        <div className="col-lg-9">
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
                                            <i className="fas fa-shopping-cart text-primary" />
                                            <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: 2 }}>{carts.reduce((total) => {
                                                return total += 1
                                            }, 0)}</span>
                                        </NavLink>

                                        <div className="d-inline-flex align-items-center">
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">{!userLogin ? "Tài Khoản" : `Chào Nghiệp`}</button>
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
