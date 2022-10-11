import axios from 'axios'
import { DOMAIN } from '~/util/setting/config'
import React, { Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import iconSale from './../../assets/img/sale.png';

export default function Shop() {
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
    const [arrCate, setArrCate] = useState([]);
    const [arrProduct, setArrProduct] = useState([]);
    const [filterPrice, setFilterPrice] = useState(0);
    const [filterCate, setFilterCate] = useState(0);
    const [pageProduct, setPageProduct] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [listProductSale, setListProductSale] = useState([]);

    const getArrCate = async () => {
        axios({
            method: 'GET',
            url: `${DOMAIN}/cate/1`,
        }).then((data) => {
            setArrCate(data.data[0])
        }).catch((err) => {
            console.log("Lỗi lấy thể loại :", err)
        })
    }

    const getArrProduct = async () => {
        axios({
            method: 'post',
            url: `${DOMAIN}/products?page=${pageProduct}`,
            data: {
                trangThai: 1,
                maTL: filterCate,
                gia: filterPrice
            }
        }).then((data) => {
            setArrProduct(data?.data.data)
            setTotalPage(data?.data.totalPage)
        }).catch((err) => {
            console.log("Lỗi lấy sản phẩm :", err)
        })
    }

    const formatPrice = (price) => {
        return Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(price)
    }

    const setNumPage = (boolean) => {
        if (boolean === true) {
            if (pageProduct < totalPage) {
                setPageProduct(pageProduct + 1)
            }
        } else {
            if (pageProduct > 1) {
                setPageProduct(pageProduct - 1)
            }
        }
    }

    const setInputNumpage = (number) => {
        if (number <= totalPage && number > 0) {
            setPageProduct(number);
        } else if (number > totalPage) {
            setPageProduct(totalPage)
        } else {
            setPageProduct(1)
        }
    }

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

    const getSale = (maSP) => {
        var index = listProductSale.map(item => item.maSP).indexOf(maSP);
        if (index !== -1) {
            return (<img src={iconSale} alt="icon sale"></img>)
        } else {
            return (<></>)
        }
    }

    useEffect(() => {
        window.scroll(0, 0)
        getArrProduct();
        getArrCate();
        getAllSale();
        console.log(arrProduct)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arrProduct?.length, filterCate, filterPrice, pageProduct])

    return (
        <Fragment>
            <div>
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-12">
                            <nav className="breadcrumb bg-light mb-30">
                                <a className="breadcrumb-item text-dark" href="/">Home</a>
                                <a className="breadcrumb-item text-dark" href="/shop">Shop</a>
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
                                                        <input type="radio" name='price' onChange={() => { setFilterPrice(item.max); setPageProduct(1) }} className="custom-control-input" value={item.max} id={item.max} defaultChecked />
                                                        <label className="custom-control-label" htmlFor={item.max}>{item.title}</label>
                                                    </>
                                                    ) :
                                                    (<>
                                                        <input type="radio" name='price' onChange={() => { setFilterPrice(item.max); setPageProduct(1) }} className="custom-control-input" value={item.max} id={item.max} />
                                                        <label className="custom-control-label" htmlFor={item.max}>{item.title}</label>
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
                                        <input type="radio" name='Cate' className="custom-control-input" defaultChecked id="cate-all" value="all" onChange={() => { setFilterCate(0); setPageProduct(1) }} />
                                        <label className="custom-control-label" htmlFor="cate-all">All Category</label>
                                    </div>
                                    {arrCate?.map((item, index) => {
                                        return (
                                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3" key={index}>
                                                <input type="radio" name='Cate' className="custom-control-input" id={item.tenTL} value={item.maTL} onChange={() => { setFilterCate(item.maTL); setPageProduct(1) }} />
                                                <label className="custom-control-label" htmlFor={item.tenTL}>{item.tenTL}</label>
                                                <span className="badge border font-weight-normal" style={{ color: 'black' }}>{item.SLSanPham}</span>
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
                                            {/* <button className="btn btn-sm btn-light ml-2"><i className="fa fa-bars" /></button> */}
                                        </div>
                                    </div>
                                </div>
                                {/* Arr Prodcut */}
                                {arrProduct?.map((item, index) => {
                                    return (
                                        <div className="col-lg-4 col-md-6 col-sm-6 pb-1" key={index} >
                                            <div className="product-item bg-light mb-4" style={{ height: "400px" }}>
                                                <div className="product-img position-relative overflow-hidden" style={{ height: "67%" }}>
                                                    <img className="img-fluid w-100" src={item.hinhAnh} alt='true'
                                                        style={{
                                                            position: "absolute",
                                                            margin: "auto",
                                                            top: "50%",
                                                            left: "50%",
                                                            transform: "translate(-50%,-50%)"
                                                        }}
                                                    />
                                                    <div className="product-action">
                                                        <NavLink className="btn btn-outline-dark btn-square" to={`/product/${item.maSP}`}><i className="fa fa-search" /></NavLink>
                                                    </div>
                                                </div>
                                                <div className="text-center py-4">
                                                    <a className="h6 text-decoration-none text-truncate" href={`/product/${item.maSP}`}>{item.tenSP}</a>
                                                    <div className="d-flex align-items-center justify-content-center mt-2">
                                                        <h5>{formatPrice(item.giaThapNhat)} ~ {formatPrice(item.giaCaoNhat)}</h5>

                                                        {/* <h6 className="text-muted ml-2"><del>{item.giaCaoNhat?.toLocaleString()}</del></h6> */}
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                                        {getSale(item.maSP)} {item.tongSLTon === 0 ? <strong style={{ color: "red" }}>Hết Hàng</strong> : <></>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                                <div className="col-12">
                                    <div className="input-group quantity mr-3" style={{ width: "fit-content" }}>
                                        <div className="input-group-btn">
                                            <button onClick={() => { setNumPage(false) }} className="btn btn-success btn-minus">
                                                Prev
                                            </button>
                                        </div>
                                        <Form.Control type="number" value={pageProduct} onChange={(e) => setInputNumpage(parseInt(e.target.value))} placeholder="Nhập Số Trang" style={{ width: '50px' }} className="disableControlInput" />
                                        <Form.Control type="number" value={totalPage} placeholder="totalPage" style={{ width: '50px' }} disabled />
                                        <div onClick={() => { setNumPage(true) }} className="input-group-btn">
                                            <button className="btn btn-success btn-plus">
                                                Next
                                            </button>
                                        </div>
                                    </div>
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
