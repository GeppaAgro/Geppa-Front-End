import TituloEmail from "../TituloEmail.tsx";
import cores from "../../Utils/Cores.tsx";

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
                <i className={iconeClasses} style={{color: cores.marromEscuro}}></i>
                <TituloEmail>{titulo}</TituloEmail>
            </div>
            <a className='fw-semibold' style={{color: cores.marromEscuro}}
               target='_blank' href={link}>Veja mais {titulo}</a>
        </div>
    );
};

export default ConteudoTituloEmail;