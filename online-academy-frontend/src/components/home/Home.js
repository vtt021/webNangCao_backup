import React, {useState, useEffect } from 'react';
import { Container, } from 'react-bootstrap'
import Header from '../common/header/header.js'
import HotCourses from './child_component/hotCourses.js'
import HorizonalTab from './child_component/tab/horizonalTab.js'
import Footer from '../common/footer/footer.js';
export default function Home(props) {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")))

    useEffect(async ()=>{
        await setAuth(JSON.parse(localStorage.getItem("auth")))
        console.log(auth)
    },[])

    useEffect(() => {
        if (auth!=null&&auth.role === 1) 
        {
            window.location.replace("/teacher")
            return
        }
        else if (auth!=null&&auth.role === 2) 
        {
            window.location.replace("/admin")
            return
        }
    }, [])
    return (
        <div fluid >
            <Header />
            <HotCourses />
            <HorizonalTab />
            <Footer />
        </div>
    )
}
