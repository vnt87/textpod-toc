import { useState, useRef, useCallback } from 'react';
import { Button, Textarea } from './catalyst';
import { uploadFile } from '../api/notes';

interface EditorProps {
    onSubmit: (content: string) => Promise<void>;
    onSearch: (query: string) => void;
}

export function Editor({ onSubmit, onSearch }: EditorProps) {
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setContent(value);

        // Search mode when starting with /
        if (value.startsWith('/')) {
            onSearch(value.slice(1));
        } else if (value === '') {
            onSearch('');
        }
    };

    const handleSubmit = async () => {
        if (!content || content.startsWith('/')) return;

        setIsSubmitting(true);
        try {
            await onSubmit(content);
            setContent('');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'Enter' && !content.startsWith('/')) {
            handleSubmit();
        }
    };

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault();
        const files = e.dataTransfer.files;

        for (const file of files) {
            try {
                const path = await uploadFile(file);
                const filename = path.split('/').pop() || file.name;

                const textarea = textareaRef.current;
                if (!textarea) continue;

                const position = textarea.selectionStart;
                const before = content.substring(0, position);
                const after = content.substring(position);

                const needsBrackets = path.includes(' ') || filename.includes(' ');
                const formattedPath = needsBrackets ? `<${path}>` : path;

                const insertion = file.type.startsWith('image/')
                    ? `![${filename}](${formattedPath})`
                    : `[${filename}](${formattedPath})`;

                setContent(`${before}${insertion}${after}`);
            } catch (err) {
                console.error('Failed to upload file:', err);
            }
        }
    }, [content]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <div className="mb-8">
            <Textarea
                ref={textareaRef}
                value={content}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                placeholder={`Ctrl+Enter to save.\nType / to search.\nDrag & drop files to attach.\nStart links with + to save local copies.`}
                className="mb-4 min-h-[200px]"
                rows={8}
            />
            <div className="flex justify-end">
                <Button
                    color="blue"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !content || content.startsWith('/')}
                >
                    {isSubmitting ? 'Saving...' : 'Submit'}
                </Button>
            </div>
        </div>
    );
}
