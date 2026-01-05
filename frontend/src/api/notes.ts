export interface Note {
    timestamp: string;
    content: string;
    html: string;
}

const API_BASE = '';

export async function getNotes(): Promise<Note[]> {
    const response = await fetch(`${API_BASE}/notes`);
    if (!response.ok) {
        throw new Error('Failed to fetch notes');
    }
    return response.json();
}

export async function searchNotes(query: string): Promise<Note[]> {
    const response = await fetch(`${API_BASE}/notes/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error('Failed to search notes');
    }
    return response.json();
}

export async function createNote(content: string): Promise<void> {
    const response = await fetch(`${API_BASE}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
    });
    if (!response.ok) {
        throw new Error('Failed to create note');
    }
}

export async function deleteNote(index: number): Promise<void> {
    const response = await fetch(`${API_BASE}/notes/${index}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete note');
    }
}

export async function getNoteContent(index: number): Promise<string> {
    const response = await fetch(`${API_BASE}/notes/${index}/content`);
    if (!response.ok) {
        throw new Error('Failed to get note content');
    }
    return response.text();
}

export async function uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to upload file');
    }

    return response.json();
}
