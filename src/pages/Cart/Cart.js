import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("CART:" + JSON.parse(localStorage.getItem("infoUser")).maNguoiDung)) || []);

    const handleNumber = async (maCT, boolean) => {
        var check = cart.map(itcart => itcart.maCT).indexOf(parseInt(maCT));
        axios({
            method: 'get',
            url: `http://localhost:3001/product/amount/${maCT}`
        }).then((data) => {
            if (check > -1) {
                if (boolean === true) {
                    if (cart[check].SL >= data.data[0][0].soLuongTon) {
                        alert("Số Lượng Không Đủ");
                        return;
                    } else {
                        cart[check].SL += 1;
                    }
                } else {
                    if (cart[check].SL <= 1) {
                        alert("Số Lượng Không Được Nhỏ Hơn 1")
                        return;
                    } else {
                        cart[check].SL -= 1;
                    }
                }
                localStorage.setItem("CART:" + localStorage.getItem("maNguoiDung"), JSON.stringify(cart));
            }
            setCart(JSON.parse(localStorage.getItem("CART:" + localStorage.getItem("maNguoiDung"))) || [])
        }).catch((err) => {
            console.log("Lỗi lấy Số Lượng Sản Phẩm :", err)
        })
    }

    const handleChange = (e) => {
        const id = parseInt(e.target[0].id)
        const value = parseInt(e.target.value)
    }
    const handleClick = () => {
        navigate('/checkout')
    }

    const deleteItemCart = (maCT) => {
        var check = cart.map(itcart => itcart.maCT).indexOf(parseInt(maCT))
        if (check > -1) {
            cart.splice(check, 1);
            localStorage.setItem("CART:" + localStorage.getItem("maNguoiDung"), JSON.stringify(cart));
        }
        setCart(JSON.parse(localStorage.getItem("CART:" + localStorage.getItem("maNguoiDung"))) || [])
    }

    const formatPrice = (price) => {
        return Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(price)
    }

    useEffect(() => {
        // window.scrollTo(0, 0)
    }, [cart])



    return (
        <Fragment>
            <div>
                {/* Breadcrumb Start */}
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-12">
                            <nav className="breadcrumb bg-light mb-30">
                                <a className="breadcrumb-item text-dark" href="/">Home</a>
                                <a className="breadcrumb-item text-dark" href="/shop">Shop</a>
                                <span className="breadcrumb-item active">Shopping Cart</span>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* Breadcrumb End */}
                {/* Cart Start */}
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-lg-8 table-responsive mb-5">
                            <table className="table table-light table-borderless table-hover text-center mb-0">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Sản Phẩm</th>
                                        <th>Giá</th>
                                        <th>Size</th>
                                        <th>Số Lượng</th>
                                        <th>Tổng Tiền</th>
                                        <th>Xoá</th>
                                    </tr>
                                </thead>
                                <tbody className="align-middle">
                                    {cart?.map((cart, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="align-middle"><img src={cart?.hinhAnh} alt='true' style={{ width: 50 }} /> {cart.tenSP}</td>
                                                <td className="align-middle">{cart?.gia}</td>
                                                <td className="align-middle">{cart?.size}</td>
                                                <td className="align-middle">
                                                    <div className="input-group quantity mx-auto" style={{ width: 100 }}>
                                                        <div className="input-group-btn">
                                                            <button onClick={() => handleNumber(cart?.maCT, false)} className="btn btn-sm btn-primary btn-minus">
                                                                <i className="fa fa-minus" />
                                                            </button>
                                                        </div>
                                                        <p className="form-control form-control-sm bg-secondary border-0 text-center" style={{ color: "white", fontWeight: "bold", fontSize: "14px" }}>{cart?.SL}</p>
                                                        <div className="input-group-btn">
                                                            <button onClick={() => handleNumber(cart?.maCT, true)} className="btn btn-sm btn-primary btn-plus">
                                                                <i className="fa fa-plus" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle">{formatPrice(`${cart?.tongTien}` * `${cart?.SL}`)}</td>
                                                <td className="align-middle"><button onClick={() => { deleteItemCart(`${cart?.maCT}`) }} className="btn btn-sm btn-danger"><i className="fa fa-times" /></button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-4">
                            {/* <form className="mb-30">
                                <div className="input-group">
                                    <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary">Apply Coupon</button>
                                    </div>
                                </div>
                            </form> */}
                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Tổng Giỏ Hàng</span></h5>
                            <div className="bg-light p-30 mb-5">
                                <div className="border-bottom pb-2">
                                    <div className="d-flex justify-content-between mb-3">
                                        <h6>Tổng Tiền Hàng</h6>
                                        <h6>{cart?.reduce((total, item) => {
                                            return total += item.gia * item.SL
                                        }, 0).toLocaleString()} VND</h6>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h6 className="font-weight-medium">Phí Giao Hàng: </h6>
                                        <h6 className="font-weight-medium">Miễn Phí</h6>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5>Tổng Cộng</h5>
                                        <h5>{cart?.reduce((total, item) => {
                                            return total += item.gia * item.SL
                                        }, 0).toLocaleString()} VND</h5>
                                    </div>
                                    <button onClick={() => handleClick()} className="btn btn-block btn-primary font-weight-bold my-3 py-3">Proceed To Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Cart End */}
            </div>

        </Fragment>
    )
}
