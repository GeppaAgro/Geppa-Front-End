import {
    Body, Container, Head, Html, Preview, Section,
} from "@react-email/components"
import cores from "../Utils/Cores.tsx"
import {HeaderEmail} from "./HeaderEmail.tsx"
import {BannerEmail} from "./BannerEmail.tsx"
import {InfoBoletimEmail} from "./InfoBoletimEmail.tsx"
import {TipoConteudoTituloEmail} from "./TipoConteudoTituloEmail.tsx"
import {ConteudoEmail} from "./ConteudoEmail.tsx"
import {FooterEmail} from "./FooterEmail.tsx"
import {BoletimEmail} from "../../../Data/ApiTypes/TypeBoletimEmail.ts";

interface PropsEmail {
    boletim : BoletimEmail
}
export const Email:React.FC <PropsEmail> =  ({boletim}) => (
    <Html>
        <Head/>
        <Preview>Booletim Informativo - GEPPA</Preview>
        <Body style={main}>
            <HeaderEmail/>

            <Container style={container}>
                <Section style={section}>
                    <BannerEmail/>

                    <InfoBoletimEmail
                        dataPublicacao={new Date(boletim.dataPublicacao)}
                        edicao={boletim.edicao}/>

                    {
                        boletim.artigos.length > 0 && (
                            <>
                                <TipoConteudoTituloEmail titulo={"Artigos"} link={"#"}/>
                                {
                                    boletim.artigos.map((artigo) => (
                                        <div>
                                            <ConteudoEmail titulo={artigo.titulo}
                                                       texto={artigo.descricao}
                                                       link={artigo.link}/>
                                        </div>
                                    ))
                                }
                            </>
                        )
                    }
                    {
                        boletim.cursos.length > 0 && (<>
                            <TipoConteudoTituloEmail titulo={"Cursos"} link={"#"}/>
                            {
                                boletim.cursos.map((curso, ) => (
                                    <div>
                                        <ConteudoEmail link={curso.link}
                                                   texto={curso.descricao}
                                                   titulo={curso.titulo}
                                                   duracao={curso.duracaoEmHoras}/>
                                    </div>
                                ))
                            }
                        </>
                        )
                    }

                    {
                        boletim.eventos.length > 0 && (
                            <>
                                <TipoConteudoTituloEmail titulo={"Eventos"} link={"#"}/>
                                {
                                    boletim.eventos.map((evento) => (
                                        <ConteudoEmail
                                            link={'#'}
                                            texto={evento.descricao}
                                            titulo={evento.titulo}
                                            dataInicio={evento.dataHoraInicio? new Date(evento.dataHoraInicio).toLocaleDateString() : ""}
                                            local={evento.local}
                                        />
                                    ))
                                }
                            </>
                        )
                    }

                    {
                        boletim.noticias.length > 0 && (
                            <>
                                <TipoConteudoTituloEmail titulo={"Noticia"} link={"#"}/>
                                {
                                    boletim.noticias.map((noticia) => (
                                        <ConteudoEmail link={noticia.link}
                                                       texto={noticia.descricao}
                                                       titulo={noticia.titulo}
                                                       dataPublicacao={noticia.dataPublicacao ? new Date (noticia.dataPublicacao).toLocaleDateString() : ""}/>
                                    ))
                                }
                            </>
                        )
                    }
                    {
                        boletim.videos.length > 0  && (
                            <>
                                <TipoConteudoTituloEmail titulo={"Videos"} link={"#"}/>
                                {
                                    boletim.videos.map((video) => (
                                        <ConteudoEmail link={video.link}
                                                       texto={video.descricao}
                                                       titulo={video.titulo}
                                                       video={video.youtube}/>
                                    ))
                                }
                            </>
                        )
                    }
                </Section>
                <FooterEmail/>
            </Container>
        </Body>
    </Html>
)

export default Email;

const main = {
    fontFamily: '"Google Sans",Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
    backgroundColor: cores.branco,
    margin: "0",
}

const container = {
    margin: "0 auto",
    width: "648px",
    maxWidth: "100%",
    position: "relative" as const,
}

const section = {
    margin: "0",
    background: "#fff",
    padding: "0 15px",
}