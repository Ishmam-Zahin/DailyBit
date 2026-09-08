import domain from "@/helper/backendDomain";
import { User } from "@/helper/types";

export default async function loginUser(body: any) {
    const url = `${domain}/auth/login`;
    const response = await fetch(url, {
        method: "POST",
        cache: 'no-store',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if(response.status >= 300 || response.status < 200){
        const msg = await response.text();
        throw msg;
    }
    const data: User = await response.json();
    return data;
}