import domain from '@/helper/backendDomain'
import { Chapter, ChapterCreateDTO } from '@/helper/types'


export async function createChapter(payload: ChapterCreateDTO): Promise<Chapter> {
    const url = `${domain}/api/chapters`
    const headers = {
        'Content-Type': 'application/json',
    }
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-store',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify(payload),
    })
    if (response.status >= 300 || response.status < 200) {
        throw 'server error'
    }
    const data = await response.json()
    return data
}

export async function deleteChapter(chapterId: number): Promise<void> {
    const url = `${domain}/api/chapters/${chapterId}`
    const response = await fetch(url, {
        method: 'DELETE',
        cache: 'no-store',
        credentials: 'include',
    })
    if (response.status >= 300 || response.status < 200) {
        throw 'server error'
    }
}