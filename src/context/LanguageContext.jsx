/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

export const LanguageContext = createContext({
    lang: 'id',
    setLang: () => {},
});

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('id');
    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLang() {
    return useContext(LanguageContext);
}
