import {Img, Link, Section} from "@react-email/components"
import cores from "../Utils/Cores.tsx"

export const HeaderEmail = () => {
    return (
        <>
            <Section style={header}>
                <Link href={'#'}>
                    <Img
                        style={imgHeader}
                        src='https://firebasestorage.googleapis.com/v0/b/geppa-5dff2.appspot.com/o/LogoHorizontal.png?alt=media&token=6b100377-dcab-47ab-aadc-4d4522699544'
                        width={280}
                        alt="geppaLogo"
                    />
                </Link>
            </Section>
        </>
    )
}

const header = {
    width: "100%",
    backgroundColor: cores.branco,
    margin: "0 auto",
    paddingBottom: "30px",
    zIndex: "999",
}

const imgHeader = {
    margin: "auto",
    marginTop: "15px",
    maxWidth: "100%",
}
