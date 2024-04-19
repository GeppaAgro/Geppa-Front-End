import {Column, Link, Row, Section, Text} from "@react-email/components"
import cores from "../Utils/Cores.tsx"

interface ConteudoTituloEmailProps {
    titulo: string
    link: string
}

export const TipoConteudoTituloEmail: React.FC<ConteudoTituloEmailProps> = ({titulo, link}) => {
    return (
        <>
            <Section>
                <Row>
                    <Column width={100}>
                        <Text style={tipoConteudoTitle}> {titulo} </Text>
                    </Column>
                    <Column width={100} align={"right"}>
                        <Link target={'_blank'} href={link} style={conteudosLink}> Veja mais {titulo}</Link>
                    </Column>
                </Row>
            </Section>
        </>
    )
}

const tipoConteudoTitle = {
    fontWeight: "900",
    lineHeight: "1.1",
    fontSize: "23px",
    textAlign: "start" as const,
    color: cores.marromEscuro,
}

const conteudosLink = {
    fontWeight: "700",
    lineHeight: "1.1",
    fontSize: "16px",
    color: cores.marromEscuro,
    textDecoration: "underline"
}