import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import './Login.css'
import { DOMAIN } from '~/util/setting/config'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const notify = () => toast("Sai Thông Tin Đăng Nhập");
    const navigate = useNavigate()
    const { userLogin } = useSelector(state => state.UserReducer)
    console.log(userLogin)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            const loginValue = async () => {
                await axios({
                    method: 'post',
                    url: `${DOMAIN}/users/login`,
                    data: values
                }).then((values) => {
                    dispatch({
                        type: "LOGIN",
                        values: values.data
                    })
                    navigate('/')
                }).catch((err) => {
                    return (
                        notify()
                    )
                })
            }
            loginValue()
            console.log(values)
        }
    })
    return (
        <div onSubmit={(e) => {
            e.preventDefault()
            formik.handleSubmit(e)
        }} className="bg-gradient-primary">
            <div className="container">
                {/* Outer Row */}
                <div>
                    <ToastContainer />
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* Nested Row within Card Body */}
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <form className="user" onSubmit={(e) => {
                                                formik.handleSubmit(e)
                                            }}>
                                                <div className="form-group">
                                                    <input name='email' onChange={formik.handleChange} type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                                                </div>
                                                <div className="form-group">
                                                    <input name='password' onChange={formik.handleChange} type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                        <label className="custom-control-label" htmlFor="customCheck">Remember
                                                            Me</label>
                                                    </div>
                                                </div>
                                                <button type='submit' href="#" className="btn btn-primary btn-user btn-block">
                                                    Login
                                                </button>
                                                <hr />
                                                <a href="#" className="btn btn-google btn-user btn-block">
                                                    <i className="fab fa-google fa-fw" /> Login with Google
                                                </a>
                                                <a href="#" className="btn btn-facebook btn-user btn-block">
                                                    <i className="fab fa-facebook-f fa-fw" /> Login with Facebook
                                                </a>
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                                            </div>
                                            <div className="text-center">
                                                <NavLink to='/register' className="small">Create an Account!</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
