import { baseApi } from "../../api/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    createPost: builder.mutation({
      query: (postInfo: any) => ({
        url: "/posts/",
        method: "POST",
        body: postInfo,
      }),
      invalidatesTags: ["post"],
    }),
    getAllPost: builder.query({
      query: () => ({
        url: "/posts/",
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    // getSingleUser: builder.query({
    //   query: (id: string) => ({
    //     url: `/auth/users/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["user"],
    // }),
    getMyPost: builder.query({
      query: (id) => ({
        url: `/my-post/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    getSinglePost: builder.query({
      query: (id: string) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    updatePost: builder.mutation({
      query: ({ id, payload }: { id: string; payload: any }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: payload, // Updating the booking status
      }),
      invalidatesTags: ["post"],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetMyPostQuery,
  useGetSinglePostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetAllPostQuery,
} = bookingApi;
