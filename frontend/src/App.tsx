import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Editor } from './components/Editor';
import { NoteCard } from './components/NoteCard';
import { Pagination } from './components/Pagination';
import { TableOfContents } from './components/TableOfContents';
import { ToastContainer, useToast } from './components/Toast';
import { useNotes } from './hooks/useNotes';
import { useTheme } from './hooks/useTheme';
import { usePagination } from './hooks/usePagination';
import { getNoteContent } from './api/notes';

function App() {
  const { isDark, toggle: toggleTheme } = useTheme();
  const { notes, loading, error, setSearchQuery, addNote, removeNote } = useNotes();
  const { toasts, addToast, dismissToast } = useToast();

  const [tocVisible, setTocVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('tocVisible') !== 'false';
  });

  const [highlightedNote, setHighlightedNote] = useState<number | null>(null);

  const pagination = usePagination({
    totalItems: notes.length,
    defaultPageSize: 20,
    storageKey: 'notes_pagination',
  });

  const paginatedNotes = notes.slice(pagination.startIndex, pagination.endIndex);

  const handleTocToggle = () => {
    setTocVisible((prev) => {
      localStorage.setItem('tocVisible', String(!prev));
      return !prev;
    });
  };

  const handleSubmit = async (content: string) => {
    try {
      await addNote(content);
      addToast('success', 'Note saved successfully');
    } catch {
      addToast('error', 'Failed to save note');
    }
  };

  const handleCopy = async (index: number) => {
    try {
      const content = await getNoteContent(index);
      await navigator.clipboard.writeText(content);
      addToast('success', 'Note copied to clipboard');
    } catch {
      addToast('error', 'Failed to copy note');
    }
  };

  const handleDelete = async (index: number) => {
    try {
      await removeNote(index);
      addToast('success', 'Note deleted');
    } catch {
      addToast('error', 'Failed to delete note');
    }
  };

  const handleTocNoteClick = useCallback((noteIndex: number, pageNumber: number) => {
    pagination.goToPage(pageNumber);

    // Delay to allow page change to render
    setTimeout(() => {
      const element = document.getElementById(`note-${noteIndex}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setHighlightedNote(noteIndex);
        setTimeout(() => setHighlightedNote(null), 750);
      }
    }, 100);
  }, [pagination]);

  // Process notes HTML to add target="_blank" to links
  const processedNotes = paginatedNotes.map((note) => {
    const div = document.createElement('div');
    div.innerHTML = note.html;
    div.querySelectorAll('a').forEach((link) => {
      if (link.href.startsWith('http')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
    return { ...note, html: div.innerHTML };
  });

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 transition-colors">
      <div className={`container mx-auto p-4 max-w-6xl transition-all duration-300 ${tocVisible ? 'lg:pr-72' : ''}`}>
        <Header
          isDark={isDark}
          onThemeToggle={toggleTheme}
          isTocVisible={tocVisible}
          onTocToggle={handleTocToggle}
        />

        <TableOfContents
          notes={notes}
          isVisible={tocVisible}
          pageSize={pagination.pageSize}
          onNoteClick={handleTocNoteClick}
          onClose={() => setTocVisible(false)}
        />

        <div>
          <main>
            <Editor onSubmit={handleSubmit} onSearch={setSearchQuery} />

            {loading && (
              <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                Loading notes...
              </div>
            )}

            {error && (
              <div className="text-center py-8 text-red-500">
                Error: {error}
              </div>
            )}

            {!loading && !error && (
              <>
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  pageNumbers={pagination.pageNumbers}
                  pageSize={pagination.pageSize}
                  startIndex={pagination.startIndex}
                  endIndex={pagination.endIndex}
                  totalItems={notes.length}
                  hasPrevPage={pagination.hasPrevPage}
                  hasNextPage={pagination.hasNextPage}
                  onPageChange={pagination.goToPage}
                  onPageSizeChange={pagination.changePageSize}
                />

                <div>
                  {processedNotes.map((note, idx) => {
                    const globalIndex = pagination.startIndex + idx;
                    return (
                      <NoteCard
                        key={globalIndex}
                        note={note}
                        index={globalIndex}
                        onCopy={handleCopy}
                        onDelete={handleDelete}
                        isHighlighted={highlightedNote === globalIndex}
                        revealDelay={idx * 50}
                      />
                    );
                  })}
                </div>

                {notes.length === 0 && (
                  <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
                    No notes yet. Start typing above to create your first note!
                  </div>
                )}
              </>
            )}
          </main>
        </div>

        <footer className="mt-12 pb-8 text-center">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
            Crafted with ❤️ by VNTools
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Textpod created by{' '}
            <a
              href="https://github.com/freetonik/textpod"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              Rakhim Davletkaliyev
            </a>
            {' • '}
            Modified by{' '}
            <a
              href="https://github.com/vnt87/textpod-toc"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              VNTools
            </a>
          </div>
        </footer>
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
