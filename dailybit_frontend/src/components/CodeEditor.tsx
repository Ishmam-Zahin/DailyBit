import Editor from "@monaco-editor/react";
import { Dispatch, SetStateAction } from "react";

export default function CodeEditor(
    {
        setCode,
        code = '//code here'
    }:
    {
        setCode: Dispatch<SetStateAction<string>>
        code?: string,
    }
){
    return (
        <Editor
            height="100%"
            width="100%"
            defaultLanguage="java"
            value={code}
            theme="vs-dark"
            options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            readOnly: false
            }}
            onChange={(value) => setCode(value ?? '')}
        />
    );
}