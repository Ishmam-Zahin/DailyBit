'use client'
import askAI from '@/actions/askAI';
import { AIQuery } from '@/helper/types';
import styles from '@/styles/learn.module.scss';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from "react-markdown";


type Message = {
    key: string,
    agent: 'user' | 'ai',
    message: string
}
export default function AiChatBot(
    {
        title,
    }:
    {
        title: string
    }
){
    const [messages, setMessages] = useState<Message[]>([]);
    const [query, setQuery] = useState('');
    const mutation = useMutation({
        mutationFn: askAI,
        onSuccess: (data) => {
            const newMessage:Message = {
                key: `ai${Date.now()}`,
                agent: 'ai',
                message: data['llm_response']['llm_response'] ?? 'no message'
            };
            setMessages(state => {
                return [...state, newMessage];
            })
        },
        onError: (err: string)=>{
            toast.error(err);
        }
    });

    const handleAskAI = () => {
        const json:AIQuery = {
            query: query,
            context: title,
            n_results: 2,
            similarity_threshold: 0.5,
        }
        setQuery('');
        return mutation.mutate({json});
    }
    return (
        <div
        className={styles.aiPanel}
        >
            <div
            className={styles.messagesBlock}
            >
                {messages.length === 0 ? <div
                className={styles.aiNoMessage}
                >Ask AI</div> : messages.map(message => {
                    return (
                        <div
                        key={message.key}
                        className={message.agent === 'ai' ? styles.aiMessage : styles.userMessage}
                        >
                            <ReactMarkdown>
                                {message.message}
                            </ReactMarkdown>
                        </div>

                    );
                })}
            </div>
            <div
            className={styles.messageInput}
            >
                <textarea
                placeholder='type here...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                />
                <button
                className={`${styles.btn}`}
                disabled={mutation.isPending}
                onClick={() => {
                    const newMessage:Message = {
                        key: `user${Date.now()}`,
                        agent: 'user',
                        message: query
                    };
                    setMessages(state => {
                        return [...state, newMessage];
                    })
                    handleAskAI()
                }}
                >
                    {mutation.isPending ? 'Loading...' : 'Send'}
                </button>
            </div>
        </div>
    );
}