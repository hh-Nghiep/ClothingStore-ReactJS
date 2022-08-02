import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DOMAIN } from '~/util/setting/config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Product() {
    const { product } = useSelector(state => state.ProductReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handerNavigate = (item) => {
        return navigate(`/product/${item}`)
    }
    const addCart = (item) => {
        dispatch({
            type: "ADD_CART",
            item: { ...item, number: 1, size: 1, sizeName: "S" }
        })
    }
    const getProduct = async () => {
        const response = await axios({
            method: 'get',
            url: `${DOMAIN}/product`,
            data: product
        }).then((data) => {
            dispatch({
                type: "GET_ALL_PRODUCT",
                product: data.data
            })
        }).catch((err) => {
            console.log("err")
        })
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        getProduct()

    }, [])
    return (
        <div className="container-fluid pt-5 pb-3">
            <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Featured Products</span></h2>
            <div className="row px-xl-5">
                {product?.slice(0, 16).map((item, index) => {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={index}>
                            <div className="product-item bg-light mb-4">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" src={item.thumbnail} alt='true' />
                                    <div className="product-action">
                                        <a onClick={() => { addCart(item) }} className="btn btn-outline-dark btn-square"><i className="fa fa-shopping-cart" /></a>
                                        <a className="btn btn-outline-dark btn-square"><i className="far fa-heart" /></a>
                                        <a className="btn btn-outline-dark btn-square"><i className="fa fa-sync-alt" /></a>
                                        <a onClick={() => { navigate(`/product/${item.id}`) }} className="btn btn-outline-dark btn-square" href='#'><i className="fa fa-search" /></a>
                                    </div>
                                </div>
                                <div className="text-center py-4">
                                    <a onClick={() => { handerNavigate(item.id) }} className="h6 text-decoration-none text-truncate" href='#'>{item.title.slice(0, 37)}...</a>
                                    <div className="d-flex align-items-center justify-content-center mt-2">
                                        <h5>{item.discount.toLocaleString()}</h5><h6 className="text-muted ml-2"><del>{item.price.toLocaleString()}</del></h6>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                        <small className="fa fa-star text-primary mr-1" />
                                        <small className="fa fa-star text-primary mr-1" />
                                        <small className="fa fa-star text-primary mr-1" />
                                        <small className="fa fa-star text-primary mr-1" />
                                        <small className="fa fa-star text-primary mr-1" />
                                        <small>(99)</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}
