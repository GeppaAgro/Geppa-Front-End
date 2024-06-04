import React from "react";
import {Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import CustomToast from "./Utils/CustomToast.tsx";
import {useNewsletterSubscription} from "../../Domain/Hooks/useNewsletterSubscription.ts";

const InscricaoNewslleter: React.FC = () => {
    const {email, handleChange, handleSubmit, isSubmitting, toast} = useNewsletterSubscription();

    return (
        <>
            <h4 className="area-inscricao-text text-center mt-2 mt-lg-0 fw-bold col-12 col-md-12">
                Inscreva-se para receber nossos boletins informativos por e-mail.
            </h4>
            <Form onSubmit={handleSubmit}>
                <div className="d-flex row flex-sm-row gap-2 footer-input-newslleter">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Insira seu E-mail"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    <div className="d-flex flex-column justify-content-center flex-sm-row gap-2 footer-buttons">
                        <NavLink to="/sobre" className="btn border-3 fw-semibold">Saiba Mais</NavLink>
                        <button className="btn text-white fw-semibold" type="submit" disabled={isSubmitting}>Cadastrar
                        </button>
                    </div>
                </div>
            </Form>
            {toast && <CustomToast show={!!toast} message={toast.message} isSuccess={toast.isSuccess}/>}
        </>
    );
};

export default InscricaoNewslleter;
