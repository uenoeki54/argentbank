// APISLICE EST COMME UN PARENT SLICE POUR LES AUTRES

import { apiSlice } from './apiSlice';
const USER_URL = 'api/v1/user';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    fetchuser: builder.mutation({
      query: (token) => ({
        url: `${USER_URL}/profile`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    update: builder.mutation({
      query: ({ token, username }) => ({
        url: `${USER_URL}/profile`,
        method: 'PUT',
        body: { userName: username },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

// COMME C EST UNE MUTATION ON TAPE "USE" SUIVI DU NOM DE LA MUTATION

export const { useLoginMutation, useFetchuserMutation, useUpdateMutation } =
  usersApiSlice;
