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
    const [statusCategory, setStatusCategory] = useState(1);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [infoBeforUpdate, setInfoBeforUpdate] = useState();
    const [nameAfterUpdate, setNameAfterUpdate] = useState();
    const [show1, setShow1] = useState(false);
    const handleShow1 = (item) => { setInfoBeforUpdate(item); setShow1(true) };
    const handleClose1 = () => setShow1(false);

    const updateStatusCategory = async (trangThai, maTL) => {
        var text = (trangThai === 0 ? 'Xoá Thể Loại ?' : "Kích Hoạt Thể Loại?");
        if (window.confirm(text) === true) {
            axios({
                method: 'delete',
                url: `http://localhost:3001/cate/status`,
                data: {
                    trangThai: trangThai,
                    maTL: maTL,
                }
            }).then((data) => {
            }).catch((err) => {
                console.log("err")
            })
        }
        window.location.href = '/admin/category'
    }

    const getAllCategory = async () => {
        await axios({
            method: 'get',
            url: `http://localhost:3001/cate/${statusCategory}`
        }).then((data) => {
            setListCategory(data.data?.[0])
        }).catch((err) => {
            console.log("err")
        })
    }

    const addCategory = async () => {
        axios({
            method: 'post',
            url: `http://localhost:3001/cate/add`,
            data: {
                tenTL: nameCategory
            }
        }).then((data) => {
            if (data.data === 0) {
                alert("Tên Thể Loại Đã Tồn Tại !!!")
                return;
            } else {
                setStatusCategory(0)
                setStatusCategory(1)
                handleClose();
            }
        }).catch((err) => {
            console.log("err")
        })

    }

    const updateCategory = async () => {
        axios({
            method: 'post',
            url: `http://localhost:3001/cate/update`,
            data: {
                tenTL: nameAfterUpdate,
                maTL: infoBeforUpdate.maTL
            }
        }).then((data) => {
            if (data.data === 0) {
                alert("Tên Thể Loại Đã Tồn Tại !!!")
                return;
            } else {
                setNameAfterUpdate("");
                handleClose1();
            }
        }).catch((err) => {
            console.log("err")
        })
    }

    useEffect(() => {
        getAllCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listCategory.length, statusCategory, show1, show])

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
                                    <Form.Select onChange={e => setStatusCategory(parseInt(e.target.value))} name="status" style={{ width: "300px" }}>
                                        <option value="1">Thể Loại Đang Bán</option>
                                        <option value="0">Thể Loại Ngưng Bán</option>
                                    </Form.Select>
                                    <Button variant="success" onClick={handleShow} style={{ position: "absolute", top: "8px", right: "10px" }}>Thêm Thể Loại Mới</Button>
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
                                                            {statusCategory == "1" ?
                                                                (<><button onClick={() => handleShow1(item)} style={{ marginRight: "10px" }}><FontAwesomeIcon icon={faPenToSquare} style={{ color: "green", cursor: "pointer" }} /></button>
                                                                    {' '}
                                                                    <button onClick={() => updateStatusCategory(0, `${item.maTL}`)} ><FontAwesomeIcon icon={faTrash} style={{ color: "red", cursor: "pointer" }} /></button></>)
                                                                : (<Button variant="success" onClick={() => updateStatusCategory(1, `${item.maTL}`)}>Bán Lại</Button>)}
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
                        onChange={e => setNameCategory(((e.target.value.toLowerCase().replace(/  +/g, ' ')).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()).trim()).charAt(0).toUpperCase() + ((e.target.value.toLowerCase().replace(/  +/g, ' ')).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()).trim()).slice(1))}
                    />
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
                    <Modal.Title>Chỉnh Sửa Thể Loại</Modal.Title>
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
                            var temp = e.target.value;
                            temp = ((temp.toLowerCase().replace(/  +/g, ' ')).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()).trim()).charAt(0).toUpperCase() + ((temp.toLowerCase().replace(/  +/g, ' ')).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()).trim()).slice(1)
                            setNameAfterUpdate(temp)
                        }}
                    />
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
