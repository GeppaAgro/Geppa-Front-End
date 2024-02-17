import React from "react";
import TituloEmail from "../TituloEmail.tsx";
import cores from "../../Utils/Cores.tsx";

type InfoBoletimEmailProps = {
    dataPublicacao: Date;
    edicao: string;
};

const InfoBoletimEmail: React.FC<InfoBoletimEmailProps> = ({dataPublicacao, edicao}) => {
    return (
        <>
            <div className="container">
                <div className="text-center p-4 ">
                    <TituloEmail>Boletim Informativo</TituloEmail>
                </div>
                <div className="d-flex flex-column justify-content-between flex-sm-row px-4">
                    <p className='fw-semibold'>Edição: Nº{edicao}</p>
                    <p className='fw-semibold'>Data de
                        Publicação: {dataPublicacao.toLocaleDateString()}</p>
                </div>

                <hr style={{border: '1px solid',borderColor: cores.marromTerra, opacity: '1'}}/>
            </div>
        </>
    );
};

export default InfoBoletimEmail;