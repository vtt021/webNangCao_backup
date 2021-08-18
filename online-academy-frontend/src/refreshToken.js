import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckExTime } from './checkTime';
export default async function Refreshtoken() {
    const user = JSON.parse(localStorage.getItem("auth"))
    if ((user != null) && CheckExTime()) {
        await axios.post(process.env.REACT_APP_API_MAIN + '/auth/refresh', {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken
        }).then(res => {
            user.accessToken = res.data.accessToken
            localStorage.removeItem("auth")
            localStorage.removeItem("time")
            localStorage.setItem("auth", JSON.stringify(user))
            localStorage.setItem("time", new Date())
        }).catch((e) => { console.log(e) })
    }
    return user.accessToken
}
