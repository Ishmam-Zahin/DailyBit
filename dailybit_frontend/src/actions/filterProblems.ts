'use server'

import { redirect } from 'next/navigation';


export default async function filterProblems(formData: FormData){
    const name = formData.get('name')?.toString() || '';
    const language = formData.get('language');
    const sectionName = formData.get('sectionName')?.toString() || '';
    const chapter = formData.get('chapter') || -1;

    redirect(`/admin/problems?name=${name}&language=${language}&sectionName=${sectionName}&chapter=${chapter}`);
}