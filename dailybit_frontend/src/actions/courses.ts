import domain from '@/helper/backendDomain'
import { Course } from '@/helper/types'
import { CourseCreateDTO } from '@/helper/types'

export async function getAllCourses() {
    const url = `${domain}/api/courses`
    const headers = {
        'Content-Type': 'application/json',
    }
    const response = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
        headers: headers
    })
    if (response.status >= 300 || response.status < 200) {
        throw 'server error'
    }
    const data = await response.json()
    return data
}

export async function createCourse(payload: CourseCreateDTO): Promise<Course> {
    const url = `${domain}/api/courses`
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

export async function deleteCourse(courseId: number): Promise<string> {
    const url = `${domain}/api/courses/${courseId}`
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