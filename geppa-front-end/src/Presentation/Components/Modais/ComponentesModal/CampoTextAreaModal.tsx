import React, {useEffect, useState} from "react";

interface CampoTextoSimplesProps {
    id: string;
    label: string;
    salvarTexto: (data: string) => void;
    texto?: string;
    erro?: string;
    tentouSalvar?: boolean;
}

const CampoTextAreaModal: React.FC<CampoTextoSimplesProps> = ({id, label, salvarTexto, texto, erro, tentouSalvar}) => {
    const [textoLocal, setTextoLocal] = useState<string>("");

    useEffect(() => {
        if (texto) {
            setTextoLocal(texto);
        }
    }, [texto]);

    const atualizaTexto = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const novoTexto = e.target.value;
        setTextoLocal(novoTexto);
        salvarTexto(novoTexto);
    };

    return (
        <div className="mb-2">
            <label htmlFor="buscatag" className="fw-semibold">{label}</label>
            <textarea
                className={`form-control ${erro ? 'is-invalid' : (tentouSalvar && !erro && textoLocal) ? 'is-valid' : ''}`}
                id={id}
                value={textoLocal}
                onChange={atualizaTexto}
                style={{ height: '150px' }}
            />
            {erro && <div className="invalid-feedback">{erro}</div>}
        </div>
    );
};

export default CampoTextAreaModal;
