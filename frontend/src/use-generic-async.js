import { useState } from "react";

const useGenericAsync = (handler, errorLogText) => {
    const [ loading, setLoading ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const callback = (...args) => {
        (async () => {
            setLoading(true);
            setErrorMessage(null);
            try {
                await handler(...args);
            } catch (error) {
                console.error(errorLogText, error);
                setErrorMessage(error.errorMessage || "An error occurred.")
            }
            setLoading(false);
        })();
    };
    return [
        loading,
        errorMessage,
        callback
    ]
};

export default useGenericAsync;