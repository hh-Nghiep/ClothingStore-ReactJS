import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios'
import { DOMAIN } from '~/util/setting/config';

export default function Account() {
    const [validated, setValidated] = useState(false);
    const [infoUser, setInfoUser] = useState([]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const getInfoUser = async (id) => {
        await axios({
            method: 'get',
            url: `${DOMAIN}/users/${id}`,
        }).then((data) => {
            setInfoUser(data.data)
        }).catch((err) => {
            console.log("err")
        })
    }
    useEffect(() => {
        getInfoUser(1);
        console.log(infoUser);
    }, [])

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ width: "100%", padding: "100px 40px 0 40px" }}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Full name"
                        defaultValue={infoUser.fullname}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>User name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Role"
                        defaultValue={infoUser.role_id}
                        disabled
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="Email">@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            aria-describedby="inputGroupPrepend"
                            defaultValue={infoUser.email}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>Adress</Form.Label>
                    <Form.Control type="text" defaultValue={infoUser.address} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" defaultValue={infoUser.phone} required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid state.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>PassWord</Form.Label>
                    <Form.Control type="text" placeholder="PassWord" defaultValue="*********" />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid zip.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit">Save Info</Button>
        </Form>
    );
}
