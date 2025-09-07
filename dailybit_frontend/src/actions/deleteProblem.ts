'use server'

import { revalidatePath } from "next/cache";

export async function deleteProblem(problemId: string) {
    const response = await fetch(`http://localhost:8080/api/problem/${problemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(response.status >= 300){
        return {
            status: response.status,
            message: 'failed to delete!',
        };
    }

    revalidatePath('/admin/problems');
    return {
        status: response.status,
        message: 'deleted successfully!',
    };
}