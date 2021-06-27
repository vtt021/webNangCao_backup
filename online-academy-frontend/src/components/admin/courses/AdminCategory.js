import {
    Navbar, Nav, NavItem, Button, Glyphicon, NavDropdown, Form, FormControl, Alert, Container,
    Row, Table
} from 'react-bootstrap';

import React, { useState } from 'react';
import AdminHeader from '../common/AdminHeader';
import AdminCategoryInfo from './AdminCategoryInfo';


export default function AdminCategory(props) {
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
                        <AdminCategoryInfo data={{index: '1', categoryName:'abc', lastUpdated: '12/2/2020'}}></AdminCategoryInfo>
                        <AdminCategoryInfo data={{index: '1', categoryName:'abc', lastUpdated: '12/2/2020'}}></AdminCategoryInfo>
                        <AdminCategoryInfo data={{index: '1', categoryName:'abc', lastUpdated: '12/2/2020'}}></AdminCategoryInfo>
                        <AdminCategoryInfo data={{index: '1', categoryName:'abc', lastUpdated: '12/2/2020'}}></AdminCategoryInfo>
                        <AdminCategoryInfo data={{index: '1', categoryName:'abc', lastUpdated: '12/2/2020'}}></AdminCategoryInfo>
 
                       
                    </tbody>
                </Table>
            </Row>
        </Container>

    )
}


