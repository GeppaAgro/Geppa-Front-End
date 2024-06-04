import {Toast, ToastContainer} from "react-bootstrap";
import {FC} from "react";
import cores from "./Cores.tsx";

interface CustomToastProps {
    show: boolean,
    message: string,
    isSuccess: boolean
}

const CustomToast: FC<CustomToastProps> = ({show, message, isSuccess}) => {


    return (
        <ToastContainer
            className="p-3"
            position={"bottom-end"}
            style={{zIndex: 1, position: "fixed"}}
        >
            <Toast show={show}
                   style={{color: cores.branco, backgroundColor: isSuccess ? cores.verdeOliva : cores.vermelho}}>
                <Toast.Body>
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default CustomToast;
