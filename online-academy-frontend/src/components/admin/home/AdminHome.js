import React,{useEffect,useState} from 'react'
import Button from '@material-ui/core/Button';
import Header from '../../common/header/header';
import AdminHeader from '../common/AdminHeader';
export default function AdminHome(props) {
    const [auth, setAuth] = useState({"role":2})

    useEffect(()=>{
        setAuth(JSON.parse(localStorage.getItem("auth")))
    },[localStorage.getItem("auth")])

    useEffect(() => {
        if (auth===null||auth.role != 2) 
        {
            window.location.replace("/")
        }
    }, [auth])
    return (
        <td style={{ display: 'flex',direction: 'column', justifyContent: 'space-evenly',flexDirection:'column' }}>
            <Header />
            <AdminHeader/>
            <Button href="/admin/categories" variant='contained' color='secondary'>Categories</Button>
            <Button href="/admin/sub-categories" variant='contained' color='inherit'>Sub Categories</Button>
            <Button href="/admin/users" variant='contained' color='primary'>Users</Button>
            <Button href="/admin/courses" variant='contained' color='primary'>Courses</Button>
            {/* <Button variant='contained'>Xóa</Button> */}
        </td>
    )
}
