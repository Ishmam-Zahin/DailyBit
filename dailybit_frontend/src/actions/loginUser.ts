import domain from "@/helper/backendDomain";

export default async function loginUser(body: any) {
    const url = `${domain}/auth/login`;
    const response = await fetch(url, {
        method: "POST",
        cache: 'no-store',
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    if(response.status >= 300){
        throw data['message'];
    }
    return data;
}