import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import './Login.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const notify = () => toast("Sai Thông Tin Đăng Nhập");
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            await axios({
                method: 'post',
                url: `http://localhost:3001/user/login`,
                data: values
            }).then((values2) => {
                console.log(values2.data[0])
                console.log(values2.data[0][0].maQuyen)
                if (values2.data !== 0) {
                    // localStorage.setItem('maNguoiDung', values2.data[0][0].maNguoiDung)
                    // localStorage.setItem('hoTen', values2.data[0][0].hoTen)

                } else {
                    return (
                        notify()
                    )
                }
            }).catch((err) => {
                return (
                    notify()
                )
            })
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
                                                <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel() }} />

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
