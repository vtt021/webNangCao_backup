import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Slideshow from '../SlideShow'

export default function MyTab(props) {
    var listTitle = props.listTitle
    const [key, setKey] = useState(listTitle[0]);
    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}>
            {listTitle.map((title) => (
                <Tab eventKey={title} title={title}>
                    <h1>{title}</h1>
                </Tab>
            ))}
        </Tabs>
    )
}
