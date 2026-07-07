import { createContext, useContext, useEffect, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const theme: Theme = 'light';

    useEffect(() => {
        // Remove the dark class to prevent black screen flashes on reload
        const root = document.documentElement;
        root.classList.remove('dark');
        localStorage.setItem('frostrek-theme', 'light');
    }, []);

    const toggleTheme = () => {
        // Do nothing, dark mode is removed
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
