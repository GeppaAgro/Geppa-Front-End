import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Tag} from "../../../../Domain/TypesConteudos/TypeTag.ts";
import "./componentesModais.css"
import {Form, Overlay, Popover} from "react-bootstrap";
import {TagService} from "../../../../Domain/Services/TagService.ts";
import {MensagensRetorno} from "../../../../Domain/Enums/MensagensRetorno.ts";

interface BuscadorProps {
    label: string;
    salvarTag: (tag: Tag) => void;
}

const BuscadorTag: React.FC<BuscadorProps> = ({label, salvarTag}) => {
    const [busca, setBusca] = useState<string>('');
    const [sugestoesTags, setSugestoesTags] = useState<Tag[]>([]);
    const [mensagemBusca, setMensagemBusca] = useState<string>('');
    const [showPopover, setShowPopover] = useState(false);
    const target = React.useRef(null);

    const buscarSugestoesTags = async (tag: string) => {
        if (tag.trim() !== "") {
            try {
                const novasSugestoesTags = await TagService.buscarSugestoesTags(tag);
                setSugestoesTags(novasSugestoesTags);
                setMensagemBusca('');
                setShowPopover(true);
            } catch (error) {
                setMensagemBusca(error instanceof Error ? error.message : MensagensRetorno.ERRO_DESCONHECIDO);
                setSugestoesTags([]);
            }
        } else {
            setSugestoesTags([]);
            setShowPopover(false);
        }
    };

    return (
        <div className="mb-2">
            <Form.Label htmlFor="buscatag" className="fw-semibold">{label}</Form.Label>
            <Form.Control
                id="buscatag"
                className="form-control mb-2"
                placeholder="Digite uma tag..."
                type="search"
                value={busca}
                onChange={(e) => {
                    const newValue = e.target.value.toString();
                    setBusca(newValue);
                    buscarSugestoesTags(newValue);
                }}
                ref={target}
            />
            <Overlay
                show={showPopover}
                target={target.current}
                placement="bottom"
            >
                {({...props}) => (
                    <Popover {...props}>
                        <div style={{maxHeight: '200px', overflowY: 'auto'}}>
                            {sugestoesTags.length > 0 ? (
                                sugestoesTags.map((tag) => (
                                    <p
                                        className="fw-semibold p-2 rounded-2 lista-tags-buscaTag mb-1"
                                        key={tag.id}
                                        onClick={() => {
                                            salvarTag(tag);
                                            setBusca('');
                                            setSugestoesTags([]);
                                            setShowPopover(false);
                                        }}
                                    >
                                        {tag.nome}
                                    </p>
                                ))
                            ) : (
                                <p>{mensagemBusca}</p>
                            )}
                        </div>
                    </Popover>
                )}
            </Overlay>
        </div>
    );
};

export default BuscadorTag;
