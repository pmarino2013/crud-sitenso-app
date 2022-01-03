
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const contactApi=createApi({
    reducerPath:'contactApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3004'}),
    tagTypes:['Contact'],
    endpoints:(builder)=>({
        getContacts:builder.query({
            query:()=>'/contacts',
            providesTags:['Contact']
        }),
        getContactId:builder.query({
            query:(id)=>`/contacts/${id}`,
            providesTags:['Contact']
        }),
        addContact:builder.mutation({
            query:(contact)=>({
                url:"/contacts",
                method:'POST',
                body:contact
            }),
            invalidatesTags:['Contact']
        }),
        updateContact:builder.mutation({
            query:({id, ...resto})=>({
                url:`/contacts/${id}`,
                method:'PUT',
                body:resto
            }),
            invalidatesTags:['Contact']
        }),
        deleteContact:builder.mutation({
            query:(id)=>({
                url:`/contacts/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['Contact']
        })
    })
})

export const {
    useGetContactsQuery, 
    useGetContactIdQuery, 
    useAddContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation
}=contactApi
