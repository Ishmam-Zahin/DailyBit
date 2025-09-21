import domain from "@/helper/backendDomain";

export async function deleteProblem({problemId, token}: {problemId: string, token: string|null}) {
    const response = await fetch(`${domain}/api/problem/${problemId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token || ''}`
        },
    });

    if(response.status >= 300){
        throw 'Failed to delete problem';
    }
}