import { aiDomain } from "@/helper/backendAIDomain"
import { Embedding, EmbeddingCreateDTO } from "@/helper/types"

export async function getEmbeddings(
    courseId: number | null,
    chapterId: number | null,
    cursor: number | null
): Promise<Embedding[]> {
    const params = new URLSearchParams()
    if (courseId !== null) params.set('course_id', String(courseId))
    if (chapterId !== null) params.set('chapter_id', String(chapterId))
    if (cursor !== null && cursor > 0) params.set('cursor', String(cursor))

    const url = `${aiDomain}/embedding${params.toString() ? `?${params.toString()}` : ''}`
    const response = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
    })
    if (response.status >= 300 || response.status < 200) {
        throw 'server error'
    }
    const data = await response.json()
    return data
}

export async function createEmbeddings(payload: EmbeddingCreateDTO): Promise<Embedding[]> {
    const url = `${aiDomain}/embedding`
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-store',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    if (response.status >= 300 || response.status < 200) {
        throw 'server error'
    }
    const data = await response.json()
    return data
}

export async function deleteEmbeddings(
    courseId: number | null,
    chapterId: number | null,
    embeddingId: number | null
): Promise<string> {
    const params = new URLSearchParams()
    if (courseId !== null) params.set('course_id', String(courseId))
    if (chapterId !== null) params.set('chapter_id', String(chapterId))
    if (embeddingId !== null) params.set('id', String(embeddingId))

    const url = `${aiDomain}/embedding${params.toString() ? `?${params.toString()}` : ''}`
    const response = await fetch(url, {
        method: 'DELETE',
        cache: 'no-store',
        credentials: 'include',
    })
    if (response.status >= 300 || response.status < 200) {
        throw 'server error'
    }
    const data = await response.text()
    return data
}