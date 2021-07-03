import React from 'react';
import { Container, Col } from 'react-bootstrap'
import HeaderPage from '../common/HeaderPage'
import MyTab from './images/MyTab'
import Header from '../common/header/header.js'

export default function Home(props) {
    return (
        <Container fluid >
            <Header/>

            <MyTab/>
            <MyTab/>
            <MyTab/>
        </Container>

    )
}
