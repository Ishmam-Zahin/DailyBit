import { aiDomain } from "@/helper/backendAIDomain"
import { AIQuery } from "@/helper/types";

export default async function askAI({json}:{json: AIQuery}) {
    const url = `${aiDomain}/api/ask`;
    const response = await fetch(url, {
        method: "POST",
        cache: "no-store",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
    });

    if(response.status >= 300){
        throw 'unexpected error!';
    }
    const data = await response.json();
    return data;
}