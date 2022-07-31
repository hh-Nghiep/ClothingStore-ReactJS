import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { DOMAIN } from '~/util/setting/config'

export default function Shop() {
    const { cate } = useSelector(state => state.CategoryReducer);
    const { size } = useSelector(state => state.SizeReducer);
    const { product } = useSelector(state => state.ProductReducer || null);
    const { renderCate } = useSelector(state => state.ProductReducer);

    const dispatch = useDispatch();
    const storeFilterPrice = [
        {
            title: "All Price",
            min: 0,
            max: 0,
        },
        {
            title: "0 - 100.000VND",
            min: 0,
            max: 100000,
        },
        {
            title: "100.000VND - 200.000VND",
            min: 100000,
            max: 200000,
        },
        {
            title: "200.000VND - 300.000VND",
            min: 200000,
            max: 300000,
        },
        {
            title: "300.000VND - 400.000VND",
            min: 300000,
            max: 400000,
        },
        {
            title: "400.000VND - Unlimited",
            min: 400000,
            max: 1,
        },
    ]

    const [arrProduct, setArrProduct] = useState([]);
    const [filterPrice, setFilterPrice] = useState(0);
    const [filterCate, setFilterCate] = useState("all");

    const filterProduct = () => {
        console.log("Price", filterPrice);
        console.log("Cate", filterCate);
        let tempArr = [];
        if (filterCate === "all") {
            tempArr = renderCate;
        } else if (filterCate !== "") {
            tempArr = cate?.[filterCate - 1]?.Products
        }

        if (filterPrice === 1) {
            tempArr = tempArr.filter(item => {
                return item.discount > 400000;
            })
        } else if (filterPrice !== 0) {
            tempArr = tempArr.filter(item => {
                return item.discount > (filterPrice - 100000) && item.discount < filterPrice;
            })
        }

        setArrProduct(tempArr)
        console.log("temp", arrProduct) // mảng sau khi sort

        // dispatch({
        //     type: "FILTER",
        //     size: arrProduct
        // })
    }

    const addCart = (item) => {
        dispatch({
            type: "ADD_CART",
            item: { ...item, number: 1, size: 1, sizeName: "S" }
        })
    }
    const handlechange = (e) => {
        setFilterCate(e.target.value)
    }
    const filterA = (num, number) => {
        return renderCate.filter((item) => {
            return (num <= item.discount && item.discount <= number)
        })
    }
    const handeClicker = (num) => {
        dispatch({
            type: "SORT",
            num
        })
    }

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

        axios({
            method: 'GET',
            url: `${DOMAIN}/cate`,
            data: cate
        }).then((data) => {
            dispatch({
                type: "GET_ALL_CATEGORY",
                cate: data.data
            })
        }).catch((err) => {
            // console.log("err")
        })

        axios({
            method: 'GET',
            url: `${DOMAIN}/size`,
            data: size
        }).then((data) => {
            dispatch({
                type: "GET_ALL_SIZE",
                size: data.data
            })
        }).catch((err) => {
            // console.log("err")
        })

        filterProduct();
    }, [filterPrice, filterCate])
    return (
        <Fragment>
            <div>
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-12">
                            <nav className="breadcrumb bg-light mb-30">
                                <a className="breadcrumb-item text-dark" href="#">Home</a>
                                <a className="breadcrumb-item text-dark" href="#">Shop</a>
                                <span className="breadcrumb-item active">Shop List</span>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* Breadcrumb End */}
                {/* Shop Start */}
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        {/* Shop Sidebar Start */}
                        <div className="col-lg-3 col-md-4">
                            {/* Price Start */}
                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by price</span></h5>
                            <div className="bg-light p-4 mb-30">
                                <form onChange={(e) => {
                                    setFilterPrice(parseInt(e.target.value))
                                }}>
                                    {storeFilterPrice.map((item, index) => {
                                        return (
                                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3" key={index}>
                                                {item.min === 0 && item.max === 0 ?
                                                    (<>
                                                        <input type="radio" name='price' className="custom-control-input" value={item.max} id={item.max} defaultChecked />
                                                        <label className="custom-control-label" htmlFor={item.max}>{item.title}</label>
                                                        <span className="badge border font-weight-normal">{renderCate.length}</span>
                                                    </>
                                                    ) :
                                                    (<>
                                                        <input type="radio" name='price' className="custom-control-input" value={item.max} id={item.max} />
                                                        <label className="custom-control-label" htmlFor={item.max}>{item.title}</label>
                                                        <span className="badge border font-weight-normal">{filterA(`${item.min}`, `${item.max}`).reduce((total) => { return total += 1 }, 0)}</span>
                                                    </>
                                                    )}
                                            </div>
                                        )
                                    })}
                                </form>
                            </div>
                            {/* Price End */}
                            {/* Cate Start */}
                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by Category</span></h5>
                            <div className="bg-light p-4 mb-30">
                                <form >
                                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                        <input type="radio" name='Cate' className="custom-control-input" defaultChecked id="cate-all" value="all" onChange={handlechange} />
                                        <label className="custom-control-label" htmlFor="cate-all">All Category</label>
                                        <span className="badge border font-weight-normal">{renderCate.length}</span>
                                    </div>
                                    {cate.map((item, index) => {
                                        return (
                                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3" key={index}>
                                                <input type="radio" name='Cate' className="custom-control-input" id={item.name} value={item.id} onChange={handlechange} />
                                                <label className="custom-control-label" htmlFor={item.name}>{item.name}</label>
                                                <span className="badge border font-weight-normal">{item.Products.reduce((total) => { return total += 1 }, 0)}</span>
                                            </div>
                                        )
                                    })}
                                </form>
                            </div>
                            {/* Cate End */}
                        </div>
                        {/* Shop Sidebar End */}
                        {/* Shop Product Start */}
                        <div className="col-lg-9 col-md-8">
                            <div className="row pb-3">
                                <div className="col-12 pb-1">
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div>
                                            <button className="btn btn-sm btn-light"><i className="fa fa-th-large" /></button>
                                            <button className="btn btn-sm btn-light ml-2"><i className="fa fa-bars" /></button>
                                        </div>
                                        <div className="ml-2">
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Sorting</button>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a onClick={() => { handeClicker(1) }} className="dropdown-item" href="#">Thấp - Cao</a>
                                                    <a onClick={() => { handeClicker(2) }} className="dropdown-item" href="#">Cao - Thấp</a>
                                                    <a onClick={() => { handeClicker(3) }} className="dropdown-item" href="#">A - Z</a>
                                                    <a onClick={() => { handeClicker(4) }} className="dropdown-item" href="#">Z - A</a>
                                                </div>
                                            </div>
                                            <div className="btn-group ml-2">
                                                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Showing</button>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a className="dropdown-item" href="#">10</a>
                                                    <a className="dropdown-item" href="#">20</a>
                                                    <a className="dropdown-item" href="#">30</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {renderCate?.map((item, index) => {
                                    return (
                                        <div className="col-lg-4 col-md-6 col-sm-6 pb-1" key={index} >
                                            <div className="product-item bg-light mb-4">
                                                <div className="product-img position-relative overflow-hidden">
                                                    <img className="img-fluid w-100" src={item.thumbnail} alt='true' />
                                                    <div className="product-action">
                                                        <a onClick={() => { addCart(item) }} className="btn btn-outline-dark btn-square" href='#'><i className="fa fa-shopping-cart" /></a>
                                                        <a className="btn btn-outline-dark btn-square" href='#'><i className="far fa-heart" /></a>
                                                        <a className="btn btn-outline-dark btn-square" href='#'><i className="fa fa-sync-alt" /></a>
                                                        <NavLink className="btn btn-outline-dark btn-square" to={`/product/${item.id}`}><i className="fa fa-search" /></NavLink>
                                                    </div>
                                                </div>
                                                <div className="text-center py-4">
                                                    <a className="h6 text-decoration-none text-truncate" href='#'>{item.title}</a>
                                                    <div className="d-flex align-items-center justify-content-center mt-2">
                                                        <h5>{item.discount?.toLocaleString()}</h5><h6 className="text-muted ml-2"><del>{item.price?.toLocaleString()}</del></h6>
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

                                <div className="col-12">
                                    <nav>
                                        <ul className="pagination justify-content-center">
                                            <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        {/* Shop Product End */}
                    </div>
                </div>
            </div>
        </Fragment >
    )
}
