import { aiDomain } from "@/helper/backendAIDomain";
import { QuizRequest } from "@/helper/types";

export default async function fetchQuizQuestions({json}: {json:QuizRequest}) {
    const url = `${aiDomain}/api/quiz/generate`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    });
    if(response.status >= 300){
        throw 'quiz fetch failed';
    }
    const data = await response.json();

    return data;
}