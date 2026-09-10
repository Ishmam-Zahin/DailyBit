import domain from "@/helper/backendDomain";

export default async function createAccount({form, token}: {form: FormData, token: string | null}) {
    const response = await fetch(`${domain}/auth/create-account`, {
        method: "POST",
        cache: "no-store",
        credentials: "include",
        headers: {
            // Let the browser set the multipart boundary for FormData.
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: form,
    });

    if(response.status >= 300){
        throw 'server error';
    }
    const msg = await response.text();
    return msg;
    
}