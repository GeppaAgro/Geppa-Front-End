import React, { useEffect, useState } from "react";

interface CampoHoraProps {
    label: string;
    valor: string | null; // Valor agora é uma string no formato HH:MM
    salvarHora: (hora: string | null) => void;
    erro?: string;
    tentouSalvar?: boolean;
}

const CampoHoraModal: React.FC<CampoHoraProps> = ({ label, valor, salvarHora, erro, tentouSalvar }) => {
    const [horaLocal, setHoraLocal] = useState<string | null>(null);

    useEffect(() => {
        if (valor) {
            setHoraLocal(valor);
        }
    }, [valor]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const horaString = e.target.value;
        const horaRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

        if (horaRegex.test(horaString)) {
            setHoraLocal(horaString);
            salvarHora(horaString);
        } else {
            setHoraLocal(null);
            salvarHora(null);
        }
    };

    return (
        <div className="mb-2">
            <label htmlFor="hora" className="fw-semibold">{label}</label>
            <input
                type="time"
                className={`form-control ${erro ? 'is-invalid' : (tentouSalvar && !erro) ? 'is-valid' : ''}`}
                value={horaLocal || ''}
                onChange={handleChange}
            />
            {erro && <div className="invalid-feedback">{erro}</div>}
        </div>
    );
};

export default CampoHoraModal;
