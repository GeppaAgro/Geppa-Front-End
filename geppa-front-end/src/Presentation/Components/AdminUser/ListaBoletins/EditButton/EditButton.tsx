import {Link} from "react-router-dom";
import "./StyleEditButton.css"
interface EditButtonProps {
    edicao: string

}
const EditButton: React.FC<EditButtonProps> = ({edicao}) => {
    return(
        <>
            <button className="btn-edit-admin p-1 rounded">
                <Link to={`${edicao}`} className="text-decoration-none fw-medium">
                    Editar <i className="ri-pencil-line"/>
                </Link>
            </button>
        </>
    )
}

export default EditButton