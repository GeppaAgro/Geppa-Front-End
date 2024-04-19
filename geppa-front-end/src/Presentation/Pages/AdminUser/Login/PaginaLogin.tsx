import './PaginaLogin.css';
import {Container, Form, Image} from "react-bootstrap";
import LogoGeppa from '../../../../Data/Images/Logos/LogoHorizontalCompleto.png';
import {Link} from "react-router-dom";

export const PaginaLogin = () => {
    return (
        <>
            <Container className="login-form-container">
                <Form className="login-form pt-5 pb-4">
                    <div className="login-form-content">
                        <Image src={LogoGeppa} fluid/>
                        <div className="form-group mt-4">
                            <label className='fs-6 fw-bold'>Usuário</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Digite o usuário"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label className='fs-6 fw-bold'>Senha</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Digite sua senha"
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-login">
                                Entrar
                            </button>
                        </div>
                        <p className="text-center mt-3">
                            <Link to={'/'} className={'link-home'}>
                                Ir para a página inicial
                            </Link>
                        </p>
                    </div>
                </Form>
            </Container>
        </>
    );
};