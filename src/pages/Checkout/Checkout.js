import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import axios from 'axios'
import { DOMAIN } from '~/util/setting/config'
export default function Checkout() {
    const dispatch = useDispatch()
    const { carts } = useSelector(state => state.CartReducer)
    console.log(carts)

    const renderArr = () => {
        const arrProduct = []
        for (let i = 0; i < carts.length; i++) {
            arrProduct.push(
                {
                    "number": carts[i].number,
                    "price": carts[i].price,
                    "discount": carts[i].discount,
                    "size_ID": carts[i].size,
                    "product_ID": carts[i].id,
                }
            )
        }
        return arrProduct
    }

    const formik = useFormik({
        initialValues: {
            "user_ID": null,
            "fullname": "",
            "email": "",
            "phone": "",
            "address": "",
            "note": "",
            "password": "",
            "arr":
                renderArr()
        },
        onSubmit: values => {
            console.log(values)
            axios({
                method: 'post',
                url: `${DOMAIN}/orderDetails/postOrder`,
                data: values
            }).then((data) => {
                dispatch({
                    type: "DONE",
                    data
                })
            }).catch((err) => {
                console.log("err", err)
            })
        }
    })
    return (
        <Fragment>
            <div>
                {/* Breadcrumb Start */}
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-12">
                            <nav className="breadcrumb bg-light mb-30">
                                <a className="breadcrumb-item text-dark" href="#">Home</a>
                                <a className="breadcrumb-item text-dark" href="#">Shop</a>
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
                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Billing Address</span></h5>
                            <div className="bg-light p-30 mb-5">
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <label>Full Name</label>
                                        <input name='fullname' onChange={formik.handleChange} className="form-control" type="text" placeholder="John" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>E-mail</label>
                                        <input name='email' onChange={formik.handleChange} className="form-control" type="text" placeholder="example@email.com" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Mobile</label>
                                        <input name='phone' onChange={formik.handleChange} className="form-control" type="text" placeholder="+123 456 789" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Address</label>
                                        <input name='address' onChange={formik.handleChange} className="form-control" type="text" placeholder="123 Street" />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label>Note</label>
                                        <input name='note' onChange={formik.handleChange} className="form-control" type="text" placeholder={123} height={90} />
                                    </div>
                                    <div className="col-md-12">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="shipto" />
                                            <label className="custom-control-label" htmlFor="shipto" data-toggle="collapse" data-target="#shipping-address">AND Create Account</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="collapse mb-5" id="shipping-address">
                                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Password</span></h5>
                                <div className="bg-light p-30">
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <label>Password</label>
                                            <input name='password' onChange={formik.handleChange} className="form-control" type="text" placeholder="John" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Order Total</span></h5>
                            <div className="bg-light p-30 mb-5">
                                <div className="border-bottom">
                                    <h6 className="mb-3">Products ({carts.reduce((total) => {
                                        return total = total + 1
                                    }, 0).toLocaleString()})</h6>
                                    {carts.map((item, index) => {
                                        return (
                                            <div className="d-flex justify-content-between" key={index}>
                                                <p>{index + 1}: {item.title} _Số Lượng : {item.number} _Size:  ( {item.sizeName} )</p>
                                                <p>{(item.discount * item.number).toLocaleString()}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="border-bottom pt-3 pb-2">
                                    <div className="d-flex justify-content-between mb-3">
                                        <h6>Subtotal</h6>
                                        <h6>{carts.reduce((total, item) => {
                                            return total += item.discount * item.number
                                        }, 0).toLocaleString()}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h6 className="font-weight-medium">Shipping</h6>
                                        <h6 className="font-weight-medium">10.000đ</h6>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5>Total</h5>
                                        <h5>{carts.reduce((total, item) => {
                                            return total += item.discount * item.number
                                        }, 10000).toLocaleString()}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
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
                            </div>
                        </div>
                    </div>
                </form>
                {/* Checkout End */}
            </div>


        </Fragment>
    )
}
