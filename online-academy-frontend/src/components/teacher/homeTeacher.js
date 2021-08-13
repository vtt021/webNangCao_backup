import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import { DataGrid } from "@material-ui/data-grid";
import HeaderTeacher from './child_component/headerTeacher';
import { Button, Container, Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

export default function HomeTeacher() {
    const classes = useStyles();
    const [courseList, setCourseList] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")))
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("auth")))
    }, [localStorage.getItem("auth")])

    useEffect(() => {

        const init = async () => {
            console.log("user", user);
            await axios.get("http://localhost:3001/api/courses/teacher?teacherId=" + user.id).then(res => {
                res.data.map((course, i) => {
                    course.id = course._id;
                }
                ).then(
                    setCourseList(res.data)
                )
            }).catch(error => console.log(error));
        }
        init();
    }, []);


    function renderRating(params) {
        return <Rating readOnly value={params.value} />;
    }
    function handleUpCourse() {
        window.location.href = "/teacher/uploadCourse"
    }
    function handleUpdateInfo(cellValues) {
        window.location.href = "/teacher/updateCourse/" + cellValues.row.id
    }
    function handleUpdateVideo(cellValues) {
        console.log(cellValues.row.id)
        window.location.href = "/teacher/uploadVideo/" + cellValues.row.id
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

    const handleGrid = () => {
        if (courseList.length !== 0) {
            return(
                <Grid item xs={12} style={{ height: 400 }} >
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
            )
        }
    }
    return (
        <div>
            <HeaderTeacher />
            {console.log(courseList)}
            {
                handleGrid()
            }
            <div style={{ display: "flex" }}>
                <Button onClick={handleUpCourse} variant="contained" color="primary"
                    style={{ marginLeft: "auto", marginTop: '2%' }}
                >
                    Đăng khóa học mới
                </Button>
            </div>
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