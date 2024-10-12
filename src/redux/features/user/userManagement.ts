import { baseApi } from "../../api/baseApi";

// Define User type
export interface User {
  payment_url: any;
  data: any;
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  picture: string;
  followers: any[];
  following: any[];
  role: string;
  status: 'verified' | 'unverified';
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: string

}

// Define API response type
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}
export interface ApiResponseSingle<T> {
  data: T;
  name: any,
  message?: string;
  success?: boolean;
}

// Define payload types for mutations
interface VerifyUserPayload {
  email: string;
  code: string;
}

interface PasswordRecoveryPayload {
  email: string;
}

interface UpdateUserPayload {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  picture?: string;
  following: any[];
  followers: any[];
}

// Updated bookingApi with proper types
export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVerifyUser: builder.mutation<ApiResponse<User>, VerifyUserPayload>({
      query: (verifyInfo) => ({
        url: "/verify-user",
        method: "POST",
        body: verifyInfo,
      }),
      invalidatesTags: ["user"],
    }),
    recoveryPassword: builder.mutation<ApiResponse<null>, PasswordRecoveryPayload>({
      query: (verifyInfo) => ({
        url: "auth/forget-password",
        method: "POST",
        body: verifyInfo,
      }),
      invalidatesTags: ["user"],
    }),
    newPassword: builder.mutation<ApiResponse<null>, { email: string; code: string; newPassword: string }>({
      query: (verifyInfo) => ({
        url: "auth/verified-code",
        method: "POST",
        body: verifyInfo,
      }),
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation<ApiResponse<null>, { oldPassword: string; newPassword: string }>({
      query: (verifyInfo) => ({
        url: "auth/change-password",
        method: "POST",
        body: verifyInfo,
      }),
      invalidatesTags: ["user"],
    }),
    getAllUsers: builder.query<ApiResponse<User[]>, void>({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getSingleUser: builder.query<ApiResponseSingle<any>, string>({
      query: (id) => ({
        url: `/auth/users/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation<ApiResponse<User>, { id: string; payload: any }>({
      query: ({ id, payload }) => ({
        url: `/auth/users/${id}`,
        method: "PUT",
        body: payload, // Updating the user
      }),
      invalidatesTags: ["user"],
    }),
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
