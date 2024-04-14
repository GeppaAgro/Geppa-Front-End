import "./Filtros.css";
import {Button, Form, Accordion} from "react-bootstrap";
import cores from "../../Utils/Cores.tsx";
import React, {useState} from "react";

interface FiltroProps {
    onDataSubmit: (dataMinima: string, dataMaxima: string) => void;
}

export const Filtros = ({onDataSubmit}: FiltroProps) => {

    const [dataMinima, setDataMinima] = useState<string>("");
    const [dataMaxima, setDataMaxima] = useState<string>("");

    const handleDataMinimaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataMinima(event.target.value);
    };

    const handleDataMaximaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataMaxima(event.target.value);
    };

    const handleSubmit = () => {
        if (!dataMinima && !dataMaxima) {
            return;
        }
        onDataSubmit(dataMinima, dataMaxima);
    };

    const handleClearFilters = () => {
        setDataMinima("");
        setDataMaxima("");
        onDataSubmit("", "");
    };

    return (
        <div className="mt-lg-5 mb-3">
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <h5 className="fw-bold pt-1">Filtros</h5>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <h6 className="fw-bold pt-1">Filtrar por data</h6>
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
                            <Button
                                className="mt-2 text-decoration-underline w-100 border-0 fw-semibold"
                                style={{backgroundColor: "transparent", color: cores.marromEscuro}}
                                onClick={handleClearFilters}
                            >
                                Limpar Filtros
                            </Button>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};
