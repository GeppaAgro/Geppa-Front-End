import cores from "../../Utils/Cores.tsx";

interface ConteudoEmailProps {
    titulo: string;
    texto: string;
    link: string;
    duracao?: number;
    dataPublicacao?: Date;
    video?: boolean;
    dataInicio?: Date;
    local?: string;
}

const ConteudoEmail: React.FC<ConteudoEmailProps> = ({
                                                         titulo, texto,
                                                         link, duracao,
                                                         dataPublicacao, video,
                                                         dataInicio, local
                                                     }) => {
    return (
        <div className='container mb-2'>

            <div className=''>
                <h2 className='fs-4 fw-bold' style={{color: cores.marromEscuro}}>
                    {titulo}
                </h2>
                {duracao && (
                    <p className='fw-semibold fs-5 mb-2' style={{color: cores.marromTerra}}>
                        Duração: {duracao} Horas
                    </p>
                )}
                {dataPublicacao && (
                    <p className='fw-semibold fs-5 mb-2' style={{color: cores.marromTerra}}>
                        Publicado em: {dataPublicacao.toLocaleDateString()}
                    </p>
                )}
                {dataInicio && (
                    <p className='fw-semibold fs-5 mb-2' style={{color: cores.marromTerra}}>
                        Data de início: {dataInicio.toLocaleDateString()}
                    </p>
                )}
                {local && (
                    <p className='fw-semibold fs-5 mb-2' style={{color: cores.marromTerra}}>
                        Local: {local}
                    </p>
                )}
                <p className='mb-0' style={{color: cores.marromEscuro}}>
                    {texto}
                </p>
            </div>
            <div className='d-flex justify-content-start align-items-center mb-3'>
                <a className='fw-semibold' href={link} target='_blank' style={{color: cores.verdeOliva}}>
                    {video ? 'Assistir ao vídeo' : 'Leia Mais'}
                </a>
            </div>
        </div>
    );
};

export default ConteudoEmail;