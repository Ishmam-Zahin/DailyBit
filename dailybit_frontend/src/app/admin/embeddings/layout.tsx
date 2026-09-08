'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Course } from '@/helper/types'
import { getAllCourses } from '@/actions/courses'

function EmbeddingFilterBar() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const courseParam = searchParams.get('course')
    const chapterParam = searchParams.get('chapter')

    const { data: courses, isLoading } = useQuery<Course[]>({
        queryKey: ['courses'],
        queryFn: getAllCourses,
    })

    const selectedCourse = courses?.find((c) => String(c.id) === courseParam) ?? null

    const handleCourseChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('cursor')
        params.delete('chapter')
        if (value) {
            params.set('course', value)
        } else {
            params.delete('course')
        }
        router.push(`?${params.toString()}`)
    }

    const handleChapterChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('cursor')
        if (value) {
            params.set('chapter', value)
        } else {
            params.delete('chapter')
        }
        router.push(`?${params.toString()}`)
    }

    return (
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 bg-white border-b border-slate-200">
            <select
                value={courseParam ?? ''}
                onChange={(e) => handleCourseChange(e.target.value)}
                disabled={isLoading}
                className="cursor-pointer px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <option value="">
                    {isLoading ? 'Loading courses...' : 'Select Course'}
                </option>
                {courses?.map((course) => (
                    <option
                        key={course.id}
                        value={course.id}
                        disabled={course.chapters.length === 0}
                        className={course.chapters.length === 0 ? 'text-slate-400' : ''}
                    >
                        {course.name}{course.chapters.length === 0 ? ' (no chapters)' : ''}
                    </option>
                ))}
            </select>

            <select
                value={chapterParam ?? ''}
                onChange={(e) => handleChapterChange(e.target.value)}
                disabled={!selectedCourse}
                className="cursor-pointer px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <option value="">Select Chapter</option>
                {selectedCourse?.chapters.map((chapter) => (
                    <option key={chapter.id} value={chapter.id}>
                        {chapter.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default function EmbeddingLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { isLoading } = useQuery<Course[]>({
        queryKey: ['courses'],
        queryFn: getAllCourses,
    })

    if (isLoading) {
        return (
            <div className="flex min-h-full items-center justify-center text-slate-400 text-lg">
                Loading courses...
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-full">
            <EmbeddingFilterBar />
            <div className="flex-1 p-6">
                {children}
            </div>
        </div>
    )
}