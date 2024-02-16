import HeaderEmail from "./HeaderEmail/HeaderEmail.tsx";
import BannerEmail from "./BannerEmail/BannerEmail.tsx";
import InfoBoletimEmail from "./InfoBoletimEmail/InfoBoletimEmail.tsx";
import ConteudoTituloEmail from "./ConteudoTituloEmail/ConteudoTituloEmail.tsx";

const Email = () => {
    return (
        <>
            <HeaderEmail/>
            <BannerEmail/>

            <InfoBoletimEmail dataPublicacao={new Date()} edicao={"ABC0123"}/>
            <ConteudoTituloEmail titulo={'Artigos'} link={'http://teste.com'}
                                 icone={"ri-article-line"}/>

            <ConteudoTituloEmail titulo={'Cursos'} link={'http://teste.com'}
                                 icone={"ri-graduation-cap-line"}/>

            <ConteudoTituloEmail titulo={'Eventos'} link={'http://teste.com'}
                                 icone={"ri-calendar-event-line"}/>

            <ConteudoTituloEmail titulo={'Notícias'} link={'http://teste.com'}
                                 icone={"ri-newspaper-line"}/>

            <ConteudoTituloEmail titulo={'Vídeos'} link={'http://teste.com'}
                                 icone={"ri-video-line"}/>

        </>
    )
}

export default Email;