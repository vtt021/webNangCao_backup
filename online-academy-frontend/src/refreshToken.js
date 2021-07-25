import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckExTime } from './checkTime';
export default function Refreshtoken() {
    const user = JSON.parse(localStorage.getItem("auth"))
    if(CheckExTime()){
        axios.post('http://localhost:3001/api/auth/refresh',{
                accessToken: user.accessToken,
                refreshToken: user.refreshToken
            }).then(res => {
                    return res.data.accessToken
                }).catch((e)=>{console.log(e)})
    }else{
        return user.accessToken
    }
}
