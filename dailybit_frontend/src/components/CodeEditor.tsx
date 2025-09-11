import Editor from "@monaco-editor/react";
import { PanelGroup } from "react-resizable-panels";

export default function CodeEditor(){
    return (
        <Editor
            height="100%"
            defaultLanguage="java"
            defaultValue="// Start coding..."
            theme="vs-dark"
            options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            }}
        />
    );
}