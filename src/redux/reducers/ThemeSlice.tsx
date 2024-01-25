import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { lightTheme, darkTheme } from "@common/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadUserTheme = createAsyncThunk("user/theme", async () => {
  var isDark = (await AsyncStorage.getItem("SPA_Theme")) ?? false;
  return isDark;
});

const initialState = {
  loadingTheme: false,
  isDarkMode: false,
  theme: lightTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggleTheme: (state, action) => {
      console.log("toggleTheme ACTION===>", action);
      AsyncStorage.setItem("SPA_Theme", JSON.stringify(!state.isDarkMode));
      state.isDarkMode = !state.isDarkMode;
      state.theme = state.isDarkMode ? { ...darkTheme } : { ...lightTheme };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadUserTheme.pending, state => {
        state.loadingTheme = true;
      })
      .addCase(loadUserTheme.fulfilled, (state, action) => {
        console.log("loadUserTheme Action====>", action.payload);
        state.loadingTheme = false;
        state.isDarkMode = action.payload ? JSON.parse(action.payload) : false;
        state.theme = state.isDarkMode ? { ...darkTheme } : { ...lightTheme };
      });
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
