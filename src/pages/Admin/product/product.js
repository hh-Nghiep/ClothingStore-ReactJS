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
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


export default function Product() {
    const [listProduct, setListProduct] = useState([]);
    const [cate, setCate] = useState([]);
    const [statusProduct, setStatusProduct] = useState(1);
    const [infoProduct, setInfoProduct] = useState([]);
    const [imgProduct, setImgProduct] = useState();

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [show1, setShow1] = useState(false);
    const handleShow1 = (item) => { getInfoProduct(item); };
    const handleClose1 = () => setShow1(false);

    const getAllCategory = async () => {
        const response = await axios({
            method: 'get',
            url: `http://localhost:3001/cates`,
        }).then((data) => {
            setCate(data.data?.[0])
        }).catch((err) => {
            console.log("err")
        })
    }

    const deleteProduct = async (maSP) => {
        const response = await axios({
            method: 'delete',
            url: `http://localhost:3001/product/delete`,
            data: {
                maSP: maSP
            }
        }).then((data) => {
        }).catch((err) => {
            console.log("err")
        })
        getAllProduct();
    }

    const getAllProduct = async () => {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3001/products`,
            data: {
                trangThai: statusProduct
            }
        }).then((data) => {
            console.log("data", data.data[0])
            setListProduct(data?.data[0])
        }).catch((err) => {
            console.log("err", err.message)
        })
    }

    const getInfoProduct = async (maSP) => {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3001/product/id`,
            data: {
                maSP: maSP
            }
        }).then((data) => {
            setInfoProduct(data.data[0][0])
            console.log(infoProduct)
            setShow1(true)
        }).catch((err) => {
            console.log("err")
        })
    }

    const activateProduct = async (maSP) => {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3001/product/activate`,
            data: {
                maSP: maSP
            }
        }).then((data) => {
            getAllProduct();
        }).catch((err) => {
            console.log("err")
        })
    }

    const formatPrice = (price) => {
        return Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(price)
    }

    useEffect(() => {
        getAllProduct();
        getAllCategory();
    }, [listProduct?.length, statusProduct, infoProduct, imgProduct])


    const imageUpload = async (e) => {
        var fileIn = e.target;
        var file = fileIn.files[0];
        if (file && file.size < 5e6) {
            const formData = new FormData();

            formData.append("file", file);
            formData.append("upload_preset", "nghiephh")
            try {
                let res = await fetch('https://api.cloudinary.com/v1_1/nghiephh/image/upload', {
                    method: 'POST',
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((response) => {
                        e.preventDefault();
                        setImgProduct(response.secure_url)
                    });
            } catch (error) {
                console.log(error);
            }

        } else {
            console.error("oversized file");
        }

    }


    const formik = useFormik({
        initialValues: {
            tenSP: "",
            maTL: "",
            hinhAnh: "",
            maNV: "",

            SLSizeS: null,
            SLSizeM: null,
            SLSizeL: null,
            SLSizeXL: null,
            SLSizeXXL: null,

            giaSizeS: null,
            giaSizeM: null,
            giaSizeL: null,
            giaSizeXL: null,
            giaSizeXXL: null,

            moTa: "Không có mô tả.",
        },
        // validationSchema: yup.object({
        //     TenSP: yup.string().required("Vui Lòng Điền Tên Sản Phẩm"),
        //     hinhAnh: yup.string().required("Vui Lòng Điền Link Hình Ảnh"),
        //     moTa: yup.string().required("Vui Lòng Điền Mô Tả Sản Phẩm"),
        //     SLSizeS: yup.number().required("Vui Lòng Điền Số Lượng Size S"),
        //     giaSizeS: yup.number().required("Vui Lòng Điền Giá Size S"),

        //     SLSizeM: yup.number().required("Vui Lòng Điền Số Lượng Size M"),
        //     giaSizeM: yup.number().required("Vui Lòng Điền Giá Size M"),

        //     SLSizeL: yup.number().required("Vui Lòng Điền Số Lượng Size L"),
        //     giaSizeL: yup.number().required("Vui Lòng Điền Giá Size L"),

        //     SLSizeXL: yup.number().required("Vui Lòng Điền Số Lượng Size XL"),
        //     giaSizeXL: yup.number().required("Vui Lòng Điền Giá Size XL"),

        //     SLSizeXXL: yup.number().required("Vui Lòng Điền Số Lượng Size XXL"),
        //     giaSizeXXL: yup.number().required("Vui Lòng Điền Giá Size XXL"),
        // }),
        onSubmit: (values) => {
            var index = cate.map(item => item.tenTL).indexOf(`${values.maTL}`)
            if (index === -1) {
                alert("Vui Lòng Chọn Thể Loại !!!")
            } else {
                values.maTL = cate[index].maTL;
                values.hinhAnh = imgProduct;
                axios({
                    method: 'post',
                    url: `http://localhost:3001/product/add`,
                    data: values
                }).then((data) => {
                    handleClose();
                    getAllProduct();
                    formik.resetForm();
                }).catch((err) => {
                    console.log("err", err)
                })
            }
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
                                    <Form.Select onChange={e => setStatusProduct(e.target.value)} name="status" style={{ width: "300px" }}>
                                        <option value="1">Sản Phẩm Đang Được Bán</option>
                                        <option value="0">Sản Phẩm Ngưng Bán</option>
                                    </Form.Select>
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
                                        style={{ color: "black", textAlign: "center", display: 'table' }}
                                    >
                                        <thead>
                                            <tr>
                                                <th >Mã SP</th>
                                                <th style={{ width: "18%" }}>Hình Ảnh</th>
                                                <th style={{ width: "25%" }}>Tên Sản Phẩm</th>
                                                <th >Giá</th>
                                                <th >Tổng Số Lượng Tồn</th>
                                                <th >Thao Tác</th>
                                            </tr>
                                        </thead>
                                        <tbody className='cssbutton'>
                                            {listProduct?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td style={{ verticalAlign: "middle" }}>{item.maSP}</td>
                                                        <td style={{ verticalAlign: "middle" }}><img src={`${item.hinhAnh}`} alt='ImgProduct' style={{ width: "50%" }}></img></td>
                                                        <td style={{ verticalAlign: "middle" }}>{item.tenSP}</td>
                                                        <td style={{ verticalAlign: "middle" }}>{formatPrice(`${item.giaThapNhat}`)} ~ {formatPrice(`${item.giaCaoNhat}`)}</td>
                                                        <td style={{ verticalAlign: "middle" }}>{item.tongSLTon}</td>
                                                        <td style={{ verticalAlign: "middle" }}>
                                                            {statusProduct == "1" ?
                                                                (<><button onClick={() => handleShow1(`${item.maSP}`)} style={{ marginRight: "10px" }}><FontAwesomeIcon icon={faPenToSquare} style={{ color: "green", cursor: "pointer" }} /></button>
                                                                    {' '}
                                                                    <button onClick={() => deleteProduct(`${item.maSP}`)} ><FontAwesomeIcon icon={faTrash} style={{ color: "red", cursor: "pointer" }} /></button></>)
                                                                : (<Button variant="success" onClick={() => activateProduct(`${item.maSP}`)}>Bán Lại</Button>)}
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
                    <form onSubmit={formik.handleSubmit} style={{ color: "black", fontSize: "18px" }}>
                        <Row>
                            < Col >
                                <Form.Label>Tên Sản Phẩm</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="tenSP"
                                    onChange={formik.handleChange}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Hình Ảnh</Form.Label>
                                <Form.Control required type='file' name="hinhAnh" onChange={e => { imageUpload(e) }} />
                            </Col>
                            <Col>
                                <Form.Label>Thể Loại</Form.Label>
                                <Form.Select onChange={formik.handleChange} name="maTL">
                                    <option>Vui Lòng Chọn Thể Loại</option>
                                    {cate.map((item, index) => {
                                        return (<option name="maTL" key={item.maTL}>{item.tenTL}</option>)
                                    })}
                                </Form.Select>
                            </Col>
                            <Row style={{ paddingTop: "20px" }}>
                                <Col>
                                    <Form.Label>Mô Tả</Form.Label>
                                    <Form.Control name="moTa" defaultValue={formik.values.moTa} onChange={formik.handleChange} as="textarea" aria-label="With textarea" />
                                </Col>
                            </Row>
                        </Row>

                        <Tabs
                            defaultActiveKey="sizeS"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="sizeS" title="Size S">
                                <Row style={{ paddingTop: "10px" }}>
                                    <Form.Label>Size S</Form.Label>
                                </Row>
                                <Row style={{ color: "red" }}>
                                    <Col>
                                        <Form.Label>Giá</Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            name="giaSizeS"
                                            defaultValue={formik.values.giaSizeS}
                                            onChange={formik.handleChange}
                                            min="0"
                                            placeholder='Giá Size S'
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Số Lượng</Form.Label>
                                        <Form.Control required name="SLSizeS" onChange={formik.handleChange} defaultValue={formik.values.SLSizeS} type="number" placeholder="Số Lượng Size S" />
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="sizeM" title="Size M">
                                <Row style={{ paddingTop: "10px" }}>
                                    <Form.Label>Size M</Form.Label>
                                </Row>
                                <Row style={{ color: "red" }}>
                                    <Col>
                                        <Form.Label>Giá</Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            name="giaSizeM"
                                            defaultValue={formik.values.giaSizeM}
                                            onChange={formik.handleChange}
                                            min="0"
                                            placeholder='Giá Size M'
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Số Lượng</Form.Label>
                                        <Form.Control required name="SLSizeM" onChange={formik.handleChange} defaultValue={formik.values.SLSizeM} type="number" placeholder="Số Lượng Size M" />
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="sizeL" title="Size L">
                                <Row style={{ paddingTop: "10px" }}>
                                    <Form.Label>Size L</Form.Label>
                                </Row>
                                <Row style={{ color: "red" }}>
                                    <Col>
                                        <Form.Label>Giá</Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            name="giaSizeL"
                                            defaultValue={formik.values.giaSizeL}
                                            onChange={formik.handleChange}
                                            min="0"
                                            placeholder='Giá Size L'
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Số Lượng</Form.Label>
                                        <Form.Control required name="SLSizeL" onChange={formik.handleChange} defaultValue={formik.values.SLSizeL} type="number" placeholder="Số Lượng Size L" />
                                    </Col>
                                </Row>
                            </Tab>

                            <Tab eventKey="sizeXL" title="Size XL">
                                <Row style={{ paddingTop: "10px" }}>
                                    <Form.Label>Size XL</Form.Label>
                                </Row>
                                <Row style={{ color: "red" }}>
                                    <Col>
                                        <Form.Label>Giá</Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            name="giaSizeXL"
                                            defaultValue={formik.values.giaSizeXL}
                                            onChange={formik.handleChange}
                                            min="0"
                                            placeholder='Giá Size XL'
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Số Lượng</Form.Label>
                                        <Form.Control required name="SLSizeXL" onChange={formik.handleChange} defaultValue={formik.values.SLSizeXL} type="number" placeholder="Số Lượng Size XL" />
                                    </Col>
                                </Row>
                            </Tab>

                            <Tab eventKey="sizeXXL" title="Size XXL">
                                <Row style={{ paddingTop: "10px" }}>
                                    <Form.Label>Size XXL</Form.Label>
                                </Row>
                                <Row style={{ color: "red" }}>
                                    <Col>
                                        <Form.Label>Giá</Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            name="giaSizeXXL"
                                            defaultValue={formik.values.giaSizeXXL}
                                            onChange={formik.handleChange}
                                            min="0"
                                            placeholder='Giá Size XXL'
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Số Lượng</Form.Label>
                                        <Form.Control required name="SLSizeXXL" onChange={formik.handleChange} defaultValue={formik.values.SLSizeXXL} type="number" placeholder="Số Lượng Size XXL" />
                                    </Col>
                                </Row>
                            </Tab>
                        </Tabs>
                        <Button type="submit" style={{ marginTop: "15px" }} > Thêm Sản Phẩm</Button>
                    </form>

                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Huỷ</Button>
                </Modal.Footer>
            </Modal >

            <Modal show={show1} onHide={handleClose1} size={'xl'} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh Sửa Sản Phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        onSubmit={values => {
                            if (typeof (values.maTL) === "string") {
                                var index = cate.map(item => item.tenTL).indexOf(`${values.maTL}`)
                                values.maTL = cate[index].maTL;
                            }

                            values.hinhAnh = imgProduct;
                            axios({
                                method: 'post',
                                url: `http://localhost:3001/product/edit`,
                                data: values
                            }).then((data) => {
                                handleClose1();
                                getAllProduct();
                            }).catch((err) => {
                                console.log("err", err)
                            })
                        }}
                        enableReinitialize={true}
                        initialValues={{
                            maSP: infoProduct.maSP,
                            tenSP: infoProduct.tenSP,
                            maTL: infoProduct.maTL,
                            hinhAnh: infoProduct.hinhAnh,
                            maNV: "",

                            SLSizeS: infoProduct.SLSizeS,
                            SLSizeM: infoProduct.SLSizeM,
                            SLSizeL: infoProduct.SLSizeL,
                            SLSizeXL: infoProduct.SLSizeXL,
                            SLSizeXXL: infoProduct.SLSizeXXL,

                            giaSizeS: infoProduct.giaSizeS,
                            giaSizeM: infoProduct.giaSizeM,
                            giaSizeL: infoProduct.giaSizeL,
                            giaSizeXL: infoProduct.giaSizeXL,
                            giaSizeXXL: infoProduct.giaSizeXXL,

                            ngayCapNhat: infoProduct.ngayCapNhat,
                            trangThai: infoProduct.trangThai,
                            moTa: infoProduct.moTa,
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
                                        <Form.Label>Tên Sản Phẩm</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="tenSP"
                                            value={values.tenSP}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Hình Ảnh</Form.Label>
                                        <Form.Control required type='file' name="hinhAnh" onChange={e => { imageUpload(e) }} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Thể Loại</Form.Label>
                                        <Form.Select onChange={handleChange} name="maTL">
                                            {cate.map((item, index) => {
                                                if (item.maTL === values.maTL) {
                                                    return (<option name="maTL" key={item.maTL} selected>{item.tenTL}</option>)
                                                } else {
                                                    return (<option name="maTL" key={item.maTL}>{item.tenTL}</option>)
                                                }
                                            })}
                                        </Form.Select>
                                    </Col>
                                    <Row style={{ paddingTop: "20px" }}>
                                        <Col>
                                            <Form.Label>Mô Tả</Form.Label>
                                            <Form.Control name="moTa" defaultValue={values.moTa} onChange={handleChange} as="textarea" aria-label="With textarea" />
                                        </Col>
                                    </Row>
                                </Row>

                                <Tabs
                                    defaultActiveKey="sizeS"
                                    id="uncontrolled-tab-example"
                                    className="mb-3"
                                >
                                    <Tab eventKey="sizeS" title="Size S" aria-selected="true">
                                        <Row style={{ paddingTop: "10px" }}>
                                            <Form.Label>Size S</Form.Label>
                                        </Row>
                                        <Row style={{ color: "red" }}>
                                            <Col>
                                                <Form.Label>Giá</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="number"
                                                    name="giaSizeS"
                                                    defaultValue={values.giaSizeS}
                                                    onChange={handleChange}
                                                    min="0"
                                                    placeholder='Giá Size S'
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label>Số Lượng</Form.Label>
                                                <Form.Control required name="SLSizeS" onChange={handleChange} defaultValue={values.SLSizeS} type="number" placeholder="Số Lượng Size S" />
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="sizeM" title="Size M">
                                        <Row style={{ paddingTop: "10px" }}>
                                            <Form.Label>Size M</Form.Label>
                                        </Row>
                                        <Row style={{ color: "red" }}>
                                            <Col>
                                                <Form.Label>Giá</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="number"
                                                    name="giaSizeM"
                                                    defaultValue={values.giaSizeM}
                                                    onChange={handleChange}
                                                    min="0"
                                                    placeholder='Giá Size M'
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label>Số Lượng</Form.Label>
                                                <Form.Control required name="SLSizeM" onChange={handleChange} defaultValue={values.SLSizeM} type="number" placeholder="Số Lượng Size M" />
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="sizeL" title="Size L">
                                        <Row style={{ paddingTop: "10px" }}>
                                            <Form.Label>Size L</Form.Label>
                                        </Row>
                                        <Row style={{ color: "red" }}>
                                            <Col>
                                                <Form.Label>Giá</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="number"
                                                    name="giaSizeL"
                                                    defaultValue={values.giaSizeL}
                                                    onChange={handleChange}
                                                    min="0"
                                                    placeholder='Giá Size L'
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label>Số Lượng</Form.Label>
                                                <Form.Control required name="SLSizeL" onChange={handleChange} defaultValue={values.SLSizeL} type="number" placeholder="Số Lượng Size L" />
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="sizeXL" title="Size XL">
                                        <Row style={{ paddingTop: "10px" }}>
                                            <Form.Label>Size XL</Form.Label>
                                        </Row>
                                        <Row style={{ color: "red" }}>
                                            <Col>
                                                <Form.Label>Giá</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="number"
                                                    name="giaSizeXL"
                                                    defaultValue={values.giaSizeXL}
                                                    onChange={handleChange}
                                                    min="0"
                                                    placeholder='Giá Size XL'
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label>Số Lượng</Form.Label>
                                                <Form.Control required name="SLSizeXL" onChange={handleChange} defaultValue={values.SLSizeXL} type="number" placeholder="Số Lượng Size XL" />
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="sizeXXL" title="Size XXL">
                                        <Row style={{ paddingTop: "10px" }}>
                                            <Form.Label>Size XXL</Form.Label>
                                        </Row>
                                        <Row style={{ color: "red" }}>
                                            <Col>
                                                <Form.Label>Giá</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="number"
                                                    name="giaSizeXXL"
                                                    defaultValue={values.giaSizeXXL}
                                                    onChange={handleChange}
                                                    min="0"
                                                    placeholder='Giá Size XXL'
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label>Số Lượng</Form.Label>
                                                <Form.Control required name="SLSizeXXL" onChange={handleChange} defaultValue={values.SLSizeXXL} type="number" placeholder="Số Lượng Size XXL" />
                                            </Col>
                                        </Row>
                                    </Tab>
                                </Tabs>
                                <Form.Label style={{ marginTop: "25px", color: "red" }}>Chỉnh Sửa Lần Cuối : {values.ngayCapNhat.substring(0, 10).substring(0, 10)}</Form.Label>
                                <Button type="submit" variant='success' style={{ marginTop: "15px", float: "right" }} >Chỉnh Sửa Sản Phẩm</Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>Huỷ</Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}
