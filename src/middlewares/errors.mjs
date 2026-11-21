import { sendResponse } from "../utils/response.mjs";

export const errorHandler = () => ({
    onError: (handler) => {
        const error = handler.error;
        const statusCode = error.statusCode || 500;
        if (statusCode >= 500) console.error("ERROR:", error);
     
        handler.response = sendResponse(
            statusCode || 500,
            { error: statusCode < 500 ? error.message : 'Internal Server Error!' }
        );
    }
});