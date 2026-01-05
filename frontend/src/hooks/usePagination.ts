import { useState, useMemo, useEffect } from 'react';

interface UsePaginationOptions {
    totalItems: number;
    defaultPageSize?: number;
    storageKey?: string;
}

export function usePagination({ totalItems, defaultPageSize = 20, storageKey = 'pagination' }: UsePaginationOptions) {
    const [currentPage, setCurrentPage] = useState(() => {
        if (typeof window === 'undefined') return 1;
        const stored = localStorage.getItem(`${storageKey}_page`);
        return stored ? parseInt(stored, 10) : 1;
    });

    const [pageSize, setPageSize] = useState(() => {
        if (typeof window === 'undefined') return defaultPageSize;
        const stored = localStorage.getItem(`${storageKey}_size`);
        return stored ? parseInt(stored, 10) : defaultPageSize;
    });

    const totalPages = Math.ceil(totalItems / pageSize) || 1;

    // Ensure current page is valid when total changes
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem(`${storageKey}_page`, String(currentPage));
    }, [currentPage, storageKey]);

    useEffect(() => {
        localStorage.setItem(`${storageKey}_size`, String(pageSize));
    }, [pageSize, storageKey]);

    const { startIndex, endIndex } = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        const end = Math.min(start + pageSize, totalItems);
        return { startIndex: start, endIndex: end };
    }, [currentPage, pageSize, totalItems]);

    const goToPage = (page: number) => {
        const validPage = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(validPage);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const changePageSize = (newSize: number) => {
        setPageSize(newSize);
        setCurrentPage(1); // Reset to first page when page size changes
    };

    // Generate visible page numbers
    const pageNumbers = useMemo(() => {
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        const end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        const pages: number[] = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }, [currentPage, totalPages]);

    return {
        currentPage,
        pageSize,
        totalPages,
        startIndex,
        endIndex,
        pageNumbers,
        goToPage,
        nextPage,
        prevPage,
        changePageSize,
        hasPrevPage: currentPage > 1,
        hasNextPage: currentPage < totalPages,
    };
}
