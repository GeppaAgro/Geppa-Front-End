import React, { useEffect, useState } from "react";

interface CampoValorMonetarioProps {
    label: string;
    valor: number | null;
    checkBox?: boolean;
    checkBoxLabel?: string;
    salvarValor: (valor: number | null) => void;
    erro?: string;
    tentouSalvar?: boolean;
}

const CampoValorMonetarioModal: React.FC<CampoValorMonetarioProps> = ({ label, valor, checkBox, checkBoxLabel, salvarValor, erro, tentouSalvar }) => {
    const [valorLocal, setValorLocal] = useState<number | null>(null);
    const [isCursoGratuito, setIsCursoGratuito] = useState<boolean>(false);


    useEffect(() => {
        if (valor !== null) {
            setValorLocal(valor);
        } else{
            setValorLocal(null);
        }
    }, [valor]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const correctedValue = value.replace(',', '.');
        let newValue: number | null;
        if (correctedValue.includes('.') && correctedValue.split('.')[1].length > 2) {
            newValue = parseFloat(parseFloat(correctedValue).toFixed(2)); // Converte o resultado de toFixed de volta para um número
        } else {
            newValue = parseFloat(correctedValue);
        }
        setValorLocal(newValue);
        salvarValor(newValue);
    };

    const handleCursoGratuitoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCursoGratuito(e.target.checked);
        //NAO ESQUECER DE COLOCAR 0 AQUI APOS FIM DA VALIDAÇÃO NO BACKEND
        salvarValor(1)
    };

    return (
        <div className="mb-2">
            <div className="d-flex flex-column">
                <label htmlFor="valor" className="fw-semibold" hidden={isCursoGratuito}>{label}</label>
                    <input
                        type="number"
                        step="0.01"
                        className={`form-control ${erro ? 'is-invalid' : (tentouSalvar && !erro) ? 'is-valid' : ''}`}
                        value={valorLocal !== null ? valorLocal : ''}
                        onChange={handleChange}
                        min="0.01"
                        hidden={isCursoGratuito}
                    />
                    {erro && <div className="invalid-feedback">{erro}</div>}

            </div>
            <div className="form-check mt-2" hidden={!checkBox}>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="cursoGratuito"
                    checked={isCursoGratuito}
                    onChange={handleCursoGratuitoChange}
                />
                <label className="form-check-label" htmlFor="cursoGratuito" >
                    {checkBoxLabel}
                </label>
            </div>
        </div>
    );
};

export default CampoValorMonetarioModal;
