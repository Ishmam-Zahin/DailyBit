import IntroContent from '@/components/learn/java/chapters/IntroContent';

export default function Page() {
    return (
        <div
            className="
                chapter-scroll
                h-full
                overflow-y-auto
                bg-[linear-gradient(135deg,#f8fffe_0%,#f0fdf4_100%)]
                p-5
                font-sans
                max-md:p-4
            "
        >
            <div className="mx-auto max-w-[1000px] pb-10 leading-[1.7]">
                <h1
                    className="
                        mb-8
                        border-b-2
                        border-emerald-500/60
                        pb-4
                        text-center
                        text-3xl
                        font-bold
                        text-transparent
                        bg-[linear-gradient(135deg,#064e3b_0%,#047857_100%)]
                        bg-clip-text
                        [-webkit-background-clip:text]
                        [-webkit-text-fill-color:transparent]
                        max-md:text-2xl
                    "
                >
                    Introduction to Java
                </h1>

                <IntroContent />
            </div>
        </div>
    );
}