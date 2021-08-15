import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';
import { DataGrid } from "@material-ui/data-grid";
import Link from '@material-ui/core/Link';
import Refreshtoken from '../../refreshToken';

export default function WatchList(props) {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")))

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("auth")))
    }, [localStorage.getItem("auth")])

    const [items, setItems] = useState([])

    useEffect(() => {
        const init = async () => {
            await Refreshtoken();
        
            await axios.get('http://localhost:3001/api/users/favorite', {
                headers: {
                    'x-access-token': await Refreshtoken()
                }
            }).then(res => {
                console.log(res.data);
                let newData = res.data.map(e => {
                    return {
                        id: e._id,
                        courseName: e.courseName
                    }
                })
                console.log(newData);
                setItems(newData);
            }).catch(e => {
                console.log(e);
            })
        }

        init();
    }, [])

    const handleChangeLove = async (cellValues) => {
        await Refreshtoken();
        //Làm cái gì đó với database ở đây nè
        console.log(cellValues.id);

        await axios.post('http://localhost:3001/api/users/favorite', {
            courseId: cellValues.id
        }, {
            headers: {
                'x-access-token': await Refreshtoken()
            }
        }).then(res => {
            //Nếu api trả về false --> Đã bỏ khỏi danh sách --> Gỡ khỏi danh sách client
            if (res.data.isFavorite === false) {
                setItems(items.filter((value, i) => value.id !== cellValues.row.id));
            }
        }).catch(e => {
            console.log(e);
        })
        


        // setItems(items.filter((value, i) => value.id !== cellValues.row.id));
    }
    const columns = [
        {
            field: 'courseName',
            headerName: 'Tên khóa học',
            flex: 4,
            editable: false,
            renderCell: (cellValues) => {
                return (
                    <Link href={'/detail/' + cellValues.row.id} onClick={{}} color="inherit">
                        {cellValues.row.courseName}
                    </Link>

                );
            }
        },
        {
            field: 'id',
            headerName: ' ',
            flex: 1,
            editable: false,
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={(event) => {
                            handleChangeLove(cellValues)
                        }}
                    >
                        Bỏ yêu thích
                    </Button>
                );
            }
        },
    ];
    return (
        <div fluid >
            <div className={classes.root}>

                <Grid conatiner item xs='12' container direction="column" spacing={2} >
                    <div style={{ display: "flex" }}>
                        <Typography variant='h5' style={{ marginRight: "auto", borderBottom: '2px solid' }}>
                            Các khóa học yêu thích
                        </Typography>
                    </div>
                    <div>
                        {
                            items.length > 0
                                ?
                                <Grid xs={12} style={{ height: 400, paddingTop: '2%' }} >
                                    <DataGrid
                                        rows={items}
                                        columns={columns}
                                        pageSize={5}
                                        disableSelectionOnClick={true}
                                        className={
                                            classes.row
                                        }
                                    />
                                </Grid>
                                :
                                <Typography variant='h6'>
                                    Bạn chưa yêu thích khóa học nào
                                </Typography>
                        }
                    </div>

                </Grid>

            </div>
        </div>


    )
}
const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '2%',
        paddingRight: '2%'
    },

}));