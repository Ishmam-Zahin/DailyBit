import Editor from "@monaco-editor/react";
import { Dispatch, SetStateAction } from "react";

export default function CodeEditor(
    {
        setCode,
        defaultValue = '//code here'
    }:
    {
        setCode: Dispatch<SetStateAction<string>>
        defaultValue?: string,
    }
){
    return (
        <Editor
            height="100%"
            width="100%"
            defaultLanguage="java"
            defaultValue={defaultValue}
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