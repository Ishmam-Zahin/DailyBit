import domain from "@/helper/backendDomain";

export async function deleteTestCase(id: string) {
    const response = await fetch(`${domain}/api/test-case/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const json = await response.json();
    const m = json['message'];


    if(response.status >= 300){
        throw m;
    }

    return m;
}