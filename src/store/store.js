import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./auth/authSlice";
import { tareasSlice } from "./tareas/tareasSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        tareas: tareasSlice.reducer
    }
})