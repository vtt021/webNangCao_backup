import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Container, } from 'react-bootstrap'
import Header from '../common/header/header.js'
import Grid from '@material-ui/core/Grid';
import Breadcrumb from '../categories_page/child_component/breadcrumb.js';
import PagingCard from './child_component/pagingCourse.js';
import Footer from '../common/footer/footer.js';
import LeftList from './child_component/leftList.js';
export default function SubCategoryPage(props) {
    const categoryId = props.match.params.id
    const subCategoryId = props.match.params.subId
    const [categoryName,setCategoryName] = useState("Tên lĩnh vực( lấy từ db)")
    const [subCategoryName,setSubName] = useState("Tên lĩnh vực phụ( cũng lấy từ db)")
    useEffect(() => {
        axios.get("http://localhost:3001/api/categories/id?id="+categoryId).then(res => {
            setCategoryName(res.data.categoryName)
            console.log(res.data)
        })
            .catch(error => console.log(error));
    }, []);
    useEffect(() => {
        axios.get("http://localhost:3001/api/sub-categories/id?id="+subCategoryId).then(res => {
            setSubName(res.data.subCategoryName)
            console.log(res.data)
        })
            .catch(error => console.log(error));
    }, []);
    return (
        <Container fluid >
            <Header />
            <div >
                <Grid container spacing={2}>

                    <Grid item xs='2' container direction="column" spacing={2} >
                        <LeftList categoryId />
                    </Grid>

                    <Grid item xs='10' container direction="column" spacing={2} >
                        <Breadcrumb categoryId={categoryId} categoryName={categoryName} subCategoryName={subCategoryName} />
                        <PagingCard search={false}  categoryId={categoryId} subCategory= {subCategoryId}/>
                    </Grid>

                </Grid>
            </div>
            <Footer />
        </Container>


    )
}
