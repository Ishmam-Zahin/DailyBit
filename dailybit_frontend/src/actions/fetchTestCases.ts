import domain from "@/helper/backendDomain";

export default async function fetchTestCases({queryString, token}:{queryString: string, token:string|null}){
    const url = domain + '/api/test-cases' + queryString;
    try{
        const response = await fetch(url, {
            cache: "no-store",
            method: "GET",
            credentials: "include",
            headers: {
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