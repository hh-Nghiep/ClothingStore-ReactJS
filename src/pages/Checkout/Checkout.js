import React, { Fragment } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { DOMAIN } from '~/util/setting/config'
import { useState } from 'react'
import { useEffect } from 'react';
import iconSale from './../../assets/img/sale.png';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const infoUser = JSON.parse(localStorage.getItem("infoUser"));
    const carts = useSelector(state => state.cart.carts)
    const [listProductSale, setListProductSale] = useState([]);
    const [checkValue, setCheckValue] = useState(true)

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

    const getSale = (maCT, gia, soLuong) => {
        var index = listProductSale.findIndex(item => {
            if (item.maCTSP === parseInt(maCT)) {
                return true;
            }
            return false;
        });
        if (index !== -1) {
            return (
                <>
                    {getPrice(((gia * (100 - listProductSale[index].phanTramGiam)) / 100) * soLuong)}
                    <img src={iconSale} alt="icon sale"></img>
                </>
            )
        } else {
            return (getPrice(gia * soLuong))
        }
    }

    const getPrice = (price) => {
        return Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(price)
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

    const formik = useFormik({
        initialValues: {
            "maNguoiDung": infoUser.maNguoiDung,
            "hoTen": infoUser.hoTen,
            "email": infoUser.email,
            "sdt": infoUser.sdt,
            "diaChi": infoUser.diaChi,
        },
        onSubmit: values => {
            getAllSale();
            if (carts.length < 1) {
                alert("Giỏ Hàng Không Có Sản Phẩm. Phải Có Ít Nhất 1 Sản Phẩm Mới Được Đặt Hàng !!!!")
                navigate('/shop')
                return;
            }
            carts.forEach(item => {
                axios({
                    method: 'get',
                    url: `${DOMAIN}/product/amount/${item.maCT}`
                }).then((data) => {
                    if (data.data[0][0].soLuongTon < item.SL) {
                        alert(`Sản Phẩm ${item.tenSP} Chỉ Còn ${data.data[0][0].soLuongTon}`)

                        setCheckValue(false)
                    }
                }).catch((err) => {
                    console.log("Lỗi lấy Số Lượng Sản Phẩm :", err)
                    return;
                })
            });

            if (checkValue) {
                axios({
                    method: 'post',
                    url: `${DOMAIN}/order/add`,
                    data: values
                }).then((data) => {
                    var maDH = data.data[0][0].maDH;
                    try {
                        carts.forEach(item => {
                            var payload = {
                                maDH: maDH,
                                maCTSP: item.maCT,
                                soLuong: item.SL,
                                gia: getNumPriceSale(item.maCT, item.gia, 1)
                            }

                            axios({
                                method: 'post',
                                url: `${DOMAIN}/order/addDetail`,
                                data: payload
                            }).then((data) => {

                            }).catch((err) => {
                                console.log("Lỗi lấy Số Lượng Sản Phẩm :", err)
                                return;
                            })
                        })
                    } catch (error) {
                        console.log("Lỗi Thêm Đơn Hàng", error)
                        return;
                    }
                    dispatch({
                        type: 'DONE',
                        payload: {}
                    })
                    localStorage.setItem("CART:" + JSON.parse(localStorage.getItem("infoUser")).maNguoiDung, JSON.stringify([]))
                    navigate('/order');
                }).catch((err) => {
                    console.log("Lỗi Tạo Đơn Hàng", err)
                })
            }

        }
    })

    useEffect(() => {
        // axios({
        //     method: 'get',
        //     url: `https://provinces.open-api.vn/api/?depth=2`,
        // }).then((data) => {
        //     console.log(data.data)
        // }).catch((err) => {
        //     console.log("Lỗi lấy Số Lượng Sản Phẩm :", err)
        //     return;
        // })
        if (carts.length < 1) {
            alert("Giỏ Hàng Không Có Sản Phẩm. Phải Có Ít Nhất 1 Sản Phẩm Mới Được Đặt Hàng !!!!")
            navigate('/shop')
            return;
        }
        getAllSale();
    }, [])


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
                                <span className="breadcrumb-item active">Checkout</span>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* Breadcrumb End */}
                {/* Checkout Start */}
                <form onSubmit={(e) => {
                    e.preventDefault()
                    formik.handleSubmit(e)
                }} className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-lg-8">
                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Thông Tin Đặt Hàng</span></h5>
                            <div className="bg-light p-30 mb-5">
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <label>Họ và Tên</label>
                                        <input name='hoTen' defaultValue={formik.values.hoTen} onChange={formik.handleChange} className="form-control" type="text" placeholder="John" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>E-mail</label>
                                        <input name='email' defaultValue={formik.values.email} onChange={formik.handleChange} className="form-control" type="text" placeholder="example@email.com" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Số Điện Thoại</label>
                                        <input name='sdt' defaultValue={formik.values.sdt} onChange={formik.handleChange} className="form-control" type="text" placeholder="+123 456 789" />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label>Địa Chỉ</label>
                                        <input name='diaChi' defaultValue={formik.values.diaChi} onChange={formik.handleChange} className="form-control" type="text" placeholder="123 Street" />
                                    </div>

                                    {/* <div className="col-md-6 form-group">
                                        <label>Thành Phố / Tỉnh</label>
                                        <Form.Select onChange={formik.handleChange} name="maTL">
                                            <option>Vui Lòng Chọn Thể Loại</option>
                                        </Form.Select>
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label>Quận / Huyện</label>
                                        <Form.Select onChange={formik.handleChange} name="maTL">
                                            <option>Vui Lòng Chọn Thể Loại</option>
                                        </Form.Select>
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label>Phường / Thị Xã</label>
                                        <Form.Select onChange={formik.handleChange} name="maTL">
                                            <option>Vui Lòng Chọn Thể Loại</option>
                                        </Form.Select>
                                    </div> */}
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-4">
                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Thông Tin Giỏ Hàng</span></h5>
                            <div className="bg-light p-30 mb-5">
                                <div className="border-bottom">
                                    <h6 className="mb-3">Tổng Số Lượng Sản Phẩm: ({carts.reduce((total, { SL }) =>
                                        total + SL
                                        , 0).toLocaleString()})</h6>
                                    {carts.map((item, index) => {
                                        return (
                                            <div className="d-flex justify-content-between" key={index}>
                                                <p><strong>{index + 1}:</strong> {item.tenSP} : {item.SL} :  ( {item.size} )</p>
                                                <p><strong>{getSale(item.maCT, item.gia, item.SL)}</strong></p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="border-bottom pt-3 pb-2">
                                    <div className="d-flex justify-content-between mb-3">
                                        <h6>Tổng Tiền Sản Phẩm: </h6>
                                        <h6>{carts?.reduce((total, item) => {
                                            return total += getNumPriceSale(item?.maCT, item?.gia, item?.SL)
                                        }, 0).toLocaleString()} VND</h6>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h6 className="font-weight-medium">Phí Ship:</h6>
                                        <h6 className="font-weight-medium">Miễn Phí</h6>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5>Tổng Cộng:</h5>
                                        <h5>{carts?.reduce((total, item) => {
                                            return total += getNumPriceSale(item?.maCT, item?.gia, item?.SL)
                                        }, 0).toLocaleString()} VND</h5>
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className="btn btn-block btn-success font-weight-bold py-3">Đặt Hàng</button>
                            {/* <div className="mb-5">
                                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Payment</span></h5>
                                <div className="bg-light p-30">
                                    <div className="form-group">
                                        <div className="custom-control custom-radio">
                                            <input type="radio" className="custom-control-input" name="payment" id="paypal" />
                                            <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-radio">
                                            <input type="radio" className="custom-control-input" name="payment" id="directcheck" />
                                            <label className="custom-control-label" htmlFor="directcheck">Direct Check</label>
                                        </div>
                                    </div>
                                    <div className="form-group mb-4">
                                        <div className="custom-control custom-radio">
                                            <input type="radio" className="custom-control-input" name="payment" id="banktransfer" />
                                            <label className="custom-control-label" htmlFor="banktransfer">Bank Transfer</label>
                                        </div>
                                    </div>
                                    <button type='submit' className="btn btn-block btn-primary font-weight-bold py-3">Place Order</button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </form>
                {/* Checkout End */}
            </div>


        </Fragment>
    )
}
