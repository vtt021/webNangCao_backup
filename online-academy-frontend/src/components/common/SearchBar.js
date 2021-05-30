import React from 'react'
import SearchIcon from './images/SearchIcon.png'
import _ from './SearchBar.css'
import { Button, Form, FormControl, Image, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './SearchBar.css';

const search = (item) => {
    alert(item)
}

export default function Searchbar(props) {
    return (
        <Form className="container">
            <Row>
                <Col className='input' sm={8}>
                    <FormControl placeholder="Search..." />
                </Col>
                <Col sm={2}>
                    <Button>
                        <Image src={SearchIcon} />
                    </Button>{''}
                </Col>
            </Row>

        </Form>



    )
}