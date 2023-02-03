import React from 'react';
import "../../styles/pagination.css"
 
const Paginate = ({ eventsPerPage, totalEvents, hendleClick}) => {
   const pageNumbers = [];
 
   for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
		pageNumbers.push(i);
   }
 
   return (
      <div className="pagination-container">
         <ul className="pagination">
            {pageNumbers.map((number) => (
               <li key={number} onClick={()=>{hendleClick(number)}} className="page-number">
                  {number}
               </li>
            ))}
	   		<span style={{display: pageNumbers.length > 5 ? "block" : "none"}}>...</span>
         </ul>
      </div>
   );
};
 
export default Paginate;
