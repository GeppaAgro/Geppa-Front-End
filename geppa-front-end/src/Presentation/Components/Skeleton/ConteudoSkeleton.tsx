import {Container, Placeholder} from "react-bootstrap";

export const ConteudoSkeleton = () => {
    return (
        <>
            <Container className="card-boletim p-2 p-lg-5 mt-1 mb-3 d-flex flex-column justify-content-start">
                <Placeholder as="h3" animation="glow" className="m-1">
                    <Placeholder xs={4}/>
                </Placeholder>
                <div>
                    <Placeholder as="h5" animation="glow" className="m-0">
                        <Placeholder xs={5}/>
                    </Placeholder>
                </div>
                <div className="card-boletim-descricao mt-2 mt-lg-0">
                    <Placeholder as="p" animation="glow" className="m-0">
                        <Placeholder xs={10}/>
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="m-0">
                        <Placeholder xs={7}/>
                    </Placeholder>
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <div className="w-25">
                        <Placeholder as="h1" animation="glow" className="m-0 d-flex justify-content-between">
                            <Placeholder xs={5}/>
                            <Placeholder xs={5}/>
                        </Placeholder>

                    </div>
                    <div className="w-25">
                        <Placeholder as="h2" animation="glow" className="m-0 text-end">
                            <Placeholder xs={8}/>
                        </Placeholder>
                    </div>
                </div>
            </Container>
        </>
    );
};