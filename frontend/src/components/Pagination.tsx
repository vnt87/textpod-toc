import { Select } from './catalyst';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageNumbers: number[];
    pageSize: number;
    startIndex: number;
    endIndex: number;
    totalItems: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

export function Pagination({
    currentPage,
    pageSize,
    startIndex,
    endIndex,
    totalItems,
    hasPrevPage,
    hasNextPage,
    onPageChange,
    onPageSizeChange,
}: PaginationProps) {
    return (
        <nav
            aria-label="Pagination"
            className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 sm:px-6 rounded-lg mb-6"
        >
            <div className="hidden sm:flex sm:items-center sm:gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-nowrap">Items per page:</span>
                    <Select
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    >
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </Select>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(endIndex, totalItems)}</span> of{' '}
                    <span className="font-medium">{totalItems}</span> results
                </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end gap-3">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={!hasPrevPage}
                    className="relative inline-flex items-center rounded-md bg-white dark:bg-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200 ring-1 ring-inset ring-zinc-300 dark:ring-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Previous
                </button>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!hasNextPage}
                    className="relative inline-flex items-center rounded-md bg-white dark:bg-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200 ring-1 ring-inset ring-zinc-300 dark:ring-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                </button>
            </div>
        </nav>
    );
}
