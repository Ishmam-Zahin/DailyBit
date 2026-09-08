'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'
import { reduxStore } from '@/redux/ReduxStore';
import { User } from "@/helper/types";

export default function Providers({
    storeInitials,
    children,
} : Readonly<{
        storeInitials: User,
        children: React.ReactNode
    }>
){
    const queryClient = new QueryClient();
    const store = reduxStore(storeInitials);

    return (
        <>
            <Toaster/>
            <QueryClientProvider client = {queryClient}>
                <Provider store={store}>
                    {children}
                </Provider>
            </QueryClientProvider>
        </>
    );
}