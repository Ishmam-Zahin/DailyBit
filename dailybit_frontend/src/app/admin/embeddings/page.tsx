'use client'

import { use, useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Eye, Trash2, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { Embedding, EmbeddingCreateDTO } from '@/helper/types'
import { getEmbeddings, createEmbeddings, deleteEmbeddings } from '@/actions/embeddings'

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
        cursor?: string
    }>
}

type DeleteTarget =
    | { type: 'single'; id: number }
    | { type: 'all' }
    | null

export default function EmbeddingPage({ searchParams }: EmbeddingPageProps) {
    const resolvedSearchParams = use(searchParams)

    const courseId = resolvedSearchParams.course ? Number(resolvedSearchParams.course) : null
    const chapterId = resolvedSearchParams.chapter ? Number(resolvedSearchParams.chapter) : null

    const [cursor, setCursor] = useState<number | null>(null)

    useEffect(() => {
        setCursor(null)
    }, [courseId, chapterId])

    const queryClient = useQueryClient()
    const queryKey = ['embeddings', courseId, chapterId, cursor]

    const { data: embeddings = [], isLoading, isError, refetch } = useQuery<Embedding[]>({
        queryKey,
        queryFn: () => getEmbeddings(courseId, chapterId, cursor),
    })

    const nextCursor = embeddings.length > 0 ? embeddings[embeddings.length - 1].id : null
    const prevCursorValue = embeddings.length > 0 ? embeddings[0].id - 1 : null

    const isFirstPage = cursor === null
    const isNextDisabled = embeddings.length === 0
    const isPrevDisabled = isFirstPage

    const handleNext = () => {
        if (nextCursor !== null) setCursor(nextCursor)
    }

    const handlePrev = () => {
        if (prevCursorValue !== null && prevCursorValue > 0) {
            setCursor(prevCursorValue)
        } else {
            setCursor(null)
        }
    }

    const [activeEmbedding, setActiveEmbedding] = useState<Embedding | null>(null)
    const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null)

    const [showCreateForm, setShowCreateForm] = useState(false)
    const [newText, setNewText] = useState('')

    const createMutation = useMutation({
        mutationFn: (payload: EmbeddingCreateDTO) => createEmbeddings(payload),
        onSuccess: (created) => {
            queryClient.setQueryData<Embedding[]>(
                queryKey,
                (old) => old ? [...old, ...created] : created
            )
            toast.success('Embeddings created')
            setShowCreateForm(false)
            setNewText('')
        },
        onError: () => {
            toast.error('Failed to create embeddings')
        },
    })

    const deleteMutation = useMutation({
        mutationFn: (target: DeleteTarget) => {
            if (target === null) throw 'no target'
            if (target.type === 'all') {
                return deleteEmbeddings(courseId, chapterId, null)
            } else {
                return deleteEmbeddings(courseId, chapterId, target.id)
            }
        },
        onSuccess: (_result, target) => {
            if (target === null) return
            if (target.type === 'all') {
                // refetch to reflect server state
                refetch()
                toast.success('All embeddings deleted')
            } else {
                // surgically remove from cache
                queryClient.setQueryData<Embedding[]>(
                    queryKey,
                    (old) => old ? old.filter((e) => e.id !== target.id) : []
                )
                toast.success('Embedding deleted')
            }
            setDeleteTarget(null)
        },
        onError: () => {
            toast.error('Failed to delete')
        },
    })

    const handleConfirmCreate = () => {
        if (!newText.trim() || courseId === null || chapterId === null) return
        createMutation.mutate({
            course_id: courseId,
            chapter_id: chapterId,
            text: newText.trim(),
        })
    }

    const handleDeleteConfirm = () => {
        if (deleteTarget === null) return
        deleteMutation.mutate(deleteTarget)
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full text-slate-400 text-lg py-20">
                Loading embeddings...
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 text-red-500 text-lg py-20">
                <span>Failed to load embeddings.</span>
                <button
                    onClick={() => refetch()}
                    className="cursor-pointer px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition-colors text-sm font-medium text-white"
                >
                    Retry
                </button>
            </div>
        )
    }

    return (
        <>
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => setDeleteTarget({ type: 'all' })}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition-colors text-sm font-medium text-white"
                >
                    <Trash2 size={16} />
                    Delete All
                </button>
                <button
                    onClick={() => setShowCreateForm(true)}
                    disabled={chapterId === null}
                    className="cursor-pointer px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
                >
                    Create New
                </button>
            </div>

            {/* Embeddings list */}
            {embeddings.length === 0 ? (
                <div className="flex items-center justify-center py-20 text-slate-400 text-sm">
                    No embeddings found.
                </div>
            ) : (
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
                                    onClick={() => setDeleteTarget({ type: 'single', id: embedding.id })}
                                    className="cursor-pointer p-2 rounded-md hover:bg-red-50 transition-colors text-red-500"
                                    aria-label="Delete embedding"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-end gap-3 mt-6">
                <button
                    onClick={handlePrev}
                    disabled={isPrevDisabled}
                    className="cursor-pointer px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors text-sm font-medium text-white disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={isNextDisabled}
                    className="cursor-pointer px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors text-sm font-medium text-white disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>

            {/* Create new modal */}
            {showCreateForm && courseId !== null && chapterId !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-sm font-semibold text-slate-800 mb-5">
                            Create new embeddings for this chapter
                        </h3>

                        <div className="flex gap-3 mb-4">
                            <div className="flex-1">
                                <label className="block text-xs font-medium text-slate-500 mb-1">
                                    Course ID
                                </label>
                                <input
                                    type="text"
                                    value={courseId}
                                    disabled
                                    className="w-full px-3 py-2 rounded-md border border-slate-200 bg-slate-100 text-sm text-slate-400 cursor-not-allowed"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs font-medium text-slate-500 mb-1">
                                    Chapter ID
                                </label>
                                <input
                                    type="text"
                                    value={chapterId}
                                    disabled
                                    className="w-full px-3 py-2 rounded-md border border-slate-200 bg-slate-100 text-sm text-slate-400 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <label className="block text-xs font-medium text-slate-500 mb-1">
                            Text
                        </label>
                        <textarea
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            placeholder="Enter text to embed..."
                            autoFocus
                            rows={6}
                            className="w-full px-3 py-2 mb-5 rounded-md border border-slate-300 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-300 resize-y"
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowCreateForm(false)
                                    setNewText('')
                                }}
                                disabled={createMutation.isPending}
                                className="cursor-pointer px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium text-slate-700 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmCreate}
                                disabled={createMutation.isPending || !newText.trim()}
                                className="cursor-pointer px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white disabled:opacity-50"
                            >
                                {createMutation.isPending ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View full text modal */}
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

            {/* Delete confirmation modal */}
            {deleteTarget !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-sm font-semibold text-slate-800 mb-2">
                            {deleteTarget.type === 'all'
                                ? 'Delete all embeddings?'
                                : 'Delete this embedding?'}
                        </h3>
                        <p className="text-sm text-slate-500 mb-5">This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                disabled={deleteMutation.isPending}
                                className="cursor-pointer px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium text-slate-700 disabled:opacity-50"
                            >
                                No
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                disabled={deleteMutation.isPending}
                                className="cursor-pointer px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition-colors text-sm font-medium text-white disabled:opacity-50"
                            >
                                {deleteMutation.isPending ? 'Deleting...' : 'Yes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}