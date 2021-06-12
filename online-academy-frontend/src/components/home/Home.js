import React from 'react'
import { Container, Col } from 'react-bootstrap'
import HeaderPage from '../common/HeaderPage'
import Slideshow from './SlideShow'

export default function Home(props) {
    return (
        <Container fluid>
            <Col style={{width: "max-content"}}>
                <HeaderPage />
            </Col>

            <Col>
                <Slideshow />
            </Col>
        </Container>

    )
}
