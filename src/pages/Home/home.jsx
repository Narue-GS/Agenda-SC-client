import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './home.css'
import ModalEvent from "../../components/modal/modal.jsx";
import Paginate from "../../components/pagination/pagination.jsx"
function Home(){
	const [events, setEvents] = useState([])
	const [totalEvents, setTotalEvents] = useState(1)
	const filteredEvents = events
	const [isLoading, setIsLoading] = useState(true)
    const [filterType, setFilterType] = useState("")
	const [search, setSearch] = useState("");
	const [eventData, setEventData] = useState("");
	const [detail, setDetail] = useState(false);
	const [showMenu, setShowMenu] = useState(false)
	const [currentPage, setCurrentPage] = useState(1);

	const getEvents = async() => {
		setIsLoading(true)

		await fetch(`https://agendasc.onrender.com/get_events?page=${currentPage}${filterType? "&filter=" + filterType : ""} `,{
          	method: "GET",
           	mode: "cors",
           	headers: {'Content-type':'application/json',},
        })
		.then((res) => res.json())
		.then((data) => {
			setEvents(data.events)
			setTotalEvents(data.total_events)
		})
		setTimeout(()=>{
			setIsLoading(false)
		}, 200)
    }
    
	useEffect(()=>{
		getEvents()
    },[currentPage, filterType])
	
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
    }

	return (
        <>
			<ModalEvent event={eventData} display={detail} close={setDetail}/>

			<header>
	            <button className="title" onClick={() =>{
					setCurrentPage(1)
					setFilterType("")
				}
				}>Agenda SC</button>
				<div className="category-box">
					<div className="mobile-category-icon" onClick={()=>{ !showMenu? setShowMenu(true) : setShowMenu(false)}}>
                    	<FontAwesomeIcon icon={faBars}/>    
                	</div>
					{ showMenu || window.innerWidth > 800?
					<div className="category-menu">
            			<button 
							className="category" 
							onClick={() =>{
								setCurrentPage(1)
								setFilterType("inovation")
							}}>Inovação
						</button>
						<button                                      
                            className="category" 
                            onClick={() =>{
                                setCurrentPage(1)
                                setFilterType("startup")
                            }}>Startup
                        </button>
						<button                                      
                            className="category" 
                            onClick={() =>{
                                setCurrentPage(1)
                                setFilterType("tecnology")
                            }}>Tecnologia
                        </button>
            	    	<a id="eliti" target="_blank" href="https://www.eliti.com.br/">ELITI</a>
					</div>
						: <div></div>
					}
				</div>
            </header>
			
			{!isLoading? 
            <div className="content">
				<div className="content-box">
                	<div className="events">
						{events.map((event)=>{
							return(
								<div key={event._id} onClick={()=>{detailEvent(event)}} className="event">
									<p>{event.title}</p>
									<img src={event.img}/>
									<span>{event.location}</span>
								</div>
							)
						})} 
                	</div>
				</div>
				<div>
					<Paginate
                    	eventsPerPage={6}
                     	totalEvents={totalEvents}
						hendleClick={setCurrentPage}
                	/>
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
