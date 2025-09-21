import domain from "@/helper/backendDomain";

export async function deleteTestCase({id, token}:{id:string, token: string|null}) {
    const response = await fetch(`${domain}/api/test-case/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token || ''}`
        },
    });
    const json = await response.json();
    const m = json['message'];


    if(response.status >= 300){
        throw m;
    }

    return m;
}