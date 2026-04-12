import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const createLead = createAsyncThunk(
  "leads/createLead",
  async (leadData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/leads", leadData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Create failed");
    }
  },
);

export const fetchLeads = createAsyncThunk("leads/getLeads", async () => {
  const res = await API.get("/leads/leads");
  return res.data;
});

export const fetchMyLeads = createAsyncThunk("leads/getMyLeads", async () => {
  const res = await API.get("/leads/my");
  return res.data;
});

export const getMySchedule = createAsyncThunk(
  "leads/getMySchedule",
  async () => {
    const res = await API.get("/leads/schedule/my");
    return res.data;
  },
);

export const uploadCSV = createAsyncThunk(
  "leads/uploadCSV",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await API.post("/leads/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Upload failed");
    }
  },
);

export const assignLead = createAsyncThunk(
  "leads/assignLead",
  async ({ leadId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/leads/${leadId}/assign`, {
        userId,
      });
      return { leadId, userId, data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Assignment failed");
    }
  },
);

export const updateLeadStatus = createAsyncThunk(
  "leads/updateStatus",
  async ({ leadId, status }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/leads/${leadId}/status`, {
        status,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Status update failed");
    }
  },
);

export const updateLeadType = createAsyncThunk(
  "leads/updateType",
  async ({ leadId, type }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/leads/${leadId}/type`, { type });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Type update failed");
    }
  },
);

export const updateLeadDate = createAsyncThunk(
  "leads/updateDate",
  async ({ leadId, date, time }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/leads/${leadId}/schedule`, {
        date,
        time,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Date update failed");
    }
  },
);

const leadSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    schedule: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
    updateLeadLocal: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.leads.findIndex((lead) => lead._id === id);
      if (index !== -1) {
        state.leads[index] = {
          ...state.leads[index],
          ...updates,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLead.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.loading = false;
        state.leads.unshift(action.payload);
        state.success = " Lead created successfully";
      })
      .addCase(createLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload || [];
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(uploadCSV.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadCSV.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
        state.success = "CSV uploaded successfully";
      })
      .addCase(uploadCSV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(assignLead.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignLead.fulfilled, (state, action) => {
        state.loading = false;

        const updatedLead = action.payload.data.lead;

        const index = state.leads.findIndex((l) => l._id === updatedLead._id);

        if (index !== -1) {
          state.leads[index] = updatedLead;
        }

        state.success = "Lead assigned successfully";
      })
      .addCase(assignLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateLeadStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLeadStatus.fulfilled, (state, action) => {
        state.loading = false;

        const updatedLead = action.payload;

        const index = state.leads.findIndex((l) => l._id === updatedLead._id);

        if (index !== -1) {
          state.leads[index] = updatedLead;
        }

        state.success = "Status updated";
      })
      .addCase(updateLeadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLeadType.fulfilled, (state, action) => {
        const updatedLead = action.payload;

        const index = state.leads.findIndex((l) => l._id === updatedLead._id);

        if (index !== -1) {
          state.leads[index] = updatedLead;
        }
      })

      .addCase(updateLeadDate.fulfilled, (state, action) => {
        const updatedLead = action.payload;

        const index = state.leads.findIndex((l) => l._id === updatedLead._id);

        if (index !== -1) {
          state.leads[index] = updatedLead;
        }
      })
      .addCase(fetchMyLeads.fulfilled, (state, action) => {
        state.leads = action.payload;
      })
      .addCase(getMySchedule.fulfilled, (state, action) => {
        state.schedule = action.payload;
      });
  },
});

export const { clearMessages } = leadSlice.actions;
export const { updateLeadLocal } = leadSlice.actions;
export default leadSlice.reducer;
