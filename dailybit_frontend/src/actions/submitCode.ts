import domain from "@/helper/backendDomain";

export async function submitCode(submit: any) {
    const response = await fetch(`${domain}/judge/problem`, {
        method: "POST",
        cache: 'no-store',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(submit),
    });

    const json = await response.json();

    if(response.status >= 300){
        throw json['message'];
    }

    return json['output'];
}