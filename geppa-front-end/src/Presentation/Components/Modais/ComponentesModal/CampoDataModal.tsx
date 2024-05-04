import {useEffect, useState} from "react";

interface CampoDataProps {
    label: string;
    valor: Date | null;
    salvarData: (data: Date | null) => void;
}


const CampoDataModal: React.FC<CampoDataProps> = ({ label, valor, salvarData }) => {
    const [dataLocal, setDataLocal] = useState<Date | null>(null);

    useEffect(() => {
        if (valor) {
            setDataLocal(valor);
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
                className="form-control"
                value={dataLocal ? dataLocal.toISOString().substr(0, 10) : ''}
                onChange={handleChange}
            />
        </div>
    );
};

export default CampoDataModal;