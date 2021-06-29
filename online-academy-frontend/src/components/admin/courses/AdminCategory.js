import {
    Navbar, Nav, NavItem, Button, Glyphicon, NavDropdown, Form, FormControl, Alert, Container,
    Row, Table
} from 'react-bootstrap';

import React, { cloneElement, useEffect, useState } from 'react';
import AdminHeader from '../common/AdminHeader';
import AdminCategoryInfo from './AdminCategoryInfo';
import axios from 'axios';


export default function AdminCategory(props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategory = async() => {
            await axios.get('http://localhost:3001/api/categories')
            .then(res => {
                setCategories(res.data);
            })
        }

        const init = async() => {
            getCategory();
        }

        init();
    
    }, []);

    const setupData = (categories) => {
        let ret = [];

        for(let i = 0; i < categories.length; i++) {
            ret.push(<AdminCategoryInfo data={{index: i + 1, categoryName: categories[i].categoryName, lastUpdated: categories[i].lastUpdated}}>

            </AdminCategoryInfo>);

        }
        return ret;
    }

    return (
        <Container fluid>
            <AdminHeader />
            <Row style={{ margin: '20px' }}>
                <Table bordered hover size="sm" >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên lĩnh vực</th>
                            <th>Cập nhật lần cuối</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <AdminCategoryInfo data={{index: '1', categoryName:'abc', lastUpdated: '12/2/2020'}}></AdminCategoryInfo>
                        <AdminCategoryInfo data={{index: '1', categoryName:'abc', lastUpdated: '12/2/2020'}}></AdminCategoryInfo>
                        <AdminCategoryInfo data={{index: '1', categoryName:'abc', lastUpdated: '12/2/2020'}}></AdminCategoryInfo>
                        <AdminCategoryInfo data={{index: '1', categoryName:'abc', lastUpdated: '12/2/2020'}}></AdminCategoryInfo>
                        <AdminCategoryInfo data={{index: '1', categoryName:'abc', lastUpdated: '12/2/2020'}}></AdminCategoryInfo>     */}
                        {
                            setupData(categories)
                        }   
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}


