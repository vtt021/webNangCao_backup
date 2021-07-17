import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";


function handleClickHome(event) {
    event.preventDefault();
    console.info('Quay về trang chủ');
}
function handleClickCategory(event) {
    event.preventDefault();
    console.info('Về trang Category');
}
function handleClickSubCategory(event) {
    event.preventDefault();
    console.info('Tải lại trang');
    window.location.reload(false);
}

export default function Breadcrumb(props) {
    const classes = useStyles();
    const history = useHistory();

    const category = "Tên lĩnh vực"
    const subCategory = "Tên lĩnh vực phụ"

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

            <Link color="inherit" href="/getting-started/installation/" onClick={handleClickCategory} variant='h5'>
                {category}
            </Link>

            {/* Nếu ở trang xem khóa học theo subCategory thì hiển thị */}
            {
                props.subCategory && (
                    <Link
                        color="textPrimary"
                        href="/components/breadcrumbs/"
                        onClick={handleClickSubCategory}
                        aria-current="page"
                        variant='h5'
                    >
                        {subCategory}
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