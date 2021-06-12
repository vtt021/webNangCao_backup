import React from 'react'
import SearchIcon from './images/SearchIcon.png'
import _ from './SearchBar.css'
import { Button, Form, FormControl, Image, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './SearchBar.css';

const search = (item) => {
    alert(item)
}


export default function Searchbar(props) {
    return (
        <Form inline>
            <FormControl placeholder="Search..." id = 'searchText'/>
            <Button>
                <Image src={SearchIcon}/>
            </Button>{''}
        </Form>
    )
}