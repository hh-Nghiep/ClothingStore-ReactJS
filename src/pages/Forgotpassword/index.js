import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'

export default function Forgotpassword() {
    const navigate = useNavigate();
    const [show2, setShow2] = useState(false);
    const handleShow2 = (item) => { setShow2(true) };
    const handleClose2 = () => setShow2(false);
    const [emailUser, setEmailUser] = useState("");

    const schema = yup.object().shape({
        sdt: yup.string().required("Vui Lòng Điền Số Điện Thoại")
            .matches(/^[0-9]+$/, "Chỉ Chứa Chữ Số")
            .test('len', 'Số Điện Thoại Chỉ Có 10 Số', val => val?.length === 10),
        email: yup.string().email().required("Kiểm tra lại email"),
        cmnd: yup.string().required("Vui Lòng Điền CMND")
            .matches(/^[0-9]+$/, "Chỉ Chứa Chữ Số")
            .test('len', 'Chỉ Được 9 Hoặc 12 Số', val => val?.length === 9 || val?.length === 12),
    });

    const schema2 = yup.object().shape({
        password: yup.string().required("Vui Lòng Điền Password"),
        confirmpassword: yup.string()
            .oneOf([yup.ref('password')], 'Password Chưa Khớp')
            .required("Vui Lòng Nhập Lại Password")
    });
    return (
        <>
            <div className='bg-gradient-primary'>
                <div className="container">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Lấy Lại Mật Khẩu!</h1>
                                    </div>
                                    <Formik
                                        onSubmit={values => {
                                            axios({
                                                method: 'post',
                                                url: `http://localhost:3001/user/checkInfo`,
                                                data: values
                                            }).then((data) => {
                                                if (data.data === 1) {
                                                    alert("Tìm Thấy Thông Tin Người Dùng!!!")
                                                    setEmailUser(values.email)
                                                    handleShow2();
                                                }
                                            }).catch((err) => {
                                                console.log("err", err)
                                            })
                                        }}
                                        enableReinitialize={true}
                                        validationSchema={schema}
                                        initialValues={{
                                            email: "",
                                            sdt: "",
                                            cmnd: "",
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
                                                <Row>
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
                                                <Button type="submit" variant='success' style={{ marginTop: "15px", float: "right" }} >Kiểm Tra Thông Tin</Button>
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

            <Modal show={show2} onHide={handleClose2} size={'xl'} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Cấp Lại Mật Khẩu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        onSubmit={values => {
                            console.log(values)
                            console.log(emailUser)
                            axios({
                                method: 'post',
                                url: `http://localhost:3001/user/updatePassword`,
                                data: {
                                    email: emailUser,
                                    password: values.password
                                }
                            }).then((data) => {
                                alert("Cập Nhật Mật Khẩu Thành Công")
                                handleClose2();
                                navigate('/login')
                            }).catch((err) => {
                                console.log("err", err)
                            })

                        }}
                        validationSchema={schema2}
                        enableReinitialize={true}
                        initialValues={{
                            password: "",
                            confirmpassword: "",
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
                                <Row style={{ marginTop: "40px" }}>
                                    <Col>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control required type='password' name="password" onChange={handleChange} value={values?.password} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Nhập Lại Password</Form.Label>
                                        <Form.Control required type='password' name="confirmpassword" onChange={handleChange} value={values?.confirmpassword} />
                                    </Col>
                                </Row>
                                <Button type="submit" variant='success' style={{ marginTop: "15px", float: "right" }} >Chỉnh Sửa</Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>Huỷ</Button>
                </Modal.Footer>
            </Modal >
        </>


    )
}
