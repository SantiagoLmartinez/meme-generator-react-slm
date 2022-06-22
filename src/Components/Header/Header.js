import React from "react";


export const Header = () =>{

    return(
        <div className="header">
            <div>
            <h1>MemeGenerator</h1>
            </div>
            <div className="iconHeader">
                <a href="https://www.linkedin.com/in/santiago-l-martinez/" target="_blank" >
                    <i className="fa-brands fa-linkedin"></i>
                </a>
                <a href="https://github.com/SantiagoLmartinez" target="_blank" >
                <i className="fa-brands fa-github-square"></i>
                </a>
            </div>
        </div>
    )
}