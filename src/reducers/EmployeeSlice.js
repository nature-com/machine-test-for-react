import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../stores/api';

export const employeeList = createAsyncThunk(
    'employee/employeeList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/employee/list');
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
    loadingList: false,
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
                state.loadingList = true;
                state.error = null;
                state.message = null;
            })
            .addCase(employeeList.fulfilled, (state, { payload }) => {
                state.loadingList = false;
                state.employeeListing = payload;
                state.message = payload?.message;
            })
            .addCase(employeeList.rejected, (state, { payload }) => {
                state.loadingList = false;
                state.error = payload?.message;
            })

            .addCase(employeeView.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(employeeView.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.employeeDetails = payload;
                state.message = payload?.message;
            })
            .addCase(employeeView.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message;
            })

            .addCase(updateEmployee.pending, (state) => {
                state.loadingUpdate = true;
                state.error = null;
                state.message = null;
            })
            .addCase(updateEmployee.fulfilled, (state, { payload }) => {
                state.loadingUpdate = false;
                state.message = payload?.message;
            })
            .addCase(updateEmployee.rejected, (state, { payload }) => {
                state.loadingUpdate = false;
                state.error = payload?.message;
            })

            .addCase(deleteEmployee.pending, (state) => {
                state.loadingDelete = true;
                state.error = null;
                state.message = null;
            })
            .addCase(deleteEmployee.fulfilled, (state, { payload }) => {
                state.loadingDelete = false;
                state.message = payload?.message;
            })
            .addCase(deleteEmployee.rejected, (state, { payload }) => {
                state.loadingDelete = false;
                state.error = payload?.message;
            })
    },
});

export default employeeSlice.reducer;
