import domain from "@/helper/backendDomain";

export default async function logOutUser(token: any) {
    const url = `${domain}/auth/logout`;
    const response = await fetch(url, {
        method: "GET",
        cache: 'no-store',
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if(response.status >= 300){
        throw data['message'];
    }
    return data;
}