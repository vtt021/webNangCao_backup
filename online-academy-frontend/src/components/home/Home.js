import React from 'react';
import { Container, Col } from 'react-bootstrap'
import HeaderPage from '../common/HeaderPage'
import MyTab from './images/MyTab'

export default function Home(props) {
    return (
        <Container fluid >
            <HeaderPage />
            <p>Top new</p>
            <MyTab/>
            <p>Top view</p>
            <MyTab/>
            <p>Top categories</p>
            <MyTab/>
        </Container>

    )
}
