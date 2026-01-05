import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button, Select } from './catalyst';

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
    totalPages,
    pageNumbers,
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Items per page:</span>
                    <Select
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    >
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </Select>
                </div>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    outline
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={!hasPrevPage}
                    className="px-2"
                >
                    <ChevronLeftIcon className="w-4 h-4" />
                </Button>

                <div className="flex items-center gap-1">
                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-1 rounded text-sm transition-colors ${page === currentPage
                                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <Button
                    outline
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!hasNextPage}
                    className="px-2"
                >
                    <ChevronRightIcon className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
