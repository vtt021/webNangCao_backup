import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import userImage from '../common/images/potato.jpg'
import { Container, Row, Col, Image, Accordion, Card } from 'react-bootstrap'
import './Detail_page.css'
import Header from '../common/header/header.js'
import {ShowMoreText} from'./component/showMoreButton'


export default function DetailPage(props) {
    const id  = props.match.params.id

    return (
        
        <div>
            <h3>CategoryID: {id} </h3>
            <Header/>

            <Container>
                <Row >
                    <Col lg={4}>
                        <Image className='userImage' src={userImage}>
                        </Image>
                    </Col>
                    <Col lg={8}>
                        <div className='subjectsName'>
                            Khóa học về Khoai tây + 
                            {props.subjectName}
                        </div>
                        <ShowMoreText content='noi dung khoa hoc ne hihihi' />
                    </Col>

                </Row>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            <div>
                            <p className='nameLession'>Lession 1: What is potato?</p>
                            <p className='priceLession'>1 hour 25 min</p>
                            </div>
                            
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body className='detailInfomation'>Hello! I'm the body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            <div>
                            <p className='nameLession'>Lession 2: What is potato 222?</p>
                            <p className='priceLession'>1 hour 25 min</p>
                            </div>
                            
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body className='detailInfomation'>Hello! I'm the body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                            <div>
                            <p className='nameLession'>Lession 3: What is potato?</p>
                            <p className='priceLession'>1 hour 25 min</p>
                            </div>
                            
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body className='detailInfomation'>
                                    Hello! I'm the bodyHello! I'm the bodyHello! I'm the bodyHello! I'm the bodyHello! I'm the bodyHello! I'm the bodyHello! I'm the bodyHello! I'm the body
Hello! I'm the bodyHello! I'm the bodyHello! I'm the bodyHello! I'm the bodyHello! I'm the bodyHello! I'm the body
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="3">
                            <div>
                            <p className='nameLession'>Lession 4: What is potato?</p>
                            <p className='priceLession'>1 hour 25 min</p>
                            </div>
                            
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body className='detailInfomation'>Hello! I'm the body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    
                </Accordion>
       
            </Container>
        </div>

    )
}
