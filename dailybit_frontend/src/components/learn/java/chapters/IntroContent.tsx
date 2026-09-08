// src/components/learn/java/JavaIntroContent.tsx

export default function JavaIntroContent() {
    return (
        <>
            {/* Introduction */}
            <p className="mb-6 text-base font-medium leading-[1.7] text-[#1f2937]">
                Welcome to Java programming! This introduction covers Java's key
                concepts, features, and applications. Let's explore what makes
                Java one of the world's most popular programming languages.
            </p>

            {/* What is Java? */}
            <h2 className="mt-10 mb-5 flex items-center gap-3 text-[22px] font-semibold text-[#047857] before:h-6 before:w-1 before:rounded-[3px] before:bg-gradient-to-b before:from-[#10b981] before:to-[#059669] before:content-['']">
                What is Java?
            </h2>

            <p className="mb-6 text-base font-medium leading-[1.7] text-[#1f2937]">
                Java is a high-level, object-oriented programming language with
                the philosophy of{' '}
                <span className="rounded-md bg-[rgba(16,185,129,0.15)] px-2 py-1 font-semibold text-[#047857]">
                    "Write Once, Run Anywhere" (WORA)
                </span>
                . Java programs compile to{' '}
                <span className="rounded-md bg-[rgba(16,185,129,0.15)] px-2 py-1 font-semibold text-[#047857]">
                    bytecode
                </span>{' '}
                that runs on the Java Virtual Machine (JVM), making them
                platform-independent.
            </p>

            {/* History */}
            <h2 className="mt-10 mb-5 flex items-center gap-3 text-[22px] font-semibold text-[#047857] before:h-6 before:w-1 before:rounded-[3px] before:bg-gradient-to-b before:from-[#10b981] before:to-[#059669] before:content-['']">
                History
            </h2>

            <p className="mb-6 text-base font-medium leading-[1.7] text-[#1f2937]">
                Java was created in 1995 by{' '}
                <span className="rounded-md bg-[rgba(16,185,129,0.15)] px-2 py-1 font-semibold text-[#047857]">
                    James Gosling
                </span>{' '}
                at Sun Microsystems (now Oracle Corporation). Originally called
                "Oak," it evolved into Java for broader applications.
            </p>

            {/* Timeline */}
            <div className="my-6 space-y-3">
                <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-4">
                    <span className="min-w-[60px] font-bold text-emerald-700">
                        1991
                    </span>
                    <span className="text-[15px] leading-[1.6] text-gray-700">
                        Project Green started, leading to the Oak language
                    </span>
                </div>

                <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-4">
                    <span className="min-w-[60px] font-bold text-emerald-700">
                        1995
                    </span>
                    <span className="text-[15px] leading-[1.6] text-gray-700">
                        Java 1.0 officially released to the public
                    </span>
                </div>

                <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-4">
                    <span className="min-w-[60px] font-bold text-emerald-700">
                        2010
                    </span>
                    <span className="text-[15px] leading-[1.6] text-gray-700">
                        Oracle Corporation acquires Sun Microsystems
                    </span>
                </div>

                <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-4">
                    <span className="min-w-[60px] font-bold text-emerald-700">
                        2014
                    </span>
                    <span className="text-[15px] leading-[1.6] text-gray-700">
                        Java 8 introduces lambda expressions and functional
                        programming features
                    </span>
                </div>
            </div>

            {/* Key Features */}
            <h2 className="mt-10 mb-5 flex items-center gap-3 text-[22px] font-semibold text-[#047857] before:h-6 before:w-1 before:rounded-[3px] before:bg-gradient-to-b before:from-[#10b981] before:to-[#059669] before:content-['']">
                Key Features of Java
            </h2>

            <p className="mb-6 text-base font-medium leading-[1.7] text-[#1f2937]">
                Java's key features make it suitable for both learning and
                professional development:
            </p>

            <div className="my-6">
                <div className="mb-3 rounded border-l-4 border-[#8bf7ca] bg-[rgba(0,123,255,0.05)] p-3">
                    <span className="mb-1 block font-bold text-black">
                        Platform Independence:
                    </span>
                    <span className="text-[15px] leading-[1.6] text-[#555]">
                        Java programs run on any system with JVM installed,
                        regardless of the underlying operating system
                    </span>
                </div>

                <div className="mb-3 rounded border-l-4 border-[#8bf7ca] bg-[rgba(0,123,255,0.05)] p-3">
                    <span className="mb-1 block font-bold text-black">
                        Object-Oriented Programming:
                    </span>
                    <span className="text-[15px] leading-[1.6] text-[#555]">
                        Organizes code into classes and objects, promoting code
                        reusability and maintainability
                    </span>
                </div>

                <div className="mb-3 rounded border-l-4 border-[#8bf7ca] bg-[rgba(0,123,255,0.05)] p-3">
                    <span className="mb-1 block font-bold text-black">
                        Memory Management:
                    </span>
                    <span className="text-[15px] leading-[1.6] text-[#555]">
                        Automatic garbage collection handles memory allocation
                        and deallocation
                    </span>
                </div>

                <div className="mb-3 rounded border-l-4 border-[#8bf7ca] bg-[rgba(0,123,255,0.05)] p-3">
                    <span className="mb-1 block font-bold text-black">
                        Security:
                    </span>
                    <span className="text-[15px] leading-[1.6] text-[#555]">
                        Built-in security features protect against viruses and
                        unauthorized access
                    </span>
                </div>

                <div className="mb-3 rounded border-l-4 border-[#8bf7ca] bg-[rgba(0,123,255,0.05)] p-3">
                    <span className="mb-1 block font-bold text-black">
                        Multithreading:
                    </span>
                    <span className="text-[15px] leading-[1.6] text-[#555]">
                        Supports concurrent execution of multiple parts of a
                        program
                    </span>
                </div>

                <div className="mb-3 rounded border-l-4 border-[#8bf7ca] bg-[rgba(0,123,255,0.05)] p-3">
                    <span className="mb-1 block font-bold text-black">
                        Rich API:
                    </span>
                    <span className="text-[15px] leading-[1.6] text-[#555]">
                        Extensive library of pre-built classes and methods for
                        common programming tasks
                    </span>
                </div>
            </div>

            {/* JDK */}
            <h2 className="mt-10 mb-5 flex items-center gap-3 text-[22px] font-semibold text-[#047857] before:h-6 before:w-1 before:rounded-[3px] before:bg-gradient-to-b before:from-[#10b981] before:to-[#059669] before:content-['']">
                Java Development Kit (JDK)
            </h2>

            <p className="mb-6 text-base font-medium leading-[1.7] text-[#1f2937]">
                The{' '}
                <span className="rounded-md bg-[rgba(16,185,129,0.15)] px-2 py-1 font-semibold text-[#047857]">
                    Java Development Kit (JDK)
                </span>{' '}
                provides all tools needed to develop Java applications,
                including compiler, JVM, and development utilities.
            </p>

            <div className="my-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">
                        Java Compiler (javac)
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-gray-600">
                        Converts Java source code (.java files) into bytecode
                        (.class files)
                    </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">
                        Java Virtual Machine (JVM)
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-gray-600">
                        Executes Java bytecode and provides platform
                        independence
                    </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">
                        Java API Documentation
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-gray-600">
                        Comprehensive documentation for all Java classes and
                        methods
                    </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">
                        Development Tools
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-gray-600">
                        Debugger (jdb), archiver (jar), and other utilities
                    </p>
                </div>
            </div>

            {/* First Program */}
            <h2 className="mt-10 mb-5 flex items-center gap-3 text-[22px] font-semibold text-[#047857] before:h-6 before:w-1 before:rounded-[3px] before:bg-gradient-to-b before:from-[#10b981] before:to-[#059669] before:content-['']">
                Your First Java Program
            </h2>

            <p className="mb-6 text-base font-medium leading-[1.7] text-[#1f2937]">
                Let's create your first Java program - the traditional "Hello
                World" application:
            </p>

            <div className="my-6 rounded-lg border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.05)] p-4">
                <div className="mb-3 text-[15px] font-semibold text-[#047857]">
                    HelloWorld.java
                </div>

                <pre className="m-0 overflow-x-auto rounded-md bg-[#1f2937] p-4 font-mono text-[14px] leading-[1.6] text-[#e5e7eb]">
{`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to Java Programming!");
    }
}`}
                </pre>
            </div>

            {/* Code Breakdown */}
            <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    Code Breakdown:
                </h3>

                <div className="mb-3 flex flex-col gap-2">
                    <span className="inline-block w-fit rounded bg-gray-200 px-2 py-1 font-mono text-sm text-gray-800">
                        public class HelloWorld
                    </span>

                    <span className="text-[15px] leading-[1.6] text-gray-600">
                        Declares a public class named HelloWorld (must match
                        filename)
                    </span>
                </div>

                <div className="mb-3 flex flex-col gap-2">
                    <span className="inline-block w-fit rounded bg-gray-200 px-2 py-1 font-mono text-sm text-gray-800">
                        public static void main(String[] args)
                    </span>

                    <span className="text-[15px] leading-[1.6] text-gray-600">
                        The main method - entry point where program execution
                        begins
                    </span>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="inline-block w-fit rounded bg-gray-200 px-2 py-1 font-mono text-sm text-gray-800">
                        System.out.println()
                    </span>

                    <span className="text-[15px] leading-[1.6] text-gray-600">
                        Prints text to the console followed by a new line
                    </span>
                </div>
            </div>

            {/* Syntax Rules */}
            <h2 className="mt-10 mb-5 flex items-center gap-3 text-[22px] font-semibold text-[#047857] before:h-6 before:w-1 before:rounded-[3px] before:bg-gradient-to-b before:from-[#10b981] before:to-[#059669] before:content-['']">
                Basic Syntax Rules
            </h2>

            <p className="mb-6 text-base font-medium leading-[1.7] text-[#1f2937]">
                Java follows specific syntax rules for code consistency:
            </p>

            <div className="my-6 space-y-3">
                <div className="rounded-lg border-l-4 border-emerald-500 bg-gray-50 p-4">
                    <span className="font-semibold text-gray-800">
                        Case Sensitivity:
                    </span>
                    <span className="ml-2 text-[15px] text-gray-600">
                        Java distinguishes between uppercase and lowercase
                        letters (myVariable ≠ MyVariable)
                    </span>
                </div>

                <div className="rounded-lg border-l-4 border-emerald-500 bg-gray-50 p-4">
                    <span className="font-semibold text-gray-800">
                        File Naming:
                    </span>
                    <span className="ml-2 text-[15px] text-gray-600">
                        Java filename must match the public class name
                        (HelloWorld.java for class HelloWorld)
                    </span>
                </div>

                <div className="rounded-lg border-l-4 border-emerald-500 bg-gray-50 p-4">
                    <span className="font-semibold text-gray-800">
                        Semicolons:
                    </span>
                    <span className="ml-2 text-[15px] text-gray-600">
                        Every statement must end with a semicolon (;)
                    </span>
                </div>

                <div className="rounded-lg border-l-4 border-emerald-500 bg-gray-50 p-4">
                    <span className="font-semibold text-gray-800">
                        Braces:
                    </span>
                    <span className="ml-2 text-[15px] text-gray-600">
                        Code blocks are enclosed in curly braces {'{ }'}
                    </span>
                </div>

                <div className="rounded-lg border-l-4 border-emerald-500 bg-gray-50 p-4">
                    <span className="font-semibold text-gray-800">
                        Comments:
                    </span>
                    <span className="ml-2 text-[15px] text-gray-600">
                        Single line (//) or multi-line (/* */)
                    </span>
                </div>

                <div className="rounded-lg border-l-4 border-emerald-500 bg-gray-50 p-4">
                    <span className="font-semibold text-gray-800">
                        Identifiers:
                    </span>
                    <span className="ml-2 text-[15px] text-gray-600">
                        Names must start with letter, underscore, or $ symbol
                    </span>
                </div>
            </div>

            {/* Applications */}
            <h2 className="mt-10 mb-5 flex items-center gap-3 text-[22px] font-semibold text-[#047857] before:h-6 before:w-1 before:rounded-[3px] before:bg-gradient-to-b before:from-[#10b981] before:to-[#059669] before:content-['']">
                Applications of Java
            </h2>

            <p className="mb-6 text-base font-medium leading-[1.7] text-[#1f2937]">
                Java's versatility makes it suitable for a wide range of
                applications across different domains. Here are the major areas
                where Java excels:
            </p>

            <div className="my-6 space-y-4">
                <div className="flex items-start gap-4 rounded-lg border-l-4 border-blue-500 bg-gray-50 p-4">
                    <h3 className="min-w-[200px] font-bold text-gray-800">
                        🌐 Web Development
                    </h3>

                    <div>
                        <p className="text-[15px] leading-[1.6] text-gray-600">
                            Server-side development with Spring, JSP, and
                            servlets. Powers major websites and web services.
                        </p>

                        <div className="mt-1 text-sm italic text-blue-600">
                            Examples: LinkedIn, Twitter, eBay backend systems
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg border-l-4 border-blue-500 bg-gray-50 p-4">
                    <h3 className="min-w-[200px] font-bold text-gray-800">
                        📱 Mobile Development
                    </h3>

                    <div>
                        <p className="text-[15px] leading-[1.6] text-gray-600">
                            Android app development using Android SDK and
                            frameworks like React Native.
                        </p>

                        <div className="mt-1 text-sm italic text-blue-600">
                            Examples: Most Android apps, including WhatsApp,
                            Spotify
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg border-l-4 border-blue-500 bg-gray-50 p-4">
                    <h3 className="min-w-[200px] font-bold text-gray-800">
                        🏢 Enterprise Applications
                    </h3>

                    <div>
                        <p className="text-[15px] leading-[1.6] text-gray-600">
                            Large-scale business applications, banking systems,
                            and enterprise resource planning (ERP) systems.
                        </p>

                        <div className="mt-1 text-sm italic text-blue-600">
                            Examples: Banking software, customer relationship
                            management systems
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg border-l-4 border-blue-500 bg-gray-50 p-4">
                    <h3 className="min-w-[200px] font-bold text-gray-800">
                        🖥️ Desktop Applications
                    </h3>

                    <div>
                        <p className="text-[15px] leading-[1.6] text-gray-600">
                            Cross-platform desktop applications using Swing,
                            JavaFX, and AWT.
                        </p>

                        <div className="mt-1 text-sm italic text-blue-600">
                            Examples: NetBeans IDE, Eclipse IDE, IntelliJ IDEA
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg border-l-4 border-blue-500 bg-gray-50 p-4">
                    <h3 className="min-w-[200px] font-bold text-gray-800">
                        🔬 Scientific Applications
                    </h3>

                    <div>
                        <p className="text-[15px] leading-[1.6] text-gray-600">
                            Data analysis, scientific calculations, and research
                            applications.
                        </p>

                        <div className="mt-1 text-sm italic text-blue-600">
                            Examples: MATLAB alternatives, bioinformatics tools
                        </div>
                    </div>
                </div>
            </div>

            {/* Note */}
            <div className="my-8 rounded-r-lg border-l-4 border-emerald-500 bg-[rgba(16,185,129,0.08)] p-5 text-[15px] leading-[1.7] text-[#065f46]">
                <strong>Note:</strong> Java's "Write Once, Run Anywhere"
                philosophy makes it ideal for cross-platform development.
                Learning Java opens doors to web, mobile, enterprise, and
                desktop development.
            </div>

            {/* Next Steps */}
            <div className="my-10 rounded-lg border border-emerald-200 bg-emerald-50 p-6">
                <h2 className="mb-4 text-[22px] font-semibold text-emerald-700">
                    Ready to Start Coding?
                </h2>

                <p className="text-base leading-[1.7] text-gray-700">
                    Ready to dive into Java fundamentals? The next chapter
                    covers variables, data types, and basic operations!
                </p>
            </div>
        </>
    );
}