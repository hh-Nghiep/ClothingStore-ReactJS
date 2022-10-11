import axios from 'axios'
import { DOMAIN } from '~/util/setting/config';
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import iconSale from './../../assets/img/sale.png';

export default function Cart() {
    const cart = useSelector(state => state.cart.carts)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [listProductSale, setListProductSale] = useState([]);

    const getAllSale = async () => {
        await axios({
            method: 'post',
            url: `${DOMAIN}/sales?page=0`,
            data: {
                trangThai: 1
            }
        }).then((data) => {
            setListProductSale(data?.data[0])
        }).catch((err) => {
            console.log("err")
        })
    }

    const getSale = (maCT, gia) => {
        var index = listProductSale.findIndex(item => {
            if (item.maCTSP === parseInt(maCT)) {
                return true;
            }
            return false;
        });
        if (index !== -1) {
            return (
                <>
                    <del> {getPrice(gia)}</del>
                    &rArr;
                    <strong>{getPrice((gia * (100 - listProductSale[index].phanTramGiam)) / 100)}</strong>
                    <img src={iconSale} alt="icon sale"></img>
                </>
            )
        } else {
            return (<strong>{getPrice(gia)}</strong>)
        }
    }

    const getPriceSale = (maCT, gia, SL) => {
        var index = listProductSale.findIndex(item => {
            if (item.maCTSP === parseInt(maCT)) {
                return true;
            }
            return false;
        });
        if (index !== -1) {
            return (
                <>
                    {getPrice((gia * SL * (100 - listProductSale[index].phanTramGiam)) / 100)}
                </>
            )
        } else {
            return (getPrice(gia * SL))
        }
    }

    const getNumPriceSale = (maCT, gia, SL) => {
        var index = listProductSale.findIndex(item => {
            if (item.maCTSP === parseInt(maCT)) {
                return true;
            }
            return false;
        });
        if (index !== -1) {
            return ((gia * SL * (100 - listProductSale[index].phanTramGiam)) / 100)
        } else {
            return (gia * SL)
        }
    }

    const getPrice = (price) => {
        // return formatPrice(Size[parseInt(radioValue) - 1]?.gia);
        return Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(price)
    }

    const handleNumber = async (maCT, calc) => {
        var check = cart.map(itcart => itcart.maCT).indexOf(parseInt(maCT));
        axios({
            method: 'get',
            url: `${DOMAIN}/product/amount/${maCT}`
        }).then((data) => {
            if (check > -1) {
                if (calc === true) {
                    if (cart[check].SL >= data.data[0][0].soLuongTon) {
                        alert("Số Lượng Không Đủ");
                        return;
                    } else {
                        dispatch({
                            type: 'UPDATE_AMOUNT',
                            payload: { maCT, calc }
                        })
                    }
                } else {
                    if (cart[check].SL <= 1) {
                        alert("Số Lượng Không Được Nhỏ Hơn 1")
                        return;
                    } else {
                        dispatch({
                            type: 'UPDATE_AMOUNT',
                            payload: { maCT, calc }
                        })
                    }
                }
            }
        }).catch((err) => {
            console.log("Lỗi lấy Số Lượng Sản Phẩm :", err)
        })
    }

    const handleClick = () => {
        cart.forEach(item => {
            axios({
                method: 'get',
                url: `${DOMAIN}/product/amount/${item.maCT}`
            }).then((data) => {
                if (data.data[0][0].soLuongTon < item.SL) {
                    alert(`Sản Phẩm ${item.tenSP} Chỉ Còn ${data.data[0][0].soLuongTon}`)
                    dispatch({
                        type: 'DELETE_CART',
                        payload: { maCT: item.maCT }
                    })
                }
            }).catch((err) => {
                console.log("Lỗi lấy Số Lượng Sản Phẩm :", err)
                return;
            })
        });

        if (cart.length < 1) {
            alert("Giỏ Hàng Không Có Sản Phẩm.\nPhải Có Ít Nhất 1 Sản Phẩm Mới Có Thể Thanh Toán !!!!")
        } else {
            navigate('/checkout')
        }
    }

    const deleteItemCart = (maCT) => {
        if (window.confirm("Xoá Sản Phẩm Khỏi Giỏ Hàng ?") === true) {
            dispatch({
                type: 'DELETE_CART',
                payload: { maCT }
            })
        }
    }

    useEffect(() => {
        getAllSale();
    }, [cart.length])


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
                                                <td className="align-middle"><img src={cart?.hinhAnh} alt='true' style={{ width: 50 }} />{cart.tenSP}</td>
                                                <td className="align-middle">{getSale(cart.maCT, cart.gia)}</td>
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
                                                <td className="align-middle"><strong>{getPriceSale(cart?.maCT, cart?.gia, cart?.SL)}</strong></td>
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
                                            return total += getNumPriceSale(item?.maCT, item?.gia, item?.SL)
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
                                            return total += getNumPriceSale(item?.maCT, item?.gia, item?.SL)
                                        }, 0).toLocaleString()} VND</h5>
                                    </div>
                                    <button onClick={() => handleClick()} className="btn btn-block btn-success font-weight-bold my-3 py-3">Tiến Hành Đặt Hàng</button>
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
