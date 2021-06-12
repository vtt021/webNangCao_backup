import React from 'react'
import Searchbar from './SearchBar'
import HeaderImage from './images/HeaderImage.jpg'
import AppLogo from './images/AppLogo.png'
import _ from './HeaderPage.css'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import DropDown from './DropDown'


export default function HeaderPage(props) {
    return (
        <Container fluid>
            <Row className="Container-1">
                <Image className="HeaderImg" src={HeaderImage} />
            </Row>
            <Row style={{marginTop:"10px"}}>
                <Col xs={1}>
                    <img className="AppLogo" src={AppLogo} />
                </Col>
                <Col xs = {2}>
                    <DropDown />
                </Col>
                <Col xs = {5}>
                    <Searchbar />
                </Col>
                <Col xs = {2}>
                    <Button>Log in</Button>
                </Col>
                <Col xs = {2}>
                    <Button>Sign up</Button>
                </Col>
            </Row>
        </Container>
    )
}
