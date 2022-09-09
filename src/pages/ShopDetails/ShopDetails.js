import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import iconSale from './../../assets/img/sale.png';

export default function ShopDetails() {
    const params = useParams();
    let navigate = useNavigate();
    const notify = () => { return toast(`Thêm Vào Giỏ Hàng Thành Công !!!`) };
    const isLogin = useSelector(state => state.user.userLogin)
    const dispatch = useDispatch();

    const [listProductSale, setListProductSale] = useState([]);
    const [radioValue, setRadioValue] = useState('S');
    const [idSize, setIdSize] = useState(1);
    const [productID, setProductID] = useState();
    const location = useLocation();
    const IDProduct = location.pathname.slice(9);
    const [num, setNum] = useState(1);

    const handleNumber = (boolean) => {
        if (boolean) {
            if (num < parseInt(productID?.["SLSize" + radioValue])) {
                setNum(num + 1)
            } else if (num === parseInt(productID?.["SLSize" + radioValue])) {
                alert("Số Lượng Sản Phẩm Không Đủ")
            }
        } else {
            if (num <= 1) {
                alert("Số Lượng Sản Phẩm Không Được Nhỏ Hơn 1")
            } else {
                setNum(num - 1)
            }
        }
    }

    const handleNumberInput = (number) => {
        if (number <= parseInt(productID?.["SLSize" + radioValue]) && number > 0) {
            setNum(number)
        } else if (number > parseInt(productID?.["SLSize" + radioValue])) {
            setNum(parseInt(productID?.["SLSize" + radioValue]));
        } else {
            setNum(1);
        }
    }

    const Size = [
        {
            name: 'S',
            id: '1',
        },
        {
            name: 'M',
            id: '2',
        },
        {
            name: 'L',
            id: '3',
        },
        {
            name: 'XL',
            id: '4',
        },
        {
            name: 'XXL',
            id: '5',
        },
    ];

    const addCart = (SL) => {
        if (isLogin == 'true') {
            if (SL < 1) {
                alert("Size Này Đã Hết Hàng !!!!")
            } else {
                const item = {
                    hinhAnh: productID?.hinhAnh,
                    tenSP: productID?.tenSP,
                    gia: productID?.["giaSize" + radioValue],
                    size: radioValue,
                    maCT: productID?.["maCT" + radioValue],
                    SL: num,
                }
                notify()
                dispatch({
                    type: 'ADD_CART',
                    payload: { item, SL }
                })


            }
        } else {
            alert("Vui Lòng Đăng Nhập Trước Khi Thêm Vào Giỏ Hàng !!!")
            navigate('/login')
        }
    }

    const getAllSale = async () => {
        await axios({
            method: 'post',
            url: `http://localhost:3001/sales?page=0`,
            data: {
                trangThai: 1
            }
        }).then((data) => {
            setListProductSale(data?.data[0])
        }).catch((err) => {
            console.log("err")
        })
    }

    const getSale = () => {
        var index = listProductSale.findIndex(item => {
            if (item.maSP === parseInt(params.id) && item.maSize === parseInt(idSize)) {
                return true;
            }
            return false;
        });
        if (index !== -1) {
            return (
                <>
                    <del> {getPrice(productID?.["giaSize" + radioValue])}</del>
                    &rArr;
                    {getPrice((productID?.["giaSize" + radioValue] * (100 - listProductSale[index].phanTramGiam)) / 100)}
                    <img src={iconSale} alt="icon sale"></img>
                </>
            )
        } else {
            return (getPrice(productID?.["giaSize" + radioValue]))
        }
    }

    const getShopDetails = async () => {
        await axios({
            method: 'get',
            url: `http://localhost:3001/product/${params.id}`,
            data: IDProduct
        }).then((data) => {
            setProductID(data.data[0][0])
        }).catch((err) => {
            console.log("err")
        })
        setNum(1)
    }

    const getPrice = (price) => {
        return Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(price)
    }

    useEffect(() => {
        if (productID === undefined)
            getShopDetails();
        getAllSale();
        setNum(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id, radioValue])
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
                                <span className="breadcrumb-item active">Shop Detail</span>
                                <div>
                                    <ToastContainer />
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* Breadcrumb End */}
                {/* Shop Detail Start */}
                <div className="container-fluid pb-5">
                    <div className="row px-xl-5">
                        <div className="col-lg-5 mb-30">
                            <div id="product-carousel" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner bg-light">
                                    <div className="carousel-item active">
                                        <img width={496} height={496} src={productID?.hinhAnh} alt="ImageProduct" />
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                                    <i className="fa fa-2x fa-angle-left text-dark" />
                                </a>
                                <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                                    <i className="fa fa-2x fa-angle-right text-dark" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-7 h-auto mb-30">
                            <div className="h-100 bg-light p-30">
                                <h3>{productID?.tenSP}</h3>
                                <div className="d-flex mb-3">
                                    <small className="pt-1" style={{ fontSize: "15px" }}> Lượt Xem: {productID?.luotXem + 1}</small>
                                </div>
                                <h3 className="font-weight-semi-bold mb-4">{getSale()}</h3>

                                <p className="mb-4" style={{ fontSize: "20px", color: "black" }}>{productID?.moTa}</p>
                                <div className="d-flex mb-3">
                                    <strong className="text-dark mr-3" style={{ paddingTop: "5px" }}>Sizes:</strong>
                                    <form>
                                        <ButtonGroup >
                                            {Size.map((item, index) => {
                                                if (productID?.["SLSize" + item.name] === 0) {
                                                    return (<ToggleButton
                                                        disabled
                                                        key={item.id}
                                                        id={item.id}
                                                        type="radio"
                                                        variant='outline-success'
                                                        name="radio"
                                                        value={item.name}
                                                        checked={radioValue === item.name}
                                                        onChange={(e) => { setRadioValue(e.currentTarget.value); setIdSize(1) }}
                                                        style={{ marginRight: "10px" }}
                                                    >
                                                        {item.name}{' '}
                                                    </ToggleButton>)
                                                } else {
                                                    return (<ToggleButton
                                                        key={item.id}
                                                        id={item.id}
                                                        type="radio"
                                                        variant='outline-success'
                                                        name="radio"
                                                        value={item.name}
                                                        checked={radioValue === item.name}
                                                        onChange={(e) => { setRadioValue(e.currentTarget.value); setIdSize(1) }}
                                                        style={{ marginRight: "10px" }}
                                                    >
                                                        {item.name}{' '}
                                                    </ToggleButton>)
                                                }
                                            })}


                                            {/* <ToggleButton
                                                key={Size[1].id}
                                                id={Size[1].id}
                                                type="radio"
                                                variant='outline-success'
                                                name="radio"
                                                value={Size[1].name}
                                                checked={radioValue === Size[1].name}
                                                onChange={(e) => { setRadioValue(e.currentTarget.value); setIdSize(2) }}
                                                style={{ marginRight: "10px" }}
                                            >
                                                {Size[1].name}{' '}
                                            </ToggleButton>

                                            <ToggleButton
                                                key={Size[2].id}
                                                id={Size[2].id}
                                                type="radio"
                                                variant='outline-success'
                                                name="radio"
                                                value={Size[2].name}
                                                checked={radioValue === Size[2].name}
                                                onChange={(e) => { setRadioValue(e.currentTarget.value); setIdSize(3) }}
                                                style={{ marginRight: "10px" }}
                                            >
                                                {Size[2].name}{' '}
                                            </ToggleButton>

                                            <ToggleButton
                                                key={Size[3].id}
                                                id={Size[3].id}
                                                type="radio"
                                                variant='outline-success'
                                                name="radio"
                                                value={Size[3].name}
                                                checked={radioValue === Size[3].name}
                                                onChange={(e) => { setRadioValue(e.currentTarget.value); setIdSize(4) }}
                                                style={{ marginRight: "10px" }}
                                            >
                                                {Size[3].name}{' '}
                                            </ToggleButton>

                                            <ToggleButton
                                                key={Size[4].id}
                                                id={Size[4].id}
                                                type="radio"
                                                variant='outline-success'
                                                name="radio"
                                                value={Size[4].name}
                                                checked={radioValue === Size[4].name}
                                                onChange={(e) => { setRadioValue(e.currentTarget.value); setIdSize(5) }}
                                                style={{ marginRight: "10px" }}
                                            >
                                                {Size[4].name}{' '}
                                            </ToggleButton> */}
                                        </ButtonGroup>
                                    </form>
                                </div>
                                <strong className="text-dark mr-3" >Số lượng Còn: {productID?.["SLSize" + radioValue]}</strong>
                                <div className="d-flex align-items-center mb-4 pt-2" style={{ marginTop: "15px" }}>
                                    <div className="input-group quantity mr-3" style={{ width: "fit-content" }}>
                                        <div className="input-group-btn">
                                            <button onClick={() => handleNumber(false)} className="btn btn-primary btn-minus">
                                                <i className="fa fa-minus" />
                                            </button>
                                        </div>
                                        <Form.Control type="number" value={num} onChange={(e) => handleNumberInput(parseInt(e.target.value))} placeholder="Nhập Số Lượng" style={{ width: '55px' }} className="disableControlInput" />
                                        <div onClick={() => handleNumber(true)} className="input-group-btn">
                                            <button className="btn btn-primary btn-plus">
                                                <i className="fa fa-plus" />
                                            </button>
                                        </div>
                                    </div>
                                    <button onClick={() => addCart(`${productID?.["SLSize" + radioValue]}`)} className="btn btn-primary px-3"><i className="fa fa-shopping-cart mr-1" />Thêm Vào Giỏ Hàng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Shop Detail End */}
                {/* Products Start */}
                {/* <Product /> */}
            </div>

        </Fragment >
    )
}
