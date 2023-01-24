import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './home.css'
import ModalEvent from "../../components/modal/modal.jsx";
import Paginate from "../../components/pagination/pagination.jsx"
function Home(){
	const [events, setEvents] = useState([])
	const [isLoading, setIsLoading] = useState(true)
    const [filterType, setFilterType] = useState("all")
	const [search, setSearch] = useState("");
	const [eventData, setEventData] = useState("");
	const [detail, setDetail] = useState(false);
	const [showMenu, setShowMenu] = useState(false)
	const [eventsPerPage] = useState(6);
	const [currentPage, setCurrentPage] = useState(1);

	const lastEventIndex = currentPage * eventsPerPage;
    const firstEventIndex = lastEventIndex - eventsPerPage;
    const currentEvents = events.slice(firstEventIndex, lastEventIndex);

	const getEvents = async() => {
		console.log(currentEvents)
		setIsLoading(true)
		await fetch(`https://agendasc.onrender.com/get_events?filter=all`,{
          	method: "GET",
           	mode: "cors",
           	headers: {'Content-type':'application/json',},
        })
		.then((res) => res.json())
		.then((data) => {
			setIsLoading(false)
			setEvents(Object.values(data).flat(1))
		})
		.then(updateEvents())
		.then(setIsLoading(false))
    }
    
	useEffect(()=>{
		getEvents()
    },[])
	
	const detailEvent = async(event) => {
		setEventData(null)
		setDetail(true)
        await fetch(`https://agendasc.onrender.com/event?data=${event.link}`,{
              method: "GET",
              mode: "cors",
              headers: {'Content-type':'application/json',},
        })
        .then((res) => res.json())
        .then((data) => {
			setEventData(Object.assign(event, data))
        })
	}
	const updateEvents = () =>{
        if(filterType !== "all"){
            return events.filter(event => event._filter === filterType)
        } else {
            return events
        }
    }

	return (
        <>
			<ModalEvent event={eventData} display={detail} close={setDetail}/>

			<header>
	            <button className="title" onClick={() => setFilterType("all")}>Agenda SC</button>
				<div className="category-box">
					<div className="mobile-category-icon" onClick={()=>{ !showMenu? setShowMenu(true) : setShowMenu(false)}}>
                    	<FontAwesomeIcon icon={faBars}/>    
                	</div>
					{ showMenu || window.innerWidth > 800?
					<div className="category-menu">
            			<button className="category" onClick={() => setFilterType("inovation")}>Inovação</button>
           	    		<button className="category" onClick={() => setFilterType("tecnology")}>Tecnologia</button>   
            	    	<button className="category" onClick={() => setFilterType("startup")}>Startup</button>   
            	    	<a id="eliti" target="_blank" href="https://www.eliti.com.br/">ELITI</a>
					</div>
						: <div></div>
					}
				</div>
            </header>
			
			{events.length != 0? 
            <div className="content">
				<div className="content-box">
                	<div className="events">
						{updateEvents().map((event)=>{
							return(
								<div onClick={()=>{detailEvent(event)}} className="event">
									<p>{event.title}</p>
									<img src={event.img}/>
									<span>{event.location}</span>
								</div>
							)
						})} 
                	</div>
				</div>
            </div> 
			 :<> 
				<div className="skeleton">
						<div></div>
						<div></div>
				</div>
			</>
			}
        </>
    )
}

export default Home;
