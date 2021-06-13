import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Tab, Tabs } from 'react-bootstrap'
const renderTags = (listTitle) => {
    return (listTitle.map((title) => (
        <Tab eventKey={title.categoryName} title={title.categoryName}>
            <h1>{title.categoryName}</h1>
        </Tab>
    )))
}

export default function MyTab(props) {
    const [listTitle, setListTitle] = useState([{ id: 1, categoryName: 'aaa' }])
    useEffect(() => {
        axios.get("http://localhost:3001/api/categories").then(res => {
            const listTitle = res.data;
            setListTitle(listTitle);
        })
            .catch(error => console.log(error));
    }, []);
    const [key, setKey] = useState(listTitle[0].categoryName);
    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}>
            {renderTags(listTitle)}
        </Tabs>
    )
}
