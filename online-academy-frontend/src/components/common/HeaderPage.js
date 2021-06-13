import React from 'react'
import Searchbar from './SearchBar'
import HeaderImage from './images/HeaderImage.jpg'
import AppLogo from './images/AppLogo.png'
import _ from './HeaderPage.css'
import { Container, Row, Col, Image, Button, Navbar, Nav, FormControl, Form, NavDropdown } from 'react-bootstrap'
import DropDown from './DropDown'
import MyTab from '../home/images/MyTab'


export default function HeaderPage(props) {
    return (
        <Container fluid>
            <Row className="Container-1">
                <Image className="HeaderImg" src={HeaderImage} />
            </Row>

            <br />
            <Navbar bg="dark" variant="dark" className='justify-content-between'>
                <Navbar.Brand href="/">
                    <Image src={AppLogo} className="AppLogo" />
                    a
                </Navbar.Brand>
                <NavDropdown title="Categories" id="NavDropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown.Divider />
                <Searchbar />
                <Button type="button">Log in</Button>
                <Button type="button">Sign up</Button>

            </Navbar>

            <br />
            
        </Container>
    )
}
