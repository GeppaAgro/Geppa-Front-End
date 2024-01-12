import "./StyleHeader.css"



export default function Header() {
    return(
        <>
            <div className="headerDiv">
                <img src="src/Data/Images/Logos/LogoHorizontal.png" alt="Logo_Horizontal"/>
                <div className="linksHeader">
                    <a href="#">Inicial</a>
                    <a href="#">Boletins</a>
                    <a href="#">Conteúdos</a>
                    <a href="#">Indicadores</a>
                    <a href="#">Sobre</a>
                </div>
            </div>

        </>
    )
}
