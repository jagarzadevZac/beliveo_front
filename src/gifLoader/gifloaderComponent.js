import React from 'react'

export default function GifLoaderComponent(){
    return(
        <div style={{textAlign: 'center'}}>
            <img className="img-fluid" src={require(`../assets/images/gifloadercomponent.gif`)} alt="" />
        </div>
    )
}