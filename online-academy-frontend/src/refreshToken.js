import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckExTime } from './checkTime';
export default async function Refreshtoken() {
    const user = JSON.parse(localStorage.getItem("auth"))
    console.log(user)
    console.log(CheckExTime())
    if((user!=null)&&CheckExTime()){
        console.log("in refresh")
        await axios.post('http://localhost:3001/api/auth/refresh',{
                accessToken: user.accessToken,
                refreshToken: user.refreshToken
            }).then(res => {
                    console.log(user)
                    user.accessToken = res.data.accessToken
                    console.log(user)
                    localStorage.removeItem("auth")
                    localStorage.removeItem("time")
                    localStorage.setItem("auth", JSON.stringify(user))
                    localStorage.setItem("time",new Date())
                }).catch((e)=>{console.log(e)})
    }
}
