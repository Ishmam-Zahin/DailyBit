'use client';

import CodeEditor from '@/components/CodeEditor';
import CodeEditorHeader from '@/components/CodeEditorHeader';
import { useAppSelector } from '@/redux/ReduxStore';
import Link from 'next/link';
import { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import AiChatBot from './AiChatBot';
import CodeOutput from './CodeOutput';

export default function PageLayout(
    {
        children,
        defaultValue,
        problemIds,
        aiTitle,
    }: Readonly<{
        children: React.ReactNode;
        defaultValue: string;
        problemIds: string[];
        aiTitle: string;
    }>
) {
    const [showWindow, setShowWindow] = useState(0);
    const [code, setCode] = useState(defaultValue);
    const [problemId, setProblemId] = useState('none');
    const [language, setLanguage] = useState('java');
    const [output, setOutput] = useState('');

    const token = useAppSelector((state) => state.user.token);

    return (
        <div className="h-full w-full overflow-hidden p-2">
            <PanelGroup
                autoSaveId="conditional"
                direction="horizontal"
                className="h-full w-full"
            >
                {/* LEFT PANEL */}
                <Panel
                    id="leftPanel"
                    order={1}
                    defaultSize={60}
                    minSize={40}
                    className="relative h-full"
                >
                    {/* Floating buttons */}
                    <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
                        <button
                            type="button"
                            aria-label="Toggle AI assistant"
                            onClick={() =>
                                setShowWindow((prev) =>
                                    prev === 2 ? 0 : 2
                                )
                            }
                            className="
                                mt-0
                                flex
                                h-10
                                w-10
                                cursor-pointer
                                items-center
                                justify-center
                                rounded-full
                                bg-[var(--main-color-dark-1)]
                                transition-all
                                duration-100
                            "
                        >
                            <svg
                                className={`h-6 w-6 ${
                                    showWindow === 2
                                        ? 'fill-[var(--main-color-primary-light)]'
                                        : 'fill-white'
                                }`}
                            >
                                <use href="/sprite.svg#icon-probot" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            aria-label="Toggle code editor"
                            onClick={() =>
                                setShowWindow((prev) =>
                                    prev === 1 ? 0 : 1
                                )
                            }
                            className="
                                mt-0
                                flex
                                h-10
                                w-10
                                cursor-pointer
                                items-center
                                justify-center
                                rounded-full
                                bg-[var(--main-color-dark-1)]
                                transition-all
                                duration-100
                            "
                        >
                            <svg
                                className={`h-6 w-6 ${
                                    showWindow === 1
                                        ? 'fill-[var(--main-color-primary-light)]'
                                        : 'fill-white'
                                }`}
                            >
                                <use href="/sprite.svg#icon-embed2" />
                            </svg>
                        </button>
                    </div>

                    {children}
                </Panel>

                {/* CODE EDITOR */}
                {showWindow === 1 && token !== null && (
                    <>
                        <PanelResizeHandle className="vertical-divider" />

                        <Panel
                            id="rightPanel"
                            order={2}
                            defaultSize={40}
                            minSize={35}
                            className="h-full min-w-0"
                        >
                            <PanelGroup
                                direction="vertical"
                                className="h-full"
                            >
                                {/* EDITOR */}
                                <Panel
                                    id="editorPanel"
                                    maxSize={80}
                                    defaultSize={80}
                                    className="h-full min-h-0"
                                >
                                    <CodeEditorHeader
                                        problemIds={problemIds}
                                        problemId={problemId}
                                        setProblemId={setProblemId}
                                        language={language}
                                        setLanguage={setLanguage}
                                    />

                                    <CodeEditor
                                        setCode={setCode}
                                        code={code}
                                    />
                                </Panel>

                                <PanelResizeHandle className="horizontal-divider" />

                                {/* OUTPUT */}
                                <Panel
                                    id="outputPanel"
                                    maxSize={70}
                                    defaultSize={20}
                                    className="h-full min-h-0"
                                >
                                    <CodeOutput
                                        problemId={problemId}
                                        output={output}
                                        setCode={setCode}
                                    />
                                </Panel>
                            </PanelGroup>
                        </Panel>
                    </>
                )}

                {/* AI CHAT */}
                {showWindow === 2 && token !== null && (
                    <>
                        <PanelResizeHandle className="vertical-divider" />

                        <Panel
                            id="rightPanel"
                            order={2}
                            defaultSize={40}
                            minSize={20}
                            className="h-full min-w-0"
                        >
                            <AiChatBot title={aiTitle} />
                        </Panel>
                    </>
                )}

                {/* LOGIN MESSAGE */}
                {showWindow !== 0 && token === null && (
                    <>
                        <PanelResizeHandle className="vertical-divider" />

                        <Panel
                            id="rightPanel"
                            order={2}
                            defaultSize={40}
                            minSize={20}
                            className="h-full min-w-0"
                        >
                            <div className="flex h-full w-full flex-col items-center justify-center bg-[var(--main-color-dark-1)] px-4 text-base text-white">
                                <span>You need to log in!</span>

                                <Link
                                    href="/login"
                                    className="
                                        mt-3
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
                                    "
                                >
                                    Login Now
                                </Link>
                            </div>
                        </Panel>
                    </>
                )}
            </PanelGroup>
        </div>
    );
}