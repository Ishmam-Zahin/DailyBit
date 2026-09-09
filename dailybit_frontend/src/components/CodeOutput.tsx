import { Dispatch, SetStateAction, useState } from 'react';

export default function CodeOutput(
    {
        problemId,
        output,
        setCode,
    }:
    {
        problemId: string,
        output: string,
        setCode: Dispatch<SetStateAction<string>>,
    }
){
    const [activeBlock, setActiveBlock] = useState(1); // 1: output, 2: submissions

    return (
        <div className="bg-[rgb(18,18,18)] text-white px-6 py-3 text-sm font-normal">
            <div className="flex flex-row justify-center items-center gap-4 pb-3 border-b border-[var(--main-color-primary-light)]">
                <button
                    className={`px-2 py-1 text-xs font-normal rounded ${activeBlock === 1 ? 'bg-[var(--main-color-primary-light)] text-white' : 'bg-[var(--main-color-gray-1)] text-black'}`}
                    onClick={()=>setActiveBlock(1)}
                >Output</button>
                {problemId !== 'none' && (
                    <button
                        className={`px-2 py-1 text-xs font-normal rounded ${activeBlock === 2 ? 'bg-[var(--main-color-primary-light)] text-white' : 'bg-[var(--main-color-gray-1)] text-black'}`}
                        onClick={()=>setActiveBlock(2)}
                    >Submissions</button>
                )}
            </div>
            {activeBlock === 1 && (
                <div className="h-full overflow-y-auto pt-3">
                    {output}
                </div>
            )}
            {activeBlock === 2 && (
                <div className="h-full overflow-y-auto pt-3">
                    no submissions yet
                </div>
            )}
        </div>
    );
}