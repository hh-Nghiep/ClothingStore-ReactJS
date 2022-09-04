import React from 'react'
import { NavLink } from 'react-router-dom'
import offer1 from '../../assets/img/offer-1.jpg'
import offer2 from '../../assets/img/offer-2.jpg'
export default function Offer() {
    return (
        <div className="container-fluid pt-5 pb-3">
            <div className="row px-xl-5">
                <div className="col-md-6">
                    <div className="product-offer mb-30" style={{ height: 300 }}>
                        <img className="img-fluid" src={offer1} alt='true' />
                        <div className="offer-text">
                            <h6 className="text-white text-uppercase">Sale 10%</h6>
                            <h3 className="text-white mb-3">Sale Off</h3>
                            <NavLink to='/shop' className="btn btn-primary">Shop Now</NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="product-offer mb-30" style={{ height: 300 }}>
                        <img className="img-fluid" src={offer2} alt='true' />
                        <div className="offer-text">
                            <h6 className="text-white text-uppercase">Sale 20%</h6>
                            <h3 className="text-white mb-3">Sale Off</h3>
                            <NavLink to='/shop' className="btn btn-primary">Shop Now</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
