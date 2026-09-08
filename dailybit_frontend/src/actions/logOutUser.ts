import domain from "@/helper/backendDomain";

export default async function logOutUser(token: any) {
    const url = `${domain}/auth/logout`;
    const response = await fetch(url, {
        method: "GET",
        cache: 'no-store',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if(response.status >= 300 || response.status < 200){
        const msg = await response.text();
        throw msg;
    }
    const data = await response.text();
    return data;
}