import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { FormControl, MenuItem } from '@material-ui/core';
import { getDate } from 'date-fns';
import { formatDateTime } from '../../../utils/helpers';
import Refreshtoken from '../../../refreshToken';
import Deleteaction from './DeleteAction';
let stt = 0;
const columns = [
    { id: 'stt', label: '#', minWidth: 10 },
    { id: 'name', label: 'Tên', minWidth: 150 },
    { id: 'email', label: 'email', minWidth: 70 },
    { id: 'usersRole', label: 'Phân hệ', minWidth: 80 },
    { id: 'last', label: 'Cập nhật lần cuối', minWidth: 150 },
    { id: 'deleted', label: '', minWidth: 50 },
];

function createData(_id,name, email, role, lastUpdated) {
    stt += 1;
    let id = _id;
    let usersRole;
    if(role===0){
        usersRole="Học viên"
    }else if(role === 1){
        usersRole="Giáo viên"
    }else{
        usersRole="Quản trị viên"
    }
    let last = formatDateTime(new Date(lastUpdated)).toLocaleString()
    let deleted = (<Deleteaction id = {_id}/>)
    return { stt, name, email, usersRole, last ,deleted};
}

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
}))(TableCell);

const useStyles = makeStyles({
    root: {
        margin: '5% 2% 10% 2%',
    },
    container: {
        maxWidth: '100%',
    },
});

const useStyles1 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = event => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = event => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = event => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = event => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function AdminUser({projects}) {
    const [auth,setAuth] = useState(JSON.parse(localStorage.getItem("auth")))
    useEffect(()=>{
        setAuth(JSON.parse(localStorage.getItem("auth")))
    },[localStorage.getItem("auth")])

    useEffect(() => {
        if (auth===null||auth.role != 2) 
        {
            window.location.replace("/")
        }
    }, [auth])
    const [data,setData] = useState([]);
    
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, _] = useState(5);
    const [rows, setRows] = useState(data)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const [users, setUser] = useState([]);
    useEffect(() => {
        Refreshtoken()
        setAuth(JSON.parse(localStorage.getItem("auth")))
        const getUsers = async() => {
            await axios.get('http://localhost:3001/api/users',{
                headers:{
                    "x-access-token":auth.accessToken
                }
            })
            .then(res => {
                console.log(res.data)
                setUser(res.data);
            })
        }

        const init = async() => {
            getUsers();
        }

        init();
    
    }, []);
    useEffect(()=>{
        stt = 0;
        const temp = users.map((user=>{
            return createData(user._id,user.username,user.email,user.role,user.lastUpdated)
        }));
        setData(temp);
        setRows(temp.slice());
    },[users])

    const filterData = (value) => {
        if (value) {
            const filtered = data.filter(d => {
                if (d.name.search(new RegExp(value, "i")) >= 0
                    || d.email.search(new RegExp(value, "i")) >= 0){
                        setPage(0);
                        return d;
                }
            });
            setRows(filtered)
        } else {
            
                setRows(data)
            }
        }
    
    return (
        <Paper className={classes.root}>
            <TextField
                label="Search"
                id="outlined-size-normal"
                placeholder="Search"
                variant="outlined"
                style={{ paddingBottom: '1%', width: '80%' }}
                onChange={(e) => {
                    filterData(e.target.value)}}
            />

            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ width: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                colSpan={3}
                rowsPerPageOptions={[10]}
                component="div"
                labelRowsPerPage=""
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                ActionsComponent={TablePaginationActions}
            />
        </Paper>
    );
}
