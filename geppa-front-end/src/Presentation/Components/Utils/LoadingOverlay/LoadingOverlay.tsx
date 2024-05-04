import { Spinner } from 'react-bootstrap';
import './LoadingOverlay.css';

const LoadingOverlay: React.FC = () => {
    return (
        <div className="loading-overlay">
            <Spinner animation="border" />
        </div>
    );
};

export default LoadingOverlay;