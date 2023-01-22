import React from "react";
import { Link } from "react-router-dom";

function filter(){
    return(
        <>
        <header>
            <div className="div-span">
                <span>Agenda SC</span> 
            </div>
            <div className="div-category">
                <p>Título do filtro</p>  
            </div>
            <div className="div-eliti">
                <Link className="eliti">Voltar</Link>   
            </div>              
            </header>
            <div className="content">
                <div className="events-F">
                    
                </div>
            </div>
        </>
    )
}

export default filter;