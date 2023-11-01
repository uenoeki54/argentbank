import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : '',
  token: '',
  fetchInfo: '',
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
      //ON MET LE TOKEN DANS LE STATE
      const retrievedInfo = JSON.parse(localStorage.getItem('userInfo'));
      console.log(retrievedInfo.body.token);
      state.token = retrievedInfo.body.token;
    },
    setUser: (state, action) => {
      console.log(`${state} ${action}`);
      // LE RESULTAT DE L ACTION EST MIS DANS LE STATE
      state.fetchInfo = action.payload;
      //   LE RESULTAT DE L ACTION EST MIS DANS LE LOCAL STORAGE
      localStorage.setItem('fetchInfo', JSON.stringify(action.payload));
    },
    //     CLEARCREDENTIALS E la on va
    // effacer du localstorage IL S AGIT DU FRONT END LOGOUT. LE BACK END LOGOUT AURA LIEU DANS LE USER API SLICE

    removeCredentials: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      state.fetchInfo = '';
      state.token = '';
      localStorage.removeItem('fetchInfo');
    },
  },
});
export const { setCredentials, removeCredentials, setUser } = authSlice.actions;

// (ON VA LES METTRE DANS LE STORE)

export default authSlice.reducer;
