import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducer";
import { initializeValues } from "./storeCom";

const store = configureStore({
    reducer: rootReducer,
})

// const store = configureStore({
//     reducer: persistReducer(rootPersistConfig, rootReducer),
//     middleware: ((getDefaultMiddleware) =>
//     getDefaultMiddleware({
//         serializableCheck: false,
//         immutableCheck: false
//     }))
// });

const { dispatch } = store

initializeValues(dispatch, store)

export default store;

