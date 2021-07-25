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
                    user.accessToken = res.data.accessToken
                    localStorage.removeItem("auth")
                    localStorage.removeItem("time")
                    localStorage.setItem("auth", JSON.stringify(res.data))
                    localStorage.setItem("time",new Date())
                }).catch((e)=>{console.log(e)})
    }
}
