import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


export default function Product() {
    const [listProduct, setListProduct] = useState([]);
    const [nameCategory, setNameCategory] = useState();
    const [cate, setCate] = useState([]);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [infoBeforUpdate, setInfoBeforUpdate] = useState();
    const [show1, setShow1] = useState(false);
    const handleShow1 = (item) => { setInfoBeforUpdate(item); setShow1(true) };
    const handleClose1 = () => setShow1(false);

    const getAllCategory = async () => {
        const response = await axios({
            method: 'get',
            url: `http://localhost:3001/cates`
        }).then((data) => {
            setCate(data.data?.[0])
        }).catch((err) => {
            console.log("err")
        })
    }

    const deleteCategory = async (maTL) => {
        const response = await axios({
            method: 'delete',
            url: `http://localhost:3001/cate/delete`,
            data: {
                maTL: maTL
            }
        }).then((data) => {
        }).catch((err) => {
            console.log("err")
        })
        getAllProduct();
    }

    const getAllProduct = async () => {
        const response = await axios({
            method: 'get',
            url: `http://localhost:3001/products`
        }).then((data) => {
            setListProduct(data.data?.[0])
        }).catch((err) => {
            console.log("err")
        })
    }

    const addCategory = async () => {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3001/cate/add`,
            data: {
                tenTheLoai: nameCategory
            }
        }).then((data) => {
        }).catch((err) => {
            console.log("err")
        })
        handleClose();
        getAllProduct();
    }

    const updateCategory = async () => {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3001/cate/update`,
            data: {
                tenTL: infoBeforUpdate.tenTL,
                maTL: infoBeforUpdate.maTL
            }
        }).then((data) => {
        }).catch((err) => {
            console.log("err")
        })
        handleClose1();
        getAllProduct();
    }
    const formatPrice = (price) => {
        return Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(price)
    }

    useEffect(() => {
        getAllProduct();
        getAllCategory();
    }, [listProduct.length])



    const formik = useFormik({
        initialValues: {
            TenSP: "",
            maTL: "",
            hinhAnh: "",
            maNV: "",
            SLSizeS: 0,
            SLSizeM: 0,
            SLSizeL: 0,
            SLSizeXL: 0,
            SLSizeXXL: 0,

            giaSizeS: 0,
            giaSizeM: 0,
            giaSizeL: 0,
            giaSizeXL: 0,
            giaSizeXXL: 0,
            moTa: "Không có mô tả.",
        },
        validationSchema: yup.object({
            TenSP: yup.string().required("Vui Lòng Điền Tên Sản Phẩm"),
            hinhAnh: yup.string().required("Vui Lòng Điền Link Hình Ảnh"),
            moTa: yup.string().required("Vui Lòng Điền Mô Tả Sản Phẩm"),
            SLSizeS: yup.number().required("Vui Lòng Điền Số Lượng Size S"),
            giaSizeS: yup.number().required("Vui Lòng Điền Giá Size S"),

            SLSizeM: yup.number().required("Vui Lòng Điền Số Lượng Size M"),
            giaSizeM: yup.number().required("Vui Lòng Điền Giá Size M"),

            SLSizeL: yup.number().required("Vui Lòng Điền Số Lượng Size L"),
            giaSizeL: yup.number().required("Vui Lòng Điền Giá Size L"),

            SLSizeXL: yup.number().required("Vui Lòng Điền Số Lượng Size XL"),
            giaSizeXL: yup.number().required("Vui Lòng Điền Giá Size XL"),

            SLSizeXXL: yup.number().required("Vui Lòng Điền Số Lượng Size XXL"),
            giaSizeXXL: yup.number().required("Vui Lòng Điền Giá Size XXL"),
        }),
        onSubmit: (values) => {
            console.log("Values", values)
            // axios({
            //     method: 'post',
            //     url: `http://localhost:3001/products`,
            //     data: values
            // }).then((data) => {
            // }).catch((err) => {
            //     console.log("err", err)
            // })
        }
    })
    return (
        <>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {/* Begin Page Content */}
                    <div className="container-fluid">
                        {/* Page Heading */}
                        <h1 className="h3 mb-2 text-gray-800">Quản Lý Sản Phẩm</h1>
                        {/* DataTales Example */}
                        <div className="card shadow mb-4">
                            <div className="card-header py-3" style={{ marginBottom: "5px" }}>
                                <h6 className="m-0 font-weight-bold text-primary">
                                    Tất Cả Sản Phẩm
                                    <Button variant="success" onClick={handleShow} style={{ position: "absolute", top: "8px", right: "10px" }}>Thêm Sản Phẩm Mới</Button>
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
                                                <th>Mã Sản Phẩm</th>
                                                <th>Hình Ảnh</th>
                                                <th>Tên Sản Phẩm</th>
                                                <th>Giá</th>
                                                <th>Tổng Số Lượng Tồn</th>
                                                <th>Thao Tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listProduct?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.maSP}</td>
                                                        <td>{item.hinhAnh}</td>
                                                        <td>{item.tenSP}</td>
                                                        <td>{formatPrice(`${item.giaThapNhat}`)} ~ {formatPrice(`${item.giaCaoNhat}`)}</td>
                                                        <td>{item.tongSLTon}</td>
                                                        <td>
                                                            <button onClick={() => handleShow1(item)} style={{ marginRight: "10px" }}><FontAwesomeIcon icon={faPenToSquare} style={{ color: "green", cursor: "pointer" }} /></button>

                                                            {' '}
                                                            <button onClick={() => deleteCategory(`${item.maTL}`)} ><FontAwesomeIcon icon={faTrash} style={{ color: "red", cursor: "pointer" }} /></button>

                                                        </td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /.container-fluid */}
                </div>
            </div>


            <Modal show={show} onHide={handleClose} size={'xl'} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Sản Phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* style={{ color: "black", fontSize: "18px" }} */}
                    <form onSubmit={formik.handleSubmit} >
                        <Row>
                            < Col >
                                <Form.Label>Tên Sản Phẩm</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tenSP"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.TenSP && formik.touched.tenSP && (<p>{formik.errors.tenSP}</p>)}
                            </Col>
                            <Col>
                                <Form.Label>Hình Ảnh</Form.Label>
                                <Form.Control name="hinhAnh" onChange={formik.handleChange} />
                                {formik.errors.hinhAnh && formik.touched.hinhAnh && (<p>{formik.errors.hinhAnh}</p>)}
                            </Col>
                        </Row>

                        <Button type="submit" style={{ marginTop: "15px" }} > Thêm Sản Phẩm</Button>
                    </form>

                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Huỷ</Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}
