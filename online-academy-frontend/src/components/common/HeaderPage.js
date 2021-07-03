import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Searchbar from './SearchBar'
import HeaderImage from './images/HeaderImage.jpg'
import AppLogo from './images/AppLogo.png'
import _ from './HeaderPage.css'
import { Container, Row, Image, Button, Navbar, NavDropdown } from 'react-bootstrap'


const renderItems = (listCategories) => {
    return (listCategories.map((title) => (
        <NavDropdown.Item  href="#/action">
            {title.categoryName}
        </NavDropdown.Item >
    )))
}

export default function HeaderPage(props) {
    const [listCategories, setListCategories] = useState([{ id: 1, categoryName: 'aaa' }])
    useEffect(() => {
        console.log(localStorage.getItem("auth"))
        axios.get("http://localhost:3001/api/categories").then(res => {
            const listCategories = res.data;
            setListCategories(listCategories);
        })
            .catch(error => console.log(error));
    }, []);
    return (
        <Container fluid>
            {/* <Row className="Container-1">
                <Image className="HeaderImg" src={HeaderImage} />
            </Row> */}

            <br />
            <Navbar bg="dark" variant="dark" className='justify-content-between'>
                <Navbar.Brand href="/">
                    <Image src={AppLogo} className="AppLogo" />
                    My Academy
                </Navbar.Brand>
                <NavDropdown title="Categories" id="NavDropdown">
                    {renderItems(listCategories)}
                </NavDropdown>
                <NavDropdown.Divider />
                <Searchbar />
                <Button href="/login" type="button">Log in</Button>
                <Button href="/signup"type="button">Sign up</Button>

            </Navbar>

            <br />
            
        </Container>
    )
}
