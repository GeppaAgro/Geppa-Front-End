import {Button, Form} from "react-bootstrap";
import cores from "../../Utils/Cores.tsx";
import React, {useState} from "react";

interface FiltroDataProps {
    onDataSubmit: (dataMinima: string, dataMaxima: string) => void;
}

export const FiltroData = ({onDataSubmit}: FiltroDataProps) => {

    const [dataMinima, setDataMinima] = useState<string>("");
    const [dataMaxima, setDataMaxima] = useState<string>("");

    const handleDataMinimaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataMinima(event.target.value);
    };

    const handleDataMaximaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataMaxima(event.target.value);
    };

    const handleSubmit = () => {
        console.log(dataMinima, dataMaxima);
        onDataSubmit(dataMinima, dataMaxima);
    };

    return (
        <div>
            <h5 className="fw-bold pt-1">Filtrar por data</h5>
            <Form>
                <Form.Group controlId="formMinima">
                    <Form.Label className="mb-1">A partir de:</Form.Label>
                    <Form.Control
                        type="date"
                        value={dataMinima}
                        onChange={handleDataMinimaChange}
                    />
                </Form.Group>
                <Form.Group className="mt-2" controlId="formMaxima">
                    <Form.Label className="mb-1">Para:</Form.Label>
                    <Form.Control
                        type="date"
                        value={dataMaxima}
                        onChange={handleDataMaximaChange}
                    />
                </Form.Group>
                <Button
                    className="mt-3 w-100 border-0"
                    style={{backgroundColor: cores.verdeOliva}}
                    onClick={handleSubmit}
                >
                    Filtrar
                </Button>
            </Form>
        </div>
    );
};