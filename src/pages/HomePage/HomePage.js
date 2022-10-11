import React, { Fragment } from 'react'
import Carousel from '../../components/Carousel/Carousel'
import Categories from '../../components/Categories/Categories'
import Featured from '../../components/Featured/Featured'
import Offer from '../../components/Offer/Offer'
import Product from '../../components/Product/Product'

export default function HomePage() {
    return (
        <Fragment>
            <Carousel />
            <Featured />
            <Categories />
            <Product />
            <Offer />
        </Fragment>
    )
}
