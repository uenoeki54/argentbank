// APISLICE EST COMME UN PARENT SLICE POUR LES AUTRES

import { apiSlice } from './apiSlice';
const USER_URL = 'api/v1/user/login';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// COMME C EST UNE MUTATION ON TAPE "USE" SUIVI DU NOM DE LA MUTATION

export const { useLoginMutation } = usersApiSlice;
