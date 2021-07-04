import React from 'react';
import { Container, Col } from 'react-bootstrap'
import MyTab from './images/MyTab'
import Header from '../common/header/header.js'
import Carousel from '../common/carousel/carousel.js'
export default function Home(props) {
    return (
        <Container fluid >
            <Header/>
            <Carousel/>
            <MyTab/>
            <MyTab/>
            <MyTab/>
        </Container>

    )
}
