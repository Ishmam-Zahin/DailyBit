import domain from "@/helper/backendDomain";

export default async function getProblems() {
    const url = domain + '/problems';
    try{
        const response = await fetch("http://localhost:8080/api/problems", {
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