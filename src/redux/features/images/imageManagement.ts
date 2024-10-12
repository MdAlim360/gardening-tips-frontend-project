import { baseApi } from "../../api/baseApi";
// Define the type for a single image
interface ImageItem {
    title: string;
    img: string;
    price: string;
    length: any
}

// Define the type for the API response
interface GetImagesResponse {
    length: number;
    data: {
        result: ImageItem[];
    };
}
export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createImage: builder.mutation({
            query: (postInfo) => ({
                url: "/images/",
                method: "POST",
                body: postInfo,
            }),
            invalidatesTags: ["image"],
        }),
        getAllImage: builder.query<GetImagesResponse, void>({
            query: () => ({
                url: "/images/",
                method: "GET",
            }),
            providesTags: ["image"],
        }),
    }),
});

export const { useCreateImageMutation, useGetAllImageQuery } = bookingApi;
