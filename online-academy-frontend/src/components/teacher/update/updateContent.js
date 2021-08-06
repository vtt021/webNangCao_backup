
import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import axios from 'axios';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DescribeDialog from '../child_component/uploadDescribe';
import draftToHtml from 'draftjs-to-html';

export default function UpdateContent(props) {
    const classes = useStyles();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

    const sampleMarkup = //props.courseInfo.detailLong
        '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
        '<a href="http://www.facebook.com">Example link</a>';

    const blocksFromHTML = convertFromHTML(sampleMarkup);
    const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
    );
    const [editorState, setEditorState] = useState(EditorState.createWithContent(state));

    const [detailLong, setDetailLong] = useState(
        //props.courseInfo.detailLong
    );

    const [listCategories, setListCategories] = useState([{ id: 1, categoryName: 'Tất cả lĩnh vực' }])
    const [listSubCategory, setListSub] = useState([{ id: 1, categoryName: 'Tất cả lĩnh vực phụ' }])

    const [listActiveSub, setListActiveSub] = useState([{ id: 1, categoryName: 'Chọn lĩnh vực chính trước' }])
    // Set defaut Category từ data  
    const [currenctCategory, setCurrenctCategory] = useState();
    // Set defaut SubCategory từ database (id của sub: props.courseInfo.subCategoryId)
    const [currentSubCategory, setCurrentSubCategory] = useState();

    const handleChangeCategory = (event) => {
        setCurrenctCategory(event.target.value);
    };
    const handleChangeSubCategory = (event) => {
        setCurrentSubCategory(event.target.value);
    };

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        //setDetailLong(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    };
    useEffect(() => {
        setDetailLong(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }, [editorState]);



    const getSubCategory = () => {
        axios.get("http://localhost:3001/api/sub-categories/").then(res => {
            setListSub(res.data)
        }).catch(error => console.log(error))
    }

    useEffect(() => {
        axios.get("http://localhost:3001/api/categories").then(res => {
            const listCategories = res.data;
            setListCategories(listCategories);
        })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        getSubCategory()
        setCurrenctCategory(listCategories[0]._id)
    }, [listCategories]);



    useEffect(() => {
        setListActiveSub([])
        {
            listSubCategory.map((sub) => {
                if ((new String(sub.categoryId)).localeCompare(new String(currenctCategory)) === 0) {
                    setListActiveSub(prevArray => [...prevArray, {
                        _id: sub._id,
                        categoryName: sub.subCategoryName,
                    },]);
                }
            })
        }
    }, [currenctCategory]);

    useEffect(() => {
        setCurrentSubCategory(listActiveSub[0]._id)
    }, [listActiveSub]);
    return (
        <div className={classes.paper}>
            <form className={classes.form} noValidate onSubmit={handleSubmit(props.onSubmit)}>
                <Grid container spacing={2}>
                    {/* Tên khóa học    */}
                    <Grid item xs={12}>
                        <TextField
                            name="courseName"
                            variant="filled"
                            required
                            fullWidth
                            id="courseName"
                            label="Tên khóa học"
                            defaultValue={
                                //props.courseInfo.courseName || 
                                'Chưa có API'}
                            autoFocus
                            {...register("courseName", { required: true })}
                        />
                    </Grid>
                    {errors.courseName && <span className='errors'>*Chưa nhập tên khóa học</span>}

                    {/* Chọn lĩnh vực */}
                    <Grid item xs={12}>
                        <TextField
                            id="categoryId"
                            select
                            label="Lĩnh vực"
                            fullWidth
                            value={currenctCategory}
                            onChange={handleChangeCategory}
                            SelectProps={{
                                native: true,
                            }}
                            variant="filled"
                        >
                            {listCategories.map((option) => (
                                <option key={option._id} value={option._id}>
                                    {option.categoryName}
                                </option>
                            ))}
                        </TextField>
                        <input
                            name="categoryid"
                            type='hidden'
                            id="categoryid"
                            value={currenctCategory}
                            onChange={setValue('categoryid', currenctCategory)}
                            {...register("categoryid", { required: true })}
                        />
                    </Grid>
                    {errors.categoryid && <span className='errors'>*Chưa chọn lĩnh vực</span>}

                    {/* Chọn lĩnh vực phụ */}
                    <Grid item xs={12}>
                        <TextField
                            id="subCategoryId"
                            select
                            label="Lĩnh vực phụ"
                            fullWidth
                            value={currentSubCategory}
                            onChange={handleChangeSubCategory}
                            SelectProps={{
                                native: true,
                            }}
                            variant="filled"
                        >
                            {listActiveSub.map((option) => (
                                <option key={option._id} value={option._id}>
                                    {option.categoryName}
                                </option>
                            ))}
                        </TextField>
                        <input
                            name="subCategoryId"
                            type='hidden'
                            id="subCategoryId"
                            value={currentSubCategory}
                            onChange={setValue('subCategoryId', currentSubCategory)}
                            {...register("subCategoryId", { required: true })}
                        />
                    </Grid>
                    {errors.subCategoryId && <span className='errors'>*Chưa chọn lĩnh vực phụ</span>}

                    {/* Mô tả ngắn */}
                    <Grid item xs={12}>
                        <TextField
                            name="detailShort"
                            variant="filled"
                            required
                            fullWidth
                            multiline
                            rows={5}
                            id="detailShort"
                            label='Mô tả ngắn'
                            defaultValue={
                                //props.courseInfo.detailShort || 
                                'Chưa có API'}
                            autoFocus
                            {...register("detailShort", { required: true })}
                        />
                    </Grid>
                    {errors.detailShort && <span className='errors'>*Chưa có mô tả</span>}

                    {/* Học phí */}
                    <Grid item xs={12}>
                        <TextField
                            name="price"
                            variant="filled"
                            type='number'
                            required
                            fullWidth
                            id="price"
                            label="Học phí"
                            defaultValue={
                                //props.courseInfo.price ||
                                'Chưa gọi API'
                            }
                            {...register("price", { required: true, min: 0 })}
                        />
                    </Grid>
                    {errors.price && <span className='errors'>*Chưa có học phí</span>}

                    {/* Giảm giá */}
                    <Grid item xs={12}>
                        <TextField
                            name="salePrice"
                            variant="filled"
                            type='number'
                            fullWidth
                            id="salePrice"
                            label="Học phí giảm giá"
                            defaultValue={
                                //props.courseInfo.salePrice ? props.courseInfo.salePrice : 
                                '0'}
                            {...register("salePrice", { min: 0 })}
                        />
                    </Grid>

                    {/* Mô tả chi tiết (wysiwyg)*/}
                    <Grid
                        justify="flex-start" // Add it here :)
                        container
                        spacing={2}
                        item xs={12}
                    >
                        <Grid item>
                            <Typography variant='h5' color="inherit">
                                Mô tả chi tiết:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <DescribeDialog editorState={editorState} onEditorStateChange={onEditorStateChange} />
                        </Grid>
                    </Grid>

                    <Grid item xs={12}
                        justify="flex-start"
                        container
                        className={classes.editorContent}
                    >
                        <div dangerouslySetInnerHTML={{
                            __html: draftToHtml(convertToRaw(editorState.getCurrentContent()))
                            // props.courseInfo.detailLong
                        }}>
                        </div>
                        <input
                            name="detailLong"
                            type='hidden'
                            id="detailLong"
                            value={detailLong}
                            defaultValue={
                                //props.courseInfo.detailLong
                                'Chưa có APi'
                            }
                            onChange={setValue('detailLong', detailLong)}
                            {...register("detailLong", { required: true })}
                        />
                    </Grid>
                    {errors.detailLong && <span className='errors'>*Chưa có mô tả</span>}


                </Grid>

                <Grid container justify="center">
                    <Grid item>
                        <Button
                            type="submit"
                            width='50%'
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Đăng khóa học
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>

    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    editorContent: {
        border: '1px solid'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        //marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
