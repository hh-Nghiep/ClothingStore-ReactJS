import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faKey } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function Managerser() {
    const navigate = useNavigate();
    const [arrUserSearch, setArrUserSearch] = useState([]);
    const [showDrop, setShowDrop] = useState("");

    const [checkPhone, setCheckPhone] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkId, setCheckId] = useState(false);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [show1, setShow1] = useState(false);
    const handleShow1 = (item) => { getUserById(item); setShow1(true) };
    const handleClose1 = () => setShow1(false);

    const [show2, setShow2] = useState(false);
    const handleShow2 = (item) => { getUserById(item); setShow2(true) };
    const handleClose2 = () => setShow2(false);

    const [arrUser, setArrUser] = useState([]);
    const [idRole, setIdRole] = useState(1);
    const [statusUser, setStatusUser] = useState(1);
    const [infoUser, setInfoUser] = useState();
    const [idUser, setIdUser] = useState();
    const [pageProduct, setPageProdut] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const roles = [
        {
            idRole: 1,
            role: "Admin"
        },
        {
            idRole: 2,
            role: "Nhân Viên"
        },
        {
            idRole: 3,
            role: "Khách Hàng"
        },
    ]

    const status = [
        {
            idStatus: 0,
            status: "Bị Khoá"
        },
        {
            idStatus: 1,
            status: "Đang Hoạt Động"
        }
    ]

    const schema = yup.object().shape({
        hoTen: yup.string().required("Vui Lòng Điền Tên Người Dùng"),
        sdt: yup.string().required("Vui Lòng Điền Số Điện Thoại")
            .matches(/^[0-9]+$/, "Chỉ Chứa Chữ Số")
            .test('len', 'Số Điện Thoại Chỉ Có 10 Số', val => val?.length === 10),
        email: yup.string().email().required("Kiểm tra lại email"),
        diaChi: yup.string().required("Vui Lòng Điền Địa Chỉ"),
        cmnd: yup.string().required("Vui Lòng Điền CMND")
            .matches(/^[0-9]+$/, "Chỉ Chứa Chữ Số")
            .test('len', 'Chỉ Được 9 Hoặc 12 Số', val => val?.length === 9 || val?.length === 12),
        password: yup.string().required("Vui Lòng Điền Password"),
        confirmpassword: yup.string()
            .oneOf([yup.ref('password')], 'Password Chưa Khớp')
            .required("Vui Lòng Nhập Lại Password")
    });

    const schema2 = yup.object().shape({
        hoTen: yup.string().required("Vui Lòng Điền Tên Người Dùng"),
        sdt: yup.string().required("Vui Lòng Điền Số Điện Thoại")
            .matches(/^[0-9]+$/, "Chỉ Chứa Chữ Số")
            .test('len', 'Số Điện Thoại Chỉ Có 10 Số', val => val?.length === 10),
        email: yup.string().email().required("Kiểm tra lại email"),
        diaChi: yup.string().required("Vui Lòng Điền Địa Chỉ"),
        cmnd: yup.string().required("Vui Lòng Điền CMND")
            .matches(/^[0-9]+$/, "Chỉ Chứa Chữ Số")
            .test('len', 'Chỉ Được 9 Hoặc 12 Số', val => val?.length === 9 || val?.length === 12),
    });

    const getUsers = async () => {
        await axios({
            method: 'post',
            url: `http://localhost:3001/users?page=${pageProduct}`,
            data: {
                maQuyen: idRole,
                trangThai: statusUser
            }
        }).then((data) => {
            setArrUser(data.data.data);
            setTotalPage(data.data.totalPage)
        }).catch((err) => {
            console.log("err")
        })
    }

    const getUserById = async (id) => {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3001/user/id`,
            data: {
                maNguoiDung: id
            }
        }).then((data) => {
            setInfoUser(data.data[0][0]);
            console.log(infoUser)
        }).catch((err) => {
            console.log("err")
        })
    }

    const disableUser = async (id) => {
        await axios({
            method: 'delete',
            url: `http://localhost:3001/user/disable`,
            data: {
                maNguoiDung: id
            }
        }).then((data) => {
        }).catch((err) => {
            console.log("err")
        })
        getUsers();
    }

    const fcCheckPhone = async (id, sdt) => {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3001/user/checkPhone`,
            data: {
                maNguoiDung: id,
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

    const fcCheckEmail = async (id, email) => {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3001/user/checkEmail`,
            data: {
                maNguoiDung: id,
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

    const fcCheckId = async (id, cmnd) => {
        await axios({
            method: 'post',
            url: `http://localhost:3001/user/checkId`,
            data: {
                maNguoiDung: id,
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

    const handleSearch = (e) => {
        if (e !== "") {
            axios({
                method: 'GET',
                url: `http://localhost:3001/user/find/${e}`,
            }).then((data) => {
                setArrUserSearch(data.data[0])
            }).catch((err) => {
                console.log("Lỗi Tìm Người Dùng :", err)
            })
            setShowDrop("block")
        } else {
            setShowDrop("")
        }
    }

    const setNumPage = (boolean) => {
        if (boolean === true) {
            if (pageProduct < totalPage) {
                setPageProdut(pageProduct + 1)
            }
        } else {
            if (pageProduct > 1) {
                setPageProdut(pageProduct - 1)
            }
        }
    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("infoUser")).role !== 1) {
            alert("Bạn Không Có Quyền Vào Site Này !!!!!")
            navigate('/admin')
        }
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arrUser?.length, idRole, statusUser, infoUser])


    return (
        <>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {/* Begin Page Content */}
                    <div className="container-fluid">
                        {/* Page Heading */}
                        <h1 className="h3 mb-2 text-gray-800">Quản Lý Tài Khoản</h1>
                        {/* DataTales Example */}
                        <div className="card shadow mb-4">
                            <div className="card-header py-3" style={{ marginBottom: "5px" }}>
                                <h6 className="m-0 font-weight-bold text-primary" style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Row>
                                        <Form.Select onChange={(e) => setIdRole(e.target.value)} name="status" style={{ width: "200px" }}>
                                            <option value="1">Admin</option>
                                            <option value="2">Nhân Viên</option>
                                            <option value="3">Khách Hàng</option>
                                        </Form.Select>
                                        <Form.Select onChange={(e) => setStatusUser(e.target.value)} name="status" style={{ marginLeft: "30px", width: "200px" }}>
                                            <option value="1">Đang Hoạt Động</option>
                                            <option value="0">Ngưng Hoạt Động</option>
                                        </Form.Select>
                                    </Row>

                                    <div className="col-lg-4 col-6 text-left">
                                        <form>
                                            <div className="input-group">
                                                <input type="text" onChange={e => handleSearch(e.target.value)} className="form-control" placeholder="Tìm Theo Email" style={{ float: "right" }} />
                                                <div className="input-group-append">
                                                    <span className="input-group-text bg-transparent text-primary">
                                                        <i className="fa fa-search" />
                                                    </span>
                                                </div>
                                            </div>
                                        </form>
                                        <ul className='dropdown_search' style={{ display: `${showDrop}` }}>
                                            {arrUserSearch?.map((item, index) => {
                                                return (
                                                    <li style={{ height: "70px", display: "flex", alignItems: "center" }} key={index}>
                                                        <div style={{ color: "black", overflow: "hidden", cursor: "pointer" }} onClick={() => handleShow1(`${item.maNguoiDung}`)}>{item.maNguoiDung}: {item.email}</div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>

                                    <Button variant="success" onClick={handleShow} style={{ top: "15px", right: "10px" }}>Thêm Tài Khoản Mới</Button>
                                </h6>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <Table striped bordered hover
                                        className="table table-bordered"
                                        id="dataTable"
                                        width="100%"
                                        cellSpacing={0}
                                        style={{ color: "black" }}
                                    >
                                        <thead>
                                            <tr >
                                                <th>Mã Người Dùng</th>
                                                <th>Họ và Tên</th>
                                                <th>Số Điện Thoại</th>
                                                <th>Email</th>
                                                <th>Quyền</th>
                                                <th style={{ width: "155px" }}>Thao Tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {arrUser?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.maNguoiDung}</td>
                                                        <td>{item.hoTen}</td>
                                                        <td>{item.sdt}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.maQuyen}</td>
                                                        <td>
                                                            <button onClick={() => { setIdUser(`${item.maNguoiDung}`); handleShow1(`${item.maNguoiDung}`) }} style={{ marginRight: "10px" }}><FontAwesomeIcon icon={faPenToSquare} style={{ color: "green", cursor: "pointer" }} /></button>
                                                            {' '}
                                                            <button onClick={() => { handleShow2(`${item.maNguoiDung}`) }} style={{ marginLeft: "10px" }}><FontAwesomeIcon icon={faKey} style={{ color: "black", cursor: "pointer" }} /></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="input-group quantity mr-3" style={{ width: "fit-content" }}>
                                    <div className="input-group-btn">
                                        <button onClick={() => { setNumPage(false) }} className="btn btn-success btn-minus">
                                            Prev
                                        </button>
                                    </div>
                                    <p className="form-control bg-secondary border-0 text-center" style={{ color: "white", width: "fit-content" }}>{`${pageProduct} / ${totalPage}`}</p>
                                    <div onClick={() => { setNumPage(true) }} className="input-group-btn">
                                        <button className="btn btn-success btn-plus">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /.container-fluid */}
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size={'xl'} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo Tài Khoản Mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        onSubmit={values => {
                            fcCheckPhone(0, values.sdt)
                            fcCheckEmail(0, values.email)
                            fcCheckId(0, values.cmnd)
                            if (checkPhone === true && checkEmail === true && checkId === true) {
                                if (values.maQuyen !== 1) {
                                    values.maQuyen = roles[roles.findIndex(item => item.role === values.maQuyen)].idRole;
                                }

                                values.hoTen = (values.hoTen.toLowerCase().replace(/  +/g, ' ')).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()).trim()
                                values.diaChi = (values.diaChi.toLowerCase().replace(/  +/g, ' ')).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()).trim()
                                axios({
                                    method: 'post',
                                    url: `http://localhost:3001/user/add`,
                                    data: values
                                }).then((data) => {
                                    alert("Tạo Tài Khoản Thành Công")
                                    window.location.href = '/admin/manageruser'
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
                            maQuyen: 1,
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
                                            required
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
                                        <Form.Label>Quyền Tài Khoản</Form.Label>
                                        <Form.Select onChange={handleChange} name="maQuyen">
                                            {roles.map((item, index) => {
                                                return (<option name="maQuyen" key={item.idRole} value={item?.role}>{item?.role}</option>)
                                            })}
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: "40px" }}>
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
                                <Button type="submit" variant='success' style={{ marginTop: "15px", float: "right" }} >Tạo</Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>Huỷ</Button>
                </Modal.Footer>
            </Modal >

            <Modal show={show1} onHide={handleClose1} size={'xl'} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh Sửa Tài Khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        onSubmit={values => {
                            fcCheckPhone(values.maNguoiDung, values.sdt)
                            fcCheckEmail(values.maNguoiDung, values.email)
                            fcCheckId(values.maNguoiDung, values.cmnd)
                            if (checkPhone === true && checkEmail === true && checkId === true) {
                                if (window.confirm("Chỉnh Sửa Nhân Viên ?") === true) {
                                    if (typeof (values.trangThai) === 'string') {
                                        var index = status.map(item => item.status).indexOf(`${values.trangThai}`)
                                        values.trangThai = status[index].idStatus;
                                    }
                                    if (typeof (values.maQuyen) === 'string') {
                                        var index2 = roles.map(item => item.role).indexOf(`${values.maQuyen}`)
                                        values.maQuyen = roles[index2].idRole;
                                    }
                                    values.hoTen = (values.hoTen.toLowerCase().replace(/  +/g, ' ')).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()).trim()
                                    values.diaChi = (values.diaChi.toLowerCase().replace(/  +/g, ' ')).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()).trim()
                                    axios({
                                        method: 'post',
                                        url: `http://localhost:3001/user/edit`,
                                        data: values
                                    }).then((data) => {
                                        alert("Cập Nhật Thông Tin Người Dùng Thành Công")
                                        handleClose1();
                                        window.location.href = '/admin/manageruser'
                                    }).catch((err) => {
                                        console.log("err", err)
                                    })
                                }
                            }
                        }}
                        validationSchema={schema2}
                        enableReinitialize={true}
                        initialValues={{
                            maNguoiDung: infoUser?.maNguoiDung,
                            hoTen: infoUser?.hoTen,
                            sdt: infoUser?.sdt,
                            email: infoUser?.email,
                            diaChi: infoUser?.diaChi,
                            cmnd: infoUser?.cmnd,
                            maQuyen: infoUser?.maQuyen,
                            trangThai: infoUser?.trangThai
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
                                            required
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
                                        <Form.Label>Quyền Tài Khoản</Form.Label>
                                        <Form.Select onChange={handleChange} name="maQuyen">
                                            {roles.map((item, index) => {
                                                if ((index + 1) === values.maQuyen) {
                                                    return (<option name="maQuyen" key={item.idRole} value={item?.role} selected>{item?.role}</option>)
                                                } else {
                                                    return (<option name="maQuyen" key={item.idRole} value={item?.idrole}>{item?.role}</option>)
                                                }

                                            })}
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: "40px" }}>
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
                                <Row style={{ width: "380px", marginTop: "40px" }}>
                                    <Col >
                                        <Form.Label>Trạng Thái</Form.Label>
                                        <Form.Select onChange={handleChange} name="trangThai" >
                                            {status.map((item, index) => {
                                                if (item.idStatus === values.trangThai) {
                                                    return (<option name="trangThai" key={item.idStatus} selected>{item?.status}</option>)
                                                } else {
                                                    return (<option name="trangThai" key={item.idStatus}>{item?.status}</option>)
                                                }
                                            })}
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Button type="button" variant='warning' onClick={() => { setShow1(false); handleShow2(`${idUser}`) }} style={{ marginTop: "15px", color: "black" }} >Cấp Lại Mật Khẩu</Button>
                                <Button type="submit" variant='success' style={{ marginTop: "15px", float: "right" }} >Chỉnh Sửa</Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>Huỷ</Button>
                </Modal.Footer>
            </Modal >

            <Modal show={show2} onHide={handleClose2} size={'xl'} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Cấp Lại Mật Khẩu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        onSubmit={values => {
                            axios({
                                method: 'post',
                                url: `http://localhost:3001/user/updatePassword`,
                                data: {
                                    email: values.email,
                                    password: values.password
                                }
                            }).then((data) => {
                                alert("Cập Nhật Mật Khẩu Thành Công")
                                handleClose2();
                                getUsers();
                            }).catch((err) => {
                                console.log("err", err)
                            })

                        }}
                        enableReinitialize={true}
                        initialValues={{
                            hoTen: infoUser?.hoTen,
                            sdt: infoUser?.sdt,
                            email: infoUser?.email,
                            diaChi: infoUser?.diaChi,
                            cmnd: infoUser?.cmnd,
                            password: "",
                            confirmpassword: "",
                            maQuyen: infoUser?.maQuyen,
                            trangThai: infoUser?.trangThai
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
                                            disabled
                                            required
                                            type="text"
                                            name="hoTen"
                                            value={values?.hoTen}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Số Điện Thoại</Form.Label>
                                        <Form.Control disabled required name="sdt" onChange={handleChange} value={values?.sdt} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Quyền Tài Khoản</Form.Label>
                                        <Form.Select disabled onChange={handleChange} name="maQuyen" >
                                            {roles.map((item, index) => {
                                                if (item.idRole === values.maQuyen) {
                                                    return (<option name="maQuyen" key={item.idRole} selected>{item?.role}</option>)
                                                } else {
                                                    return (<option name="maQuyen" key={item.idRole}>{item?.role}</option>)
                                                }
                                            })}
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: "40px" }}>
                                    <Col>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            required
                                            disabled
                                            type="email"
                                            name="email"
                                            value={values?.email}
                                            onChange={handleChange}
                                        />
                                    </Col>

                                    <Col>
                                        <Form.Label>Địa Chỉ</Form.Label>
                                        <Form.Control disabled required name="diaChi" onChange={handleChange} value={values?.diaChi} />
                                    </Col>

                                    <Col>
                                        <Form.Label>CMND</Form.Label>
                                        <Form.Control disabled required name="cmnd" onChange={handleChange} value={values?.cmnd} />
                                    </Col>
                                </Row>
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
