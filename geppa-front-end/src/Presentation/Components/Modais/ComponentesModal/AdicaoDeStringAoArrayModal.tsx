import React from "react";
import {Button} from "react-bootstrap";

interface ArrayStringProps {
    label: string;
    novaString: string;
    setNovaString: (novoAutor: string) => void;
    adicionarString: () => void;
    erro?: string;
    tentouSalvar?: boolean;
}

const AdicaoDeStringAoArrayModal: React.FC<ArrayStringProps> = ({
                                                                    label,
                                                                    novaString,
                                                                    setNovaString,
                                                                    adicionarString,
                                                                    erro,
                                                                    tentouSalvar
                                                                }) => {
    return (
        <div>
            <label htmlFor="novaString" className="fw-semibold">{label}</label>
            <div className="d-flex flex-row gap-1">
                <div className={'w-75'}>
                    <input
                        placeholder="digite o nome do autor..."
                        className={`form-control ${erro ? 'is-invalid' : (tentouSalvar && !erro) ? 'is-valid' : ''}`}
                        type="text"
                        id="novaString"
                        value={novaString}
                        onChange={(e) => setNovaString(e.target.value)}
                    />
                    {erro && <div className="invalid-feedback">{erro}</div>}
                </div>
                <Button variant="primary" className={'h-50'} onClick={adicionarString}>
                    Adicionar
                </Button>
            </div>
        </div>
    );
};

export default AdicaoDeStringAoArrayModal;