import Link from 'next/link';

interface Course {
    id: string;
    title: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    topics: number;
    lessons: number;
    projects: number;
    icon: string;
    color: string;
}

const courses: Course[] = [
    {
        id: 'web-development-basics',
        title: 'Web Development Basics',
        description:
            'Complete introduction to web development. Master HTML, CSS, and JavaScript fundamentals to build your first interactive websites.',
        difficulty: 'Beginner',
        duration: '6-8 weeks',
        topics: 35,
        lessons: 120,
        projects: 8,
        icon: '🌐',
        color: '#059669',
    },
    {
        id: 'python',
        title: 'Python Programming',
        description:
            'Start your programming journey with Python. Learn variables, functions, data structures, and build real-world applications.',
        difficulty: 'Beginner',
        duration: '5-7 weeks',
        topics: 30,
        lessons: 95,
        projects: 6,
        icon: '🐍',
        color: '#047857',
    },
    {
        id: 'java',
        title: 'Java Programming',
        description:
            'Master object-oriented programming with Java. Build robust applications and understand enterprise-level development concepts.',
        difficulty: 'Intermediate',
        duration: '8-10 weeks',
        topics: 42,
        lessons: 150,
        projects: 12,
        icon: '☕',
        color: '#065f46',
    },
    {
        id: 'cpp',
        title: 'C++ Programming',
        description:
            'Deep dive into C++ fundamentals. Master memory management, algorithms, and high-performance system programming.',
        difficulty: 'Advanced',
        duration: '10-12 weeks',
        topics: 45,
        lessons: 180,
        projects: 15,
        icon: '⚙️',
        color: '#059669',
    },
    {
        id: 'javascript',
        title: 'Advanced JavaScript',
        description:
            'Master modern JavaScript with ES6+, async programming, DOM manipulation, and advanced development patterns.',
        difficulty: 'Intermediate',
        duration: '6-8 weeks',
        topics: 28,
        lessons: 110,
        projects: 10,
        icon: '⚡',
        color: '#047857',
    },
    {
        id: 'mobile-development',
        title: 'Mobile App Development',
        description:
            'Create stunning mobile apps for iOS and Android. Learn React Native and cross-platform development techniques.',
        difficulty: 'Advanced',
        duration: '8-10 weeks',
        topics: 38,
        lessons: 140,
        projects: 8,
        icon: '📱',
        color: '#065f46',
    },
    {
        id: 'data-structures',
        title: 'Data Structures & Algorithms',
        description:
            'Master essential computer science concepts. Learn arrays, trees, graphs, sorting algorithms, and problem-solving techniques.',
        difficulty: 'Intermediate',
        duration: '6-8 weeks',
        topics: 32,
        lessons: 125,
        projects: 20,
        icon: '🧮',
        color: '#059669',
    },
    {
        id: 'game-development',
        title: 'Game Development Basics',
        description:
            'Build your first interactive games! Learn game logic, physics engines, and create engaging gaming experiences.',
        difficulty: 'Intermediate',
        duration: '7-9 weeks',
        topics: 35,
        lessons: 130,
        projects: 6,
        icon: '🎮',
        color: '#047857',
    },
    {
        id: 'database',
        title: 'Database & SQL',
        description:
            'Master database design and SQL queries. Learn to store, retrieve, and manage application data effectively and securely.',
        difficulty: 'Intermediate',
        duration: '4-5 weeks',
        topics: 20,
        lessons: 75,
        projects: 5,
        icon: '🗃️',
        color: '#065f46',
    },
    {
        id: 'git',
        title: 'Git & Version Control',
        description:
            'Master professional development workflows with Git. Learn collaboration, branching, and project management techniques.',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        topics: 15,
        lessons: 45,
        projects: 3,
        icon: '📝',
        color: '#059669',
    },
    {
        id: 'cybersecurity',
        title: 'Cybersecurity Fundamentals',
        description:
            'Learn essential security concepts. Understand vulnerabilities, encryption, and how to build secure applications.',
        difficulty: 'Intermediate',
        duration: '5-6 weeks',
        topics: 25,
        lessons: 85,
        projects: 7,
        icon: '🔒',
        color: '#047857',
    },
    {
        id: 'ai-machine-learning',
        title: 'AI & Machine Learning',
        description:
            'Introduction to artificial intelligence and machine learning. Build intelligent applications and understand neural networks.',
        difficulty: 'Advanced',
        duration: '8-10 weeks',
        topics: 40,
        lessons: 160,
        projects: 10,
        icon: '🤖',
        color: '#065f46',
    },
];

const CoursesGrid = () => {
    const getDifficultyColor = (
        difficulty: Course['difficulty']
    ): string => {
        switch (difficulty) {
            case 'Beginner':
                return '#059669';

            case 'Intermediate':
                return '#047857';

            case 'Advanced':
                return '#065f46';

            default:
                return '#059669';
        }
    };

    return (
        <div className="absolute left-0 right-0 top-[9rem] mx-auto w-full max-w-[1200px] overflow-visible bg-white px-8 pb-16 pt-8">
            {/* Header */}
            <div className="mb-12 text-center">
                <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-gray-800 md:text-[2.8rem]">
                    Choose Your Learning Path
                </h1>

                <p className="mx-auto max-w-[700px] text-base font-normal leading-[1.7] text-gray-500 md:text-[1.1rem]">
                    Start your coding journey with our comprehensive courses
                    designed for young programmers
                </p>
            </div>

            {/* Courses Grid */}
            <div className="mb-16 grid grid-cols-1 gap-6 min-[480px]:gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
                {courses.map((course) => (
                    <Link
                        href={`/learn${
                            course.id === 'java' ? '/java' : ''
                        }`}
                        key={course.id}
                        className="
                            group
                            relative
                            flex
                            min-h-[380px]
                            flex-col
                            overflow-hidden
                            rounded-[20px]
                            border
                            border-gray-200
                            bg-white
                            p-8
                            text-inherit
                            no-underline
                            shadow-[0_1px_3px_rgba(0,0,0,0.1)]
                            transition-all
                            duration-[400ms]
                            ease-[cubic-bezier(0.4,0,0.2,1)]
                            before:absolute
                            before:left-0
                            before:right-0
                            before:top-0
                            before:h-1
                            before:bg-gradient-to-r
                            before:from-emerald-600
                            before:via-emerald-700
                            before:to-green-900
                            before:opacity-0
                            before:transition-opacity
                            before:duration-[400ms]
                            hover:-translate-y-2
                            hover:border-gray-300
                            hover:shadow-[0_20px_40px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.08)]
                            hover:before:opacity-100
                            active:-translate-y-1
                        "
                    >
                        {/* Card Header */}
                        <div className="mb-6 flex items-start justify-between">
                            <div
                                className="
                                    flex
                                    h-[70px]
                                    w-[70px]
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-[18px]
                                    border
                                    border-gray-200
                                    bg-gradient-to-br
                                    from-gray-50
                                    to-gray-100
                                    shadow-[0_2px_8px_rgba(0,0,0,0.05)]
                                    transition-all
                                    duration-[400ms]
                                    group-hover:scale-105
                                    group-hover:shadow-[0_8px_25px_rgba(31,41,55,0.15)]
                                "
                            >
                                <div className="text-[2rem] transition-transform duration-300">
                                    {course.icon}
                                </div>
                            </div>

                            <div className="flex flex-col items-end">
                                <span
                                    className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.05rem] text-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                                    style={{
                                        backgroundColor:
                                            getDifficultyColor(
                                                course.difficulty
                                            ),
                                    }}
                                >
                                    {course.difficulty}
                                </span>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="mb-8 flex-grow">
                            <h3 className="mb-4 text-2xl font-bold leading-[1.4] tracking-tight text-gray-800">
                                {course.title}
                            </h3>

                            <p className="mb-8 text-base font-normal leading-[1.7] text-gray-500">
                                {course.description}
                            </p>

                            {/* Course Stats */}
                            <div className="mt-auto flex flex-col gap-4">
                                <div className="flex gap-8 min-[480px]:gap-4">
                                    <div className="flex flex-1 flex-col">
                                        <span className="mb-1 text-[0.85rem] font-semibold uppercase tracking-[0.0375rem] text-gray-400">
                                            Duration
                                        </span>

                                        <span className="text-[1.1rem] font-bold text-gray-800">
                                            {course.duration}
                                        </span>
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <span className="mb-1 text-[0.85rem] font-semibold uppercase tracking-[0.0375rem] text-gray-400">
                                            Topics
                                        </span>

                                        <span className="text-[1.1rem] font-bold text-gray-800">
                                            {course.topics}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-8 min-[480px]:gap-4">
                                    <div className="flex flex-1 flex-col">
                                        <span className="mb-1 text-[0.85rem] font-semibold uppercase tracking-[0.0375rem] text-gray-400">
                                            Lessons
                                        </span>

                                        <span className="text-[1.1rem] font-bold text-gray-800">
                                            {course.lessons}
                                        </span>
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <span className="mb-1 text-[0.85rem] font-semibold uppercase tracking-[0.0375rem] text-gray-400">
                                            Projects
                                        </span>

                                        <span className="text-[1.1rem] font-bold text-gray-800">
                                            {course.projects}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="mt-auto">
                            <div
                                className="
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-3
                                    rounded-[14px]
                                    border-2
                                    border-gray-200
                                    bg-transparent
                                    px-6
                                    py-4
                                    text-base
                                    font-bold
                                    tracking-[0.0125rem]
                                    text-gray-700
                                    transition-all
                                    duration-[400ms]
                                    ease-[cubic-bezier(0.4,0,0.2,1)]
                                    group-hover:border-transparent
                                    group-hover:bg-gradient-to-br
                                    group-hover:from-emerald-600
                                    group-hover:to-emerald-700
                                    group-hover:text-white
                                    group-hover:shadow-[0_8px_20px_rgba(5,150,105,0.3)]
                                "
                            >
                                <span>Start Learning</span>

                                <span className="text-[1.1rem] font-bold transition-transform duration-300 group-hover:translate-x-1.5">
                                    →
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Call To Action */}
            <div className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-16 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:px-12">
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-800 md:text-[2.2rem]">
                    Not sure where to start?
                </h2>

                <p className="mx-auto mb-10 max-w-[500px] text-base leading-[1.6] text-gray-500 md:text-[1.2rem]">
                    Take our quick assessment to find the perfect course for
                    your skill level
                </p>

                <Link
                    href="/"
                    className="
                        inline-flex
                        items-center
                        gap-3
                        rounded-[16px]
                        bg-gradient-to-br
                        from-emerald-600
                        to-emerald-700
                        px-10
                        py-4
                        text-[1.1rem]
                        font-bold
                        tracking-[0.0125rem]
                        text-white
                        no-underline
                        shadow-[0_4px_16px_rgba(5,150,105,0.2)]
                        transition-all
                        duration-[400ms]
                        ease-[cubic-bezier(0.4,0,0.2,1)]
                        hover:-translate-y-1
                        hover:from-emerald-700
                        hover:to-green-900
                        hover:shadow-[0_8px_25px_rgba(5,150,105,0.35)]
                        active:-translate-y-0.5
                    "
                >
                    Take Assessment
                </Link>
            </div>
        </div>
    );
};

export default CoursesGrid;