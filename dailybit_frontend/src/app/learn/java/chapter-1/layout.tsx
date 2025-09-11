'use client'

import CodeEditor from '@/components/CodeEditor';
import styles from '@/styles/learn.module.scss'
import { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';


export default function layout(
    {
        children,
    }:
    Readonly<{
        children: React.ReactNode
    }>
){
    const [showWindow, setShowWindow] = useState(0); // 0: none 1: code editor 2: ai panel
    return (
        <div
        className={styles.pageContainer}
        >
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
            <PanelGroup autoSaveId="conditional" direction='horizontal'>
                <Panel
                id='leftPanel'
                className={styles.leftPanel}
                order={1}
                defaultSize={60}
                minSize={40}>
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
                        minSize={20}>
                            <PanelGroup autoSaveId="conditional" direction='vertical'>
                                <Panel
                                id='editorPanel'
                                className={styles.editorPanel}
                                order={2}
                                defaultSize={60}
                                minSize={30}>
                                    <CodeEditor />
                                </Panel>
                                <Panel
                                id='outputPanel'
                                className={styles.outputPanel}
                                order={2}
                                defaultSize={40}
                                minSize={20}>
                                    output
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