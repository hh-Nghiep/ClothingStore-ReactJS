import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import './Login.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';

export default function Login() {
    const notify = () => toast("Sai Thông Tin Đăng Nhập");
    let navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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
                if (values2.data !== 0) {
                    var infoUser = {
                        maNguoiDung: values2.data[0][0].maNguoiDung,
                        hoTen: values2.data[0][0].hoTen,
                        email: values2.data[0][0].email,
                        sdt: values2.data[0][0].sdt,
                        diaChi: values2.data[0][0].diaChi,
                    }
                    localStorage.setItem("infoUser", JSON.stringify(infoUser));
                    localStorage.setItem('isLogin', true);
                    if (JSON.parse(localStorage.getItem("CART:" + values2.data[0][0].maNguoiDung)) === null) {
                        localStorage.setItem("CART:" + values2.data[0][0].maNguoiDung, JSON.stringify([]));
                    }
                    if (values2.data[0][0].maQuyen === 3) {
                        navigate('/')
                    } else {
                        handleShow()
                    }
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
        <>
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chọn Site Bạn Muốn Vào</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Button variant="success" href='/' style={{ width: "200px", marginLeft: "40px", color: 'white!important' }}>Site Người Dùng</Button>{' '}
                        <Button variant="danger" onClick={() => navigate('/admin')} style={{ width: "200px", marginLeft: "40px" }}>Site Admin</Button>{' '}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
