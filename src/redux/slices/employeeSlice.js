import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchEmployees = createAsyncThunk(
  "employees/fetch",
  async (page = 1, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/employees");
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  },
);

export const createEmployee = createAsyncThunk(
  "employees/create",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/employees", form);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  },
);

export const deleteEmployees = createAsyncThunk(
  "employees/delete",
  async (ids, { rejectWithValue }) => {
    try {
      await API.delete("/employees", { data: { ids } });
      return ids;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  },
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        console.log("API DATA", action.payload);
        state.employees = action.payload.users || [];

        state.total = action.payload.total || 0;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.unshift(action.payload);
      })

      .addCase(deleteEmployees.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (user) => !action.payload.includes(user._id),
        );
      });
  },
});

export default employeeSlice.reducer;
