import React from "react";
import {Button} from "react-bootstrap";

interface ArrayStringProps {
    label: string;
    novaString: string;
    setNovaString: (novoAutor: string) => void;
    adicionarString: () => void;
}

const AdicaoDeStringAoArrayModal: React.FC<ArrayStringProps> = ({label, novaString, setNovaString, adicionarString }) => {
    return (
        <div>
            <label htmlFor="novaString" className="fw-semibold">{label}</label>
            <div className="d-flex flex-row gap-1">
                <input
                    placeholder="digite o nome do autor..."
                    className="form-control"
                    type="text"
                    id="novaString"
                    value={novaString}
                    onChange={(e) => setNovaString(e.target.value)}
                />
                <Button variant="primary" onClick={adicionarString}>
                    Adicionar
                </Button>
            </div>
        </div>
    );
};

export default AdicaoDeStringAoArrayModal;