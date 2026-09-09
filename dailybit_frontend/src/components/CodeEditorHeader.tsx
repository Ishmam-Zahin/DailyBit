import { Dispatch, SetStateAction } from 'react';

export default function CodeEditorHeader(
    {
        problemIds,
        problemId,
        setProblemId,
        language,
        setLanguage,
    }:
    {
        problemIds: string[],
        problemId: string,
        setProblemId: Dispatch<SetStateAction<string>>,
        language: string,
        setLanguage: Dispatch<SetStateAction<string>>,
    }
){
    return (
        <div className="bg-[var(--main-color-gray-1)] px-4 py-2 text-sm flex flex-row justify-between items-center">
            <div>
                <label htmlFor="problemId">Problem ID: </label>
                <select
                    name="problemId"
                    id="problemId"
                    defaultValue={problemId}
                    className="border border-black px-2 py-1 rounded-lg cursor-pointer ml-2 mr-4 text-sm focus:outline-none active:outline-none"
                    onChange={(e) => setProblemId(e.target.value)}
                >
                    <option value="none">None</option>
                    {problemIds.map((problemId) => {
                        return <option key={problemId} value={problemId}>{problemId}</option>
                    })}
                </select>
                <label htmlFor="language">Language: </label>
                <select
                    name="language"
                    id="language"
                    defaultValue={language}
                    className="border border-black px-2 py-1 rounded-lg cursor-pointer ml-2 mr-4 text-sm focus:outline-none active:outline-none"
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="java">JAVA</option>
                    <option value="python">PYTHON</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                </select>
            </div>
            <div>
                <button
                    className="bg-[var(--main-color-primary-dark)] text-white px-4 py-1.5 rounded-2xl flex gap-3 justify-center items-center min-w-fit cursor-pointer m-0 text-sm"
                >
                    {problemId === 'none' ? 'RUN' : 'SUBMIT'}
                </button>
            </div>
        </div>
    );
}