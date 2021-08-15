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
import AdminHeader from '../common/AdminHeader'
import LeftNavi from '../common/LeftNavi';
import { Grid } from '@material-ui/core';
let stt = 0;
const columns = [
    { id: 'stt', label: '#', minWidth: 10 },
    { id: 'name', label: 'Tên', minWidth: 200 },
    { id: 'category', label: 'Lĩnh Vực', minWidth: 70 },
    { id: 'teacher', label: 'Giáo viên', minWidth: 100 },
    { id: 'price', label: 'Giá', minWidth: 100 },
    { id: 'deleted', label: '', minWidth: 50, align: 'center' },
];

function createData(_id, name, category, teacher, isDeleted, price) {
    stt += 1;
    let id = _id;

    let deleted = (<Deleteaction isDeleted={isDeleted} id={_id} />)
    return { stt, name, category, teacher, price, deleted };
}

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
}))(TableCell);


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

export default function AdminCourses() {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")))
    useEffect(() => {
        setAuth(JSON.parse(localStorage.getItem("auth")))
    }, [localStorage.getItem("auth")])

    useEffect(() => {
        if (auth === null || auth.role != 2) {
            window.location.replace("/")
        }
    }, [auth])
    const [data, setData] = useState([]);

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, _] = useState(5);
    const [rows, setRows] = useState(data)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const [courses, setCourses] = useState([]);
    const getCourses = async () => {
        await axios.get('http://localhost:3001/api/courses', {
            headers: {
                "x-access-token": await Refreshtoken()
            }
        })
            .then(res => {
                setCourses(res.data);
            })
    }

    useEffect(() => {
        Refreshtoken()
        setAuth(JSON.parse(localStorage.getItem("auth")))

        const init = async () => {
            await getCourses();
        }

        init();
        console.log(courses)
    }, []);
    useEffect(() => {
        stt = 0;
        const temp = courses.map((course => {
            return createData(course._id, course.courseName, course.categoryName, course.teacherName, course.isDeleted, course.price)
        }));
        setData(temp);
        setRows(temp.slice());
    }, [courses])

    const filterData = (value) => {
        if (value) {
            const filtered = data.filter(d => {
                if (new String(d.name).search(new RegExp(value, "i")) >= 0
                    || new String(d.category).search(new RegExp(value, "i")) >= 0
                    || new String(d.teacher).search(new RegExp(value, "i")) >= 0) {
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
        <td style={{ display: 'flex', direction: 'column', justifyContent: 'space-evenly', flexDirection: 'column' }}>
            <AdminHeader />
            <Grid container >
                <Grid item xs={2}>
                    <LeftNavi selected='3' />
                </Grid>
                <Grid item xs={10}
                    style={{ display: 'flex', justifyContent: 'center', align: 'center', width: '100%', flexDirection: 'column' }}>
                    <div className={classes.root}>
                        <TextField
                            label="Search"
                            id="outlined-size-normal"
                            placeholder="Search"
                            variant="standard"
                            style={{ paddingBottom: '1%', width: '80%' }}
                            onChange={(e) => {
                                filterData(e.target.value)
                            }}
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
                    </div>


                </Grid>
            </Grid>

        </td>
    );
}

const useStyles = makeStyles({
    root: {
        margin: '0% 2% 10% 2%',
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