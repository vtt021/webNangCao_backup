import React from 'react'
import Searchbar from './SearchBar'
import HeaderImage from './images/HeaderImage.jpg'
import AppLogo from './images/AppLogo.png'
import _ from './HeaderPage.css'


export default function HeaderPage(props) {
    return (
        <div>
            <img className="HeaderImg" src = {HeaderImage}/>
            <div className="Container-1">
                <img className="AppLogo" src = {AppLogo}/>
                <Searchbar/>
            </div>
        </div>
    )
}
