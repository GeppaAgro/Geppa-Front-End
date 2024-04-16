import {Placeholder} from "react-bootstrap";

export const LinhaSkeleton = () => {
    return (
        <>
            <Placeholder as="p" animation="glow" className="m-0">
                <Placeholder xs={12}/>
            </Placeholder>
        </>
    );
};