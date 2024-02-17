import {Image} from "react-bootstrap";
import LogoGeppa from "../../../../Data/Images/Logos/LogoHorizontalBranca.png";
import cores from "../../Utils/Cores.tsx";

export const FooterEmail = () => {
    return (
        <>
            <div style={{backgroundColor: cores.verdeOliva}}>
                <footer className="d-flex flex-wrap justify-content-between align-items-center p-3 pt-4 mt-5">
                    <div className="col-md-4 d-flex align-items-center">
                        <a href="/" className="text-decoration-none">
                            <Image src={LogoGeppa} style={{width: "30vw", maxWidth: "300px"}} alt="Logo Geppa" fluid/>
                        </a>
                    </div>

                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex text-center">
                        <li className="ms-3">
                            <a className="text-decoration-none" href="https://youtube.com/@podagro?si=7bsw368aou_3LLcF"
                               target="_blank">
                                <i className="ri-youtube-fill fs-2" style={{color: cores.branco}}></i>
                            </a>
                        </li>
                        <li className="ms-3">
                            <a className="text-decoration-none"
                               href="https://www.instagram.com/podagro_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                               target="_blank">
                                <i className="ri-instagram-line fs-2" style={{color: cores.branco}}></i>
                            </a>
                        </li>
                        <li className="ms-3">
                            <a className="text-decoration-none" href="#">
                                <i className="ri-linkedin-fill fs-2" style={{color: cores.branco}}></i>
                            </a>
                        </li>
                    </ul>
                    <div className='p-3 mt-2' style={{color: cores.brancoTransparente}}>
                        <p style={{fontSize: '13px', textAlign: 'justify'}}>
                            Agradecemos por se inscrever em nossa newsletter. Aqui, você terá acesso a uma variedade de
                            materiais, cuidadosamente selecionados e elaborados pelo nosso grupo de pesquisa. Nosso
                            compromisso é fornecer informações relevantes e de qualidade para auxiliar no seu
                            conhecimento sobre o agronegócio animal. No entanto, caso deseje interromper o recebimento
                            de nossos e-mails, fique à vontade para clicar no link abaixo. Agradecemos pelo interesse em
                            nossos conteúdos.
                        </p>
                        <div className='d-flex flex-column flex-sm-row justify-content-center align-items-center gap-1 gap-sm-3'>
                            <a href="#"
                               style={{color: cores.brancoTransparente}}>
                                Cancelar inscrição
                            </a>
                            <a href="#"
                               style={{color: cores.brancoTransparente}}>
                                Visualizar no navegador
                            </a>
                        </div>
                    </div>
                    <p className='mb-0 mt-3' style={{fontSize: '13px', color: cores.brancoTransparente}}>
                        © 2024 GEPPA - Grupo de Estudo e Pesquisa em Produção Animal. Todos os direitos reservados.
                    </p>
                </footer>
            </div>
        </>
    );
};