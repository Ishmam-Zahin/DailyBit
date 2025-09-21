import domain from "@/helper/backendDomain";

export default async function createAccount({form, token}: {form: FormData, token: string | null}) {
    const response = await fetch(`${domain}/auth/create-account`, {
        method: "POST",
        cache: 'no-store',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token || ''}`
        },
        body: form,
    });

    const json = await response.json();
    const m = json['message'];

    if(response.status >= 300){
        throw m;
    }

    return m;
    
}