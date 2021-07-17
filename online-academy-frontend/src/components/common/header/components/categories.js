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

    const handleItemClick = (event) => {
        setMenuPosition(null);
    };

    
    //DONE: GỌI API GET ALL KHÓA HỌC RỒI BỎ VÔ listCategories NÀY NHA, NHỚ THÊM NAVIGATION CHO TỪNG MENUITEMS
    const [listCategories, setListCategories] = useState([{ id: 1, categoryName: 'Không có khóa học' }])
    //DONE: CHUYỂN ĐẾN TRANG CHỨ DANH SÁCH KHÓA HỌC TƯƠNG ỨNG
    const handleCategoryPage = id => () => {
        console.log(id);
        history.push("/categories/" + id);
    };
    const renderItems = (listCategories) => {
        return (listCategories.map((category) => (
            <NestedMenuItem
                    label={category.categoryName}
                    parentMenuOpen={!!menuPosition}
                    onClick={handleCategoryPage(category.id)}
                >
                    <MenuItem onClick={handleItemClick}>Sub-Button 2</MenuItem>
                    <MenuItem onClick={handleItemClick}>Sub-Button 2</MenuItem>
                </NestedMenuItem>
        )))
    }
    useEffect(() => {
        axios.get("http://localhost:3001/api/categories").then(res => {
            const listCategories = res.data;
            setListCategories(listCategories);
        })
            .catch(error => console.log(error));
    }, []);
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


