import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // LE RESULTAT DE L ACTION EST MIS DANS LE STATE
      state.userInfo = action.payload;
      //   LE RESULTAT DE L ACTION EST MIS DANS LE LOCAL STORAGE
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    //     CLEARCREDENTIALS ON APELLE CA LOGOUT POUR L'INSTANT IL Y AURA UN AUTRE LOGOUT DANS  LE USER API SLICE la on va juste
    // effacer du localstorage IL S AGIT DU FRONT END LOGOUT. LE BACK END LOGOUT AURA LIEU DANS LE USER API SLICE

    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});
export const { setCredentials, logout } = authSlice.actions;

// (ON VA LES METTRE DANS LE STORE)

export default authSlice.reducer;
