import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const renderItems = (listCategories) => {
    return (listCategories.map((title) => (
        <Dropdown.Item href="#/action">
            {title.categoryName}
        </Dropdown.Item>
    )))
}

export default function DropDown(props) {
    const [listCategories, setListCategories] = useState([{ id: 1, categoryName: 'aaa' }])
    useEffect(() => {
        axios.get("http://localhost:3001/api/categories").then(res => {
            const listCategories = res.data;
            setListCategories(listCategories);
        })
            .catch(error => console.log(error));
    }, []);
    return (
        <Dropdown
            onMouseLeave={() => setShowDropdown(false)}
            onMouseOver={() => setShowDropdown(true)}
            onClick={() => { setShowDropdown(false) }}
            style={{ width: '166px' }}>
            <Dropdown.Toggle
                className="main-style"
                id="dropdown-basic">
                Categories
            </Dropdown.Toggle>

            <Dropdown.Menu show={showDropdown}>
                {renderItems(listCategories)}
            </Dropdown.Menu>
        </Dropdown>
    )
}