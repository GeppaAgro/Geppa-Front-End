import React, { useEffect, useState } from "react";

interface CampoTextoSimplesProps {
    id:string;
    label: string;
    salvarTexto: (data: string) => void;
    texto?: string;
    erro?: string;
    tentouSalvar?: boolean;
}

const CampoTextoSimplesModal: React.FC<CampoTextoSimplesProps> = ({ id, label, salvarTexto, texto, erro, tentouSalvar }) => {
    const [textoLocal, setTextoLocal] = useState<string>("");

    useEffect(() => {
        if (texto) {
            setTextoLocal(texto);
        }
    }, [texto]);

    const atualizaTexto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const novoTexto = e.target.value;
        setTextoLocal(novoTexto);
        salvarTexto(novoTexto);
    };

    return (
        <div className="mb-2">
            {erro && <div className="invalid-feedback mb-3">{erro}</div>}
            <label htmlFor="buscatag" className="fw-semibold" hidden={label === ""}>{label}</label>
            <input
                className={`form-control ${erro ? 'is-invalid' : (tentouSalvar && !erro && textoLocal) ? 'is-valid' : ''}`}
                type="text"
                id ={id}
                value={textoLocal}
                onChange={atualizaTexto}
            />
            {erro && <div className="invalid-feedback">{erro}</div>}
        </div>
    );
};

export default CampoTextoSimplesModal;
