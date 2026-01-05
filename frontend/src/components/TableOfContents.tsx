import { type Note } from '../api/notes';

interface TableOfContentsProps {
    notes: Note[];
    isVisible: boolean;
    pageSize: number;
    onNoteClick: (index: number, pageNumber: number) => void;
    onClose?: () => void;
}

export function TableOfContents({ notes, isVisible, pageSize, onNoteClick }: TableOfContentsProps) {
    const getTitle = (content: string) => {
        const firstLine = content.split('\n')[0];
        return firstLine.length > 30 ? firstLine.slice(0, 30) + '...' : firstLine;
    };

    return (
        <>
            {/* Backdrop for mobile */}
            <div
                className={`
                    fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden
                    transition-opacity duration-300
                    ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
            />

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 right-0 h-full w-72 z-50
                    bg-white/95 dark:bg-zinc-800/95 backdrop-blur-md
                    border-l border-zinc-200 dark:border-zinc-700
                    shadow-2xl
                    transition-transform duration-300 ease-out
                    ${isVisible ? 'translate-x-0' : 'translate-x-full'}
                    flex flex-col
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
                    <h4 className="text-lg font-semibold text-zinc-900 dark:text-white">
                        Table of Contents
                    </h4>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-700 px-2 py-1 rounded-full">
                        {notes.length} notes
                    </span>
                </div>

                {/* Notes list */}
                <nav className="flex-1 overflow-y-auto p-3 space-y-1 toc-scrollbar">
                    {notes.length === 0 ? (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-8">
                            No notes yet
                        </p>
                    ) : (
                        notes.map((note, index) => {
                            const pageNumber = Math.ceil((index + 1) / pageSize);
                            return (
                                <button
                                    key={index}
                                    onClick={() => onNoteClick(index, pageNumber)}
                                    className="group w-full text-left px-3 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-lg transition-all duration-150 truncate flex items-center gap-2"
                                >
                                    <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-xs font-medium text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-700 rounded group-hover:bg-zinc-200 dark:group-hover:bg-zinc-600 transition-colors">
                                        {index + 1}
                                    </span>
                                    <span className="truncate">{getTitle(note.content)}</span>
                                </button>
                            );
                        })
                    )}
                </nav>
            </aside>
        </>
    );
}

