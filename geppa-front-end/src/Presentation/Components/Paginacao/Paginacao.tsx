import React from 'react';
import {Pagination} from 'react-bootstrap';
import './paginacao.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Paginacao: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => i + start);

    const getVisiblePages = () => {
        const visiblePages = [];
        const startPage = Math.max(0, currentPage - 2);
        const endPage = Math.min(totalPages - 1, currentPage + 2);

        if (startPage > 0) {
            visiblePages.push(0);
        }

        visiblePages.push(...range(startPage, endPage));

        if (endPage < totalPages - 1) {
            visiblePages.push(totalPages - 1);
        }

        return visiblePages;
    };

    const visiblePages = getVisiblePages();

    return (
        <Pagination className="justify-content-center">
            <Pagination.First onClick={() => onPageChange(0)} disabled={currentPage === 0} />
            <Pagination.Prev disabled={currentPage === 0} onClick={() => onPageChange(currentPage - 1)} />
            {visiblePages.map((page, index) => (
                <Pagination.Item key={index} active={page === currentPage} onClick={() => onPageChange(page)}>
                    {page + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next disabled={currentPage === totalPages - 1} onClick={() => onPageChange(currentPage + 1)} />
            <Pagination.Last onClick={() => onPageChange(totalPages - 1)} disabled={currentPage === totalPages - 1} />
        </Pagination>
    );
};
export default Paginacao;
