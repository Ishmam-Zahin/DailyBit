// CodeOutput.tsx
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
        <div className="bg-[rgb(18,18,18)] text-white px-8 py-4 text-[1.6rem] font-bold">
            <div className="flex flex-row justify-center items-center gap-4 pb-4 border-b border-[var(--main-color-primary-light)]">
                <button
                className={`px-2 py-1 text-[1.4rem] font-normal ${activeBlock === 1 ? 'bg-[var(--main-color-primary-light)] text-white' : 'bg-[var(--main-color-gray-1)] text-black'}`}
                onClick={()=>setActiveBlock(1)}
                >Output</button>
                {problemId !== 'none' && (
                    <button
                    className={`px-2 py-1 text-[1.4rem] font-normal ${activeBlock === 2 ? 'bg-[var(--main-color-primary-light)] text-white' : 'bg-[var(--main-color-gray-1)] text-black'}`}
                    onClick={()=>setActiveBlock(2)}
                    >Submissions</button>
                )}
            </div>
            {activeBlock === 1 && (
                <div className="h-full overflow-y-auto">
                    {output}
                </div>
            )}
            {activeBlock === 2 && (
                <div className="h-full overflow-y-auto">
                    no submissions yet
                </div>
            )}
        </div>
    );
}