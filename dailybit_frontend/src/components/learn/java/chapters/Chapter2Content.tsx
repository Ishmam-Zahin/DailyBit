// src/components/learn/java/chapters/Chapter2Content.tsx
import chapterStyles from '@/styles/pages/learn/java/chapters/chapter.module.scss'

export default function Chapter2Content() {
    return (
        <>
            <p className={chapterStyles.paragraph}>
                Welcome to the world of decision-making in Java! Control flow statements are the brain of your program, 
                allowing it to make decisions, repeat actions, and respond differently to various situations. 
                In this chapter, you'll learn how to guide your program's execution path based on conditions and logic.
            </p>

            <h2 className={chapterStyles.subtitle}>Understanding Control Flow in Programming</h2>
            <p className={chapterStyles.paragraph}>
                Control flow refers to the order in which individual statements, instructions, or function calls are executed 
                or evaluated. Without control flow, programs would execute from top to bottom without any decision-making capability.
            </p>

            <p className={chapterStyles.paragraph}>
                Java provides several control flow structures that allow your programs to:
            </p>

            <div className={chapterStyles.keyPoints}>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Make Decisions:</span>
                    <span className={chapterStyles.keyPointDesc}>Execute different code blocks based on conditions</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Repeat Actions:</span>
                    <span className={chapterStyles.keyPointDesc}>Perform tasks multiple times efficiently</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Handle Multiple Cases:</span>
                    <span className={chapterStyles.keyPointDesc}>Manage different scenarios cleanly</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Improve Efficiency:</span>
                    <span className={chapterStyles.keyPointDesc}>Write cleaner, more organized code</span>
                </div>
            </div>

            <h2 className={chapterStyles.subtitle}>Conditional Statements (if-else)</h2>
            <p className={chapterStyles.paragraph}>
                The if-else statement is the most fundamental decision-making structure in Java. It allows your program to 
                execute different blocks of code based on whether a condition is true or false.
            </p>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>Basic If-Else Structure:</div>
                <pre>
{`int score = 85;

// Simple if statement
if (score >= 60) {
    System.out.println("You passed the exam!");
}

// If-else statement
if (score >= 90) {
    System.out.println("Excellent! Grade: A");
} else {
    System.out.println("Good job! You passed");
}

// Multiple conditions with else-if
if (score >= 90) {
    System.out.println("Grade: A");
} else if (score >= 80) {
    System.out.println("Grade: B");
} else if (score >= 70) {
    System.out.println("Grade: C");
} else if (score >= 60) {
    System.out.println("Grade: D");
} else {
    System.out.println("Grade: F - You failed");
}`}
                </pre>
            </div>

            <div className={chapterStyles.note}>
                The curly braces {} are optional for single statements, but it's considered good practice to always use them 
                for better readability and to avoid potential errors when adding more statements later.
            </div>

            <h2 className={chapterStyles.subtitle}>Nested If-Else Statements</h2>
            <p className={chapterStyles.paragraph}>
                You can place if statements inside other if statements, creating nested conditions. This allows for more 
                complex decision-making scenarios.
            </p>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>Nested Conditions Example:</div>
                <pre>
{`int age = 17;
boolean hasLicense = true;
boolean hasParent = true;

if (age >= 16) {
    if (hasLicense) {
        System.out.println("You can drive alone!");
    } else {
        if (hasParent) {
            System.out.println("You can drive with a parent");
        } else {
            System.out.println("You need a license or parent to drive");
        }
    }
} else {
    System.out.println("You're too young to drive");
}`}
                </pre>
            </div>

            <div className={chapterStyles.warning}>
                Be careful with nested if statements! Too many levels of nesting can make your code hard to read and maintain. 
                Consider using logical operators (&&, ||) to simplify complex conditions when possible.
            </div>

            <h2 className={chapterStyles.subtitle}>Switch-Case Statements</h2>
            <p className={chapterStyles.paragraph}>
                The switch statement provides an elegant way to handle multiple possible values for a single variable. 
                It's often cleaner than multiple if-else-if statements when testing the same variable against different values.
            </p>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>Switch-Case Structure:</div>
                <pre>
{`int dayOfWeek = 3;
String dayName;

switch (dayOfWeek) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        break;
    case 7:
        dayName = "Sunday";
        break;
    default:
        dayName = "Invalid day";
        break;
}

System.out.println("Today is: " + dayName);`}
                </pre>
            </div>

            <p className={chapterStyles.paragraph}>
                Modern Java (version 14+) also supports enhanced switch expressions with arrow syntax:
            </p>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>Enhanced Switch Expression:</div>
                <pre>
{`int dayOfWeek = 3;
String dayName = switch (dayOfWeek) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    case 4 -> "Thursday";
    case 5 -> "Friday";
    case 6 -> "Saturday";
    case 7 -> "Sunday";
    default -> "Invalid day";
};

System.out.println("Today is: " + dayName);`}
                </pre>
            </div>

            <div className={chapterStyles.note}>
                Always include break statements in traditional switch cases to prevent "fall-through" behavior where multiple 
                cases execute. The enhanced switch expression doesn't need break statements.
            </div>

            <h2 className={chapterStyles.subtitle}>Ternary Operator</h2>
            <p className={chapterStyles.paragraph}>
                The ternary operator provides a concise way to write simple if-else statements in a single line. 
                It's perfect for quick conditional assignments.
            </p>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>Ternary Operator Examples:</div>
                <pre>
{`int score = 85;

// Traditional if-else
String result;
if (score >= 60) {
    result = "Pass";
} else {
    result = "Fail";
}

// Equivalent ternary operator
String result = (score >= 60) ? "Pass" : "Fail";

// More complex examples
int max = (a > b) ? a : b;  // Find maximum of two numbers
String grade = (score >= 90) ? "A" : (score >= 80) ? "B" : "C";
String message = (age >= 18) ? "Adult" : "Minor";`}
                </pre>
            </div>

            <div className={chapterStyles.warning}>
                While ternary operators can make code more concise, avoid nesting them too deeply as it can reduce readability. 
                Use them for simple conditions and stick to if-else for complex logic.
            </div>

            <h2 className={chapterStyles.subtitle}>Logical Operators in Conditions</h2>
            <p className={chapterStyles.paragraph}>
                Logical operators allow you to combine multiple conditions, creating more complex decision-making scenarios. 
                The three main logical operators are AND (&&), OR (||), and NOT (!).
            </p>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>Logical Operator Examples:</div>
                <pre>
{`int age = 17;
double gpa = 3.8;
boolean hasPermission = true;

// AND operator (&&) - ALL conditions must be true
if (age >= 16 && hasPermission) {
    System.out.println("You can drive!");
}

// OR operator (||) - AT LEAST ONE condition must be true
if (gpa >= 3.5 || age >= 18) {
    System.out.println("Eligible for scholarship");
}

// NOT operator (!) - reverses the condition
if (!hasPermission) {
    System.out.println("You need permission first");
}

// Complex combinations
if ((age >= 18 || hasPermission) && gpa >= 2.5) {
    System.out.println("Qualified for program");
}

// Checking ranges
int score = 85;
if (score >= 80 && score <= 89) {
    System.out.println("Grade: B");
}`}
                </pre>
            </div>

            <div className={chapterStyles.note}>
                Java uses short-circuit evaluation with logical operators. For AND (&&), if the first condition is false, 
                the second condition won't be evaluated. For OR (||), if the first condition is true, the second won't be evaluated.
            </div>

            <h2 className={chapterStyles.subtitle}>Control Flow Best Practices</h2>
            <p className={chapterStyles.paragraph}>
                Writing clean and maintainable control flow code is essential for professional programming. 
                Here are some best practices to follow:
            </p>

            <div className={chapterStyles.keyPoints}>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Avoid Deep Nesting:</span>
                    <span className={chapterStyles.keyPointDesc}>Use early returns or break complex conditions into methods</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Use Descriptive Conditions:</span>
                    <span className={chapterStyles.keyPointDesc}>Make your conditions self-explanatory</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Prefer Positive Conditions:</span>
                    <span className={chapterStyles.keyPointDesc}>They're usually easier to understand than negative ones</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Handle Edge Cases:</span>
                    <span className={chapterStyles.keyPointDesc}>Always consider what happens with unexpected inputs</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Use Constants:</span>
                    <span className={chapterStyles.keyPointDesc}>Replace magic numbers with named constants</span>
                </div>
            </div>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>Good vs Bad Practices:</div>
                <pre>
{`// ❌ Hard to read (deep nesting)
if (condition1) {
    if (condition2) {
        if (condition3) {
            // do something
        }
    }
}

// ✅ Better (using logical operators)
if (condition1 && condition2 && condition3) {
    // do something
}

// ❌ Magic numbers
if (score > 90) { ... }

// ✅ Using constants
final int EXCELLENT_SCORE = 90;
if (score > EXCELLENT_SCORE) { ... }

// ❌ Negative conditions
if (!isNotValid) { ... }

// ✅ Positive conditions
if (isValid) { ... }`}
                </pre>
            </div>

            <div className={chapterStyles.tryItSection}>
                <h2 className={chapterStyles.tryItTitle}>Try It Yourself!</h2>
    
                <div className={chapterStyles.tryItTask}>
                    <p><strong>Day of Week:</strong> Build a program using switch-case that takes a number (1-7) and returns the corresponding day of the week.</p>
                </div>

                <div className={chapterStyles.tryItTask}>
                    <p><strong>Leap Year Checker:</strong> Write a program that determines if a year is a leap year using multiple conditions (divisible by 4, but not by 100 unless also by 400).</p>
                </div>

                <div className={chapterStyles.success}>
                    Remember: Practice makes perfect! Start with simple conditions and gradually build more complex decision-making logic. 
                    Test your programs with different inputs to ensure they handle all scenarios correctly.
                </div>
            </div>

            <div className={chapterStyles.note}>
                Control flow is fundamental to all programming. Mastering these concepts will make you a better programmer 
                regardless of which programming language you work with in the future!
            </div>
        </>
    );
}