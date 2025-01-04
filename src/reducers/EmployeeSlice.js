import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../stores/api';

export const employeeList = createAsyncThunk(
    'employee/employeeList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/employee/list');
            console.log("response", response)
            if (response?.data?.code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const employeeView = createAsyncThunk(
    'employee/employeeView',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/employee/${id}`);
            console.log("response", response)
            if (response?.data?.code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const updateEmployee = createAsyncThunk(
    'employee/updateEmployee',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/employee-update/${id}`, data);
            console.log("response", response)
            if (response?.data?.code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/employee-remove/${id}`);
            console.log("response", response)
            if (response?.data?.code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    message: null,
    employeeListing: {},
    employeeDetails: {},
    loadingUpdate: false,
    loadingDelete: false,
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(employeeList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(employeeList.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.employeeListing = payload;
            })
            .addCase(employeeList.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload;
            })

            .addCase(employeeView.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(employeeView.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.employeeDetails = payload;
            })
            .addCase(employeeView.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload;
            })

            .addCase(updateEmployee.pending, (state) => {
                state.loadingUpdate = true;
                state.error = null;
            })
            .addCase(updateEmployee.fulfilled, (state, { payload }) => {
                state.loadingUpdate = false;
                state.message = payload;
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.loadingUpdate = false;
                state.error = action?.payload;
            })

            .addCase(deleteEmployee.pending, (state) => {
                state.loadingDelete = true;
                state.error = null;
            })
            .addCase(deleteEmployee.fulfilled, (state, { payload }) => {
                state.loadingDelete = false;
                state.message = payload;
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.loadingDelete = false;
                state.error = action?.payload;
            })
    },
});

export default employeeSlice.reducer;
