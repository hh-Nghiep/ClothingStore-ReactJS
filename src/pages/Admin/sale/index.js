import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { DOMAIN } from '~/util/setting/config';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup';
import { Formik } from 'formik';

export default function Index() {
    const today = new Date();
    const [check, setCheck] = useState(false);
    const [listSale, setListSale] = useState([]);
    const [statusSale, setStatusSale] = useState(0);
    const [arrProductSearch, setArrProductSearch] = useState([]);
    const [arrSaleSearch, setArrSaleSearch] = useState([])
    const [pageSale, setpageSale] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [showDrop, setShowDrop] = useState("");
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [arrSize, setArrSize] = useState([]);

    const [valueSearch, setValueSearch] = useState("");
    const [infoProduct, setInfoProduct] = useState({});
    const [infoSale, setInfoSale] = useState({});

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => {
        setShow1(false);
    };

    const listSize = [
        {
            size: 'S'
        },
        {
            size: 'M'
        },
        {
            size: 'L'
        },
        {
            size: 'XL'
        },
        {
            size: 'XXL'
        },
    ]

    const getAllSale = async () => {
        await axios({
            method: 'post',
            url: `${DOMAIN}/sales?page=${pageSale}`,
            data: {
                trangThai: statusSale
            }
        }).then((data) => {
            setListSale(data.data?.data)
            setTotalPage(data?.data.totalPage)
        }).catch((err) => {
            console.log("err")
        })
    }

    const deleteSale = async (id) => {
        if (window.confirm("Bạn Muốn Xoá Khuyến Mãi ?") === true) {
            await axios({
                method: 'delete',
                url: `${DOMAIN}/sale/delete/${id}`
            }).then((data) => {
                alert("Xoá Thành Công!!!");
                getAllSale();
            }).catch((err) => {
                console.log("err")
            })
        }
    }

    const getDayMin = () => {
        if (today.getMonth() < 10 && today.getDate() < 10) {
            return (today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate())
        } else if (today.getDate() < 10) {
            return (today.getFullYear() + '-' + (today.getMonth() + 1) + '-0' + today.getDate())
        } else {
            return (today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate())
        }
    }

    const changeArrSize = (value) => {
        var tempArr = arrSize;
        if (tempArr.indexOf(value) === -1) {
            tempArr.push(value);
        } else {
            tempArr.splice(tempArr.indexOf(value), 1)
        }
        setArrSize(tempArr)
    }

    const getInfoProduct = (item) => {
        setInfoProduct({
            hinhAnh: item.item.hinhAnh1,
            tenSP: item.item.tenSP,
            maSP: item.item.maSP
        })
        handleSearch("")
    }

    const getInfoSale = (item) => {
        setInfoSale({
            hinhAnh: item.hinhAnh1,
            tenSP: item.tenSP,
            maSP: item.maSP,
            ngayApDung: item.ngayApDung,
            ngayHetHan: item.ngayHetHan,
            phanTramGiam: item.phanTramGiam,
            moTa: item.moTa,
            maSize: item.maSize,
            maKM: item.maKM
        })
        setShow1(true)
        handleSearch("")
    }

    const getDetailSale = async (maKM) => {
        axios({
            method: 'get',
            url: `${DOMAIN}/sale/find/${maKM}`,
        }).then((data) => {
            getInfoSale(data.data);
        }).catch((err) => {
            console.log("Lỗi lấy thể loại :", err)
        })
    }

    const handleSearch = (e) => {
        setValueSearch(e)
        if (e !== "") {
            axios({
                method: 'POST',
                url: `${DOMAIN}/product/find`,
                data: {
                    tenSP: e,
                    trangThai: 1
                }
            }).then((data) => {
                setArrProductSearch(data.data)
            }).catch((err) => {
                console.log("Lỗi lấy thể loại :", err)
            })
            setShowDrop("block")
        } else {
            setShowDrop("")
        }
    }

    const handleSearchSale = (e) => {
        setValueSearch(e)
        if (e !== "") {
            axios({
                method: 'POST',
                url: `${DOMAIN}/sale/find`,
                data: {
                    tenSP: e,
                }
            }).then((data) => {
                setArrSaleSearch(data.data[0])
            }).catch((err) => {
                console.log("Lỗi lấy thể loại :", err)
            })
            setShowDrop("block")
        } else {
            setShowDrop("")
        }
    }

    const setNumPage = (boolean) => {
        if (boolean === true) {
            if (pageSale < totalPage) {
                setpageSale(pageSale + 1)
            }
        } else {
            if (pageSale > 1) {
                setpageSale(pageSale - 1)
            }
        }
    }

    const checkSaleExists = async (values) => {
        try {
            arrSize.forEach(item => {
                axios({
                    method: 'POST',
                    url: `${DOMAIN}/sale/check`,
                    data: {
                        maKM: values.maKM,
                        ngayApDung: values.ngayApDung,
                        ngayHetHan: values.ngayHetHan,
                        maSP: parseInt(infoProduct.maSP),
                        maSize: parseInt(item),
                    }
                }).then((data) => {
                    if (data.data === 0) {
                        alert(`Khuyến Mãi Size ${listSize[parseInt(item) - 1].size} Bị Trùng Ngày !!!`)
                        setCheck(false);
                        return;
                    }
                }).catch((err) => {
                    console.log("Lỗi Kiểm Tra Sale :", err)
                })
            })
        } catch (error) {
            console.log(error)
        }

        setCheck(true)
    }

    const schema = yup.object().shape({
        moTa: yup.string().required("Vui Lòng Điền Mô Tả Sản Phẩm"),
        phanTramGiam: yup.number().required("Vui Lòng Nhập Phần Trăm Giảm Giá")
    })

    const schema2 = yup.object().shape({
        moTa: yup.string().required("Vui Lòng Điền Mô Tả Sản Phẩm"),
        phanTramGiam: yup.number().required("Vui Lòng Nhập Phần Trăm Giảm Giá")
    })

    useEffect(() => {
        window.scroll(0, 0)
        getAllSale();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listSale?.length, statusSale, infoProduct, pageSale])

    return (
        <>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {/* Begin Page Content */}
                    <div className="container-fluid">
                        {/* Page Heading */}
                        <h1 className="h3 mb-2 text-gray-800">Quản Lý Khuyến Mãi</h1>
                        {/* DataTales Example */}
                        <div className="card shadow mb-4">
                            <div className="card-header py-3" style={{ marginBottom: "5px" }}>
                                <h6 className="m-0 font-weight-bold text-primary" style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Form.Select onChange={e => { setStatusSale(parseInt(e.target.value)); setpageSale(1) }} name="status" style={{ width: "300px" }}>
                                        <option value="0">Tất Cả Khuyến Mãi</option>
                                        <option value="1">Khuyến Mãi Đang Có Hiệu Lực</option>
                                        <option value="2">Khuyến Mãi Chưa Có Hiệu Lực</option>
                                        <option value="-1">Khuyến Mãi Đã Hết Hiệu Lực</option>
                                    </Form.Select>
                                    <div className="col-lg-4 col-6 text-left" style={{ width: "30%" }}>
                                        <form>
                                            <div className="input-group">
                                                <input type="text" onChange={e => handleSearchSale(e.target.value)} className="form-control" placeholder="Tìm Theo Tên Sản Phẩm" style={{ float: "right" }} />
                                                <div className="input-group-append">
                                                    <span className="input-group-text bg-transparent text-primary">
                                                        <i className="fa fa-search" />
                                                    </span>
                                                </div>
                                            </div>
                                        </form>
                                        <ul className='dropdown_search' style={{ display: `${showDrop}` }}>
                                            {arrSaleSearch?.map((item, index) => {
                                                return (
                                                    <li key={index} style={{ height: "70px", display: "flex", alignItems: "center" }}>
                                                        <img src={item?.hinhAnh1} alt="imageProduct" style={{ width: "20%", height: "100%" }}></img>
                                                        <div>
                                                            <div style={{ color: "black", overflow: "hidden", cursor: "pointer" }} onClick={() => getInfoSale(item)}>{item?.tenSP}- Size:{listSize[item?.maSize - 1].size}</div>
                                                            <div><u>{item?.ngayApDung.slice(0, 10)} ~ {item?.ngayHetHan.slice(0, 10)}</u></div>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <Button variant="success" onClick={handleShow} style={{ top: "8px", right: "10px" }}>Thêm Khuyến Mãi Mới</Button>
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
                                                <th>Mã KM</th>
                                                <th>Tên - Mã - Size SP</th>
                                                <th style={{ width: "15%" }}>Hình Ảnh</th>
                                                <th>Ngày Áp Dụng</th>
                                                <th>Ngày Hết Hạn</th>
                                                <th>Phần Trăm Giảm</th>
                                                <th>Thao Tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listSale.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.maKM}</td>
                                                        <td><strong>{item.tenSP}</strong> - {item.maSP} - {listSize[parseInt(item.maSize) - 1].size}</td>
                                                        <td><img src={`${item.hinhAnh1}`} alt='ImgProduct' style={{ width: "100%" }}></img></td>
                                                        <td>{item.ngayApDung.slice(0, 10)}</td>
                                                        <td>{item.ngayHetHan.slice(0, 10)}</td>
                                                        <td>{item.phanTramGiam}%</td>
                                                        <td>
                                                            <button onClick={() => getDetailSale(item.maKM)} style={{ marginRight: "10px" }}><FontAwesomeIcon icon={faPenToSquare} style={{ color: "green", cursor: "pointer" }} /></button>
                                                            <button onClick={() => { deleteSale(item.maKM) }} ><FontAwesomeIcon icon={faTrash} style={{ color: "red", cursor: "pointer" }} /></button>
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
                                    <p className="form-control bg-secondary border-0 text-center" style={{ color: "white", width: "fit-content" }}>{`${pageSale} / ${totalPage}`}</p>
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
                    <Modal.Title>Thêm Khuyến Mãi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        onSubmit={async (values, { resetForm }) => {
                            values.maSP = parseInt(infoProduct.maSP);
                            if (isNaN(values.maSP)) {
                                alert("Vui Lòng Chọn Sản Phẩm !!!");
                            } else if (arrSize.length < 1) {
                                console.log(arrSize)
                                alert("Vui Lòng Chọn Ít Nhất 1 Size !!!");
                            } else {
                                if (values.ngayHetHan >= values.ngayApDung) {
                                    checkSaleExists(values);
                                    if (check === true) {
                                        try {
                                            arrSize.forEach((item, index) => {
                                                axios({
                                                    method: 'POST',
                                                    url: `${DOMAIN}/sale/add`,
                                                    data: {
                                                        maNV: JSON.parse(localStorage.getItem("infoUser"))?.maNguoiDung,
                                                        ngayApDung: values.ngayApDung,
                                                        ngayHetHan: values.ngayHetHan,
                                                        moTa: "Không có mô tả.",
                                                        maSP: parseInt(infoProduct.maSP),
                                                        maSize: parseInt(item),
                                                        phanTramGiam: values.phanTramGiam,
                                                        index: index
                                                    }
                                                }).then((data) => {
                                                }).catch((err) => {
                                                    console.log("Lỗi Thêm Khuyến Mãi :", err)
                                                })
                                            })
                                        } catch (error) {
                                            console.log(error)
                                        }
                                        alert("Thêm Khuyến Mãi Thành Công !!!")
                                        window.location.href = '/admin/sale'
                                    }
                                } else {
                                    alert("Ngày Hết Hạn Phải Sau Ngày Bắt Đầu !!!")
                                }
                            }
                        }}
                        enableReinitialize={true}
                        validationSchema={schema}
                        initialValues={{
                            maNV: JSON.parse(localStorage.getItem("infoUser"))?.maNguoiDung,
                            ngayApDung: "",
                            ngayHetHan: "",
                            moTa: "Không có mô tả.",
                            maSP: 0,
                            maSize: 0,
                            phanTramGiam: "",
                            maKM: 0
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
                                    <Row>
                                        <Col>
                                            <div>
                                                <Form.Label>Chọn Sản Phẩm</Form.Label>
                                                <div className="input-group">
                                                    <input type="text" value={valueSearch} onChange={e => handleSearch(e.target.value)} className="form-control" placeholder="Tìm Theo Tên Sản Phẩm" style={{ float: "right" }} />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-transparent text-primary">
                                                            <i className="fa fa-search" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className='dropdown_search' style={{ display: `${showDrop}` }}>
                                                {arrProductSearch?.map((item, index) => {
                                                    return (
                                                        <li key={index} style={{ height: "70px", display: "flex", alignItems: "center" }}>
                                                            <img src={item.hinhAnh1} alt="imageProduct" style={{ width: "20%", height: "100%" }}></img>
                                                            <div style={{ color: "black", overflow: "hidden", cursor: "pointer" }} onClick={() => getInfoProduct({ item })}>{item.tenSP}</div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </Col>
                                        <Col>
                                            <Form.Label>Tên Sản Phẩm - Mã SP: <strong>{infoProduct.tenSP} - {infoProduct.maSP}</strong> </Form.Label>
                                            <img src={infoProduct.hinhAnh} alt='Hình Ảnh' style={{ width: "50%" }}></img>
                                        </Col>
                                        <Col>
                                            <Form.Label>Chọn Size</Form.Label>
                                            <div className="mb-3">
                                                <Form.Check
                                                    inline
                                                    label="S"
                                                    value="1"
                                                    name="group1"
                                                    type='checkbox'
                                                    id={`checkbox-1`}
                                                    onChange={e => changeArrSize(e.target.value)}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="M"
                                                    value="2"
                                                    name="group1"
                                                    type='checkbox'
                                                    id={`checkbox-2`}
                                                    onChange={e => changeArrSize(e.target.value)}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="L"
                                                    value="3"
                                                    type='checkbox'
                                                    id={`checkbox-3`}
                                                    onChange={e => changeArrSize(e.target.value)}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="XL"
                                                    value="4"
                                                    type='checkbox'
                                                    id={`checkbox-3`}
                                                    onChange={e => changeArrSize(e.target.value)}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="XLL"
                                                    value="5"
                                                    type='checkbox'
                                                    id={`checkbox-3`}
                                                    onChange={e => changeArrSize(e.target.value)}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingTop: "20px" }}>
                                        <Col>
                                            <Form.Label>Ngày Bắt Đầu</Form.Label>
                                            <Form.Control
                                                required
                                                type="date"
                                                name="ngayApDung"
                                                min={getDayMin()}
                                                onChange={handleChange}
                                                isValid={touched.ngayApDung && !errors.ngayApDung}
                                                isInvalid={!!errors.ngayApDung}
                                            />
                                            <Form.Control.Feedback type="invalid" tooltip>
                                                {errors.ngayApDung}
                                            </Form.Control.Feedback>
                                        </Col>
                                        < Col >
                                            <Form.Label>Ngày Kết Thúc</Form.Label>
                                            <Form.Control
                                                required
                                                type="date"
                                                name="ngayHetHan"
                                                min={getDayMin()}
                                                onChange={handleChange}
                                                isValid={touched.ngayHetHan && !errors.ngayHetHan}
                                                isInvalid={!!errors.ngayHetHan}
                                            />
                                            <Form.Control.Feedback type="invalid" tooltip>
                                                {errors.ngayHetHan}
                                            </Form.Control.Feedback>
                                        </Col>
                                        < Col >
                                            <Form.Label>Phần Trăm Giảm</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="phanTramGiam"
                                                min="0"
                                                max="100"
                                                onChange={handleChange}
                                                isValid={touched.phanTramGiam && !errors.phanTramGiam}
                                                isInvalid={!!errors.phanTramGiam}
                                            />
                                            <Form.Control.Feedback type="invalid" tooltip>
                                                {errors.phanTramGiam}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingTop: "20px" }}>
                                        <Col>
                                            <Form.Label>Mô Tả</Form.Label>
                                            <Form.Control name="moTa" defaultValue={values.moTa} onChange={handleChange} as="textarea" aria-label="With textarea"
                                                isValid={touched.moTa && !errors.moTa}
                                                isInvalid={!!errors.moTa}
                                            />
                                            <Form.Control.Feedback type="invalid" tooltip>
                                                {errors.moTa}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                </Row>
                                <Button type="submit" variant="success" style={{ marginTop: "15px", float: "right" }} > Thêm Khuyến Mãi</Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Huỷ</Button>
                </Modal.Footer>
            </Modal >

            <Modal show={show1} onHide={handleClose1} size={'xl'} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh Sửa Khuyến Mãi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        onSubmit={async (values, { resetForm }) => {
                            values.maSP = parseInt(infoProduct.maSP);
                            checkSaleExists(values);
                            console.log(values)
                            if (values.ngayHetHan >= values.ngayApDung) {
                                checkSaleExists(values);
                                if (check === true) {
                                    try {
                                        axios({
                                            method: 'POST',
                                            url: `${DOMAIN}/sale/edit`,
                                            data: {
                                                maKM: values.maKM,
                                                ngayApDung: values.ngayApDung,
                                                ngayHetHan: values.ngayHetHan,
                                                moTa: values.moTa,
                                                phanTramGiam: values.phanTramGiam,
                                                maNV: JSON.parse(localStorage.getItem("infoUser"))?.maNguoiDung
                                            }
                                        }).then((data) => {
                                        }).catch((err) => {
                                            console.log("Lỗi Chỉnh Sửa Khuyến Mãi :", err)
                                        })
                                    } catch (error) {
                                        console.log(error)
                                    }
                                    alert("Chỉnh Sửa Khuyến Mãi Thành Công !!!")
                                    window.location.href = '/admin/sale'
                                }
                            } else {
                                alert("Ngày Hết Hạn Phải Sau Ngày Bắt Đầu !!!")
                            }
                        }}
                        enableReinitialize={true}
                        validationSchema={schema2}
                        initialValues={{
                            maNV: JSON.parse(localStorage.getItem("infoUser"))?.maNguoiDung,
                            ngayApDung: infoSale.ngayApDung,
                            ngayHetHan: infoSale.ngayHetHan,
                            moTa: infoSale.moTa,
                            maSP: infoSale.maSP,
                            maSize: infoSale.maSize,
                            phanTramGiam: infoSale.phanTramGiam,
                            tenSP: infoSale.tenSP,
                            hinhAnh: infoSale.hinhAnh,
                            maKM: infoSale.maKM
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
                                    <Row>
                                        <Col>
                                            <Form.Label>Tên Sản Phẩm - Mã SP: <strong>{values.tenSP} - {values.maSP}</strong> </Form.Label>
                                            <img src={values.hinhAnh} alt='Hình Ảnh' style={{ width: "50%" }}></img>
                                        </Col>
                                        <Col>
                                            <Form.Label><strong>Size : {listSize[values.maSize].size}</strong></Form.Label>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingTop: "20px" }}>
                                        <Col>
                                            <Form.Label>Ngày Bắt Đầu</Form.Label>
                                            <Form.Control
                                                required
                                                type="date"
                                                name="ngayApDung"
                                                min={values.ngayApDung.slice(0, 10)}
                                                defaultValue={values.ngayApDung.slice(0, 10)}
                                                onChange={handleChange}
                                                isValid={touched.ngayApDung && !errors.ngayApDung}
                                                isInvalid={!!errors.ngayApDung}
                                            />
                                            <Form.Control.Feedback type="invalid" tooltip>
                                                {errors.ngayApDung}
                                            </Form.Control.Feedback>
                                        </Col>
                                        < Col >
                                            <Form.Label>Ngày Kết Thúc</Form.Label>
                                            <Form.Control
                                                required
                                                type="date"
                                                name="ngayHetHan"
                                                min={values.ngayHetHan.slice(0, 10)}
                                                defaultValue={values.ngayHetHan.slice(0, 10)}
                                                onChange={handleChange}
                                                isValid={touched.ngayHetHan && !errors.ngayHetHan}
                                                isInvalid={!!errors.ngayHetHan}
                                            />
                                            <Form.Control.Feedback type="invalid" tooltip>
                                                {errors.ngayHetHan}
                                            </Form.Control.Feedback>
                                        </Col>
                                        < Col >
                                            <Form.Label>Phần Trăm Giảm</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="phanTramGiam"
                                                min="0"
                                                max="100"
                                                value={values.phanTramGiam}
                                                onChange={handleChange}
                                                isValid={touched.phanTramGiam && !errors.phanTramGiam}
                                                isInvalid={!!errors.phanTramGiam}
                                            />
                                            <Form.Control.Feedback type="invalid" tooltip>
                                                {errors.phanTramGiam}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingTop: "20px" }}>
                                        <Col>
                                            <Form.Label>Mô Tả</Form.Label>
                                            <Form.Control name="moTa" defaultValue={values.moTa} onChange={handleChange} as="textarea" aria-label="With textarea"
                                                isValid={touched.moTa && !errors.moTa}
                                                isInvalid={!!errors.moTa}
                                            />
                                            <Form.Control.Feedback type="invalid" tooltip>
                                                {errors.moTa}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                </Row>
                                <Button type="submit" variant="success" style={{ marginTop: "15px", float: "right" }} > Chỉnh Sửa Khuyến Mãi</Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Huỷ</Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}
