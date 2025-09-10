import domain from "@/helper/backendDomain";

export async function updateProblem(formData : FormData) {
    const data = Object.fromEntries(formData.entries());
    const response = await fetch(`${domain}/problem`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
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