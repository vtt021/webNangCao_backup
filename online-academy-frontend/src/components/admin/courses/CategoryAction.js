import React from 'react'
import Button from '@material-ui/core/Button';
export default function CategoryAction(props) {


    return (
        <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button variant='contained' color='secondary'>Chi tiết</Button>
            <Button variant='contained' color='primary'>Đổi tên</Button>
            <Button variant='contained'>Xóa</Button>
        </td>
    )
}
