import React from "react";
import { Button } from "react-bootstrap";
import {Autor} from "../../../../Domain/TypesConteudos/TypeAutor.ts";

interface ListaAutoresProps {
    autores: Autor[];
    removerAutor: (id: string) => void;
    errosValidacao?: { [key: string]: string }
}

const ListagemDeAutores: React.FC<ListaAutoresProps> = ({ autores, removerAutor, errosValidacao }) => {
    return (
        <div className={'mt-3'}>
            {autores.map((autor,index) => (
                <div className='mb-2' key={autor.id}>
                    <div>
                        <span className='fw-semibold'>Autor {index +1}:</span>
                    </div>
                    <div className='d-flex align-items-center'>
                        <span>{autor.nome}</span>
                        <Button className={'p-0'} variant={'2'} onClick={() => removerAutor(autor.id)}>
                            <i className="p-0 ps-2 fs-4 ri-delete-bin-line"></i>
                        </Button>
                    </div>
                    {errosValidacao && errosValidacao[`autores[${index}].nome`] && (
                        <div className="text-danger" style={{fontSize: '14px'}}>
                            {errosValidacao[`autores[${index}].nome`]}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ListagemDeAutores;
