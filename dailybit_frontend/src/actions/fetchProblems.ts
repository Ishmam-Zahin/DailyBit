import domain from "@/helper/backendDomain";

export default async function fetchProblems(queryString: string){
    const url = domain + '/problems' + queryString;
    try{
        const response = await fetch(url, {
            cache: "no-store",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
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