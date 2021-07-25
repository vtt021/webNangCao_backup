import React from 'react'
import Button from '@material-ui/core/Button';
export default function AdminHome(props) {
    return (
        <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button href="/admin/categories" variant='contained' color='secondary'>Categories</Button>
            <Button href="/admin/users" variant='contained' color='primary'>Users</Button>
            {/* <Button variant='contained'>Xóa</Button> */}
        </td>
    )
}
