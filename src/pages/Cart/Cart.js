import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { carts } = useSelector(state => state.CartReducer)
    const handleNumber = (id, boolean) => {
        dispatch({
            type: "TANG_GIAM",
            id,
            boolean
        })
    }
    const deleteCart = (num) => {
        dispatch({
            type: "DELETE_CART",
            num
        })
    }

    const handleChange = (e) => {
        const id = parseInt(e.target[0].id)
        const value = parseInt(e.target.value)
        dispatch({
            type: "ADD_SIZE",
            id,
            value
        })
    }
    const handleClick = () => {

        navigate('/checkout')
    }
    useEffect(() => {
        // window.scrollTo(0, 0)
    }, [])

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
                                    {carts?.map((cart, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="align-middle"><img src={cart.thumbnail} alt='true' style={{ width: 50 }} /> {cart.title}</td>
                                                <td className="align-middle">{cart.discount.toLocaleString()}</td>
                                                <td className="align-middle">{cart.sizeName}</td>

                                                <td className="align-middle">
                                                    <div className="input-group quantity mx-auto" style={{ width: 100 }}>
                                                        <div className="input-group-btn">
                                                            <button onClick={() => handleNumber(cart.id, false)} className="btn btn-sm btn-primary btn-minus">
                                                                <i className="fa fa-minus" />
                                                            </button>
                                                        </div>
                                                        <p className="form-control form-control-sm bg-secondary border-0 text-center" style={{ color: "white", fontWeight: "bold", fontSize: "14px" }}>{cart.number}</p>
                                                        <div className="input-group-btn">
                                                            <button onClick={() => handleNumber(cart.id, true)} className="btn btn-sm btn-primary btn-plus">
                                                                <i className="fa fa-plus" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle">{(cart.discount * cart.number).toLocaleString()}</td>
                                                <td className="align-middle"><button onClick={() => deleteCart(cart.id)} className="btn btn-sm btn-danger"><i className="fa fa-times" /></button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-4">
                            <form className="mb-30">
                                <div className="input-group">
                                    <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary">Apply Coupon</button>
                                    </div>
                                </div>
                            </form>
                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
                            <div className="bg-light p-30 mb-5">
                                <div className="border-bottom pb-2">
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
