import domain from "@/helper/backendDomain";
import { url } from "inspector";

export default async function fetchSubmissions({problemId, token}:{problemId:string, token:string|null}){
    const url = `${domain}/api/submissions/${problemId}`;
    const response = await fetch(url, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token || ''}`
        },
    })
    if(response.status >= 300){
        throw 'submission fetched failed';
    }
    const data = await response.json();
    return data;
}