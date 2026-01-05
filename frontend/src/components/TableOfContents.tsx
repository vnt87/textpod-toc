import { type Note } from '../api/notes';

interface TableOfContentsProps {
    notes: Note[];
    isVisible: boolean;
    pageSize: number;
    onNoteClick: (index: number, pageNumber: number) => void;
}

export function TableOfContents({ notes, isVisible, pageSize, onNoteClick }: TableOfContentsProps) {
    const getTitle = (content: string) => {
        const firstLine = content.split('\n')[0];
        return firstLine.length > 20 ? firstLine.slice(0, 20) + '...' : firstLine;
    };

    return (
        <aside
            className={`
        bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700
        toc-scrollbar transition-all duration-300
        lg:sticky lg:top-6 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto
        fixed right-4 top-20 w-64 max-h-[calc(100vh-7rem)] overflow-y-auto z-50
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5 pointer-events-none lg:opacity-0 lg:translate-x-5'}
      `}
        >
            <h4 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">
                Table of Contents
            </h4>
            <nav className="space-y-1">
                {notes.map((note, index) => {
                    const pageNumber = Math.ceil((index + 1) / pageSize);
                    return (
                        <button
                            key={index}
                            onClick={() => onNoteClick(index, pageNumber)}
                            className="block w-full text-left px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors truncate"
                        >
                            {getTitle(note.content)}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}
