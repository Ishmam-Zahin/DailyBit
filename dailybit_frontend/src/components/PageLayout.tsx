'use client'

import { submitCode } from '@/actions/submitCode';
import CodeEditor from '@/components/CodeEditor';
import CodeEditorHeader from '@/components/CodeEditorHeader';
import { useAppSelector } from '@/redux/ReduxStore';
import styles from '@/styles/learn.module.scss';
import { useCallback, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';



export default function PageLayout(
    {
        children,
        defaultValue,
        problemIds,
    }:
    Readonly<{
        children: React.ReactNode,
        defaultValue: string,
        problemIds: string[]
    }>
){

    const [showWindow, setShowWindow] = useState(0); // 0: none 1: code editor 2: ai panel
        const [code, setCode] = useState(defaultValue);
        const [problemId, setPorblemId] = useState('none');
        const [language, setLanguage] = useState('java');
        const [output, setOutput] = useState('');
        const token = useAppSelector(state => state.user.token);
    
        const handleSubmit = useCallback(async () => {
            const submit = {
                problemId: problemId,
                language: language,
                code: code
            }
            setOutput('');
            return await submitCode({submit, token});
        }, [code, problemId, language]);

    return (
        <div
        className={styles.pageContainer}
        >
            <PanelGroup autoSaveId="conditional" direction='horizontal'>
                <Panel
                id='leftPanel'
                className={styles.leftPanel}
                order={1}
                defaultSize={60}
                minSize={40}>
                    <div
                    className={styles.btnContainer}
                    >
                        <button
                        className={styles.toggleBtn}
                        onClick={() => setShowWindow((prev) => {
                            if(prev === 2) return 0;
                            return 2;
                        })}
                        >
                            <svg className={styles.icon}>
                                <use href="/sprite.svg#icon-probot" />
                            </svg>
                        </button>
                        <button
                        className={styles.toggleBtn}
                        onClick={() => setShowWindow((prev) => {
                            if(prev === 1) return 0;
                            return 1;
                        })}
                        >
                            <svg className={styles.icon}>
                                <use href="/sprite.svg#icon-embed2" />
                            </svg>
                        </button>
                    </div>
                    {children}
                </Panel>
                {(showWindow === 1) && (
                    <>
                        <PanelResizeHandle className={styles.divider} />
                        <Panel
                        id='rightPanel'
                        className={styles.rightPanel}
                        order={2}
                        defaultSize={40}
                        minSize={35}>
                            <PanelGroup direction='vertical'>
                                <Panel
                                id='editorPanel'
                                className={styles.editorPanel}
                                maxSize={80}
                                defaultSize={80}
                                >
                                    <CodeEditorHeader
                                    problemIds={problemIds}
                                    problemId={problemId}
                                    setProblemId={setPorblemId}
                                    language={language}
                                    setLanguage={setLanguage}
                                    handleSubmit={handleSubmit}
                                    setOutput={setOutput}
                                    />
                                    <CodeEditor
                                    setCode={setCode}
                                    defaultValue={code}
                                    />
                                </Panel>
                                <PanelResizeHandle className={styles.divider} />
                                <Panel
                                id='outputPanel'
                                className={`${styles.outputPanel} ${output === 'Accepted' ? styles.accepted : output === 'Wrong Answer' ? styles.wa : ''}`}
                                maxSize={70}
                                defaultSize={20}
                                >
                                    {output}
                                </Panel>
                            </PanelGroup>
                        </Panel>
                    </>
                )}
                {(showWindow === 2) && (
                    <>
                        <PanelResizeHandle className={styles.divider} />
                        <Panel
                        id='rightPanel'
                        className={styles.rightPanel}
                        order={2}
                        defaultSize={40}
                        minSize={20}>
                            ai panel
                        </Panel>
                    </>
                )}
            </PanelGroup>
        </div>
    );
}