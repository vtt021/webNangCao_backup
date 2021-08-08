import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import { DataGrid } from "@material-ui/data-grid"; import HeaderTeacher from './child_component/headerTeacher';
import { Button, Container, Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

export default function HomeTeacher() {
    const classes = useStyles();
    const [courseList, setCourseList] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")))
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem("auth")))
    },[localStorage.getItem("auth")])

    useEffect(() => {
        if (user===null||user.role != 1) 
        {
            window.location.replace("/")
        }
    }, [user])
    useEffect(() => {
        axios.get("http://localhost:3001/api/courses/teacher?teacherId=" + 
        //user._id ||
        '60ed31a444b83939d4197e57').then(res => {
            res.data.map((course, i) => {
                course.id = course._id;
            }
            ).then(
                setCourseList(res.data)
            )
        }).catch(error => console.log(error));


    }, []);


    function renderRating(params) {
        return <Rating readOnly value={params.value} />;
    }
    function handleUpdateInfo(cellValues) {
        window.location.href = "/teacher/updateCourse/" + cellValues.row.id
    }
    function handleUpdateVideo(cellValues) {
        console.log(cellValues.row.id)
    }
    const columns = [
        {
            field: 'courseName',
            headerName: 'Tên khóa học',
            flex: 2,
            editable: false,
        },
        {
            field: 'rating',
            headerName: 'Điểm đánh giá',
            flex: 1,
            editable: false,
            valueFormatter: (params) => {
                const valueFormatted = Math.round(params.value * 100) / 100;
                return `${valueFormatted}`;
            },
            renderCell: renderRating,
        },
        {
            field: 'viewCount',
            headerName: 'Luợt xem',
            flex: 1,
            editable: false,

        },
        {
            field: 'studentCount',
            headerName: 'Số học viên',
            flex: 1,
            editable: false,
        },
        {
            field: 'isCompleted',
            headerName: 'Hoàn thiện',
            type: 'boolean',
            flex: 1,
            editable: false,
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
                        color="primary"
                        onClick={(event) => {
                            handleUpdateInfo(cellValues)
                        }}
                    >
                        Sửa thông tin
                    </Button>
                );
            }
        },
        {
            field: '_id',
            headerName: ' ',
            flex: 1,
            editable: false,
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        disabled= {cellValues.row.isCompleted}
                        onClick={(event) => {
                            
                            handleUpdateVideo(cellValues)
                        }}
                    >
                        Sửa bài giảng
                    </Button>
                );
            }
        },
    ];
    return (
        <div>
            <HeaderTeacher />
            {console.log(courseList)}
            <Grid item xs={12} align="center" style={{ height: 400 }} justify='center' justifyContent='center'>
                <DataGrid
                    rows={courseList}
                    columns={columns}
                    pageSize={5}
                    disableSelectionOnClick={true}
                    className={
                        classes.row
                    }
                />
            </Grid>
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    row: {
    },
}));