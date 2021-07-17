import React from 'react';
import { Container, } from 'react-bootstrap'
import Header from '../common/header/header.js'
import HotCourese from './child_component/hotCourses.js'
import HorizonalTab from './child_component/tab/horizonalTab.js'
import Footer from '../common/footer/footer.js';
export default function Home(props) {
    return (
        <Container fluid >
            <Header />
            <HotCourese />
            <HorizonalTab />
            <Footer/>
        </Container>
    )
}
