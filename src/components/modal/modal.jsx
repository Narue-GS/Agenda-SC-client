import React from "react";
import "./modal.css";

const ModalEvent = ({event, display, close}) => {
	if(display){
    		return(
        		<div className="modal">
					<div className="modalShadown" onClick={()=>{close(false)}}></div>
					{event?
							<div className="modalContent">
								<p>{event.title}</p>
               	 		    	<img src={event.img}/>
                	  		  	<span>Local: {event.location}</span>
								<span>Data: {event.date}</span>
								<span>Mais informações: <a href={event.link}>{event.link}</a></span>
							</div>
						 :	<div className="loading">
								<div>
									<img src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif"/>
								</div>
							</div>
					}
        		</div>
    		)
	} 
}

export default ModalEvent;
