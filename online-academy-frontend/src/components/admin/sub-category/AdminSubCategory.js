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
import Refreshtoken from '../../../refreshToken';
import SubCategoryAction from './SubCategoryAction';
import { formatDateTime } from '../../../utils/helpers';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tag from '../user/UserStatus';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AdminHeader from '../common/AdminHeader'
import LeftNavi from '../common/LeftNavi';
import { Grid } from '@material-ui/core';
let stt = 0;
const columns = [
    { id: 'stt', label: '#', minWidth: 10 },
    { id: 'name', label: 'Tên', minWidth: 100 },
    { id: 'category', label: 'Tên lĩnh vực', minWidth: 100 },
    { id: 'last', label: 'Cập nhật lần cuối', minWidth: 100 },
    { id: 'tag', label: 'Trạng thái', minWidth: 100, align: 'center' },
    { id: 'actions', label: 'Hành động', align: 'center', minWidth: 200 },

];

function createData(id, name, category, lastUpdated, isDeleted) {
    stt += 1;
    var last = formatDateTime(new Date(lastUpdated)).toLocaleString()
    let actions = (<SubCategoryAction isDeleted={isDeleted} id={id} />)
    let tag;
    if (isDeleted) {
        tag = <Tag content="Đã xóa" backGroundColor="#999999" textColor="white" />
    } else {
        tag = <Tag content="Đang hoạt động" backGroundColor="#2980b9" textColor="white" />;
    }
    return { stt, id, name, category, last, tag, actions };
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



export default function AdminSubCategory() {
    const [data, setData] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")))
    const [newName, setNewName] = useState("")
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState("")
    const [listCategory, setListCategory] = useState([{}])

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("auth")))
    }, [localStorage.getItem("auth")])

    useEffect(() => {
        if (user === null || user.role != 2) {
            window.location.replace("/")
        }
    }, [user])
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, _] = useState(5);
    const [rows, setRows] = useState(data)

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const [subCategories, setSubCategories] = useState([]);

    const getSubCategory = async () => {
        await axios.get(process.env.REACT_APP_API_MAIN + '/sub-categories/admin', {
            headers: {
                "x-access-token": await Refreshtoken()
            }
        })
            .then(res => {
                console.log(res.data)
                setSubCategories(res.data);
            })
    }
    const getCategory = async () => {
        await axios.get(process.env.REACT_APP_API_MAIN + "/categories").then(res => {
            const listCategories = res.data;
            setListCategory(listCategories);

        }).catch(error => console.log(error));
    }
    const handleAddSubCategory = async () => {
        Refreshtoken()
        if (newName != "") {
            const data = {
                categoryId: category,
                subCategoryName: newName
            }
            await axios.post(process.env.REACT_APP_API_MAIN + '/sub-categories/', data, {
                headers: {
                    'x-access-token': await Refreshtoken()
                },
            })
                .then(res => {
                    window.location.reload()
                }).catch(e => {
                    console.log(e);
                })
        }
    }
    useEffect(() => {
        Refreshtoken()
        setUser(JSON.parse(localStorage.getItem("auth")))
        const init = async () => {
            await getSubCategory();
        }

        init();

    }, []);

    useEffect(() => {
        const init = async () => {
            await getCategory();
        }
        setCategory(listCategory._id)
        init();
    }, []);

    useEffect(() => {
        stt = 0;
        const temp = subCategories.map((subCategory => {
            return createData(subCategory._id, subCategory.subCategoryName, subCategory.categoryName, subCategory.lastUpdated, subCategory.isDeleted)
        }));
        setData(temp);
        setRows(temp.slice());
    }, [subCategories])

    useEffect(() => {
        setCategory(listCategory[0]._id)
    }, [listCategory])
    const searchData = (value) => {
        if (value) {
            const filtered = data.filter(d => {
                if (d.name.search(new RegExp(value.replace('\\', ""), "i")) >= 0) {
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
                    <LeftNavi selected='1' />
                </Grid>
                <Grid item xs={10}
                    style={{ display: 'flex', justifyContent: 'center', align: 'center', width: '100%', flexDirection: 'column' }}>
                    <div className={classes.root}>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Thêm lĩnh vực con</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Hãy nhập tên lĩnh vực con này.
                                </DialogContentText>
                                <form className={classes.form} noValidate>
                                    <FormControl style={{ width: "100%" }} className={classes.formControl}>
                                        <InputLabel htmlFor="max-width">Lĩnh vực</InputLabel>
                                        <Select
                                            defaultValue={category}
                                        >
                                            {listCategory.map((item) => {
                                                return (
                                                    <MenuItem value={item._id}>{item.categoryName}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>

                                </form>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Tên"
                                    fullWidth
                                    onChange={(e) => { setNewName(e.target.value) }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Hủy
                                </Button>
                                <Button onClick={handleAddSubCategory} color="primary">
                                    Thêm
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <TextField
                            label="Search"
                            id="outlined-size-normal"
                            placeholder="Search"
                            variant="standard"
                            style={{ paddingBottom: '1%', width: '80%' }}
                            onChange={(e) => {
                                searchData(e.target.value)
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
                        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpen}
                                className={classes.button}
                                endIcon={<AddCircleIcon />}
                                style={{ marginLeft: "auto", marginTop: '2%' }}
                            >
                                Thêm
                            </Button>
                        </div>


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