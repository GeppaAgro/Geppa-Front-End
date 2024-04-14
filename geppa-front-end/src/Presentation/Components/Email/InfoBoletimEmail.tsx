import {Column, Hr, Row, Section, Text} from "@react-email/components"
import React from "react"
import cores from "../Utils/Cores.tsx"

type InfoBoletimEmailProps = {
    dataPublicacao: Date
    edicao: string
}

export const InfoBoletimEmail: React.FC<InfoBoletimEmailProps> = ({dataPublicacao, edicao}) => {
    return (
        <>
            <Section>
                <Text style={boltimInformativoTitle}>Boletim Informativo</Text>
                <Row style={infoBoletim}>
                    <Column width={100}>
                        <Text style={infoBoletimText}> Edição: {edicao} </Text>
                    </Column>
                    <Column width={100}>
                        <Text style={infoBoletimText}> Data de Publicação: {dataPublicacao.toLocaleDateString()} </Text>
                    </Column>
                </Row>
            </Section>
            <Hr style={hrStyle}/>
        </>
    )
}

const boltimInformativoTitle = {
    fontWeight: "900",
    lineHeight: "1.1",
    fontSize: "23px",
    textAlign: "center" as const,
    color: cores.marromEscuro,
}

const infoBoletim = {
    textAlign: "center" as const,
}

const infoBoletimText = {
    fontWeight: 600,
    color: cores.marromEscuro,
    fontSize: "16px"
}

const hrStyle = {
    border: '1px solid',
    borderColor: cores.marromTerra,
    opacity: '1'
}
