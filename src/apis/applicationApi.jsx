import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_URL_SHORTNER_SYSTEM

export const applicationAPi = createApi({
    reducerPath: "apis",
    baseQuery: fetchBaseQuery({baseUrl: URL,
        prepareHeaders:(headers) => {
            const token = localStorage.getItem('token');
            console.log("token taken:", token);
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints:(builder)=>({
        signup: builder.mutation({
            query: (data)=>({
                url: "/auth/signup",
                method: "POST",
                body: data
            })
        }),

        login: builder.mutation({
            query: (data)=>({
                url: "/auth/login",
                method: "POST",
                body: data
            })
        }),

        shortenUrl: builder.mutation({
            query: (longUrl)=>({
                url: "/url/shortenUrl",
                method: "POST",
                body: longUrl
            })
        }),
    }),
})

export const { useSignupMutation, useLoginMutation, useShortenUrlMutation } = applicationAPi;