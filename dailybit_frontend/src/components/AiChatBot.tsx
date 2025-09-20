'use client'
import styles from '@/styles/learn.module.scss';
import { useState } from 'react';


type Message = {
    key: string,
    agent: 'user' | 'ai',
    message: string
}

const initial:Message[] = [{
    key: `user${Date.now()}`,
    agent: 'user',
    message: 'hello how are you'
},{
    key: `ai${Date.now()}`,
    agent: 'ai',
    message: 'i am ok zahin. how are you?'
}]

export default function AiChatBot(
    {
        context,
    }:
    {
        context: string
    }
){
    const [messages, setMessages] = useState<Message[]>(initial);
    const [query, setQuery] = useState('');
    return (
        <div
        className={styles.aiPanel}
        >
            <div
            className={styles.messagesBlock}
            >
                {messages.map(message => {
                    return (
                        <div
                        key={message.key}
                        className={message.agent === 'ai' ? styles.aiMessage : styles.userMessage}
                        >
                            {message.message}
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
                onClick={() => {
                    if(query === '') return;
                    const newMessage:Message = {
                        key: `user${Date.now()}`,
                        agent: 'user',
                        message: query,
                    };
                    setQuery('');
                    setMessages(state => [...state, newMessage]);
                }}
                >send</button>
            </div>
        </div>
    );
}