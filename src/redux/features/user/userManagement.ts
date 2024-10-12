import { baseApi } from "../../api/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    // createBooking: builder.mutation({
    //   query: (bookingInfo) => ({
    //     url: "/bookings",
    //     method: "POST",
    //     body: bookingInfo,
    //   }),
    //   invalidatesTags: ["booking"],
    // }),
    createVerifyUser: builder.mutation({
      query: (verifyInfo: any) => ({
        url: "/verify-user",
        method: "POST",
        body: verifyInfo,
      }),
      invalidatesTags: ["user"],
    }),
    recoveryPassword: builder.mutation({
      query: (verifyInfo: any) => ({
        url: "auth/forget-password",
        method: "POST",
        body: verifyInfo,
      }),
      invalidatesTags: ["user"],
    }),
    newPassword: builder.mutation({
      query: (verifyInfo: any) => ({
        url: "auth/verified-code",
        method: "POST",
        body: verifyInfo,
      }),
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation({
      query: (verifyInfo: any) => ({
        url: "auth/change-password",
        method: "POST",
        body: verifyInfo,
      }),
      invalidatesTags: ["user"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getSingleUser: builder.query({
      query: (id: string) => ({
        url: `/auth/users/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    // getMyBookings: builder.query({
    //   query: () => ({
    //     url: "/my-bookings",
    //     method: "GET",
    //   }),
    //   providesTags: ["booking"],
    // }),
    updateUser: builder.mutation({
      query: ({ id, payload }: { id: string; payload: any }) => ({
        url: `/auth/users/${id}`,
        method: "PUT",
        body: payload, // Updating the booking status
      }),
      invalidatesTags: ["user"],
    }),

    // deleteBooking: builder.mutation({
    //   query: (id) => ({
    //     url: `/bookings/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["booking"],
    // }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useGetSingleUserQuery,
  useCreateVerifyUserMutation,
  useRecoveryPasswordMutation,
  useNewPasswordMutation,
  useChangePasswordMutation,
} = bookingApi;
