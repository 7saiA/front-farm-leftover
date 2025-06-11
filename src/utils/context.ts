import React from "react";

interface FLContextType {
    changePage: (page: string) => void;
}


const defaultValue: FLContextType = {
    changePage: () => {},
}
export const FLContext = React.createContext<FLContextType>(defaultValue);