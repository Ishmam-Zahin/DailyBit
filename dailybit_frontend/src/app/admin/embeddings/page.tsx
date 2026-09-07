'use client'

import { use, useState } from 'react'
import { Eye, Trash2, X } from 'lucide-react'
import { Embedding } from '@/helper/types'

const dummyEmbeddings: Embedding[] = [
    {
        id: 1,
        course_id: 1,
        chapter_id: 2,
        text: 'Variables in Python are used to store data values. Unlike other languages, Python has no command for declaring a variable.',
        embedding: [0.0123, -0.0456, 0.0789, 0.0234, -0.0912],
        created_at: '2026-08-01T10:15:00Z',
        updated_at: '2026-08-02T09:30:00Z',
    },
    {
        id: 2,
        course_id: 2,
        chapter_id: 1,
        text: 'A stack is a linear data structure that follows the LIFO (Last In First Out) principle for insertion and deletion of elements.',
        embedding: [0.0341, 0.0187, -0.0623, 0.0450, 0.0098],
        created_at: '2026-08-03T14:00:00Z',
        updated_at: '2026-08-03T14:00:00Z',
    },
    {
        id: 3,
        course_id: 3,
        chapter_id: 3,
        text: 'Gradient descent is an optimization algorithm used to minimize the loss function by iteratively moving toward the steepest descent.',
        embedding: null,
        created_at: '2026-08-05T08:45:00Z',
        updated_at: '2026-08-06T11:20:00Z',
    },
]

function truncateText(text: string, maxWords: number) {
    const words = text.split(' ')
    if (words.length <= maxWords) return text
    return words.slice(0, maxWords).join(' ') + '...'
}

function formatDate(isoString: string) {
    return new Date(isoString).toLocaleString()
}

type EmbeddingPageProps = {
    searchParams: Promise<{
        course?: string
        chapter?: string
        page_no?: string
    }>
}

export default function EmbeddingPage({ searchParams }: EmbeddingPageProps) {
    const resolvedSearchParams = use(searchParams)

    const courseId = resolvedSearchParams.course ? Number(resolvedSearchParams.course) : null
    const chapterId = resolvedSearchParams.chapter ? Number(resolvedSearchParams.chapter) : null
    const pageNo = resolvedSearchParams.page_no ? Number(resolvedSearchParams.page_no) : 1

    // once wired to backend: fetch embeddings using courseId, chapterId, pageNo
    const embeddings = dummyEmbeddings

    const [activeEmbedding, setActiveEmbedding] = useState<Embedding | null>(null)
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null)

    const handleDeleteConfirm = () => {
        // functionality later
        setDeleteTargetId(null)
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                {embeddings.map((embedding) => (
                    <div
                        key={embedding.id}
                        className="flex items-start justify-between gap-4 p-4 bg-white rounded-lg border border-slate-200 shadow-sm"
                    >
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mb-2">
                                <span className="font-semibold text-slate-700">ID: {embedding.id}</span>
                                <span>Course ID: {embedding.course_id}</span>
                                <span>Chapter ID: {embedding.chapter_id}</span>
                            </div>

                            <p className="text-sm text-slate-700 mb-2">
                                {truncateText(embedding.text, 15)}
                            </p>

                            <p className="text-xs text-slate-500 mb-1">
                                Embedding:{' '}
                                {embedding.embedding
                                    ? `[${embedding.embedding.slice(0, 3).map((v) => v.toFixed(4)).join(', ')}, ...]`
                                    : 'null'}
                            </p>

                            <div className="flex flex-wrap gap-x-4 text-xs text-slate-400">
                                <span>Created: {formatDate(embedding.created_at)}</span>
                                <span>Updated: {formatDate(embedding.updated_at)}</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3 shrink-0">
                            <button
                                onClick={() => setActiveEmbedding(embedding)}
                                className="cursor-pointer p-2 rounded-md hover:bg-slate-100 transition-colors text-slate-600"
                                aria-label="View full text"
                            >
                                <Eye size={18} />
                            </button>
                            <button
                                onClick={() => setDeleteTargetId(embedding.id)}
                                className="cursor-pointer p-2 rounded-md hover:bg-red-50 transition-colors text-red-500"
                                aria-label="Delete embedding"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {activeEmbedding && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
                        <button
                            onClick={() => setActiveEmbedding(null)}
                            className="cursor-pointer absolute top-3 right-3 p-1 rounded-md hover:bg-slate-100 text-slate-500"
                            aria-label="Close"
                        >
                            <X size={18} />
                        </button>
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">
                            Chunk #{activeEmbedding.id}
                        </h3>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">
                            {activeEmbedding.text}
                        </p>
                    </div>
                </div>
            )}

            {deleteTargetId !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-sm font-semibold text-slate-800 mb-2">Delete this embedding?</h3>
                        <p className="text-sm text-slate-500 mb-5">This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteTargetId(null)}
                                className="cursor-pointer px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium text-slate-700"
                            >
                                No
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
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