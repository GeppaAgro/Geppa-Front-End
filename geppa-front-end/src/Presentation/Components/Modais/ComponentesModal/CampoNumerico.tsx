import React from 'react';

interface CampoNumericoProps {
    value: number;
    onChange: (value: number) => void;
    id: string;
    min: number;
    label: string;
    erro?: string;
    tentouSalvar?: boolean;
}

const CampoNumerico: React.FC<CampoNumericoProps> = ({ value, onChange, id, min, label,erro, tentouSalvar }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value);
        onChange(newValue);
    };

    return (
        <div>
            <label htmlFor={id} className="fw-semibold">{label}</label>
            <input
                type="number"
                className={`form-control ${erro ? 'is-invalid' : (tentouSalvar && !erro) ? 'is-valid' : ''}`}
                id={id}
                value={value}
                onChange={handleChange}
                min={min}
            />
            {erro && <div className="invalid-feedback">{erro}</div>}
        </div>
    );
};

export default CampoNumerico;
