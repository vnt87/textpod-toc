import { ClockIcon, DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/24/outline';
import { type Note } from '../api/notes';

interface NoteCardProps {
    note: Note;
    index: number;
    onCopy: (index: number) => void;
    onDelete: (index: number) => void;
    isHighlighted?: boolean;
}

export function NoteCard({ note, index, onCopy, onDelete, isHighlighted }: NoteCardProps) {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            onDelete(index);
        }
    };

    return (
        <div
            id={`note-${index}`}
            className={`bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-4 mb-4 ${isHighlighted ? 'note-highlight' : ''
                }`}
        >
            <div
                className="prose dark:prose-invert max-w-none text-zinc-900 dark:text-white"
                dangerouslySetInnerHTML={{ __html: note.html }}
            />
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-700">
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <ClockIcon className="w-4 h-4" />
                    <time dateTime={note.timestamp}>{note.timestamp}</time>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onCopy(index)}
                        className="p-1.5 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                        title="Copy note"
                    >
                        <DocumentDuplicateIcon className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-1.5 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        title="Delete note"
                    >
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
