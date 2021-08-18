import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

import { Menu, MenuItem, Typography, IconButton } from "@material-ui/core";

import NestedMenuItem from "material-ui-nested-menu-item";

export default function Category() {
    const history = useHistory();
    const [menuPosition, setMenuPosition] = useState(null);

    const handleRightClick = (event) => {
        if (menuPosition) {
            return;
        }
        event.preventDefault();
        setMenuPosition({
            top: event.pageY,
            left: event.pageX
        });
    };

    
    const getSubCategory = async()=>{
        await axios.get(process.env.REACT_APP_API_MAIN + "/sub-categories/").then(res => {    
            setListSub(res.data)
        }).catch(error => console.log(error))
    }
    const getCategory = async()=>{
        await axios.get(process.env.REACT_APP_API_MAIN + "/categories").then(res => {
            const listCategories = res.data;
            setListCategories(listCategories);
            
        }).catch(error => console.log(error));
    }
    const [listCategories, setListCategories] = useState([{ id: 1, categoryName: 'Không có khóa học' }])
    const [listSubCategory,setListSub]=useState([{}])

    //DONE: CHUYỂN ĐẾN TRANG CHỨA DANH SÁCH KHÓA HỌC THEO LĨNH VỰC TƯƠNG ỨNG
    const handleCategoryPage = id => () => {
        window.location.href ="/categories/" + id
        
    };
    //DONE: CHUYỂN ĐẾN TRANG CHỨ DANH SÁCH KHÓA HỌC THEO LĨNH VỰC PHỤ TƯƠNG ỨNG
    const handleSubCategoryClick = categoryId => (event) => {
        window.location.href ="/categories/" + categoryId + '/'+ event.target.id
    };

    const renderItems = (listCategories) => {
        return (listCategories.map((category) => (
            <NestedMenuItem
                    label={category.categoryName}
                    parentMenuOpen={!!menuPosition}
                    onClick={handleCategoryPage(category._id)}
                >
                    {listSubCategory.map((sub)=>{
                        if((new String(sub.categoryId)).localeCompare(new String(category._id))===0){
                            return(
                                <MenuItem id={sub._id} onClick={handleSubCategoryClick(category._id)}>{sub.subCategoryName}</MenuItem>
                    )}})}
                    </NestedMenuItem>
        )))
    }
    useEffect(() => {
        const init = async ()=>{
            await getCategory()
        }
        init()
    }, []);

    useEffect(() => {
        const init =async ()=>{
            await getSubCategory()
        }
        init()
    }, [listCategories]);

    return (
        <IconButton color="inherit"
            onClick={handleRightClick}>
            <Typography variant="h6" noWrap>Lĩnh vực</Typography>
            <Menu
                open={!!menuPosition}
                onClose={() => setMenuPosition(null)}
                anchorReference="anchorPosition"
                anchorPosition={menuPosition}
            >
                {renderItems(listCategories)}

            </Menu>
        </IconButton>
    );
};


