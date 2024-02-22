import React, { useState } from 'react';

export default  function FiltroDataBoletim() {
    const [dataInicio, setDataInicio] = useState<string>('');
    const [dataFim, setDataFim] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        const { value } = event.target;
        const formattedValue = value
            .replace(/\D/g, '') // Remove todos os caracteres que não são dígitos
            .replace(/(\d{2})(\d{0,2})/, '$1/$2') // Insere uma barra após os dois primeiros dígitos
            .replace(/(\d{2})(\d{4})(\d{0,4})/, '$1/$2'); // Insere barras adicionais conforme o usuário digita

        setter(formattedValue);
    };

    return (
        <div className="container">
            <h1>Formulário de Data</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="dataInicio" className="form-label">Data de Início:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dataInicio"
                        placeholder="DD/MM/AAAA"
                        value={dataInicio}
                        onChange={(e) => handleInputChange(e, setDataInicio)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="dataFim" className="form-label">Data de Fim:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dataFim"
                        placeholder="DD/MM/AAAA"
                        value={dataFim}
                        onChange={(e) => handleInputChange(e, setDataFim)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
}


