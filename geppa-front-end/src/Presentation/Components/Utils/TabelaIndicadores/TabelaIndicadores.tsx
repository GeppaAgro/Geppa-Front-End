import {Table} from "react-bootstrap";
import cores from "../Cores.tsx";
import './tabelaIndicadores.css';

const TabelaIndicadores = () => {
    const produtos = [
        { nome: 'Boi Gordo', unidade: '@(arroba)', valor: '296,00' },
        { nome: 'Frango vivo', unidade: 'Kg', valor: '5,50' },
        { nome: 'Suíno', unidade: '@(arroba)', valor: '130,00' },
        { nome: 'Ovos Brancos', unidade: 'Cartela com  30 ovos', valor: '135,00' },
        { nome: 'Milho Seco', unidade: 'saca(60Kg)', valor: '83,00' },
        { nome: 'Farelo de Soja', unidade: 'tonelada', valor: '1070,42' },
    ];

    return (
        <>
            <Table striped bordered className='text-center'>
                <thead>
                <tr>
                    <th>Produto</th>
                    <th>Unidade de medida</th>
                    <th>Valor (R$)</th>
                </tr>
                </thead>
                <tbody>
                {produtos.map((produto, index) => (
                        <tr key={index}>
                        <td>{produto.nome}</td>
                        <td>{produto.unidade}</td>
                        <td>{produto.valor}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className='d-flex gap-2 justify-content-between fw-semibold'>
                <p className='m-0'>Data:  01/01/2021</p>
                <div className='text-end'>
                    Fonte:
                    <a href={'https://www.noticiasagricolas.com.br'} target={'_blank'}
                          style={{color: cores.marromEscuro}}>
                        Notícias Agrícolas
                    </a>
                </div>
            </div>
        </>
    );
};

export default TabelaIndicadores;