import {Indicador} from "../../../../Domain/TypesConteudos/Indicador.ts";
import {Button, Table} from "react-bootstrap";
import {useState} from "react";
import ModalIndicadores from "../ModalIndicadores.tsx";
import "./StylesComponentesModal/StyleListaDeIndicadores.css"

const ListaDeIndicadores: React.FC<{ indicadoresIniciais?: Indicador[], onUpdate: (indicadores: Indicador[]) => void }> = ({ indicadoresIniciais, onUpdate }) => {

    const [indicadores, setIndicadores] = useState<Indicador[]>([]);
    const [modalIndicadores, setModalIndicadores] = useState<{
        show: boolean,
        editIndex: number | null
    }>({ show: false, editIndex: null });

    const closeModalIndicadores = () => {
        setModalIndicadores({
            show: false,
            editIndex: null
        })
    }

    const openModalIndicadores = (index: number | null) => {
        setModalIndicadores({
            show: true,
            editIndex: index
        })
    }

    const salvarIndicador = (indicador: Indicador, index: number | null) => {
        setIndicadores((prevIndicadores) => {
            const newIndicadores = [...prevIndicadores];
            if (index!== null && index >= 0 && index < newIndicadores.length) {
                newIndicadores[index] = indicador;
            } else {
                newIndicadores.push(indicador);
            }
            onUpdate(newIndicadores);
            return newIndicadores;
        });
    };

    const deleteIndicador = (index: number) => {
        setIndicadores((prevIndicadores) => {
            const newIndicadores = prevIndicadores.filter((_, i) => i!== index);
            onUpdate(newIndicadores);
            return newIndicadores;
        });
    };

    return  (
        <>
            <ModalIndicadores
                abrir={modalIndicadores.show}
                fechar={closeModalIndicadores}
                salvar={(indicador: Indicador) => salvarIndicador(indicador, modalIndicadores.editIndex)}
                indicador={modalIndicadores.editIndex !== null ? indicadores[modalIndicadores.editIndex] : undefined}/>

            <div className="d-flex justify-content-between">
                <span className="fw-bold fs-5">Indicadores</span>
                <Button onClick={openModalIndicadores} className="btn-adicionar-indicador fw-bold fs-6 px-4">Adicionar Indicador
                </Button>
            </div>

            <Table className="table mt-2">
                <thead>
                <tr className="text-center align-middle ">
                    <th>Produto</th>
                    <th>Unidade de Medida</th>
                    <th>Preço</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {indicadores.map((indicador, index) => (
                    <tr key={index} className="text-center align-middle">
                        <td>{indicador.nome}</td>
                        <td>{indicador.unidadeMedida}</td>
                        <td>
                            <div className="px-2 d-flex justify-content-between">
                                <span>R$</span>
                                <span>{indicador.valor?.toFixed(2)}</span>
                            </div>
                        </td>
                        <td>
                            <div className="px-3 d-flex justify-content-between">
                                <button
                                    onClick={() => openModalIndicadores(index)}
                                    className="ri-edit-fill col-6 icone-edit-delete"/>

                                <button
                                    onClick={() => deleteIndicador(index)}
                                    className=" fw-semibold ri-delete-back-2-line col-6 icone-edit-delete"/>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>

    )
}

export default ListaDeIndicadores