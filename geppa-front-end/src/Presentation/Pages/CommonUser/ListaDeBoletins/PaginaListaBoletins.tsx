import ListaBoletins from "../../../Components/ListaDeBoletins/ListaBoletins.tsx";
import ListaConteudosPaginaBoletins
    from "../../../Components/ListaConteudosPaginaBoletins/ListaConteudosPaginaBoletins.tsx";


export default function PaginaListaBoletins() {

    return (
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-md-7">
                    <ListaBoletins/>
                </div>
                <div className="col-md-5 d-none d-lg-block ">
                    <ListaConteudosPaginaBoletins/>
                </div>
            </div>
        </div>
    )
}
