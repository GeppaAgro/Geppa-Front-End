import React from "react";

interface TituloEmailProps {
    titulo: string;
}

export const TituloEmail: React.FC<TituloEmailProps> = ({titulo}) => {
    return (
        <div>
            <h2 className='fs-1 fw-bold m-0' style={{color:'var(--MarromEscuro)'}}>{titulo}</h2>
        </div>
    );
};

