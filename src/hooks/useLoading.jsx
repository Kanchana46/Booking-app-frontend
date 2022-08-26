// LoadingContext.js
import { createContext, useContext, useState } from "react";

const LoadingContext = createContext({
    loadings: false,
    setLoadings: null,
});

export function LoadingProvider({ children }) {
    const [loadings, setLoadings] = useState(false);
    const value = { loadings, setLoadings };
    return (
        <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within LoadingProvider");
    }
    return context;
}