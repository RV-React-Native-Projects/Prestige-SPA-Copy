import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BookingTypes } from "@src/Types/BookingTypes";
import CoachManager from "@src/services/features/Coach/CoachManager";
import CourtManager from "@src/services/features/Court/CourtManager";
import TermManager from "@src/services/features/Term/TermManager";
import moment from "moment";

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

export const loadBooking = createAsyncThunk(
  "appdata/loadBooking",
  async (userId: number) => {
    const response = await new Promise((resolve, reject) => {
      CoachManager.getAllBookingForCustomer(
        { id: userId },
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
    return response as BookingTypes[];
  },
);

export const loadAllCourts = createAsyncThunk(
  "appdata/loadAllCourts",
  async () => {
    const response = await new Promise((resolve, reject) => {
      CourtManager.getAllCourts(
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
    return response as BookingTypes[];
  },
);

export const loadAllCoach = createAsyncThunk(
  "appdata/loadAllCoach",
  async () => {
    const response = await new Promise((resolve, reject) => {
      CoachManager.getAllCoach(
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
    return response as BookingTypes[];
  },
);

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
  loadingBookings: boolean;
  bookings: BookingTypes[] | null;
  upComingBookings: BookingTypes[] | null;
  completedBookings: BookingTypes[] | null;
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
  loadingBookings: false,
  bookings: null,
  upComingBookings: null,
  completedBookings: null,
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
    setLoadingBookings: (state, action) => {
      state.loadingBookings = action.payload;
    },
    setBookings: (state, action) => {
      const today = moment().startOf("day");
      state.bookings = action.payload;
      const filteredUpcoming = action.payload.filter((booking: any) => {
        const bookingDate = moment(booking.bookingDate);
        return bookingDate.isSameOrAfter(today, "day");
      });
      filteredUpcoming.sort((a: any, b: any) =>
        moment(a.bookingDate).diff(moment(b.bookingDate)),
      );
      state.upComingBookings = filteredUpcoming;
      const completedBookings = action.payload.filter((booking: any) => {
        const bookingDate = moment(booking.bookingDate);
        return bookingDate.isBefore(today, "day");
      });
      completedBookings.sort((a: any, b: any) =>
        moment(a.bookingDate).diff(moment(b.bookingDate)),
      );
      state.completedBookings = completedBookings;
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
        state.loadingTerms = false;
        state.terms = action.payload;
      })
      .addCase(loadAllCourts.pending, state => {
        state.loadingCourts = true;
      })
      .addCase(loadAllCourts.fulfilled, (state, action) => {
        state.loadingCourts = false;
        state.courts = action.payload;
      })
      .addCase(loadAllCoach.pending, state => {
        state.loadingCoachs = true;
      })
      .addCase(loadAllCoach.fulfilled, (state, action) => {
        state.loadingCoachs = false;
        state.coachs = action.payload;
      })
      .addCase(loadBooking.pending, state => {
        state.loadingBookings = true;
      })
      .addCase(loadBooking.fulfilled, (state, action) => {
        const today = moment().startOf("day");
        state.loadingBookings = false;
        state.bookings = action.payload;
        const filteredUpcoming = action.payload.filter((booking: any) => {
          const bookingDate = moment(booking.bookingDate);
          return bookingDate.isSameOrAfter(today, "day");
        });
        filteredUpcoming.sort((a: any, b: any) =>
          moment(a.bookingDate).diff(moment(b.bookingDate)),
        );
        state.upComingBookings = filteredUpcoming;
        const completedBookings = action.payload.filter((booking: any) => {
          const bookingDate = moment(booking.bookingDate);
          return bookingDate.isBefore(today, "day");
        });
        completedBookings.sort((a: any, b: any) =>
          moment(b.bookingDate).diff(moment(a.bookingDate)),
        );
        state.completedBookings = completedBookings;
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
  setLoadingBookings,
  setBookings,
} = appDataSlice.actions;
export default appDataSlice.reducer;
