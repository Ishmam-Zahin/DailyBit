import domain from "@/helper/backendDomain";

export default async function createAccount({form, token}: {form: FormData, token: string | null}) {
    const response = await fetch(`http://localhost:8080/auth/create-account`, {
        method: "POST",
        cache: 'no-store',
        credentials: "include",
        headers: {
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