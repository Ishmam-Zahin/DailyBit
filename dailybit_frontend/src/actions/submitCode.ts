import domain from "@/helper/backendDomain";

export async function submitCode({submit, token}: {submit: any, token: string | null}) {
    const response = await fetch(`${domain}/api/judge/problem`, {
        method: "POST",
        cache: 'no-store',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token || ''}`,
        },
        body: JSON.stringify(submit),
    });

    const json = await response.json();

    if(response.status >= 300){
        throw json['message'];
    }

    return json['output'];
}