import {Column, Img, Link, Row, Section, Text} from "@react-email/components"
import cores from "../Utils/Cores.tsx"

export const FooterEmail = () => {
    return (
        <>
            <Section style={footerSection}>
               <Link href={'#'}>
                   <Img
                       style={imgFooter}
                       src={'https://firebasestorage.googleapis.com/v0/b/geppa-5dff2.appspot.com/o/LogoHorizontalBranca.png?alt=media&token=400011ba-a8c5-4840-b76c-40e49ccc4aa1'}
                       width={280}
                       alt="geppaLogo"
                   />
               </Link>
                <Section style={footerTextSection}>
                    <Text style={footerText}>
                        Obrigado por se inscrever em nossa newsletter sobre agronegócio animal. Aqui, você terá
                        acesso a materiais selecionados e elaborados por nosso grupo de pesquisa. Nosso compromisso
                        é fornecer informações relevantes para auxiliar no seu conhecimento. Agradecemos pelo
                        interesse em nossos conteúdos.
                    </Text>
                </Section>
                <Section>
                    <Row>
                        <Column width={100} align={"center"}>
                            <Link target={'_blank'} href={"link-cancelamento-inscricao"} style={linkFooter}>
                                Cancelar inscrição
                            </Link>
                        </Column>
                        <Column width={100} align={"center"}>
                            <Link target={'_blank'} href={"#"} style={linkFooter}>
                                Ver mais
                            </Link>
                        </Column>
                    </Row>
                    <Text style={direitosAutoraisText}>
                        © 2024 GEPPA - Grupo de Estudo e Pesquisa em Produção Animal. Todos os direitos reservados.
                    </Text>
                </Section>
            </Section>
        </>
    )
}

const footerSection = {
    marginTop: "20px",
    backgroundColor: cores.verdeOliva,
    textAlign: "center" as const,
}

const footerTextSection = {
    width: "95%"
}

const footerText = {
    color: cores.brancoTransparente,
    fontSize: '13px',
    textAlign: 'justify' as const,
}


const linkFooter = {
    textAlign: "center" as const,
    color: cores.brancoTransparente,
    textDecoration: 'underline'
}

const imgFooter = {
    margin: "auto",
    marginTop: "15px",
    maxWidth: "100%",
}

const direitosAutoraisText = {
    color: cores.branco,
    marginBottom: '25px'
}
