
import { configureStore } from "@reduxjs/toolkit"

import userRedcer from './Slices/userSlice'
import productReducer from './Slices/productSlice'


export const store = configureStore({

    reducer: {
        userRedcer,
        productReducer,
    },


    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false,
    // }),

})





export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

