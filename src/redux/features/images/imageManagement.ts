import { baseApi } from "../../api/baseApi";

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder: any) => ({
        createImage: builder.mutation({
            query: (postInfo: any) => ({
                url: "/images/",
                method: "POST",
                body: postInfo,
            }),
            invalidatesTags: ["image"],
        }),
        getAllImage: builder.query({
            query: () => ({
                url: "/images/",
                method: "GET",
            }),
            providesTags: ["image"],
        }),





    }),
});

export const { useCreateImageMutation, useGetAllImageQuery } = bookingApi;
