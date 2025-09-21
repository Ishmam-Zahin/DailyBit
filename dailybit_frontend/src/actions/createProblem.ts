import domain from "@/helper/backendDomain";

export async function createProblem({formData, token}:{formData: FormData, token: String|null}) {
    const data = Object.fromEntries(formData.entries());
    const response = await fetch(`${domain}/api/problems`, {
        method: "POST",
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