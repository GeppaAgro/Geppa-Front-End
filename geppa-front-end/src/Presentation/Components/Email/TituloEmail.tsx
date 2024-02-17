import React from "react";

const TituloEmail: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <div>
            <h2 className='fs-1 fw-bold m-0' style={{color: 'var(--MarromEscuro)'}}>{children}</h2>
        </div>
    );
};

export default TituloEmail;
