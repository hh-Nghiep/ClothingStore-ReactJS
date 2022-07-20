import React from 'react'
import offer1 from '../../assets/img/offer-1.jpg'
import offer2 from '../../assets/img/offer-2.jpg'
import carousel1 from '../../assets/img/carousel-1.jpg'
import carousel2 from '../../assets/img/carousel-2.jpg'
import carousel3 from '../../assets/img/carousel-3.jpg'
import {NavLink} from 'react-router-dom'
export default function Carousel() {
  return (
    <div className="container-fluid mb-3">
      <div className="row px-xl-5">
        <div className="col-lg-8">
          <div id="header-carousel" className="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#header-carousel" data-slide-to={0} className="active" />
              <li data-target="#header-carousel" data-slide-to={1} />
              <li data-target="#header-carousel" data-slide-to={2} />
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item position-relative active" style={{ height: 430 }}>
                <img className="position-absolute w-100 h-100" src={carousel1} style={{ objectFit: 'cover' }} alt='true' />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: 700 }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Men Fashion</h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                    <NavLink to='/shop' className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp">Shop Now</NavLink>
                  </div>
                </div>
              </div>
              <div className="carousel-item position-relative" style={{ height: 430 }}>
                <img className="position-absolute w-100 h-100" src={carousel2} style={{ objectFit: 'cover' }} alt='true' />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: 700 }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Women Fashion</h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                    <NavLink to='/shop' className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp">Shop Now</NavLink>
                  </div>
                </div>
              </div>
              <div className="carousel-item position-relative" style={{ height: 430 }}>
                <img className="position-absolute w-100 h-100" src={carousel3} style={{ objectFit: 'cover' }} alt='true' />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: 700 }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Kids Fashion</h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                    <NavLink to='/shop' className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp">Shop Now</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="product-offer mb-30" style={{ height: 200 }}>
            <img className="img-fluid" src={offer1} alt='true' />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Save 20%</h6>
              <h3 className="text-white mb-3">Special Offer</h3>
              <NavLink to='/shop' className="btn btn-primary">Shop Now</NavLink>
            </div>
          </div>
          <div className="product-offer mb-30" style={{ height: 200 }}>
            <img className="img-fluid" src={offer2} alt='true' />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Save 20%</h6>
              <h3 className="text-white mb-3">Special Offer</h3>
              <NavLink to='/shop' className="btn btn-primary">Shop Now</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
