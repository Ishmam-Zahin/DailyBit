import domain from "@/helper/backendDomain";

export async function updateProblem({formData, token}:{formData: FormData, token: string|null}) {
    const data = Object.fromEntries(formData.entries());
    const response = await fetch(`${domain}/api/problem`, {
        method: "PUT",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token || ''}`
        },
        body: JSON.stringify(data),
    });

    const json = await response.json();
    const m = json['message'];

    if(response.status >= 300){
        throw m;
    }

    return m;
}