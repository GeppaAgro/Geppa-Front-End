import {Indicador} from "../../../Domain/TypesConteudos/Indicador.ts";
import {useEffect, useState} from "react";
import {UnidadeMedida} from "../../../Domain/Enums/unidadeMedida.ts";
import LoadingOverlay from "../Utils/LoadingOverlay/LoadingOverlay.tsx";
import {Button, Dropdown, Modal, Table} from "react-bootstrap";
import CampoTextoSimplesModal from "./ComponentesModal/CampoTextoSimplesModal.tsx";
import CampoValorMonetarioModal from "./ComponentesModal/CampoValorMonetarioModal.tsx";
import {MensagensValidacao} from "../../../Domain/Enums/MensagensValidacao.ts";
import axiosClient from "../../../Domain/Services/AxiosClient.ts";
import {AxiosError, AxiosResponse} from "axios";

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
            setProduto(indicador.nome)
            setUnidadeMedida(indicador.unidadeMedida)
            setValor(indicador.valor)
        }
    }, [indicador]);

    const salvarIndicador = async () => {
        setIsLoading(true);
        const indicador: Indicador = new Indicador(produto.trim(), unidadeMedida, valor);
        const validationResult = await validar(indicador);

        if (validationResult.success) {
            salvar(indicador);
            fechar();
            limpar();
        } else {
            setErrosValidacao(validationResult.errors);
            setTentouSalvar(true);
        }
        setIsLoading(false);
    };
    const validar = async (indicador: Indicador): Promise<{ success: boolean; errors: { [key: string]: string } }> => {
        try {
            const response = await axiosClient.post('/indicadores/validar', indicador);
            return handleResponse(response);
        } catch (error) {
            const axiosError = error as AxiosError;
            return handleError(axiosError.response as AxiosResponse);
        }
    };

    const handleResponse = (response: AxiosResponse): { success: boolean; errors: { [key: string]: string } } => {
        if (response.status >= 200 && response.status < 300) {
            return { success: true, errors: {} };
        }
        return {
            success: false,
            errors: { mensagem: MensagensValidacao.IMPOSSIVEL_REALIZAR_VALIDACAO },
        };
    };

    const handleError = (response: AxiosResponse): { success: boolean; errors: { [key: string]: string } } => {
        if (response.status === 400) {
            if (response.data.errosValidacao) {
                return {
                    success: false,
                    errors: response.data.errosValidacao,
                };
            }
            return {
                success: false,
                errors: { mensagem: response.data.mensagem },
            };
        }

        return {
            success: false,
            errors: { mensagem: MensagensValidacao.IMPOSSIVEL_REALIZAR_VALIDACAO },
        };
    };
    const cancelar =() => {
        fechar()
        limpar()
    }

    const limpar = () => {
        setProduto('')
        setValor(0)
        setUnidadeMedida(UnidadeMedida.KILOGRAMA)
        setTentouSalvar(false)
        setErrosValidacao({})
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
                                                             erro={errosValidacao?.nome}
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
                                                              erro={errosValidacao?.valor}
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