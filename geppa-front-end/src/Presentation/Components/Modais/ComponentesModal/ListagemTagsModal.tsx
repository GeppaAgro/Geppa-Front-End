import React from "react";
import {Tag} from "../../../../Domain/TypesConteudos/TypeTag.ts";

interface ListaTagsProps {
    tags: Tag[];
    removerTag: (id: string) => void;
}

const ListaTags: React.FC<ListaTagsProps> = ({ tags, removerTag }) => {
    return (
        <div className="d-flex flex-column align-items-center gap-2">
            <h5 className="fw-semibold">Tags</h5>
            {tags.map(tag => (
                <div key={tag.id} className="p-1 rounded-2 tag col-md-10 d-flex flex-row justify-content-between align-items-center px-3 gap-3">
                    <span className="  col-md-10  fw-semibold">{tag.nome}</span>
                    <i className="ri-close-circle-fill" style={{ fontSize: "24px", cursor: "pointer" }} onClick={() => removerTag(tag.id)}/>
                </div>
            ))}
        </div>
    );
};
export default ListaTags;
