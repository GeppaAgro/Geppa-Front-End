import {Indicador} from "../../../Domain/TypesConteudos/Indicador.ts";
import {useEffect, useState} from "react";
import {UnidadeMedida} from "../../../Domain/Enums/unidadeMedida.ts";
import LoadingOverlay from "../Utils/LoadingOverlay/LoadingOverlay.tsx";
import {Button, Dropdown, Modal, Table} from "react-bootstrap";
import CampoTextoSimplesModal from "./ComponentesModal/CampoTextoSimplesModal.tsx";
import CampoValorMonetarioModal from "./ComponentesModal/CampoValorMonetarioModal.tsx";

type ModalIndicadores = {
    abrir: boolean;
    fechar: () => void;
    salvar: (data: Indicador) => void;
    indicador?: Indicador
}
const ModalIndicadores: React.FC<ModalIndicadores> = ({abrir, fechar, salvar, indicador}) => {
    const [produto, setProduto] = useState<string>('');
    const [unidadeMedida, setUnidadeMedida] = useState <UnidadeMedida>(UnidadeMedida.KILOGRAMA)
    const [valor, setValor] = useState<number | null>(0)
    const [errosValidacao, setErrosValidacao] = useState<{ [key: string]: string }>()
    const [tentouSalvar, setTentouSalvar] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if(indicador){
            setProduto(indicador.produto)
            setUnidadeMedida(indicador.unidadeMedida)
            setValor(indicador.valor)
        }
    }, [indicador]);

    const salvarIndicador = () => {
        setIsLoading(true);
        const indicador: Indicador = new Indicador(produto, unidadeMedida, valor);
        setTentouSalvar(true)
        salvar(indicador)
        fechar()
        limpar()
        setIsLoading(false);
    }
    const cancelar =() => {
        fechar()
        limpar()
    }

    const limpar = () => {
        setProduto('')
        setValor(0)
        setUnidadeMedida(UnidadeMedida.KILOGRAMA)
    }


    return (
        <>
            {isLoading && <LoadingOverlay/>}

            <Modal show={abrir} onHide={cancelar} backdrop="static" size="lg">
                <Modal.Header>
                    <Modal.Title>{indicador ? 'Editar indicador' : 'Adicionar indicador'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Table className="table">
                        <thead>
                            <tr className="text-center align-middle">
                                <th>Produto</th>
                                <th>Unidade de Medida</th>
                                <th>Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center align-middle">
                                <td> <CampoTextoSimplesModal id="Produto"
                                                             label=""
                                                             texto={produto}
                                                             salvarTexto={setProduto}
                                                             erro={errosValidacao?.titulo}
                                                             tentouSalvar={tentouSalvar}/></td>
                                <td> <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {unidadeMedida}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {Object.values(UnidadeMedida).map ((unidade, index) => (
                                            <Dropdown.Item key={index} onClick={() => setUnidadeMedida(unidade as UnidadeMedida)}>
                                                {unidade}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown></td>
                                <td><CampoValorMonetarioModal label=""
                                                              valor={valor}
                                                              checkBox={false}
                                                              salvarValor={setValor}
                                                              tentouSalvar={tentouSalvar}/></td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelar}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={salvarIndicador}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalIndicadores