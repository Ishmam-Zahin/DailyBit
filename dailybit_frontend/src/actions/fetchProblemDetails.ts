import domain from "@/helper/backendDomain";

export default async function fetchProblemDetails({problemId, token}:{problemId: string, token: string | null}){
    const url = domain + '/api/problem/' + problemId;
    try{
        const response = await fetch(url, {
            cache: "no-store",
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token || ''}`
            },
        });
        const data = await response.json();
        if(response.status >= 300){
            throw data['message'];
        }
        
        return data;
    }
    catch(err){
        throw err;
    }
}