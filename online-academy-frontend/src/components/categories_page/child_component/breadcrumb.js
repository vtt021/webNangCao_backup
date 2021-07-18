import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';



export default function Breadcrumb(props) {
    const classes = useStyles();
    const history = useHistory();

    const categoryName = props.categoryName
    const subCategoryName = props.subCategoryName
    const keyword = props.keyword


    function handleClickHome(event) {
        event.preventDefault();
        console.info('Quay về trang chủ');
        history.push("/");

    }
    function handleClickCategory(event) {
        event.preventDefault();
        console.info('Về trang Category');
        history.push("/categories/" + props.categoryId);

    }
    function handleClickSubCategory(event) {
        event.preventDefault();
        console.info('Tải lại trang');
        window.location.reload(false);
    }



    return (
        <Breadcrumbs aria-label="breadcrumb" className={classes.container}>
            <Link color="inherit" href="/" onClick={handleClickHome} variant='h5'>
                Trang chủ
            </Link>

            {/* Nếu ở trang xem khóa học theo Category 
              HOẶC ở trang tìm kiếm có lọc theo Category
             thì hiển thị tên lĩnh vực*/}
            {
                props.categoryName && props.categoryName.length > 0 && (
                    <Link color="inherit" href="/getting-started/installation/" onClick={handleClickCategory} variant='h5'>
                        {categoryName}
                    </Link>
                )
            }

            {/* Nếu ở trang tìm kiếm thì hiển thị từ khóa*/}
            {props.keyword && (
                <Typography color="inherit" variant='h5'>Tìm kiếm</Typography>

            )
            }
            {props.keyword && props.keyword.length > 0 && (

                <Typography color="inherit" variant='h5'>
                    {keyword}
                </Typography>
            )
            }

            {/* Nếu ở trang xem khóa học theo subCategory thì hiển thị tên lĩnh vực phụ*/}
            {
                props.subCategoryName && (
                    <Link
                        color="textPrimary"
                        href="/components/breadcrumbs/"
                        onClick={handleClickSubCategory}
                        aria-current="page"
                        variant='h5'
                    >
                        {subCategoryName}
                    </Link>
                )
            }

        </Breadcrumbs>
    );
}
const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        marginTop: 30,
        marginLeft: '5%',
    },

}));