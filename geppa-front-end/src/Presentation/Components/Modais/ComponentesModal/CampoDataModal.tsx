import React, {useEffect, useState} from "react";

interface CampoDataProps {
    label: string;
    valor: Date | null;
    salvarData: (data: Date | null) => void;
    erro?: string;
    tentouSalvar?: boolean;
}


const CampoDataModal: React.FC<CampoDataProps> = ({ label, valor, salvarData, erro, tentouSalvar }) => {
    const [dataLocal, setDataLocal] = useState<Date | null>(null);

    useEffect(() => {
        if (valor) {
            setDataLocal(new Date(valor));
        }
    }, [valor]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateString = e.target.value;
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (dateRegex.test(dateString)) {
            const novaData = new Date(dateString);
            setDataLocal(novaData);
            salvarData(novaData);
        } else {
            setDataLocal(null);
            salvarData(null);
        }
    };

    return (
        <div className="mb-2">
            <label htmlFor="data" className="fw-semibold">{label}</label>
            <input
                type="date"
                className={`form-control ${erro ? 'is-invalid' : (tentouSalvar && !erro) ? 'is-valid' : ''}`}
                value={dataLocal ? dataLocal.toISOString().substr(0, 10) : ''}
                onChange={handleChange}
            />
            {erro && <div className="invalid-feedback">{erro}</div>}
        </div>
    );
};

export default CampoDataModal;