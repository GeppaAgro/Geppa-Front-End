import React from "react";
import { Button } from "react-bootstrap";
import {Autor} from "../../../../Domain/TypesConteudos/TypeAutor.ts";

interface ListaAutoresProps {
    autores: Autor[];
    removerAutor: (id: string) => void;
}

const ListagemDeAutores: React.FC<ListaAutoresProps> = ({ autores, removerAutor}) => {
    return (
        <div>
            {autores.map(autor => (
                <div key={autor.id}>
                    <span>{autor.nome}</span>
                    <Button variant="danger" onClick={() => removerAutor(autor.id)}>
                        Remover
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default ListagemDeAutores;
