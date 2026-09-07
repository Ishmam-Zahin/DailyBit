'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { Course, Chapter } from '@/helper/types'

const dummyCourses: Course[] = [
    { id: 1, name: 'Python Basics' },
    { id: 2, name: 'Data Structures' },
    { id: 3, name: 'Machine Learning' },
]

const dummyChapters: Chapter[] = [
    { id: 1, name: 'Introduction' },
    { id: 2, name: 'Variables & Types' },
    { id: 3, name: 'Loops' },
]

function EmbeddingFilterBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false)

    const courseParam = searchParams.get('course')
    const chapterParam = searchParams.get('chapter')

    const updateParam = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        // reset to page 1 whenever a filter changes
        params.delete('page_no')
        router.push(`?${params.toString()}`)
    }

    const handleFilterClick = () => {
        // functionality later
    }

    const handleCreateNewClick = () => {
        // functionality later
    }

    const handleDeleteAllConfirm = () => {
        // functionality later
        setShowDeleteAllConfirm(false)
    }

    return (
        <>
            <div className="flex flex-wrap items-center gap-3 px-6 py-4 bg-white border-b border-slate-200">
                <select
                    value={courseParam ?? ''}
                    onChange={(e) => updateParam('course', e.target.value || null)}
                    className="cursor-pointer px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                    <option value="">Select Course</option>
                    {dummyCourses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.name}
                        </option>
                    ))}
                </select>

                <select
                    value={chapterParam ?? ''}
                    onChange={(e) => updateParam('chapter', e.target.value || null)}
                    className="cursor-pointer px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                    <option value="">Select Chapter</option>
                    {dummyChapters.map((chapter) => (
                        <option key={chapter.id} value={chapter.id}>
                            {chapter.name}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleFilterClick}
                    className="cursor-pointer px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors text-sm font-medium text-white"
                >
                    Filter
                </button>

                <button
                    onClick={() => setShowDeleteAllConfirm(true)}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition-colors text-sm font-medium text-white"
                >
                    <Trash2 size={16} />
                    Delete All
                </button>

                <button
                    onClick={handleCreateNewClick}
                    className="cursor-pointer ml-auto px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white"
                >
                    Create New
                </button>
            </div>

            {showDeleteAllConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-sm font-semibold text-slate-800 mb-2">Delete all embeddings?</h3>
                        <p className="text-sm text-slate-500 mb-5">This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteAllConfirm(false)}
                                className="cursor-pointer px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium text-slate-700"
                            >
                                No
                            </button>
                            <button
                                onClick={handleDeleteAllConfirm}
                                className="cursor-pointer px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition-colors text-sm font-medium text-white"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default function EmbeddingLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex flex-col min-h-full">
            <EmbeddingFilterBar />
            <div className="flex-1 p-6">
                {children}
            </div>
        </div>
    )
}