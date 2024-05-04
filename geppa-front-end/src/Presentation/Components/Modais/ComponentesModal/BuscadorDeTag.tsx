
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tag } from "../../../../Domain/TypesConteudos/TypeTag.ts";
import AxiosClient from "../../../../Data/Services/AxiosClient.ts";
import "./componentesModais.css"
import {Form, Overlay, Popover} from "react-bootstrap";
import {Axios} from "axios";
interface BuscadorProps {
    label: string;
    salvarTag: (tag: Tag) => void;
}

const BuscadorTag: React.FC<BuscadorProps> = ({ label, salvarTag }) => {
    const [busca, setBusca] = useState<string>('');
    const [sugestoesTags, setSugestoesTags] = useState<Tag[]>([]);
    const [mensagemBusca, setMensagemBusca] = useState<string>('');
    const [showPopover, setShowPopover] = useState(false);
    const target = React.useRef(null);

    const buscarSugestoesTags = async (tag: string) => {
        if (tag.trim() !== "") {
            try {
                const response = await AxiosClient.get(`/tags/${tag}?size=5`);
                const novasSugestoesTags = response.data.dados;
                setSugestoesTags(novasSugestoesTags);
                setMensagemBusca('');
                setShowPopover(true);
            } catch (error) {
                if (error.response.status === 400) {
                    setMensagemBusca('Tag nÃ£o encontrada');
                    setSugestoesTags([]);
                } else {
                    setSugestoesTags([]);
                }
            }
        } else {
            setSugestoesTags([]);
            setShowPopover(false);
        }
    };

    return (
        <div className="mb-2">
            <Form.Label htmlFor="buscatag">{label}</Form.Label>
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
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                    <Popover {...props}>
                        <Popover style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {sugestoesTags.length > 0 ? (
                                sugestoesTags.map((tag) => (
                                    <p
                                        className="fw-semibold p-2 rounded-2 lista-tags-buscaTag"
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
                        </Popover>
                    </Popover>
                )}
            </Overlay>
        </div>
    );
};

export default BuscadorTag;
