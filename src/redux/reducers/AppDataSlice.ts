import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CourtManager from "@src/services/features/Court/CourtManager";
import TermManager from "@src/services/features/Term/TermManager";

export const loadSlots = createAsyncThunk("appdata/loadSlots", async () => {
  const response = await new Promise((resolve, reject) => {
    CourtManager.getSlots(
      {},
      async res => {
        const data = await res?.data?.data;
        resolve(data);
      },
      async err => {
        console.log(err);
        reject(err);
      },
    );
  });
  return response as Slot[];
});

export const loadTerms = createAsyncThunk("appdata/loadTerms", async () => {
  const response = await new Promise((resolve, reject) => {
    TermManager.getAllTerms(
      {},
      async res => {
        const data = await res?.data?.data;
        resolve(data);
      },
      async err => {
        console.log(err);
        reject(err);
      },
    );
  });
  return response as CoachSessionTerm[];
});

interface Slot {
  slotID: number;
  createdAt: string;
  updatedAt: string;
  slotMinutes: number;
}
interface CoachSessionTerm {
  CoachSessionTermID: number;
  createdAt: string;
  updatedAt: string;
  termName: string;
  startDate: string;
  endDate: string;
  termDuration: number;
  noOfSessions: number;
}

interface appDataSliceProps {
  loadingSlots: boolean;
  slots: Slot[] | null;
  loadingTerms: boolean;
  terms: CoachSessionTerm[] | null;
  loadingCourts: boolean;
  courts: any | null;
  loadingCoachs: boolean;
  coachs: any | null;
}

const initialState: appDataSliceProps = {
  loadingSlots: false,
  slots: null,
  loadingTerms: false,
  terms: null,
  loadingCourts: false,
  courts: null,
  loadingCoachs: false,
  coachs: null,
};

const appDataSlice = createSlice({
  name: "appData",
  initialState: initialState,
  reducers: {
    setAppData: (state, action) => {
      state = action.payload;
    },
    setLoadingSlots: (state, action) => {
      state.loadingSlots = action.payload;
    },
    setSlots: (state, action) => {
      state.slots = action.payload;
    },
    setLoadingCourts: (state, action) => {
      state.loadingCourts = action.payload;
    },
    setCourts: (state, action) => {
      state.courts = action.payload;
    },
    setLoadingCoachs: (state, action) => {
      state.loadingCoachs = action.payload;
    },
    setCoachs: (state, action) => {
      state.coachs = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadSlots.pending, state => {
        state.loadingSlots = true;
      })
      .addCase(loadSlots.fulfilled, (state, action) => {
        console.log("At Data", action?.payload);
        state.loadingSlots = false;
        state.slots = action.payload;
      })
      .addCase(loadTerms.pending, state => {
        state.loadingTerms = true;
      })
      .addCase(loadTerms.fulfilled, (state, action) => {
        console.log("At Data", action?.payload);
        state.loadingTerms = false;
        state.terms = action.payload;
      });
  },
});

export const {
  setAppData,
  setLoadingSlots,
  setSlots,
  setLoadingCourts,
  setCourts,
  setLoadingCoachs,
  setCoachs,
} = appDataSlice.actions;
export default appDataSlice.reducer;
