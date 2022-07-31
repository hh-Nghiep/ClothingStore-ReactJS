import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import user from '~/assets/img/user.jpg'
import Product from '~/components/Product/Product'
import { DOMAIN } from '~/util/setting/config'

export default function ShopDetails() {
    const [num, setNum] = useState(1)
    const [size, setSize] = useState(1)
    const handleNumber = (boolean) => {
        if (boolean) {
            setNum(num + 1)
        } else {
            if (num <= 1) {
                alert("Không Được Nhỏ Hơn 1, Không Mua ? -> Không ADD vô Cart Là Được")
            } else {
                setNum(num - 1)
            }
        }
    }

    const { productID } = useSelector(state => state.ProductReducer)
    const dispatch = useDispatch()
    const params = useParams();
    const addCart = (item) => {
        console.log(item)
        let name;
        let id = item[0].id;
        let title = item[0].title
        let price = item[0].price;
        let discount = item[0].discount;
        let thumbnail = item[0].thumbnail;
        let sizeInt = parseInt(size)
        if (sizeInt === 1) {
            name = "S"
        } else if (sizeInt === 2) {
            name = "M"
        } else if (sizeInt === 3) {
            name = "L"
        } else if (sizeInt === 4) {
            name = "XL"
        } else if (sizeInt === 5) {
            name = "XXL"
        } else {
            name = '123'
        }
        const items = { id, thumbnail, price, title, discount, number: num, size: size, sizeName: name }
        dispatch({
            type: "ADD_CART",
            item: items
        })

    }
    const handleChange = (e) => {
        setSize(e.target.value)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        const getShopDetails = async () => {
            await axios({
                method: 'get',
                url: `${DOMAIN}/product/${params.id}`,
                data: productID
            }).then((data) => {
                dispatch({
                    type: "GET_PRODUCT",
                    productID: data.data
                })
            }).catch((err) => {
                // console.log("err")
            })
        }
        getShopDetails()
    }, [params.id])
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
                                <span className="breadcrumb-item active">Shop Detail</span>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* Breadcrumb End */}
                {/* Shop Detail Start */}
                <div className="container-fluid pb-5">
                    {productID?.map((item, index) => {
                        return (
                            <div className="row px-xl-5" key={index}>
                                <div className="col-lg-5 mb-30">
                                    <div id="product-carousel" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner bg-light">
                                            <div className="carousel-item active">
                                                <img width={496} height={496} src={item.thumbnail} alt="Image" />
                                            </div>
                                            {item.Galeries?.map((hinh, index) => {
                                                return (
                                                    <div className="carousel-item" key={index}>
                                                        <img width={496} height={496} src={hinh.thumbnail} alt="Image" />
                                                    </div>
                                                )
                                            })}
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
                                        <h3>{item.title}</h3>
                                        <div className="d-flex mb-3">
                                            <div className="text-primary mr-2">
                                                <small className="fas fa-star" />
                                                <small className="fas fa-star" />
                                                <small className="fas fa-star" />
                                                <small className="fas fa-star-half-alt" />
                                                <small className="far fa-star" />
                                            </div>
                                            <small className="pt-1">(99 Reviews)</small>
                                        </div>
                                        <h3 className="font-weight-semi-bold mb-4">{item.discount.toLocaleString()}đ</h3>
                                        <p className="mb-4">Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit
                                            clita ea. Sanc ipsum et, labore clita lorem magna duo dolor no sea
                                            Nonumy</p>
                                        <div className="d-flex mb-3">
                                            <strong className="text-dark mr-3">Sizes:</strong>
                                            <form>
                                                {item.Sizes?.map((sizes, index) => {
                                                    return (
                                                        <div className="custom-control custom-radio custom-control-inline" key={index}>
                                                            <input onChange={handleChange} type="radio" className="custom-control-input" id={sizes.id} name="size" value={sizes.id} />
                                                            <label name='size' className="custom-control-label" htmlFor={sizes.id}>{sizes.size} : </label>
                                                            <p>{sizes.Product_Size?.amount}</p>
                                                        </div>
                                                    )
                                                })}
                                            </form>
                                        </div>
                                        <div className="d-flex align-items-center mb-4 pt-2">
                                            <div className="input-group quantity mr-3" style={{ width: 130 }}>
                                                <div className="input-group-btn">
                                                    <button onClick={() => handleNumber(false)} className="btn btn-primary btn-minus">
                                                        <i className="fa fa-minus" />
                                                    </button>
                                                </div>
                                                <p className="form-control bg-secondary border-0 text-center">{num}</p>
                                                <div onClick={() => handleNumber(true)} className="input-group-btn">
                                                    <button className="btn btn-primary btn-plus">
                                                        <i className="fa fa-plus" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button onClick={() => addCart(productID)} className="btn btn-primary px-3"><i className="fa fa-shopping-cart mr-1" /> Add To
                                                Cart</button>
                                        </div>
                                        <div className="d-flex pt-2">
                                            <strong className="text-dark mr-2">Share on:</strong>
                                            <div className="d-inline-flex">
                                                <a className="text-dark px-2" href='#'>
                                                    <i className="fab fa-facebook-f" />
                                                </a>
                                                <a className="text-dark px-2" href='#'>
                                                    <i className="fab fa-twitter" />
                                                </a>
                                                <a className="text-dark px-2" href='#'>
                                                    <i className="fab fa-linkedin-in" />
                                                </a>
                                                <a className="text-dark px-2" href='#'>
                                                    <i className="fab fa-pinterest" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className="row px-xl-5">
                        <div className="col">
                            <div className="bg-light p-30">
                                <div className="nav nav-tabs mb-4">
                                    <a className="nav-item nav-link text-dark active" data-toggle="tab" href="#tab-pane-1">Description</a>
                                    <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-2">Information</a>
                                    <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-3">Reviews (0)</a>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="tab-pane-1">
                                        <h4 className="mb-3">Product Description</h4>
                                        <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p>
                                        <p>Dolore magna est eirmod sanctus dolor, amet diam et eirmod et ipsum. Amet dolore tempor consetetur sed lorem dolor sit lorem tempor. Gubergren amet amet labore sadipscing clita clita diam clita. Sea amet et sed ipsum lorem elitr et, amet et labore voluptua sit rebum. Ea erat sed et diam takimata sed justo. Magna takimata justo et amet magna et.</p>
                                    </div>
                                    <div className="tab-pane fade" id="tab-pane-2">
                                        <h4 className="mb-3">Additional Information</h4>
                                        <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item px-0">
                                                        Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Duo amet accusam eirmod nonumy stet et et stet eirmod.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item px-0">
                                                        Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Duo amet accusam eirmod nonumy stet et et stet eirmod.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="tab-pane-3">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h4 className="mb-4">1 review for "Product Name"</h4>
                                                <div className="media mb-4">
                                                    <img src={user} alt="Image" className="img-fluid mr-3 mt-1" style={{ width: 45 }} />
                                                    <div className="media-body">
                                                        <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                                                        <div className="text-primary mb-2">
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star-half-alt" />
                                                            <i className="far fa-star" />
                                                        </div>
                                                        <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <h4 className="mb-4">Leave a review</h4>
                                                <small>Your email address will not be published. Required fields are marked *</small>
                                                <div className="d-flex my-3">
                                                    <p className="mb-0 mr-2">Your Rating * :</p>
                                                    <div className="text-primary">
                                                        <i className="far fa-star" />
                                                        <i className="far fa-star" />
                                                        <i className="far fa-star" />
                                                        <i className="far fa-star" />
                                                        <i className="far fa-star" />
                                                    </div>
                                                </div>
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="message">Your Review *</label>
                                                        <textarea id="message" cols={30} rows={5} className="form-control" defaultValue={""} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="name">Your Name *</label>
                                                        <input type="text" className="form-control" id="name" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="email">Your Email *</label>
                                                        <input type="email" className="form-control" id="email" />
                                                    </div>
                                                    <div className="form-group mb-0">
                                                        <input type="submit" defaultValue="Leave Your Review" className="btn btn-primary px-3" />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Shop Detail End */}
                {/* Products Start */}
                <Product />
            </div>

        </Fragment>
    )
}
