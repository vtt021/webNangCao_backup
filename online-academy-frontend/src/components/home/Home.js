import React from 'react'
import { Container, Col } from 'react-bootstrap'
import HeaderPage from '../common/HeaderPage'
import MyTab from './images/MyTab'
import Slideshow from './SlideShow'

const listTitle = ['React','C++','C#','Java']

export default function Home(props) {
    return (
        <Container fluid >
            <HeaderPage />
            <p>Top new</p>
            <MyTab listTitle = {listTitle}/>
            <p>Top view</p>
            <MyTab listTitle = {listTitle}/>
            <p>Top categories</p>
            <MyTab listTitle = {listTitle}/>
        </Container>

    )
}
