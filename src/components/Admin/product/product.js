import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik } from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { DOMAIN } from '~/util/setting/config'

export default function Wrapper() {
    const { product } = useSelector(state => state.ProductReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getGender = (id) => {
        if (id === "1") {
            return (<td>Nam</td>)
        } else {
            return (<td>Nữ</td>)
        }
    }

    const getProduct = async () => {
        const response = await axios({
            method: 'get',
            url: `${DOMAIN}/product`,
            data: product
        }).then((data) => {
            dispatch({
                type: "GET_ALL_PRODUCT",
                product: data.data
            })
        }).catch((err) => {
            console.log("err")
        })
    }
    useEffect(() => {
        getProduct();
    }, [])



    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        username: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.string().required(),
        file: yup.mixed().required(),
        terms: yup.bool().required().oneOf([true], 'terms must be accepted'),
    });

    return (
        <>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {/* Begin Page Content */}
                    <div className="container-fluid">
                        {/* Page Heading */}
                        <h1 className="h3 mb-2 text-gray-800">Manager Product</h1>
                        {/* DataTales Example */}
                        <div className="card shadow mb-4">
                            <div className="card-header py-3" style={{ marginBottom: "5px" }}>
                                <h6 className="m-0 font-weight-bold text-primary">
                                    DataTables Example
                                    <Button variant="success" onClick={handleShow} style={{ position: "absolute", top: "8px", right: "10px" }}>Add Product</Button>
                                </h6>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table
                                        className="table table-bordered"
                                        id="dataTable"
                                        width="100%"
                                        cellSpacing={0}
                                    >
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Discount</th>
                                                <th>Description</th>
                                                <th>Gender</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td><img className="img-fluid" src={item.thumbnail} alt='true' style={{ width: "200px" }} /></td>
                                                        <td>{item.title}</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.discount}</td>
                                                        <td>{item.description}</td>
                                                        {getGender(`${item.gender_ID}`)}
                                                        <td>
                                                            <FontAwesomeIcon icon={faPenToSquare} style={{ color: "green", paddingRight: "10px", cursor: "pointer" }} />
                                                            {' '}
                                                            <FontAwesomeIcon icon={faTrash} style={{ color: "red", cursor: "pointer" }} />
                                                        </td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /.container-fluid */}
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size={'xl'}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={schema}
                        onSubmit={console.log}
                        initialValues={{
                            firstName: 'Mark',
                            lastName: 'Otto',
                            username: '',
                            city: '',
                            state: '',
                            zip: '',
                            file: null,
                            terms: false,
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            isValid,
                            errors,
                        }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group
                                        as={Col}
                                        md="4"
                                        controlId="validationFormik101"
                                        className="position-relative"
                                    >
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            isValid={touched.firstName && !errors.firstName}
                                        />
                                        <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        md="4"
                                        controlId="validationFormik102"
                                        className="position-relative"
                                    >
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            isValid={touched.lastName && !errors.lastName}
                                        />

                                        <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationFormikUsername2">
                                        <Form.Label>Username</Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Username"
                                                aria-describedby="inputGroupPrepend"
                                                name="username"
                                                value={values.username}
                                                onChange={handleChange}
                                                isInvalid={!!errors.username}
                                            />
                                            <Form.Control.Feedback type="invalid" tooltip>
                                                {errors.username}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group
                                        as={Col}
                                        md="6"
                                        controlId="validationFormik103"
                                        className="position-relative"
                                    >
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="City"
                                            name="city"
                                            value={values.city}
                                            onChange={handleChange}
                                            isInvalid={!!errors.city}
                                        />

                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.city}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        md="3"
                                        controlId="validationFormik104"
                                        className="position-relative"
                                    >
                                        <Form.Label>State</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="State"
                                            name="state"
                                            value={values.state}
                                            onChange={handleChange}
                                            isInvalid={!!errors.state}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.state}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        md="3"
                                        controlId="validationFormik105"
                                        className="position-relative"
                                    >
                                        <Form.Label>Zip</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Zip"
                                            name="zip"
                                            value={values.zip}
                                            onChange={handleChange}
                                            isInvalid={!!errors.zip}
                                        />

                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.zip}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Form.Group className="position-relative mb-3">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        required
                                        name="file"
                                        onChange={handleChange}
                                        isInvalid={!!errors.file}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.file}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="position-relative mb-3">
                                    <Form.Check
                                        required
                                        name="terms"
                                        label="Agree to terms and conditions"
                                        onChange={handleChange}
                                        isInvalid={!!errors.terms}
                                        feedback={errors.terms}
                                        feedbackType="invalid"
                                        id="validationFormik106"
                                        feedbackTooltip
                                    />
                                </Form.Group>
                                <Button type="submit">Submit form</Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" type="submit">Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
