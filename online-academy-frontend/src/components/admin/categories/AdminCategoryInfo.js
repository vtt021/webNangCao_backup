import {
    Navbar, Nav, NavItem, Button, Glyphicon, NavDropdown, Form, FormControl, Alert, Container,
    Row, Table
} from 'react-bootstrap';

import React, { useState, useEffect } from 'react';
import AdminHeader from '../common/AdminHeader';


export default function AdminCategoryInfo(props) {
    useEffect(() => {
        // setDeleted(props.data.isDeleted)
    }, [])

    return (
        <tr>
            <td>{props.data.index}</td>
            <td>{props.data.categoryName}</td>
            <td>{props.data.lastUpdated}</td>

            <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button variant='success'>Chi tiết</Button>
                <Button variant='primary'>Đổi tên</Button>
                <Button variant='danger'>Xóa</Button>
            </td>
        </tr>
    )
}


