import domain from "@/helper/backendDomain";

export async function deleteProblem(problemId: string) {
    const response = await fetch(`${domain}/api/problem/${problemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(response.status >= 300){
        throw 'Failed to delete problem';
    }
}