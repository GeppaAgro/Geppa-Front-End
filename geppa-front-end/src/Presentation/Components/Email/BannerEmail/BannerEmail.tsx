import cores from "../../Utils/Cores.tsx";

const BannerEmail = () => {
    return (
        <>
            <div className="banner d-flex flex-column text-center"
                 style={{backgroundColor: 'var(--VerdeOliva)', padding: '35px'}}>
                <h2 className="fs-1 fw-bold" style={{color: cores.branco}}>
                    GRUPO DE ESTUDO E PESQUISA EM PRODUÇÃO ANIMAL
                </h2>
                <h4 className="fw-normal fs-4" style={{color: cores.brancoTransparente}}>
                    Faculdade de Tecnologia de Mogi das Cruzes
                </h4>
            </div>
        </>
    );
};

export default BannerEmail;