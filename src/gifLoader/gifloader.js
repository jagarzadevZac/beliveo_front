import React from 'react'

export default function GifLoader(){
    return(
        <div id="ht-preloader">
            <div className="loader clear-loader">
                <img className="img-fluid" src={require(`../assets/images/loader.gif`)} alt="" />
            </div>
        </div>
    )
}