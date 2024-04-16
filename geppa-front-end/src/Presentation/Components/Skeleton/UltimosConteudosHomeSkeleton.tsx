import {Col, Container, Placeholder, Row} from "react-bootstrap";

export const UltimosConteudosHomeSkeleton = () => {
    return (
        <Container>
            <Row className="d-flex justify-content-between align-items-center align-bottom">
                <Col>
                    <Placeholder as="h3" animation="glow" className="m-0">
                        <Placeholder xs={6} className="rounded" />
                    </Placeholder>
                </Col>
                <Col className="text-end">
                    <Placeholder as="p" animation="glow"  className="align-content-end">
                        <Placeholder xs={2} className="rounded" />
                    </Placeholder>
                </Col>
            </Row>
            <Row>
                {Array.from({ length: 4 }).map((_, index) => (
                    <Col key={index} lg={6} xl={6} className={`mb-4 ${index % 2 === 0 ? "mb-lg-0" : ""}`}>
                        <Container className="card-ultimos-conteudos align-items-center d-flex gap-4 p-2">
                            <Placeholder as="p" animation="glow" className="m-0 w-100 h-100">
                                <Placeholder xs={12} className="rounded" />
                            </Placeholder>
                        </Container>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

