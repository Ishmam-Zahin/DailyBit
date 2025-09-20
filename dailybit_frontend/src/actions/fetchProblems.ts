import domain from "@/helper/backendDomain";

export default async function fetchProblems({queryString, token}:{queryString: string, token: string | null}){
    const url = domain + '/api/problems' + queryString;
    try{
        const response = await fetch(url, {
            cache: "no-store",
            method: "GET",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token || ''}`
            },
        });
        if(response.status >= 300){
            throw 'internel server error!';
        }
        const data = await response.json();
        return data;
    }
    catch(err){
        throw err;
    }
}