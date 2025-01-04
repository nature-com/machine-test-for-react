import { configureStore } from '@reduxjs/toolkit';
import EmployeeSlice from '../reducers/EmployeeSlice';

const store = configureStore({
    reducer: {
        employee: EmployeeSlice,
    },
    devTools: import.meta.env.DEV,
});

export default store;
