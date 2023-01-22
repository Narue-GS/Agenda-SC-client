import { useState} from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/modal/modal";

    
function event(){
    const [dropdown, setDropdown] = useState("");

    const showDropdown = () => {
    console.log("ofuturoéshow");
    setDropdown("ofuturoéshow");
    document.body.addEventListener("click", showDropdown);
  }

    const closeDropdown = event => {
    console.log("hidden");
    setDropdown("");
    document.body.removeEventListener("click", closeDropdown);
  };
    return(
        <>
        <header>
            <span>Agenda SC</span>
            <p>Título do Evento</p>
            <button onClick={showDropdown}>Click Here!</button>
            <Modal className={dropdown} />
            <Link className="eliti" to="/" >Voltar</Link>
        </header>
        </>
    )
}

export default event;