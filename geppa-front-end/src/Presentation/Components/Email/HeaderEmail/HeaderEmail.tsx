import {Image} from "react-bootstrap";
import LogoGeppa from "../../../../Data/Images/Logos/LogoHorizontal.png";

const HeaderEmail = () => {
    return (
        <div className="d-flex justify-content-center py-3">
            <Image src={LogoGeppa} style={{width: "35vw", maxWidth: "350px"}} alt="Logo Geppa" fluid/>
        </div>
    )
}

export default HeaderEmail;