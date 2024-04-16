import {Container, Placeholder} from "react-bootstrap";
import {ConteudoSkeleton} from "./ConteudoSkeleton.tsx";

export const PaginaBoletimSkeleton = () => {
    return (
        <>
            {Array.from({length: 5}).map((_, index) => (
                <Container>
                    <div key={index} className="mx-auto mt-5">
                        <div className="d-flex justify-content-between">
                            <div className="w-25">
                                <Placeholder as="h3" animation="glow" className="m-0">
                                    <Placeholder xs={6}/>
                                </Placeholder>
                            </div>
                            <div className="w-25">
                                <Placeholder as="h3" animation="glow" className="m-0 text-end">
                                    <Placeholder xs={6}/>
                                </Placeholder>
                            </div>
                        </div>
                        <div className="px-4">
                            <ConteudoSkeleton/>
                        </div>
                    </div>
                </Container>
            ))}
        </>
    );
};
