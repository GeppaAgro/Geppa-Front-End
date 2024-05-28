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

// const mockTitulotArtigo = `Avanços no melhoramento genéticode ovinos da raça Santa Inês`
//
// const mockTextArtigo = `Há décadas, os princípios de melhoramento genético têm sido aplicados de forma bem sucedida
//                             na produção de diferentes espécies de interesse pecuário. Esse sucesso se deve em grande
//                             parte ao
//                             desenvolvimento de métodos estatísticos, ferramentas computacionais e de biologia molecular.
//                             De
//                             modo geral, as cadeias produtivas que mais investiram em melhoramento genético são as que
//                             mais se
//                             desenvolveram e proporcionam maior retorno econômico atualmente. Embora a ovinocultura
//                             represente
//                             uma das principais atividades pecuárias destinadas à produção de proteína animal no mundo, a
//                             maior
//                             parte dos rebanhos ovinos, principalmente em países subdesenvolvidos, ainda não participa de
//                             programas de melhoramento genético. Isto resulta em menor aproveitamento do potencial
//                             econômico que esta atividade tem, frente à crescente demanda por produtos oriundos da
//                             ovinocultura
//                             por consumidores de diferentes culturas e níveis sociais. No caso do Brasil, a raça ovina
//                             nativa Santa
//                             Inês é considerada como a que apresenta maior potencial para atender às demandas do mercado
//                             consumidor por qualidade e quantidade de carne ovina. Esta raça apresenta atributos que a
//                             destacam em relação às demais raças locais e exóticas criadas no país. `

// const mockTitulotCurso = `Associativismo, Cooperativismo e Sindicalismo no Agronegócio`
//
// const mockTextCurso = `Comece a compreender melhor os conceitos, suas diferenças e
//                                                      particularidades. A partir deste aprendizado muitos empreendedores
//                                                      do campo encontram novas oportunidades e fazem bons negócios. `
//
// const mockTituloEvento = `EXPOMEAT`
//
// const mockTextEvento = `O VA da produção vegetal deve ter alta de 14,2%, enquanto a produção animal deve crescer 0,8%, em vez
//                                                      dos 1,6% previstos anteriormente. `
//
// const mockEnderecoEvento = `Av. Olavo Fontoura, 1209 - São Paulo - SP`
//
// const mockTextNoticia = `O VA da produção vegetal deve ter alta de 14,2%, enquanto a produção animal deve crescer 0,8%, em vez
//                                                         dos 1,6% previstos anteriormente. `
//
// const mockTituloNoticia = `PIB agropecuário deve crescer 11,6% em 2023, aponta Ipea`
//
// const mockTituloVideo = `Plantio Direto na Agricultura`
//
// const mockTextVideo = `Descubra os Segredos e Benefícios das Técnicas de Plantio Direto na Agricultura do
//                                                         Século XXI. Este vídeo apresenta uma visão aprofundada das práticas inovadoras que estão
//                                                         revolucionando a maneira como cultivamos alimentos. `
