import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faTrash, faEye, faTruckFast, faBan } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Order() {
    const [listOrder, setListOrder] = useState([]);
    const [statusOrder, setStatusOrder] = useState(3);
    const [detailOrder, setDetailOrder] = useState([]);
    const [lgShow, setLgShow] = useState(false);

    const listStatusOrder = [
        {
            status: -1,
            title: <Alert variant={'danger'} style={{ width: "fit-content" }}>
                Thất Bại
            </Alert>
        },
        {
            status: 0,
            title: <Alert variant={'info'} style={{ width: "fit-content" }}>
                Đặt Hàng Thành Công
            </Alert>
        },
        {
            status: 1,
            title: <Alert variant={'info'} style={{ width: "fit-content" }}>
                Đang Giao Hàng
            </Alert>
        },
        {
            status: 2,
            title: <Alert variant={'info'} style={{ width: "fit-content" }}>
                Giao Hàng Thành Công
            </Alert>
        },
    ]

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

    const getDetailOrder = async (id) => {
        axios({
            method: 'get',
            url: `http://localhost:3001/order/detail/${id}`,
        }).then((data) => {
            setDetailOrder(data.data[0]);
            setLgShow(true);
        }).catch((err) => {
            console.log("err")
        })
    }

    const updateStatusOrder = async (idOrder, statusOrder2) => {
        if (statusOrder2 === -1) {
            axios({
                method: 'post',
                url: `http://localhost:3001/order/update`,
                data: {
                    maNVDuyet: JSON.parse(localStorage.getItem("infoUser")).maNguoiDung,
                    maDH: idOrder,
                    trangThai: statusOrder2,
                }
            }).then((data) => {
                alert("Cập Nhật Thành Công")
            }).catch((err) => {
                console.log("err")
            })
        } else if (statusOrder2 === 1) {
            axios({
                method: 'post',
                url: `http://localhost:3001/order/update`,
                data: {
                    maNVDuyet: JSON.parse(localStorage.getItem("infoUser")).maNguoiDung,
                    maDH: idOrder,
                    trangThai: statusOrder2,
                }
            }).then((data) => {
                alert("Cập Nhật Thành Công")
            }).catch((err) => {
                console.log("err")
            })
        } else if (statusOrder2 === 2) {
            axios({
                method: 'post',
                url: `http://localhost:3001/order/confirm`,
                data: {
                    maNVGiao: JSON.parse(localStorage.getItem("infoUser")).maNguoiDung,
                    maDH: idOrder,
                }
            }).then((data) => {
                alert("Cập Nhật Thành Công")
            }).catch((err) => {
                console.log("err")
            })
        }

        setStatusOrder(statusOrder2);
    }

    const getAction = (id, status) => {
        if (status === '0') {
            return (
                <>
                    <button onClick={() => updateStatusOrder(id, 1)} title={'Đã Lên Đơn'}><FontAwesomeIcon icon={faClipboardCheck} style={{ color: "green", cursor: "pointer" }} /></button>
                    {' '}
                    <button onClick={() => { getDetailOrder(id) }} title={'Xem Đơn Hàng'}><FontAwesomeIcon icon={faEye} style={{ color: "black", cursor: "pointer" }} /></button>
                    {' '}
                    <button onClick={() => updateStatusOrder(id, -1)} title={'Huỷ Đơn'}><FontAwesomeIcon icon={faTrash} style={{ color: "red", cursor: "pointer" }} /></button>
                </>
            )
        } else if (status === '1') {
            return (
                <>
                    <button onClick={() => updateStatusOrder(id, 2)} title={'Xác Nhận Đã Giao'}><FontAwesomeIcon icon={faTruckFast} style={{ color: "green", cursor: "pointer" }} /></button>
                    {' '}
                    <button onClick={() => updateStatusOrder(id, -1)} title={'Giao Thất Bại'}><FontAwesomeIcon icon={faBan} style={{ color: "red", cursor: "pointer" }} /></button>
                </>
            )
        } else {
            return <button onClick={() => { getDetailOrder(id) }} title={'Xem Đơn Hàng'}><FontAwesomeIcon icon={faEye} style={{ color: "black", cursor: "pointer" }} /></button>
        }
    }

    const getListOrder = async () => {
        if (statusOrder !== 3) {
            axios({
                method: 'get',
                url: `http://localhost:3001/order/status/${statusOrder}`,
            }).then((data) => {
                setListOrder(data.data[0]);
            }).catch((err) => {
                console.log("err")
            })
        } else {
            axios({
                method: 'get',
                url: `http://localhost:3001/orders`,
            }).then((data) => {
                setListOrder(data.data[0]);
            }).catch((err) => {
                console.log("err")
            })
        }

    }

    useEffect(() => {
        getListOrder();
        console.log(detailOrder?.[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusOrder, listOrder?.length, detailOrder])

    const formatPrice = (price) => {
        return Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(price)
    }

    return (
        <>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {/* Begin Page Content */}
                    <div className="container-fluid">
                        {/* Page Heading */}
                        <h1 className="h3 mb-2 text-gray-800">Quản Lý Đơn Hàng</h1>
                        {/* DataTales Example */}
                        <div className="card shadow mb-4">
                            <div className="card-header py-3" style={{ marginBottom: "5px" }}>
                                <h6 className="m-0 font-weight-bold text-primary">
                                    <Form.Select onChange={e => setStatusOrder(parseInt(e.target.value))} name="status" style={{ width: "300px" }}>
                                        <option value="3">Toàn Bộ</option>
                                        <option value="0">Đặt Hàng Thành Công</option>
                                        <option value="1">Đang Giao</option>
                                        <option value="2">Thành Công</option>
                                        <option value="-1">Thất Bại</option>
                                    </Form.Select>
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
                                                <th>Mã Đơn Hàng</th>
                                                <th>Số Lượng Sản Phẩm</th>
                                                <th>Ngày Tạo Đơn</th>
                                                <th>Tổng Tiền</th>
                                                <th>Trạng Thái</th>
                                                <th style={{ width: "155px" }}>Thao Tác</th>
                                            </tr>
                                        </thead>
                                        <tbody className='cssbutton'>
                                            {listOrder?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.maDH}</td>
                                                        <td>{item.soLuong || 0}</td>
                                                        <td>{item.ngayTao.slice(0, 10)}</td>
                                                        <td>{item.gia || 0}</td>
                                                        <td >{listStatusOrder[item.trangThai + 1].title}</td>
                                                        <td>
                                                            {getAction(`${item.maDH}`, `${item.trangThai}`)}
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
                </div>
            </div>

            <Modal
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        [{detailOrder?.[0]?.maDH}]
                        {' -- '}
                        Ngày Tạo: <u>{detailOrder?.[0]?.ngayTao.slice(0, 10)}</u>
                        {' -- '}
                        Mã NV Duyệt: <u>{detailOrder?.[0]?.maNVDuyet}</u>
                        <br />
                        <br />
                        {' '}Ngày Giao: <u>{detailOrder?.[0]?.ngayGiao.slice(0, 10)}</u>
                        {' -- '}
                        Mã NV Giao: <u>{detailOrder?.[0]?.maNVGiao}</u>
                        {' ------ '}
                        <b>
                            <u>
                                Tổng Tiền : {formatPrice(detailOrder.reduce((total, item) =>
                                    total += (item.gia * item.soLuong), 0
                                ))}
                            </u>
                        </b>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Hình Ảnh - Mã SP</th>
                                <th>Tên SP</th>
                                <th>Giá</th>
                                <th>Size</th>
                                <th>Số Lượng</th>
                                <th>Mã KM</th>
                                <th>Thành Tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailOrder.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{ fontSize: "20px", fontWeight: "bold" }}>{index}</td>
                                        <td style={{ fontSize: "20px", fontWeight: "bold" }}><img src={item.hinhAnh} alt="imageProduct" style={{ width: "150px" }} /> - {item.maSP}</td>
                                        <td>{item.tenSP}</td>
                                        <td>{formatPrice(item.gia)}</td>
                                        <td>{listSize[`${item.maSize - 1}`].size}</td>
                                        <td>{item.soLuong}</td>
                                        <td></td>
                                        <td>{formatPrice(item.gia * item.soLuong)}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table>
                </Modal.Body>

                <Modal.Header>
                    <Modal.Title>

                    </Modal.Title>
                </Modal.Header>
            </Modal>
        </>
    )
}
