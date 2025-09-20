// src/components/learn/java/chapters/Chapter3Content.tsx
import chapterStyles from '@/styles/pages/learn/java/chapters/chapter.module.scss'

export default function Chapter3Content() {
    return (
        <>
            <p className={chapterStyles.paragraph}>
                Welcome to the world of repetition in Java! Loops are powerful tools that allow your programs to 
                perform tasks multiple times efficiently. In this chapter, you'll learn how to automate repetitive 
                tasks, process collections of data, and create dynamic programs that can handle varying amounts of work.
            </p>

            <h2 className={chapterStyles.subtitle}>Understanding Loops in Programming</h2>
            <p className={chapterStyles.paragraph}>
                Loops are control structures that repeat a block of code multiple times. They're essential for:
            </p>

            <div className={chapterStyles.keyPoints}>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Processing Collections:</span>
                    <span className={chapterStyles.keyPointDesc}>Working with arrays, lists, and other data structures</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Automating Tasks:</span>
                    <span className={chapterStyles.keyPointDesc}>Repeating operations without manual repetition</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Handling Dynamic Data:</span>
                    <span className={chapterStyles.keyPointDesc}>Working with varying amounts of information</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Improving Efficiency:</span>
                    <span className={chapterStyles.keyPointDesc}>Writing concise, maintainable code</span>
                </div>
            </div>

            <h2 className={chapterStyles.subtitle}>For Loop Structure</h2>
            <p className={chapterStyles.paragraph}>
                The for loop is ideal when you know exactly how many times you want to repeat a block of code.
            </p>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>Basic For Loop:</div>
                <pre>
{`// Count from 1 to 5
for (int i = 1; i <= 5; i++) {
    System.out.println("Count: " + i);
}

// Countdown from 10 to 1  
for (int i = 10; i >= 1; i--) {
    System.out.println(i);
}`}
                </pre>
            </div>

                <div className={chapterStyles.note}>
                    The for loop has three parts: initialization (int i&#61;1), condition (i&lt;=5), and increment (i&#43;&#43;). 
                    All three are optional, but usually all are provided.
                </div>


            <h2 className={chapterStyles.subtitle}>While Loop</h2>
            <p className={chapterStyles.paragraph}>
                Use while loops when you don&apos;t know how many times you need to repeat, but you have a condition to check.
            </p>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>While Loop Examples:</div>
                <pre>
{`// Basic while loop
int count = 1;
while (count <= 5) {
    System.out.println(count);
    count++;
}

// User input validation
Scanner input = new Scanner(System.in);
int number = -1;

while (number < 0) {
    System.out.print("Enter positive number: ");
    number = input.nextInt();
}`}
                </pre>
            </div>

            <h2 className={chapterStyles.subtitle}>Do-While Loop</h2>
            <p className={chapterStyles.paragraph}>
                The do-while loop guarantees at least one execution, as the condition is checked after the loop body.
            </p>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>Do-While Example:</div>
                <pre>
{`int number;
do {
    System.out.print("Enter number (1-10): ");
    number = input.nextInt();
} while (number < 1 || number > 10);`}
                </pre>
            </div>

            <div className={chapterStyles.warning}>
                Be careful with while and do-while loops! Always ensure the loop condition will eventually become false, 
                otherwise you&apos;ll create an infinite loop that never ends.
            </div>

            <h2 className={chapterStyles.subtitle}>Loop Control Statements</h2>
            <p className={chapterStyles.paragraph}>
                Break and continue statements give you more control over loop execution.
            </p>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>Break and Continue:</div>
                <pre>
{`// Break - exit loop early
for (int i = 1; i <= 10; i++) {
    if (i == 5) break;
    System.out.println(i);
}

// Continue - skip current iteration
for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;
    System.out.println(i);
}`}
                </pre>
            </div>

            <h2 className={chapterStyles.subtitle}>Nested Loops</h2>
            <p className={chapterStyles.paragraph}>
                You can place loops inside other loops to handle multi-dimensional data or complex patterns.
            </p>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>Nested Loop Example:</div>
                <pre>
{`// Multiplication table
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= 5; j++) {
        System.out.print(i * j + "\\t");
    }
    System.out.println();
}`}
                </pre>
            </div>

            <h2 className={chapterStyles.subtitle}>Loop Optimization Techniques</h2>
            <p className={chapterStyles.paragraph}>
                Write efficient loops by following these best practices:
            </p>

            <div className={chapterStyles.keyPoints}>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Precompute Values:</span>
                    <span className={chapterStyles.keyPointDesc}>Calculate fixed values outside the loop</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Minimize Operations:</span>
                    <span className={chapterStyles.keyPointDesc}>Reduce calculations inside loops</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Choose Right Loop:</span>
                    <span className={chapterStyles.keyPointDesc}>Use for when counting, while for conditions</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Avoid Deep Nesting:</span>
                    <span className={chapterStyles.keyPointDesc}>Keep loops readable and maintainable</span>
                </div>
            </div>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>Optimization Example:</div>
                <pre>
{`// ❌ Inefficient
for (int i = 0; i < list.size(); i++) {
    // calculations
}

// ✅ Efficient
int size = list.size();
for (int i = 0; i < size; i++) {
    // calculations
}`}
                </pre>
            </div>

            <div className={chapterStyles.tryItSection}>
                <h2 className={chapterStyles.tryItTitle}>Try It Yourself!</h2>
                
                <div className={chapterStyles.tryItTask}>
                    <p><strong>Number Patterns:</strong> Create different number patterns using nested loops (pyramids, triangles, squares).</p>
                </div>

                <div className={chapterStyles.tryItTask}>
                    <p><strong>Factorial Calculator:</strong> Write a program that calculates factorial using a loop.</p>
                </div>

                <div className={chapterStyles.tryItTask}>
                    <p><strong>Prime Checker:</strong> Create a program that checks if a number is prime using loops.</p>
                </div>

                <div className={chapterStyles.tryItTask}>
                    <p><strong>Multiplication Table:</strong> Generate a complete multiplication table using nested loops.</p>
                </div>

                <div className={chapterStyles.success}>
                    Loops are fundamental to programming! Practice creating different types of loops and you'll quickly 
                    see how they make your programs more powerful and efficient.
                </div>
            </div>

            <div className={chapterStyles.note}>
                Remember: The right loop for the right job. Use for loops when you know the number of iterations, 
                while loops when you have a condition to check, and do-while when you need at least one execution.
            </div>
        </>
    );
}