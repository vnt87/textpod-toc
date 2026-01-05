import { useState, useEffect, useCallback } from 'react';
import { type Note, getNotes, searchNotes, createNote, deleteNote, getNoteContent } from '../api/notes';

export function useNotes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchNotes = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = searchQuery
                ? await searchNotes(searchQuery)
                : await getNotes();

            // Sort by timestamp descending (newest first)
            const sorted = [...data].sort((a, b) => {
                const dateA = new Date(a.timestamp);
                const dateB = new Date(b.timestamp);
                return dateB.getTime() - dateA.getTime();
            });

            setNotes(sorted);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch notes');
        } finally {
            setLoading(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const addNote = async (content: string) => {
        try {
            await createNote(content);
            await fetchNotes();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create note');
            throw err;
        }
    };

    const removeNote = async (index: number) => {
        try {
            await deleteNote(index);
            await fetchNotes();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete note');
            throw err;
        }
    };

    const copyNote = async (index: number): Promise<string> => {
        try {
            return await getNoteContent(index);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to copy note');
            throw err;
        }
    };

    return {
        notes,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        addNote,
        removeNote,
        copyNote,
        refresh: fetchNotes,
    };
}
