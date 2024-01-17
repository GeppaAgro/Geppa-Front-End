import "./StyleHeader.css"
import { NavLink} from "react-router-dom";



export default function Header() {
    return(
        <>
            <header className="header">
                <img className="headerlogo" src="src/Data/Images/Logos/LogoHorizontal.png" alt="Logo_Horizontal"/>
                <nav className="headernavigation">
                    <ul className="headernavigation-list">
                        <li className="headernavigation-item"><NavLink to="/">Inicial</NavLink></li>
                        <li className="headernavigation-item"><NavLink to="/boletins">Boletins</NavLink></li>
                        <li className="headernavigation-item"><NavLink to="/conteudos">Conteúdos</NavLink></li>
                        <li className="headernavigation-item"><NavLink to="/indicadores">Indicadores</NavLink></li>
                        <li className="headernavigation-item"><NavLink to="/sobre">Sobre</NavLink></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
