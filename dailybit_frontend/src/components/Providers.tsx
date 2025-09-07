'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';

export default function Providers({
    children,
} : Readonly<{
        children: React.ReactNode
    }>
){
    const queryClient = new QueryClient();

    return (
        <>
            <Toaster/>
            <QueryClientProvider client = {queryClient}>
                {children}
            </QueryClientProvider>
        </>
    );
}