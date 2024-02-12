import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useEncryptedStorage } from "@hooks/useEncryptedStorage";
import { Membership, UserProps } from "@src/Types/UserTypes";
import MemberShipManager from "@src/services/features/MemberShip/MemberShipManager";

export const loadUserData = createAsyncThunk("user/loaduser", async () => {
  const { getStorage } = useEncryptedStorage();

  var userToken = (await getStorage("SPA_User_Token")) ?? null;
  var authToken = (await getStorage("SPA_Auth_Token")) ?? null;
  var refreshToken = (await getStorage("SPA_Refresh_Token")) ?? null;
  var user = (await getStorage("SPA_User")) ?? null;
  return { userToken, authToken, refreshToken, user };
});

export const removeUserData = createAsyncThunk(
  "user/removeUserData",
  async () => {
    const { removeStorage } = useEncryptedStorage();

    await removeStorage("SPA_User_Token");
    await removeStorage("SPA_Auth_Token");
    await removeStorage("SPA_Refresh_Token");
  },
);

export const getAllMembership = createAsyncThunk(
  "appdata/getAllMembership",
  async (userId: number) => {
    const response = await new Promise((resolve, reject) => {
      MemberShipManager.findAllForCustomer(
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
    return response as Membership[];
  },
);

interface userSliceProperties {
  loadingUser?: boolean;
  user?: UserProps | null;
  authHeader?: Record<string, string> | null;
  isUserLoggedIn?: boolean;
  userEmail?: string | null;
  userName?: string | null;
  userPhone?: string | null;
  userToken?: string | null;
  authToken?: string | null;
  refreshToken?: string | null;
  loadingMembership?: boolean;
  membership?: Membership[] | null;
}

const initialState: userSliceProperties = {
  loadingUser: true,
  user: null,
  authHeader: null,
  isUserLoggedIn: false,
  userEmail: null,
  userName: null,
  userPhone: null,
  userToken: null,
  authToken: null,
  refreshToken: null,
  loadingMembership: false,
  membership: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.userEmail = action.payload.email;
      state.userName = action.payload.Account_name;
      state.userPhone = action.payload.phone;
      state.membership = action?.payload?.memberships;
    },
    setLoadingUser: (state, action) => {
      state.loadingUser = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
      state.authHeader = {
        // "x-client-id": JSON.parse(action.payload.userToken),
        Authorization: `Bearer ${action.payload}`,
        "ngrok-skip-browser-warning": "true",
      };
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    appLogout: state => {
      state.user = null;
      state.authHeader = null;
      state.isUserLoggedIn = false;
      state.userEmail = null;
      state.userName = null;
      state.userPhone = null;
      state.userToken = null;
      state.authToken = null;
      state.refreshToken = null;
    },
    resetUser: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(loadUserData.pending, state => {
        state.loadingUser = true;
      })
      .addCase(loadUserData.fulfilled, (state, action) => {
        console.log("loadUserInfo Action====>", action.payload);
        state.userToken = !!action?.payload?.userToken
          ? action?.payload?.userToken
          : null;
        state.user = !!action?.payload?.user ? action?.payload?.user : null;
        state.authToken = !!action.payload.authToken
          ? action.payload.authToken
          : null;
        state.refreshToken = !!action.payload.refreshToken
          ? action.payload.refreshToken
          : null;
        state.authHeader = !!action.payload.authToken
          ? {
              // "x-client-id": JSON.parse(action.payload.userToken),
              Authorization: `Bearer ${action.payload.authToken}`,
              "ngrok-skip-browser-warning": "true",
            }
          : null;
        state.loadingUser = false;
      })
      .addCase(removeUserData.pending, state => {
        state.loadingUser = true;
      })
      .addCase(removeUserData.fulfilled, (state, action) => {
        console.log("remove user====>", action.payload);
        state.userToken = null;
        state.authToken = null;
        state.refreshToken = null;
        state.authHeader = null;
        state.loadingUser = false;
      });
  },
});

export const {
  setUser,
  setUserToken,
  setAuthToken,
  setRefreshToken,
  setLoadingUser,
  appLogout,
  resetUser,
} = userSlice.actions;
export default userSlice.reducer;
