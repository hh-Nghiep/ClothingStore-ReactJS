import React, { Fragment, useEffect } from 'react'
import Carousel from '../../components/Carousel/Carousel'
import Categories from '../../components/Categories/Categories'
import Featured from '../../components/Featured/Featured'
import Offer from '../../components/Offer/Offer'
import Product from '../../components/Product/Product'
import { DOMAIN } from '~/util/setting/config'
import axios from 'axios'

export default function HomePage() {
    useEffect( () => {
        const getProduct = async () => {
            const response = await axios({
                method: 'get',
                url: `${DOMAIN}/roles`,
            }).then((data) => {
                console.log(data.data)
            }).catch((err) => {
            })
        }

        getProduct()
    }, [])

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
