import React, { useEffect, useState } from "react";

interface CampoTextoSimplesProps {
    id:string;
    label: string;
    salvarTexto: (data: string) => void;
    texto?: string;
}

const CampoTextAreaModal: React.FC<CampoTextoSimplesProps> = ({ id, label, salvarTexto, texto }) => {
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
                className="form-control"
                id ={id}
                value={textoLocal}
                onChange={atualizaTexto}
            />
        </div>
    );
};

export default CampoTextAreaModal;
