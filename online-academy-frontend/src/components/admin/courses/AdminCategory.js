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
import Refreshtoken from '../../../refreshToken';
import CategoryAction from '../common/CategoryAction';


let stt = 0;
const actions = (<CategoryAction/>)
const columns = [
    { id: 'stt', label: '#', minWidth: 10 },
    { id: 'name', label: 'Tên', minWidth: 100 },
    { id: 'last', label: 'Cập nhật lần cuối', minWidth: 100 },
    { id: 'actions', label: 'Action',align:'center', minWidth: 300 },

];
const formatDate = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

const formatDateTime = date => {
    return date.toLocaleTimeString() + ', ' + formatDate(date);
  }
function createData(id,name, lastUpdated) {
    stt += 1;
    var last = formatDateTime(new Date(lastUpdated)).toLocaleString()
    return { stt,id, name, last,actions };
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



export default function AdminCategory() {
    const [data,setData] = useState([]);
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("auth")))
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, _] = useState(5);
    const [rows, setRows] = useState(data)
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Refreshtoken()
        setUser(JSON.parse(localStorage.getItem("auth")))
        console.log(user)
        const getCategory = async() => {
            await axios.get('http://localhost:3001/api/categories/admin',{
                headers:{
                    "x-access-token":user.accessToken
                }
            })
            .then(res => {
                console.log(res.data)
                setCategories(res.data);
            })
        }

        const init = async() => {
            getCategory();
        }

        init();
    
    }, []);
    useEffect(()=>{
        stt = 0;
        const temp = categories.map((category=>{
            return createData(category._id,category.categoryName,category.lastUpdated)
        }));
        setData(temp);
        setRows(temp.slice());
    },[categories])

    const searchData = (value) => {
        if (value) {
            const filtered = data.filter(d => {
                if (d.name.search(new RegExp(value, "i")) >= 0){
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
                    searchData(e.target.value)}}
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
                                        console.log(value)
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {value}
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