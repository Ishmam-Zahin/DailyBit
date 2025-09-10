import domain from "@/helper/backendDomain";

export default async function fetchTestCaseDetails(id: String){
    const url = domain + '/test-case/' + id;
    try{
        const response = await fetch(url, {
            cache: "no-store",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
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