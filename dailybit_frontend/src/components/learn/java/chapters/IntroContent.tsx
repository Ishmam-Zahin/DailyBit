// src/components/learn/java/JavaIntroContent.tsx
import chapterStyles from '@/styles/pages/learn/java/chapters/chapter.module.scss'

export default function JavaIntroContent() {
    return (
        <>
            <p className={chapterStyles.paragraph}>
                Welcome to Java programming! This introduction covers Java's key concepts, features, and applications. 
                Let's explore what makes Java one of the world's most popular programming languages.
            </p>

            <h2 className={chapterStyles.subtitle}>What is Java?</h2>
            <p className={chapterStyles.paragraph}>
                Java is a high-level, object-oriented programming language with the philosophy of <span className={chapterStyles.highlight}>"Write Once, Run Anywhere" (WORA)</span>. 
                Java programs compile to <span className={chapterStyles.highlight}>bytecode</span> that runs on the Java Virtual Machine (JVM), 
                making them platform-independent.
            </p>

            <h2 className={chapterStyles.subtitle}>History</h2>
            <p className={chapterStyles.paragraph}>
                Java was created in 1995 by <span className={chapterStyles.highlight}>James Gosling</span> at Sun Microsystems 
                (now Oracle Corporation). Originally called "Oak," it evolved into Java for broader applications.
            </p>
            
            <div className={chapterStyles.timeline}>
                <div className={chapterStyles.timelineItem}>
                    <span className={chapterStyles.timelineYear}>1991</span>
                    <span className={chapterStyles.timelineDesc}>Project Green started, leading to the Oak language</span>
                </div>
                <div className={chapterStyles.timelineItem}>
                    <span className={chapterStyles.timelineYear}>1995</span>
                    <span className={chapterStyles.timelineDesc}>Java 1.0 officially released to the public</span>
                </div>
                <div className={chapterStyles.timelineItem}>
                    <span className={chapterStyles.timelineYear}>2010</span>
                    <span className={chapterStyles.timelineDesc}>Oracle Corporation acquires Sun Microsystems</span>
                </div>
                <div className={chapterStyles.timelineItem}>
                    <span className={chapterStyles.timelineYear}>2014</span>
                    <span className={chapterStyles.timelineDesc}>Java 8 introduces lambda expressions and functional programming features</span>
                </div>
            </div>

            <h2 className={chapterStyles.subtitle}>Key Features of Java</h2>
            <p className={chapterStyles.paragraph}>
                Java's key features make it suitable for both learning and professional development:
            </p>

            <div className={chapterStyles.keyPoints}>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Platform Independence:</span>
                    <span className={chapterStyles.keyPointDesc}>Java programs run on any system with JVM installed, regardless of the underlying operating system</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Object-Oriented Programming:</span>
                    <span className={chapterStyles.keyPointDesc}>Organizes code into classes and objects, promoting code reusability and maintainability</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Memory Management:</span>
                    <span className={chapterStyles.keyPointDesc}>Automatic garbage collection handles memory allocation and deallocation</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Security:</span>
                    <span className={chapterStyles.keyPointDesc}>Built-in security features protect against viruses and unauthorized access</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Multithreading:</span>
                    <span className={chapterStyles.keyPointDesc}>Supports concurrent execution of multiple parts of a program</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Rich API:</span>
                    <span className={chapterStyles.keyPointDesc}>Extensive library of pre-built classes and methods for common programming tasks</span>
                </div>
            </div>

            <h2 className={chapterStyles.subtitle}>Java Development Kit (JDK)</h2>
            <p className={chapterStyles.paragraph}>
                The <span className={chapterStyles.highlight}>Java Development Kit (JDK)</span> provides all tools needed to develop Java applications, 
                including compiler, JVM, and development utilities.
            </p>

            <div className={chapterStyles.jdkComponents}>
                <div className={chapterStyles.component}>
                    <h3 className={chapterStyles.componentTitle}>Java Compiler (javac)</h3>
                    <p className={chapterStyles.componentDesc}>Converts Java source code (.java files) into bytecode (.class files)</p>
                </div>
                <div className={chapterStyles.component}>
                    <h3 className={chapterStyles.componentTitle}>Java Virtual Machine (JVM)</h3>
                    <p className={chapterStyles.componentDesc}>Executes Java bytecode and provides platform independence</p>
                </div>
                <div className={chapterStyles.component}>
                    <h3 className={chapterStyles.componentTitle}>Java API Documentation</h3>
                    <p className={chapterStyles.componentDesc}>Comprehensive documentation for all Java classes and methods</p>
                </div>
                <div className={chapterStyles.component}>
                    <h3 className={chapterStyles.componentTitle}>Development Tools</h3>
                    <p className={chapterStyles.componentDesc}>Debugger (jdb), archiver (jar), and other utilities</p>
                </div>
            </div>

            <h2 className={chapterStyles.subtitle}>Your First Java Program</h2>
            <p className={chapterStyles.paragraph}>
                Let's create your first Java program - the traditional "Hello World" application:
            </p>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>HelloWorld.java</div>
                <pre>
{`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to Java Programming!");
    }
}`}
                </pre>
            </div>

            <div className={chapterStyles.codeExplanation}>
                <h3 className={chapterStyles.explanationTitle}>Code Breakdown:</h3>
                <div className={chapterStyles.explanationItem}>
                    <span className={chapterStyles.codeSnippet}>public class HelloWorld</span>
                    <span className={chapterStyles.explanation}>Declares a public class named HelloWorld (must match filename)</span>
                </div>
                <div className={chapterStyles.explanationItem}>
                    <span className={chapterStyles.codeSnippet}>public static void main(String[] args)</span>
                    <span className={chapterStyles.explanation}>The main method - entry point where program execution begins</span>
                </div>
                <div className={chapterStyles.explanationItem}>
                    <span className={chapterStyles.codeSnippet}>System.out.println()</span>
                    <span className={chapterStyles.explanation}>Prints text to the console followed by a new line</span>
                </div>
            </div>

            <h2 className={chapterStyles.subtitle}>Basic Syntax Rules</h2>
            <p className={chapterStyles.paragraph}>
                Java follows specific syntax rules for code consistency:
            </p>

            <div className={chapterStyles.syntaxRules}>
                <div className={chapterStyles.syntaxRule}>
                    <span className={chapterStyles.ruleTitle}>Case Sensitivity:</span>
                    <span className={chapterStyles.ruleDesc}>Java distinguishes between uppercase and lowercase letters (myVariable ≠ MyVariable)</span>
                </div>
                <div className={chapterStyles.syntaxRule}>
                    <span className={chapterStyles.ruleTitle}>File Naming:</span>
                    <span className={chapterStyles.ruleDesc}>Java filename must match the public class name (HelloWorld.java for class HelloWorld)</span>
                </div>
                <div className={chapterStyles.syntaxRule}>
                    <span className={chapterStyles.ruleTitle}>Semicolons:</span>
                    <span className={chapterStyles.ruleDesc}>Every statement must end with a semicolon (;)</span>
                </div>
                <div className={chapterStyles.syntaxRule}>
                    <span className={chapterStyles.ruleTitle}>Braces:</span>
                    <span className={chapterStyles.ruleDesc}>Code blocks are enclosed in curly braces { }</span>
                </div>
                <div className={chapterStyles.syntaxRule}>
                    <span className={chapterStyles.ruleTitle}>Comments:</span>
                    <span className={chapterStyles.ruleDesc}>Single line (//) or multi-line (/* */)</span>
                </div>
                <div className={chapterStyles.syntaxRule}>
                    <span className={chapterStyles.ruleTitle}>Identifiers:</span>
                    <span className={chapterStyles.ruleDesc}>Names must start with letter, underscore, or $ symbol</span>
                </div>
            </div>

            <h2 className={chapterStyles.subtitle}>Applications of Java</h2>
            <p className={chapterStyles.paragraph}>
                Java's versatility makes it suitable for a wide range of applications across different domains. 
                Here are the major areas where Java excels:
            </p>

            <div className={chapterStyles.applications}>
                <div className={chapterStyles.application}>
                    <h3 className={chapterStyles.appName}>🌐 Web Development</h3>
                    <p className={chapterStyles.appDesc}>Server-side development with Spring, JSP, and servlets. Powers major websites and web services.</p>
                    <div className={chapterStyles.appExamples}>Examples: LinkedIn, Twitter, eBay backend systems</div>
                </div>
                
                <div className={chapterStyles.application}>
                    <h3 className={chapterStyles.appName}>📱 Mobile Development</h3>
                    <p className={chapterStyles.appDesc}>Android app development using Android SDK and frameworks like React Native.</p>
                    <div className={chapterStyles.appExamples}>Examples: Most Android apps, including WhatsApp, Spotify</div>
                </div>

                <div className={chapterStyles.application}>
                    <h3 className={chapterStyles.appName}>🏢 Enterprise Applications</h3>
                    <p className={chapterStyles.appDesc}>Large-scale business applications, banking systems, and enterprise resource planning (ERP) systems.</p>
                    <div className={chapterStyles.appExamples}>Examples: Banking software, customer relationship management systems</div>
                </div>

                <div className={chapterStyles.application}>
                    <h3 className={chapterStyles.appName}>🖥️ Desktop Applications</h3>
                    <p className={chapterStyles.appDesc}>Cross-platform desktop applications using Swing, JavaFX, and AWT.</p>
                    <div className={chapterStyles.appExamples}>Examples: NetBeans IDE, Eclipse IDE, IntelliJ IDEA</div>
                </div>

                <div className={chapterStyles.application}>
                    <h3 className={chapterStyles.appName}>🔬 Scientific Applications</h3>
                    <p className={chapterStyles.appDesc}>Data analysis, scientific calculations, and research applications.</p>
                    <div className={chapterStyles.appExamples}>Examples: MATLAB alternatives, bioinformatics tools</div>
                </div>
            </div>

            <div className={chapterStyles.note}>
                <strong>Note:</strong> Java's "Write Once, Run Anywhere" philosophy makes it ideal for cross-platform development. 
                Learning Java opens doors to web, mobile, enterprise, and desktop development.
            </div>

            <div className={chapterStyles.nextSteps}>
                <h2 className={chapterStyles.nextStepsTitle}>Ready to Start Coding?</h2>
                <p className={chapterStyles.paragraph}>
                    Ready to dive into Java fundamentals? The next chapter covers variables, data types, and basic operations!
                </p>
            </div>
        </>
    );
}