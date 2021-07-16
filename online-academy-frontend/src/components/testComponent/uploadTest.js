import React from 'react'
import { Container, Col, Row, Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayerExample from './component/uploadVideo';

export default function uploadTest(props) {
    return (
        <div>
            {/* <link rel="stylesheet" href="/css/video-react.css" /> */}
            {/* <Image className='userImage' src={userImage}>
                </Image> */}
            <Container>
                <Row>
                    <Col sm={8}>
                        <Image className='userImage'
                            src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350">
                        </Image>
                    </Col>
                    <Col sm={4}>
                        <Button
                            variant="primary"
                        //onClick={}
                        >
                            Upload Image
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm>
                    <PlayerExample/>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}
