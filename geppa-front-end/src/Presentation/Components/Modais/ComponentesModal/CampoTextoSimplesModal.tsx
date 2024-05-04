import React, { useEffect, useState } from "react";

interface CampoTextoSimplesProps {
    id:string;
    label: string;
    salvarTexto: (data: string) => void;
    texto?: string;
}

const CampoTextoSimplesModal: React.FC<CampoTextoSimplesProps> = ({ id, label, salvarTexto, texto }) => {
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
            <label htmlFor="buscatag" className="fw-semibold">{label}</label>
            <input
                className="form-control"
                type="text"
                id ={id}
                value={textoLocal}
                onChange={atualizaTexto}
            />
        </div>
    );
};

export default CampoTextoSimplesModal;
