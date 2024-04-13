import {Heading, Text} from "@react-email/components"
import cores from "../Utils/Cores.tsx"

export const BannerEmail = () => {
    return (
        <>
            <Heading style={heading}>
                <strong>GRUPO DE ESTUDO E PESQUISA EM PRODUÇÃO ANIMAL</strong>
                <Text style={subtituloHeading}>Faculdade de Tecnologia de Mogi das Cruzes</Text>
            </Heading>
        </>
    )
}

const heading = {
    background: cores.verdeOliva,
    padding: "30px",
    color: cores.branco,
    fontWeight: "400",
    marginBottom: "0",
    textAlign: "center" as const,
    fontSize: "25px",
}

const subtituloHeading = {
    fontSize: "20px",
    margin: "4px 0 0 0",
    color: cores.brancoTransparente
}