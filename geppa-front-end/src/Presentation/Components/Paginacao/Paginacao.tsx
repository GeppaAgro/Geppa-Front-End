import React from 'react';
import {Pagination} from 'react-bootstrap';
import './paginacao.css';
import cores from "../Utils/Cores.tsx";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Paginacao: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {
    const range = (start: number, end: number) => Array.from({length: end - start + 1}, (_, i) => i + start);

    const getVisiblePages = () => {
        const visiblePages = [];
        const startPage = Math.max(0, currentPage - 2);
        const endPage = Math.min(totalPages - 1, currentPage + 2);

        visiblePages.push(...range(startPage, endPage));

        return visiblePages;
    };

    const visiblePages = getVisiblePages();

    return (
        <>

            <Pagination className="justify-content-center mb-1">
                <Pagination.First onClick={() => onPageChange(0)} disabled={currentPage === 0}/>
                <Pagination.Prev disabled={currentPage === 0} onClick={() => onPageChange(currentPage - 1)}/>

                {visiblePages.map((page, index) => (
                    <Pagination.Item key={index} active={page === currentPage} onClick={() => onPageChange(page)}>
                        {page + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next disabled={currentPage === totalPages - 1}
                                 onClick={() => onPageChange(currentPage + 1)}/>
                <Pagination.Last onClick={() => onPageChange(totalPages - 1)}
                                 disabled={currentPage === totalPages - 1}/>
            </Pagination>
            <p className={'text-center fw-semibold fs-6'} style={{color: cores.marromEscuro}}>
                Página {currentPage + 1} de {totalPages}
            </p>
        </>
    );
};
export default Paginacao;
