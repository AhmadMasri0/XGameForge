import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export const ErrorProvider = () => {
    const [error, setError] = useState(null);


    return <ErrorContext.Provider value={{ error, setError }}>
        {error && (
            <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="error">{error}</Alert>
            </Snackbar>
        )}
    </ErrorContext.Provider>
};

export default useError = () => useContext(ErrorContext);
