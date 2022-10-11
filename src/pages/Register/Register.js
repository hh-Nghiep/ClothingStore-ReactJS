import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate();


    const [checkPhone, setCheckPhone] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkId, setCheckId] = useState(false);


    const fcCheckPhone = async (sdt) => {
        const response = await axios({
            method: 'post',
            url: `${DOMAIN}/user/checkPhone`,
            data: {
                sdt: sdt
            }
        }).then((data) => {
            if (data.data === 0) {
                alert("Số Điện Thoại Đã Tồn Tại !!!")
                setCheckPhone(false);
            } else {
                setCheckPhone(true);
            }
        }).catch((err) => {
            console.log("err")
        })
    }

    const fcCheckEmail = async (email) => {
        const response = await axios({
            method: 'post',
            url: `${DOMAIN}/user/checkEmail`,
            data: {
                email: email
            }
        }).then((data) => {
            if (data.data === 0) {
                alert("Email Đã Tồn Tại !!!")
                setCheckEmail(false);
            } else {
                setCheckEmail(true);
            }
        }).catch((err) => {
            console.log("err")
        })
    }

    const fcCheckId = async (cmnd) => {
        const response = await axios({
            method: 'post',
            url: `${DOMAIN}/user/checkPhone`,
            data: {
                cmnd: cmnd
            }
        }).then((data) => {
            if (data.data === 0) {
                alert("CMND Đã Tồn Tại !!!")
                setCheckId(false);
            } else {
                setCheckId(true);
            }
        }).catch((err) => {
            console.log("err")
        })
    }

    const schema = yup.object().shape({
        hoTen: yup.string().required("Vui Lòng Điền Tên Người Dùng"),
        sdt: yup.string().required("Vui Lòng Điền Số Điện Thoại")
            .matches(/^[0-9]+$/, "Chỉ Chứa Chữ Số")
            .test('len', 'Số Điện Thoại Chỉ Có 10 Số', val => val.length === 10),
        email: yup.string().email().required("Kiểm tra lại email"),
        diaChi: yup.string().required("Vui Lòng Điền Địa Chỉ"),
        cmnd: yup.string().required("Vui Lòng Điền CMND")
            .matches(/^[0-9]+$/, "Chỉ Chứa Chữ Số")
            .test('len', 'Chỉ Được 9 Hoặc 12 Số', val => val.length === 9 || val.length === 12),
        password: yup.string().required("Vui Lòng Điền Password"),
        confirmpassword: yup.string()
            .oneOf([yup.ref('password')], 'Password Chưa Khớp')
            .required("Vui Lòng Nhập Lại Password")
    });
    return (
        <div className='bg-gradient-primary'>
            <div className="container">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Tạo Tài Khoản Mới!</h1>
                                </div>
                                <Formik
                                    onSubmit={values => {
                                        fcCheckPhone(values.sdt)
                                        fcCheckEmail(values.email)
                                        fcCheckId(values.cmnd)
                                        if (checkPhone === true && checkEmail === true && checkId === true) {
                                            console.log(values)
                                            axios({
                                                method: 'post',
                                                url: `${DOMAIN}/user/add`,
                                                data: values
                                            }).then((data) => {
                                                alert("Tạo Tài Khoản Thành Công")
                                                navigate('/login');
                                            }).catch((err) => {
                                                console.log("err", err)
                                            })
                                        }
                                    }}
                                    enableReinitialize={true}
                                    validationSchema={schema}
                                    initialValues={{
                                        hoTen: "",
                                        sdt: "",
                                        email: "",
                                        diaChi: "",
                                        cmnd: "",
                                        password: "",
                                        confirmpassword: "",
                                        maQuyen: 3,
                                    }}
                                >
                                    {({
                                        handleSubmit,
                                        handleChange,
                                        handleBlur,
                                        resetForm,
                                        values,
                                        touched,
                                        isValid,
                                        errors,
                                    }) => (
                                        <Form onSubmit={handleSubmit} style={{ color: "black", fontSize: "18px" }}>
                                            <Row>
                                                < Col >
                                                    <Form.Label>Tên Người Dùng</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="hoTen"
                                                        value={values?.hoTen}
                                                        onChange={handleChange}
                                                        isValid={touched.hoTen && !errors.hoTen}
                                                        isInvalid={!!errors.hoTen}
                                                    />
                                                    <Form.Control.Feedback type="invalid" tooltip>
                                                        {errors.hoTen}
                                                    </Form.Control.Feedback>
                                                </Col>
                                                <Col>
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        value={values?.email}
                                                        onChange={handleChange}
                                                        isValid={touched.email && !errors.email}
                                                        isInvalid={!!errors.email}
                                                    />
                                                    <Form.Control.Feedback type="invalid" tooltip>
                                                        {errors.email}
                                                    </Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                            <Row style={{ marginTop: "40px" }}>
                                                <Col>
                                                    <Form.Label>Số Điện Thoại</Form.Label>
                                                    <Form.Control
                                                        name="sdt"
                                                        onChange={handleChange}
                                                        value={values?.sdt}
                                                        isValid={touched.sdt && !errors.sdt}
                                                        isInvalid={!!errors.sdt} />
                                                    <Form.Control.Feedback type="invalid" tooltip>
                                                        {errors.sdt}
                                                    </Form.Control.Feedback>
                                                </Col>
                                                <Col>
                                                    <Form.Label>Địa Chỉ</Form.Label>
                                                    <Form.Control
                                                        name="diaChi"
                                                        onChange={handleChange}
                                                        value={values?.diaChi}
                                                        isValid={touched.diaChi && !errors.diaChi}
                                                        isInvalid={!!errors.diaChi} />
                                                    <Form.Control.Feedback type="invalid" tooltip>
                                                        {errors.diaChi}
                                                    </Form.Control.Feedback>
                                                </Col>
                                                <Col>
                                                    <Form.Label>CMND</Form.Label>
                                                    <Form.Control
                                                        name="cmnd"
                                                        onChange={handleChange}
                                                        value={values?.cmnd}
                                                        isValid={touched.cmnd && !errors.cmnd}
                                                        isInvalid={!!errors.cmnd} />
                                                    <Form.Control.Feedback type="invalid" tooltip>
                                                        {errors.cmnd}
                                                    </Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                            <Row style={{ marginTop: "40px" }}>
                                                <Col>
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control
                                                        type='password'
                                                        name="password"
                                                        onChange={handleChange}
                                                        value={values?.password}
                                                        isValid={touched.password && !errors.password}
                                                        isInvalid={!!errors.password} />
                                                    <Form.Control.Feedback type="invalid" tooltip>
                                                        {errors.password}
                                                    </Form.Control.Feedback>
                                                </Col>
                                                <Col>
                                                    <Form.Label>Nhập lại Password</Form.Label>
                                                    <Form.Control
                                                        type='password'
                                                        name="confirmpassword"
                                                        onChange={handleChange}
                                                        value={values?.confirmpassword}
                                                        isValid={touched.confirmpassword && !errors.confirmpassword}
                                                        isInvalid={!!errors.confirmpassword} />
                                                    <Form.Control.Feedback type="invalid" tooltip>
                                                        {errors.confirmpassword}
                                                    </Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                            <Button type="submit" variant='success' style={{ marginTop: "15px", float: "right" }} >Tạo Tài Khoản</Button>
                                        </Form>
                                    )}
                                </Formik>
                                <hr />
                                <div style={{ paddingTop: "50px" }}>
                                    <div className="text-center">
                                        <NavLink className="small" to='/login'>Quên Mật Khẩu ?</NavLink>
                                    </div>
                                    <div className="text-center">
                                        <NavLink className="small" to='/login'>Đã Có Tài Khoản? Login! </NavLink>
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
