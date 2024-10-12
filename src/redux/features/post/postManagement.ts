import { baseApi } from "../../api/baseApi";
interface UpVote {
  userId: string;
  upvote: any;
}
interface DownVote {
  userId: string;
  downvote: any;
}
// Define the types for a Post and the API response
interface Post {
  tag: string;
  _id: string
  id: string;
  title: string;
  content: string;
  category: string;
  upvote?: UpVote[] | undefined;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  favorite: any;
  downvote?: DownVote[] | undefined;
  comments: any
}

interface ApiResponse<T> {
  data: { result: T }; // Corrected line
  message?: string;
  success?: boolean;
}
interface ApiResponseUpdate<T> {
  id: string; payload: { comments: T, name: any }
  message?: string;
  success?: boolean;
}
interface ApiResponseSingle<T> {
  data: {
    user: T, _id: any, category: any,
    comments: any,
    createdAt: any,
    downvote: any,
    isDeleted: any,
    picture: any,
    post: any,
    tag: any,
    updatedAt: any,
    favorite: any,
    upvote: any

  };// Corrected line
  message?: string;
  success?: boolean;
}
interface ApiMyResponse<T> {
  result: T, uses: any, data: any // Corrected line
  message?: string;
  success?: boolean;
}

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<ApiResponse<any>, Partial<Post>>({
      query: (postInfo) => ({
        url: "/posts/",
        method: "POST",
        body: postInfo,
      }),
      invalidatesTags: ["post"],
    }),
    getAllPost: builder.query<ApiResponse<any[]>, void>({
      query: () => ({
        url: "/posts/",
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    getMyPost: builder.query<ApiMyResponse<any>, string>({
      query: (id) => ({
        url: `/my-post/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    getSinglePost: builder.query<ApiResponseSingle<any>, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    updatePost: builder.mutation<ApiResponseUpdate<any>, { id: string; payload: any }>({
      query: ({ id, payload }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["post"],
    }),
    deletePost: builder.mutation<ApiResponse<any>, string>({
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
