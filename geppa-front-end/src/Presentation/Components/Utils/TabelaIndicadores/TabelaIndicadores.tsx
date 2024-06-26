import {Table} from "react-bootstrap";
import cores from "../Cores.tsx";
import './tabelaIndicadores.css';
import {Indicador} from "../../../../Domain/TypesConteudos/Indicador.ts";
import React, {useEffect, useState} from "react";

interface PropsTabelaIndicadores {
    indicadores : Indicador[];
}
const TabelaIndicadores:React.FC<PropsTabelaIndicadores>  = ({indicadores}) => {

    const [listaIndicadores, setListaIndicadores] = useState<Indicador[]>([])

    useEffect(() => {
        setListaIndicadores(indicadores)
    }, [indicadores]);

    return (
        <>
            <Table striped bordered className='text-center'>
                <thead>
                <tr>
                    <th className="col-4">Produto</th>
                    <th className="col-4">Unidade de medida</th>
                    <th className="col-4">Valor</th>
                </tr>
                </thead>
                <tbody>
                {listaIndicadores.map((indicador, index) => (
                    <tr key={index}>
                        <td className="">{indicador.nome}</td>
                        <td className="">{indicador.unidadeMedida}</td>
                        <td className="d-flex justify-content-between">
                            <span className="ps-sm-5">R$</span>
                            <span className=" pe-sm-5">{indicador.valor?.toFixed(2)}</span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
};

export default TabelaIndicadores;