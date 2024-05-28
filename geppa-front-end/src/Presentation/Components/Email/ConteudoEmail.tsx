import {Link, Section, Text} from "@react-email/components"
import cores from "../Utils/Cores.tsx"
import {useState} from "react";

interface ConteudoEmailProps {
    titulo: string
    texto: string
    link: string
    duracao?: number
    dataPublicacao?: string
    video?: boolean
    dataInicio?: string
    local?: string
}

export const ConteudoEmail: React.FC<ConteudoEmailProps> = ({
                                                                titulo, texto, link,
                                                                video, duracao,
                                                                dataInicio, local, dataPublicacao
                                                            }) => {

    return (
        <>
            <Section style={sectionConteudo}>
                <Text style={conteudoTitle}>
                    {titulo}
                </Text>
                {duracao && (
                    <Text style={detalhesConteudo}>
                        Duração: {duracao} Horas
                    </Text>
                )}
                {dataInicio && (
                    <Text style={detalhesConteudo}>
                        Data de início: {dataInicio}
                    </Text>
                )}
                {local && (
                    <Text style={detalhesConteudo}>
                        Local: {local}
                    </Text>
                )}
                {dataPublicacao && (
                    <Text style={detalhesConteudo}>
                        Publicado em: {dataPublicacao}
                    </Text>
                )}
                <Text style={text}>
                    {texto}
                </Text>
                <Link style={leiaMais} href={link}>
                    {video ? 'Assistir ao vídeo' : 'Leia Mais'}
                </Link>
            </Section>
        </>
    )
}

const conteudoTitle = {
    fontWeight: "600",
    lineHeight: "1.1",
    fontSize: "20px",
    marginTop: 0,
    marginBottom: '5px',
    color: cores.marromEscuro,
}

const text = {
    fontSize: "16px",
    marginBottom: 0,
    marginTop: '5px',
    color: cores.marromEscuro
};

const sectionConteudo = {
    width: "95%",
    marginBottom: '15px',
}

const leiaMais = {
    color: cores.verdeOliva,
    fontWeight: 700,
    fontSize: '18px',
    textDecoration: 'underline'
}

const detalhesConteudo = {
    color: cores.marromTerra,
    fontWeight: 600,
    margin: '5px 0',
    fontSize: '16px'
}
