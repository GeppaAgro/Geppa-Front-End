import {TituloEmail} from "../TituloEmail.tsx";

interface ConteudoTituloEmailProps {
    titulo: string;
    link: string;
    icone: string;
}

const ConteudoTituloEmail: React.FC<ConteudoTituloEmailProps> = ({titulo, link, icone}) => {
    const iconeClasses = `fs-1 ${icone}`;

    return (
        <div className='d-flex justify-content-between align-items-center px-4 my-4'>
            <div className='d-flex gap-3 align-items-center'>
                <i className={iconeClasses} style={{color: 'var(--MarromEscuro)'}}></i>
                <TituloEmail titulo={titulo}/>
            </div>
            <a className='fw-semibold' style={{color: 'var(--MarromEscuro)'}}
               target='_blank' href={link}>Veja mais {titulo}</a>
        </div>
    );
};

export default ConteudoTituloEmail;