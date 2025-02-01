import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice";

export const store = configureStore({
    reducer: {
        data: slice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch