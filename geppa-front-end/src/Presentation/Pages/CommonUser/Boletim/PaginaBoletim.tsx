import BoletimBanner from "../../../Components/BoletimBanner/BoletimBanner.tsx";
import {useParams} from "react-router-dom";

export default function PaginaBoletim() {

    const {id} = useParams();

    return (
        <>
            <BoletimBanner/>
            <h3>Detalhes do produto com id: {id}</h3>
        </>
    )
}