'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Trash2, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { getConversations, askAI, deleteConversations } from '@/actions/ai'; // adjust path
import { Conversation } from '@/helper/types'; // adjust path

// ---------- CodeBlock ----------
function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const code = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="my-2 overflow-hidden rounded-lg border border-white/10">
      <div className="flex items-center justify-between bg-[#1e1e1e] px-3 py-1.5 text-xs text-white/60">
        <span>{language || 'code'}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex cursor-pointer items-center gap-1 rounded p-1 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{ margin: 0, padding: '0.75rem', fontSize: '0.8rem' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

// ---------- InlineCode ----------
function InlineCode({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className="rounded bg-white/10 px-1.5 py-0.5 text-[0.85em] text-orange-300"
      {...props}
    >
      {children}
    </code>
  );
}

const markdownComponents = {
  code({
    className,
    children,
    ...props
  }: {
    className?: string;
    children?: React.ReactNode;
  }) {
    const isInline = !className;
    if (isInline) {
      return <InlineCode {...props}>{children}</InlineCode>;
    }
    return <CodeBlock className={className}>{children}</CodeBlock>;
  },
};

// ---------- DeleteConfirmModal ----------
function DeleteConfirmModal({
  onConfirm,
  onCancel,
  isDeleting,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-sm rounded-xl bg-[var(--main-color-dark-1)] p-5 shadow-xl">
        <h3 className="text-base font-semibold text-white">
          Delete conversation?
        </h3>
        <p className="mt-2 text-sm text-white/60">
          This will permanently delete all messages in this conversation.
          This action cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="cursor-pointer rounded-lg px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="cursor-pointer rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- AiChatBot ----------
export default function AiChatBot({
  title,
  courseId,
  chapterId,
}: {
  title: string;
  courseId: number;
  chapterId: number;
}) {
  const [query, setQuery] = useState('');
  const [pendingQuery, setPendingQuery] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Adjust this selector path to match your actual redux slice shape.
  const userId = useSelector((state: any) => state.user?.id);

  const queryKey = ['conversations', userId, courseId, chapterId];

  const {
    data: conversations,
    isLoading,
    isError,
  } = useQuery({
    queryKey,
    queryFn: () => getConversations(userId, courseId, chapterId),
    enabled: !!userId && !!courseId && !!chapterId,
  });

  const {
    mutate: sendQuery,
    isPending: isResponding,
  } = useMutation({
    mutationFn: (q: string) =>
      askAI({
        user_id: userId,
        course_id: courseId,
        chapter_id: chapterId,
        query: q,
      }),
    onSuccess: (newConversation: Conversation) => {
      queryClient.setQueryData<Conversation[]>(queryKey, (old) =>
        old ? [newConversation, ...old] : [newConversation]
      );
    },
    onError: () => {
      toast.error('Failed to get a response. Please try again.');
    },
  });

  const {
    mutate: removeConversations,
    isPending: isDeleting,
  } = useMutation({
    mutationFn: () => deleteConversations(userId, courseId, chapterId),
    onSuccess: () => {
      toast.success('Conversation deleted.');
      setShowDeleteConfirm(false);
      queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      toast.error('Failed to delete conversation. Please try again.');
    },
  });

  const orderedConversations: Conversation[] = conversations
    ? [...conversations].reverse()
    : [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [orderedConversations.length, isResponding]);

  const handleSend = () => {
    if (!query.trim() || isResponding) return;
    if (!userId || !courseId || !chapterId) {
      toast.error('Missing required information to send your question.');
      return;
    }
    setPendingQuery(query.trim());
    sendQuery(query.trim());
    setQuery('');
  };

  const handleDeleteClick = () => {
    if (orderedConversations.length === 0) return;
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    removeConversations();
  };

  const handleCancelDelete = () => {
    if (isDeleting) return;
    setShowDeleteConfirm(false);
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-[var(--main-color-dark-1)] text-base shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <h2 className="truncate text-sm font-semibold text-white">
          {title || 'Ask AI'}
        </h2>
        <button
          type="button"
          onClick={handleDeleteClick}
          disabled={orderedConversations.length === 0}
          className="cursor-pointer rounded-md p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white/60"
          aria-label="Delete conversation"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex grow flex-col gap-3 overflow-y-auto px-4 py-3">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center text-base text-white">
            Loading...
          </div>
        ) : isError ? (
          <div className="flex h-full w-full items-center justify-center text-sm text-red-400">
            Failed to load conversation.
          </div>
        ) : orderedConversations.length === 0 && !isResponding ? (
          <div className="flex h-full w-full items-center justify-center text-base text-white/70">
            {title || 'Ask AI'}
          </div>
        ) : (
          <>
            {orderedConversations.map((c) => (
              <React.Fragment key={c.id}>
                {/* User query - right side */}
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[var(--main-color-primary-dark)] px-3 py-2 text-sm leading-[1.6] text-white shadow-sm">
                  <ReactMarkdown components={markdownComponents}>
                    {c.user_query}
                  </ReactMarkdown>
                </div>

                {/* AI response - left side, no background */}
                <div className="mr-auto max-w-[85%] px-3 py-2 text-sm leading-[1.6] text-white">
                  <ReactMarkdown components={markdownComponents}>
                    {c.llm_response}
                  </ReactMarkdown>
                </div>
              </React.Fragment>
            ))}

            {isResponding && (
              <>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[var(--main-color-primary-dark)] px-3 py-2 text-sm leading-[1.6] text-white shadow-sm">
                  {pendingQuery}
                </div>
                <div className="mr-auto max-w-[85%] px-3 py-2 text-sm italic leading-[1.6] text-white/60">
                  Responding...
                </div>
              </>
            )}

            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-white/10 p-2">
        <textarea
          className="
            block
            min-h-[80px]
            max-h-[200px]
            w-full
            resize-y
            rounded-lg
            bg-white
            px-3
            py-2
            text-sm
            text-gray-900
            outline-none
            placeholder:text-gray-500
          "
          placeholder="Type here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isResponding}
        />

        <button
          type="button"
          className="
            mt-2
            flex
            min-w-fit
            cursor-pointer
            items-center
            justify-center
            rounded-lg
            bg-[var(--main-color-primary-dark)]
            px-4
            py-2
            text-sm
            text-white
            transition-colors
            hover:bg-[var(--main-color-primary-light)]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          disabled={!query.trim() || isResponding}
          onClick={handleSend}
        >
          {isResponding ? 'Responding...' : 'Send'}
        </button>
      </div>

      {showDeleteConfirm && (
        <DeleteConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}