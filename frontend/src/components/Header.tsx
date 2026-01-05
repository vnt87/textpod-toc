import { SunIcon, MoonIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { Button } from './catalyst';

interface HeaderProps {
    isDark: boolean;
    onThemeToggle: () => void;
    isTocVisible: boolean;
    onTocToggle: () => void;
}

export function Header({ isDark, onThemeToggle, isTocVisible, onTocToggle }: HeaderProps) {
    return (
        <header className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    TextPod
                </h1>
                <Button plain onClick={onThemeToggle} aria-label="Toggle theme">
                    {isDark ? (
                        <SunIcon className="w-5 h-5" />
                    ) : (
                        <MoonIcon className="w-5 h-5" />
                    )}
                </Button>
            </div>
            <Button
                color={isTocVisible ? 'blue' : 'dark'}
                plain={!isTocVisible}
                outline={isTocVisible}
                onClick={onTocToggle}
            >
                <ListBulletIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Table of Contents</span>
            </Button>
        </header>
    );
}
