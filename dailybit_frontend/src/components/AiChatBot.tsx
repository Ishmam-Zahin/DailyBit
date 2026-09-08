'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

type Message = {
    key: string;
    agent: 'user' | 'ai';
    message: string;
};

export default function AiChatBot({
    title,
}: {
    title: string;
}) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [query, setQuery] = useState('');

    return (
        <div className="flex h-full w-full flex-col overflow-hidden bg-[var(--main-color-dark-1)] text-base">
            {/* Messages */}
            <div className="flex grow flex-col gap-3 overflow-y-auto px-4 py-3">
                {messages.length === 0 ? (
                    <div className="flex h-full w-full items-center justify-center text-base text-white">
                        {title || 'Ask AI'}
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.key}
                            className={`max-w-[85%] rounded-lg bg-[rgb(97,97,97)] px-3 py-2 text-sm leading-[1.6] text-white ${
                                message.agent === 'ai'
                                    ? 'mr-auto'
                                    : 'ml-auto'
                            }`}
                        >
                            <ReactMarkdown>
                                {message.message}
                            </ReactMarkdown>
                        </div>
                    ))
                )}
            </div>

            {/* Input */}
            <div className="border-t border-green-600 p-2">
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
                    disabled={!query.trim()}
                    onClick={() => {
                        if (!query.trim()) return;

                        const newMessage: Message = {
                            key: `user${Date.now()}`,
                            agent: 'user',
                            message: query,
                        };

                        setMessages((state) => [...state, newMessage]);
                        setQuery('');
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}