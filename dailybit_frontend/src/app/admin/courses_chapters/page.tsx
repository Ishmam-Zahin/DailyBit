'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { Course, ChapterSummary, ChapterCreateDTO, CourseCreateDTO } from '@/helper/types'
import {
    getAllCourses,
    createCourse,
    deleteCourse,
} from '@/actions/courses'
import { createChapter, deleteChapter } from '@/actions/chapters'

type DeleteTarget = {
    type: 'course' | 'chapter'
    id: number
} | null

export default function CoursesChaptersPage() {
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null)
    const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null)

    const [showCreateCourseForm, setShowCreateCourseForm] = useState(false)
    const [newCourseName, setNewCourseName] = useState('')

    const [showCreateChapterForm, setShowCreateChapterForm] = useState(false)
    const [newChapterName, setNewChapterName] = useState('')

    const queryClient = useQueryClient()

    const { data: courses, isLoading, isError, refetch } = useQuery<Course[]>({
        queryKey: ['courses'],
        queryFn: getAllCourses,
    })

    const createCourseMutation = useMutation({
        mutationFn: (payload: CourseCreateDTO) => createCourse(payload),
        onSuccess: (createdCourse) => {
            const newCourse: Course = {
                id: createdCourse.id,
                name: createdCourse.name,
                chapters: createdCourse.chapters ?? [],
            }
            queryClient.setQueryData<Course[]>(['courses'], (old) =>
                old ? [...old, newCourse] : [newCourse]
            )
            toast.success('Course created')
            setShowCreateCourseForm(false)
            setNewCourseName('')
        },
        onError: () => {
            toast.error('Failed to create course')
        },
    })

    const createChapterMutation = useMutation({
        mutationFn: (payload: ChapterCreateDTO) => createChapter(payload),
        onSuccess: (createdChapter) => {
            const newChapterSummary: ChapterSummary = {
                id: createdChapter.id,
                name: createdChapter.name,
            }
            queryClient.setQueryData<Course[]>(['courses'], (old) =>
                old
                    ? old.map((course) =>
                          course.id === createdChapter.course_id
                              ? { ...course, chapters: [...course.chapters, newChapterSummary] }
                              : course
                      )
                    : old
            )
            toast.success('Chapter created')
            setShowCreateChapterForm(false)
            setNewChapterName('')
        },
        onError: () => {
            toast.error('Failed to create chapter')
        },
    })

    const deleteCourseMutation = useMutation({
        mutationFn: (courseId: number) => deleteCourse(courseId),
        onSuccess: (_result, deletedCourseId) => {
            queryClient.setQueryData<Course[]>(['courses'], (old) =>
                old ? old.filter((course) => course.id !== deletedCourseId) : old
            )
            if (selectedCourseId === deletedCourseId) {
                setSelectedCourseId(null)
            }
            toast.success('Course deleted')
            setDeleteTarget(null)
        },
        onError: () => {
            toast.error('Failed to delete course')
        },
    })

    const deleteChapterMutation = useMutation({
        mutationFn: (chapterId: number) => deleteChapter(chapterId),
        onSuccess: (_result, deletedChapterId) => {
            queryClient.setQueryData<Course[]>(['courses'], (old) =>
                old
                    ? old.map((course) =>
                          course.id === selectedCourseId
                              ? {
                                    ...course,
                                    chapters: course.chapters.filter(
                                        (ch) => ch.id !== deletedChapterId
                                    ),
                                }
                              : course
                      )
                    : old
            )
            toast.success('Chapter deleted')
            setDeleteTarget(null)
        },
        onError: () => {
            toast.error('Failed to delete chapter')
        },
    })

    const handleSelectCourse = (courseId: number) => {
        setSelectedCourseId(courseId)
    }

    const handleCreateNewCourse = () => {
        setShowCreateCourseForm(true)
    }

    const handleCreateNewChapter = () => {
        if (selectedCourseId === null) return
        setShowCreateChapterForm(true)
    }

    const handleConfirmCreateCourse = () => {
        if (!newCourseName.trim()) return
        createCourseMutation.mutate({ name: newCourseName.trim() })
    }

    const handleConfirmCreateChapter = () => {
        if (!newChapterName.trim() || selectedCourseId === null) return
        createChapterMutation.mutate({ courseId: selectedCourseId, name: newChapterName.trim() })
    }

    const handleDeleteConfirm = () => {
        if (deleteTarget === null) return
        if (deleteTarget.type === 'course') {
            deleteCourseMutation.mutate(deleteTarget.id)
        } else {
            deleteChapterMutation.mutate(deleteTarget.id)
        }
    }

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-lg">
                Loading courses...
            </div>
        )
    }

    if (isError || !courses) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-red-500 text-lg">
                <span>Failed to load courses.</span>
                <button
                    onClick={() => refetch()}
                    className="cursor-pointer px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition-colors text-sm font-medium text-white"
                >
                    Retry
                </button>
            </div>
        )
    }

    const selectedCourse = courses.find((c) => c.id === selectedCourseId) ?? null
    const chapters = selectedCourse?.chapters ?? []

    const isDeletePending =
        deleteTarget?.type === 'course'
            ? deleteCourseMutation.isPending
            : deleteChapterMutation.isPending

    return (
        <>
            {/* Left column: Courses */}
            <div className="w-1/2 flex flex-col border-r border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-800">Courses</h2>
                    <button
                        onClick={handleCreateNewCourse}
                        className="cursor-pointer px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white"
                    >
                        Create New
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            onClick={() => handleSelectCourse(course.id)}
                            className={`cursor-pointer flex items-center justify-between gap-4 p-4 bg-white rounded-lg border shadow-sm transition-colors ${
                                selectedCourseId === course.id
                                    ? 'border-sky-400 ring-2 ring-sky-200'
                                    : 'border-slate-200 hover:border-slate-300'
                            }`}
                        >
                            <div className="flex-1 min-w-0">
                                <span className="text-xs font-semibold text-slate-400">ID: {course.id}</span>
                                <p className="text-sm text-slate-700 font-medium">{course.name}</p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setDeleteTarget({ type: 'course', id: course.id })
                                }}
                                className="cursor-pointer p-2 rounded-md hover:bg-red-50 transition-colors text-red-500 shrink-0"
                                aria-label="Delete course"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right column: Chapters */}
            <div className="w-1/2 flex flex-col p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-800">Chapters</h2>
                    <button
                        onClick={handleCreateNewChapter}
                        disabled={selectedCourseId === null}
                        className="cursor-pointer px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
                    >
                        Create New
                    </button>
                </div>

                {selectedCourseId === null ? (
                    <div className="flex-1 flex items-center justify-center text-center text-slate-400 text-sm">
                        Select a course on the left to see its chapters
                    </div>
                ) : chapters.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-center text-slate-400 text-sm">
                        No chapters for this course yet. Click <span className="mx-1 font-medium text-slate-500">Create New</span> to add one.
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {chapters.map((chapter) => (
                            <div
                                key={chapter.id}
                                className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg border border-slate-200 shadow-sm"
                            >
                                <div className="flex-1 min-w-0">
                                    <span className="text-xs font-semibold text-slate-400">ID: {chapter.id}</span>
                                    <p className="text-sm text-slate-700 font-medium">{chapter.name}</p>
                                </div>
                                <button
                                    onClick={() => setDeleteTarget({ type: 'chapter', id: chapter.id })}
                                    className="cursor-pointer p-2 rounded-md hover:bg-red-50 transition-colors text-red-500 shrink-0"
                                    aria-label="Delete chapter"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Create course modal */}
            {showCreateCourseForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-sm font-semibold text-slate-800 mb-4">
                            Create new course
                        </h3>
                        <input
                            type="text"
                            value={newCourseName}
                            onChange={(e) => setNewCourseName(e.target.value)}
                            placeholder="Course name"
                            autoFocus
                            className="w-full px-3 py-2 mb-5 rounded-md border border-slate-300 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleConfirmCreateCourse()
                            }}
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowCreateCourseForm(false)
                                    setNewCourseName('')
                                }}
                                disabled={createCourseMutation.isPending}
                                className="cursor-pointer px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium text-slate-700 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmCreateCourse}
                                disabled={createCourseMutation.isPending || !newCourseName.trim()}
                                className="cursor-pointer px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white disabled:opacity-50"
                            >
                                {createCourseMutation.isPending ? 'Creating...' : 'OK'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create chapter modal */}
            {showCreateChapterForm && selectedCourseId !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-sm font-semibold text-slate-800 mb-4">
                            Create new chapter
                        </h3>

                        <label className="block text-xs font-medium text-slate-500 mb-1">
                            Course ID
                        </label>
                        <input
                            type="text"
                            value={selectedCourseId}
                            disabled
                            className="w-full px-3 py-2 mb-4 rounded-md border border-slate-200 bg-slate-100 text-sm text-slate-400 cursor-not-allowed"
                        />

                        <label className="block text-xs font-medium text-slate-500 mb-1">
                            Chapter name
                        </label>
                        <input
                            type="text"
                            value={newChapterName}
                            onChange={(e) => setNewChapterName(e.target.value)}
                            placeholder="Chapter name"
                            autoFocus
                            className="w-full px-3 py-2 mb-5 rounded-md border border-slate-300 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleConfirmCreateChapter()
                            }}
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowCreateChapterForm(false)
                                    setNewChapterName('')
                                }}
                                disabled={createChapterMutation.isPending}
                                className="cursor-pointer px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium text-slate-700 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmCreateChapter}
                                disabled={createChapterMutation.isPending || !newChapterName.trim()}
                                className="cursor-pointer px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white disabled:opacity-50"
                            >
                                {createChapterMutation.isPending ? 'Creating...' : 'OK'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete confirmation modal */}
            {deleteTarget !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-sm font-semibold text-slate-800 mb-2">
                            Delete this {deleteTarget.type}?
                        </h3>
                        <p className="text-sm text-slate-500 mb-5">This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                disabled={isDeletePending}
                                className="cursor-pointer px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium text-slate-700 disabled:opacity-50"
                            >
                                No
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                disabled={isDeletePending}
                                className="cursor-pointer px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition-colors text-sm font-medium text-white disabled:opacity-50"
                            >
                                {isDeletePending ? 'Deleting...' : 'Yes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}