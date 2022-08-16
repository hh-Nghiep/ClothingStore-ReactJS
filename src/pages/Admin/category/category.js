import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

export default function Category() {
    const [listCategory, setListCategory] = useState([]);
    const [nameCategory, setNameCategory] = useState();

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [infoBeforUpdate, setInfoBeforUpdate] = useState();
    const [show1, setShow1] = useState(false);
    const handleShow1 = (item) => { setInfoBeforUpdate(item); setShow1(true) };
    const handleClose1 = () => setShow1(false);

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
        getAllCategory();
    }

    const getAllCategory = async () => {
        const response = await axios({
            method: 'get',
            url: `http://localhost:3001/cates`
        }).then((data) => {
            setListCategory(data.data?.[0])
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
        getAllCategory();
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
        getAllCategory();
    }

    useEffect(() => {
        getAllCategory();
    }, [listCategory.length])

    return (
        <>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {/* Begin Page Content */}
                    <div className="container-fluid">
                        {/* Page Heading */}
                        <h1 className="h3 mb-2 text-gray-800">Quản Lý Thể Loại</h1>
                        {/* DataTales Example */}
                        <div className="card shadow mb-4">
                            <div className="card-header py-3" style={{ marginBottom: "5px" }}>
                                <h6 className="m-0 font-weight-bold text-primary">
                                    Tất Cả Thể Loại
                                    <Button variant="success" onClick={handleShow} style={{ position: "absolute", top: "8px", right: "10px" }}>Thêm Thể Loại</Button>
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
                                                <th>Mã Thể Loại</th>
                                                <th>Tên Thể Loại</th>
                                                <th>Số Lượng Sản Phẩm</th>
                                                <th>Thao Tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listCategory.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.maTL}</td>
                                                        <td>{item.tenTL}</td>
                                                        <td>{item.SLSanPham}</td>
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


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Thể Loại</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="tenTL">Nhập Tên Thể Loại</Form.Label>
                    <Form.Control
                        type="text"
                        id="tenTL"
                        onChange={e => setNameCategory(e.target.value)}
                    />
                    <Button variant="warning" style={{ marginTop: "20px" }}>Kiểm Tra</Button>{' '}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Huỷ
                    </Button>
                    <Button variant="success" onClick={addCategory}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Thể Loại</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="tenCu">Tên Cũ</Form.Label>
                    <Form.Control
                        disabled
                        type="text"
                        id="tenCu"
                        value={infoBeforUpdate?.tenTL}
                    />
                    <Form.Label htmlFor="tenMoi">Tên Mới</Form.Label>
                    <Form.Control
                        type="text"
                        id="tenMoi"
                        onChange={e => {
                            var temp = infoBeforUpdate;
                            temp.tenTL = e.target.value
                            setInfoBeforUpdate(temp)
                        }}
                    />
                    <Button variant="warning" style={{ marginTop: "20px" }}>Kiểm Tra</Button>{' '}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Huỷ
                    </Button>
                    <Button variarfnt="success" onClick={() => updateCategory()}>
                        Chỉnh Sửa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
