import './PaginaLogin.css';
import {Container, Form, Image} from "react-bootstrap";
import LogoGeppa from '../../../../Data/Images/Logos/LogoHorizontalCompleto.png';
import {Link} from "react-router-dom";
import AxiosClient from "../../../../Domain/Services/AxiosClient.ts";
import {useState} from "react";

export const PaginaLogin = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!username || !password) {
            setError("Por favor, preencha todos os campos");
            return;
        }

        try {
            const response = await AxiosClient.post(`/auth/signin`, {
                username,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.dados.acessToken);
                localStorage.setItem('refreshToken', response.data.dados.refreshToken);
                window.location.href = '/admin';
            }
        } catch (err) {
            setError("Usuário ou senha inválidos");
        }
    };

    return (
        <>
            <Container className="login-form-container">
                <Form className="login-form pt-5 pb-4" onSubmit={handleSubmit}>
                    <div className="login-form-content">
                        <Image src={LogoGeppa} fluid/>
                        <div className="form-group mt-4">
                            <label className='fs-6 fw-bold'>Usuário</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Digite o usuário"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label className='fs-6 fw-bold'>Senha</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Digite sua senha"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <div>
                            <p className="text-danger mt-2">{error}</p>
                        </div>}
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