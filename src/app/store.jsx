import { configureStore } from "@reduxjs/toolkit";
import { applicationAPi } from "../apis/applicationApi";

export const store = configureStore({
    reducer: {
        [applicationAPi.reducerPath]: applicationAPi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(applicationAPi.middleware)
})