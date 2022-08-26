import { createContext, useEffect, useReducer } from "react"

const INITIAL_STATE = {
    loading: false
}

export const LoadingContext = createContext(INITIAL_STATE);

const LoadingReducer = (state, action) => {
    switch (action.type) {
        case "LOADER_START":
            return {
                loading: true
            }
        case "LOADER_END":
            return {
                loading: false,
            }
        default:
            return false;
    }
}

export const LoadingContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(LoadingReducer, INITIAL_STATE);
    return (
        <LoadingContext.Provider
            value={{
                loading: state.loading,
                dispatch
            }}>
            {children}
        </LoadingContext.Provider>
    )
}