import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faKey } from '@fortawesome/free-solid-svg-icons'
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

export default function Order() {
    const [listOrder, setListOrder] = useState([]);

    const status = [
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
                Đơn Hàng Đã Được Duyệt
            </Alert>
        },
        {
            status: 2,
            title: <Alert variant={'info'} style={{ width: "fit-content" }}>
                Đang Giao Hàng
            </Alert>
        },
        {
            status: 3,
            title: <Alert variant={'info'} style={{ width: "fit-content" }}>
                Giao Hàng Thành Công
            </Alert>
        },
    ]


    const updateStatusOrder = async (idOrder, statusOrder) => {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3001/order/update`,
            data: {
                trangThai: statusOrder,
                maDH: idOrder
            }
        }).then((data) => {
            alert("Cập Nhật Thành Công")
        }).catch((err) => {
            console.log("err")
        })
        getListOrder();
    }

    const getAction = (id, status) => {
        if (status == 0) {
            return <Button variant="danger" onClick={() => updateStatusOrder(id, -1)}>Huỷ Đơn</Button>
        } else if (status == 2) {
            return <Button variant="warning" onClick={() => updateStatusOrder(id, 3)}>Đã Nhận Hàng</Button>
        }
    }

    const getListOrder = async (id) => {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3001/order/id`,
            data: {
                maNguoiDung: JSON.parse(localStorage.getItem("infoUser")).maNguoiDung
            }
        }).then((data) => {
            setListOrder(data.data[0]);
        }).catch((err) => {
            console.log("err")
        })
    }


    useEffect(() => {
        getListOrder();
        console.log(listOrder)
    }, [listOrder?.length])


    return (
        <>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {/* Begin Page Content */}
                    <div className="container-fluid">
                        {/* Page Heading */}
                        <h1 className="h3 mb-2 text-gray-800">Đơn Hàng Của Bạn</h1>
                        {/* DataTales Example */}
                        <div className="card shadow mb-4">
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
                                        <tbody>
                                            {listOrder?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.maDH}</td>
                                                        <td>{item.soLuong || 0}</td>
                                                        <td>{item.ngayTao.slice(0, 10)}</td>
                                                        <td>{item.gia || 0}</td>
                                                        <td >{status[item.trangThai + 1].title}</td>
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
        </>
    )
}
