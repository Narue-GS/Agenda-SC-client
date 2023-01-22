import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeStyle from './home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
//import './home.css'
import ModalEvent from "../../components/modal/modal.jsx";

function Home(){
	const [events, setEvents] = useState([])
	const [isLoading, setIsLoading] = useState(true)
    const [filterType, setFilterType] = useState("all")
	const [search, setSearch] = useState("")
	const hendleChange = (e) => {
		setSearch(e.target.value)
		console.log(search)
	}
	const [eventData, setEventData] = useState("");
	const [detail, setDetail] = useState(false);
	const [showMenu, setShowMenu] = useState(window.innerWidth > 800)

	const getEvents = async() => {
		setIsLoading(true)
			await fetch(`http://127.0.0.1:5000/get_events?filter=${filterType}`,{
            	method: "GET",
            	mode: "cors",
            	headers: {'Content-type':'application/json',},
        	})
		.then((res) => res.json())
		.then((data) => {
			setIsLoading(false)
			setEvents(Object.values(data).flat(1))
		})
    }
    
	useEffect(()=>{
        getEvents()
    },[filterType])
	
	const getEvent = async(event) => {
          setIsLoading(true)
             await fetch(`http://127.0.0.1:5000/search?name=${search}`,{
                  method: "GET",
                  mode: "cors",
                  headers: {'Content-type':'application/json',},
              })
          .then((res) => res.json())
          .then((data) => {
              setIsLoading(false)
              setEvents(Object.values(data).flat(1))
          })
      }
	const detailEvent = async(event) => {
		setEventData(null)
		setDetail(true)
        await fetch(`http://127.0.0.1:5000/event?data=${event.link}`,{
              method: "GET",
              mode: "cors",
              headers: {'Content-type':'application/json',},
        })
        .then((res) => res.json())
        .then((data) => {
			setEventData(Object.assign(event, data))
        })

	}
	return (
        <>
			<ModalEvent event={eventData} display={detail} close={setDetail}/>

			<header>
	            <span className="title">Agenda SC</span>
				<div className="category-box">
					<div className="mobile-category-icon" onClick={()=>{setShowMenu(true)}}>
                    	<FontAwesomeIcon icon={faBars}/>    
                	</div>
					{ showMenu?
					<div className="category-menu">
            			<span className="category" onClick={() => setFilterType("inovation")}>Inovação</span>
           	    		<span className="category" onClick={() => setFilterType("tecnology")}>Tecnologia</span>   
            	    	<span className="category" onClick={() => setFilterType("startup")}>Startup</span>   
            	    	<a id="eliti" href="https://www.eliti.com.br/">ELITI</a>
					</div>
						: <div></div>
					}
				</div>
            </header>
			{events? 
            <div className="content">
				<div className="content-box">
                	<div className="events">
                 		{events.map((event)=>{
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
            </div> : <div><img src="https://cdn.dribbble.com/users/8424/screenshots/1036999/dots_2.gif"/></div>
			}
        </>
    )
}

export default Home;
