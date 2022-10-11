import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DOMAIN } from '~/util/setting/config'
import cate1 from '../../assets/img/cat-1.jpg'


export default function Categories() {
    const dispatch = useDispatch()
    const { cate } = useSelector(state => state.category)

    useEffect(() => {
        axios({
            method: 'get',
            url: `localhost:3000/cate`,
            data: cate
        }).then((data) => {
            dispatch({
                type: "GET_ALL_CATEGORY",
                cate: data.data
            })
        }).catch((err) => {
            // console.log("err")
        })
    }, [])
    return (
        <div className="container-fluid pt-5">
            <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Categories</span></h2>
            <div className="row px-xl-5 pb-3">
                {cate?.map((item, index) => {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={index}>
                            <a className="text-decoration-none" href='#'>
                                <div className="cat-item d-flex align-items-center mb-4">
                                    <div className="overflow-hidden" style={{ width: 100, height: 100 }}>
                                        <img className="img-fluid" src={cate1} alt='true' />
                                    </div>
                                    <div className="flex-fill pl-3">
                                        <h6>{item.name}</h6>
                                        <small className="text-body">{item.Products?.reduce((total) => {
                                            return total += 1;
                                        }, 0)} Sản Phẩm </small>
                                    </div>
                                </div>
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}
