import Quiz from '@/components/Quiz';

export default function Chapter1Content() {
    return (
        <>
            {/* Introduction */}
            <p className="mb-6 text-[16px] font-medium leading-[1.7] text-[#1f2937]">
                Welcome to your Java programming journey! In this chapter,
                we'll explore the fundamental building blocks of Java
                programming. You'll learn essential concepts, work with
                different data types, perform calculations, and create
                interactive programs. By the end of this chapter, you'll have
                a solid foundation for more advanced programming concepts.
            </p>

            {/* Fundamental Concepts */}
            <h2
                className="
                    mt-10
                    mb-5
                    flex
                    items-center
                    gap-3
                    text-[22px]
                    font-semibold
                    text-[#047857]
                    before:h-6
                    before:w-[4px]
                    before:rounded-[3px]
                    before:bg-gradient-to-b
                    before:from-[#10b981]
                    before:to-[#059669]
                    before:content-['']
                "
            >
                Introduction to Fundamental Concepts in Java
            </h2>

            <p className="mb-6 text-[16px] font-medium leading-[1.7] text-[#1f2937]">
                Java programming is built upon several core concepts that work
                together to create powerful applications. Understanding these
                fundamentals is essential for effective Java programming.
            </p>

            <p className="mb-6 text-[16px] font-medium leading-[1.7] text-[#1f2937]">
                Java is an{' '}
                <span className="rounded-md bg-[rgba(16,185,129,0.15)] px-2 py-1 font-semibold text-[#047857]">
                    object-oriented programming language
                </span>
                , organizing code around objects and classes rather than just
                functions. This mirrors how we naturally think about the world.
            </p>

            <p className="mb-6 text-[16px] font-medium leading-[1.7] text-[#1f2937]">
                Java follows key principles that make it both beginner-friendly
                and professionally powerful:
            </p>

            {/* Key Points */}
            <div className="my-6">
                <div className="mb-4 rounded border-l-4 border-[#8bf7ca] bg-[rgba(0,123,255,0.05)] p-3">
                    <span className="mb-1 block text-base font-bold text-black">
                        Strongly Typed:
                    </span>
                    <span className="text-[15px] text-[#555]">
                        Every piece of data has a specific type, preventing
                        errors and making code reliable
                    </span>
                </div>

                <div className="mb-4 rounded border-l-4 border-[#8bf7ca] bg-[rgba(0,123,255,0.05)] p-3">
                    <span className="mb-1 block text-base font-bold text-black">
                        Platform Independent:
                    </span>
                    <span className="text-[15px] text-[#555]">
                        Java code runs on different operating systems without
                        modification
                    </span>
                </div>

                <div className="mb-4 rounded border-l-4 border-[#8bf7ca] bg-[rgba(0,123,255,0.05)] p-3">
                    <span className="mb-1 block text-base font-bold text-black">
                        Automatic Memory Management:
                    </span>
                    <span className="text-[15px] text-[#555]">
                        Java handles memory allocation and cleanup through
                        garbage collection
                    </span>
                </div>

                <div className="mb-4 rounded border-l-4 border-[#8bf7ca] bg-[rgba(0,123,255,0.05)] p-3">
                    <span className="mb-1 block text-base font-bold text-black">
                        Rich Standard Library:
                    </span>
                    <span className="text-[15px] text-[#555]">
                        Thousands of pre-built classes and methods for common
                        tasks
                    </span>
                </div>

                <div className="mb-4 rounded border-l-4 border-[#8bf7ca] bg-[rgba(0,123,255,0.05)] p-3">
                    <span className="mb-1 block text-base font-bold text-black">
                        Syntax Clarity:
                    </span>
                    <span className="text-[15px] text-[#555]">
                        Designed to be readable and self-documenting
                    </span>
                </div>
            </div>

            {/* Variables and Data Types */}
            <h2
                className="
                    mt-10
                    mb-5
                    flex
                    items-center
                    gap-3
                    text-[22px]
                    font-semibold
                    text-[#047857]
                    before:h-6
                    before:w-[4px]
                    before:rounded-[3px]
                    before:bg-gradient-to-b
                    before:from-[#10b981]
                    before:to-[#059669]
                    before:content-['']
                "
            >
                Variables and Data Types Declaration
            </h2>

            <p className="mb-6 text-[16px] font-medium leading-[1.7] text-[#1f2937]">
                Variables are labeled containers that store different types of
                information - numbers, text, true/false values, and more.
                Think of them as labeled boxes: each has a name and contains a
                specific type of data.
            </p>

            <p className="mb-6 text-[16px] font-medium leading-[1.7] text-[#1f2937]">
                Java is a{' '}
                <span className="rounded-md bg-[rgba(16,185,129,0.15)] px-2 py-1 font-semibold text-[#047857]">
                    strongly typed language
                </span>
                , meaning every variable must have a declared type. This helps
                prevent errors and makes code more reliable.
            </p>

            <p className="mb-6 text-[16px] font-medium leading-[1.7] text-[#1f2937]">
                Java's primitive data types are the fundamental building blocks
                for storing data:
            </p>

            <ul className="my-6 list-disc pl-6 marker:text-emerald-500">
                <li className="mb-3 text-[15px] leading-[1.7] text-[#374151]">
                    <strong>int:</strong> Stores whole numbers from
                    -2,147,483,648 to 2,147,483,647. Perfect for counts, ages,
                    quantities
                </li>

                <li className="mb-3 text-[15px] leading-[1.7] text-[#374151]">
                    <strong>double:</strong> Stores decimal numbers with high
                    precision (about 15 decimal places). Used for calculations
                    requiring precision like prices, measurements
                </li>

                <li className="mb-3 text-[15px] leading-[1.7] text-[#374151]">
                    <strong>boolean:</strong> Stores only two values - true or
                    false. Essential for decision-making in programs
                </li>

                <li className="mb-3 text-[15px] leading-[1.7] text-[#374151]">
                    <strong>char:</strong> Stores a single character using
                    Unicode encoding. Can represent any character from any
                    language
                </li>

                <li className="mb-3 text-[15px] leading-[1.7] text-[#374151]">
                    <strong>String:</strong> Though technically not primitive,
                    it's crucial for storing text. Strings are sequences of
                    characters enclosed in double quotes
                </li>
            </ul>

            {/* Code Example */}
            <div className="my-6 rounded-lg border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.05)] p-4">
                <div className="mb-3 text-[15px] font-semibold text-[#047857]">
                    Variable Declaration and Initialization:
                </div>

                <pre className="m-0 overflow-x-auto rounded-md bg-[#1f2937] p-4 font-mono text-[14px] leading-[1.6] text-[#e5e7eb]">
{`// Declaring and initializing variables
int studentAge = 16;                    // Whole number
double gpa = 3.75;                      // Decimal number
boolean isHonorRoll = true;             // True/false value
char letterGrade = 'A';                 // Single character
String studentName = "Emma Johnson";     // Text string

// You can also declare first, then assign later
int score;                              // Declaration
score = 95;                            // Assignment

// Multiple variables of same type
int math = 90, english = 88, science = 92;`}
                </pre>
            </div>

            {/* Note */}
            <div className="my-8 rounded-r-lg border-l-4 border-emerald-500 bg-[rgba(16,185,129,0.08)] p-5 text-[15px] leading-[1.7] text-[#065f46]">
                💡 Variable names in Java must start with a letter, underscore,
                or dollar sign, followed by letters, digits, underscores, or
                dollar signs. Use meaningful names like 'studentAge' instead
                of 'x' to make your code self-documenting!
            </div>

            {/* Operators */}
            <h2
                className="
                    mt-10
                    mb-5
                    flex
                    items-center
                    gap-3
                    text-[22px]
                    font-semibold
                    text-[#047857]
                    before:h-6
                    before:w-[4px]
                    before:rounded-[3px]
                    before:bg-gradient-to-b
                    before:from-[#10b981]
                    before:to-[#059669]
                    before:content-['']
                "
            >
                Arithmetic, Comparison, and Logical Operators
            </h2>

            <p className="mb-6 text-[16px] font-medium leading-[1.7] text-[#1f2937]">
                Operators are tools for manipulating data and making decisions
                in your programs. Java provides three main categories:
                arithmetic operators for calculations, comparison operators for
                evaluating relationships, and logical operators for combining
                conditions.
            </p>

            <p className="mb-6 text-[16px] font-medium leading-[1.7] text-[#1f2937]">
                <strong>Arithmetic Operators</strong> perform mathematical
                operations following standard precedence rules (multiplication
                and division before addition and subtraction):
            </p>

            <div className="my-6 rounded-lg border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.05)] p-4">
                <pre className="m-0 overflow-x-auto rounded-md bg-[#1f2937] p-4 font-mono text-[14px] leading-[1.6] text-[#e5e7eb]">
{`int a = 15, b = 4;

// Basic arithmetic operations
int sum = a + b;           // Addition: 19
int difference = a - b;     // Subtraction: 11
int product = a * b;        // Multiplication: 60
int quotient = a / b;       // Integer division: 3 (truncated)
int remainder = a % b;      // Modulus (remainder): 3

// Working with doubles for precise division
double preciseResult = 15.0 / 4.0;  // Result: 3.75

// Compound assignment operators (shortcuts)
int count = 10;
count += 5;    // Same as: count = count + 5;  (now 15)
count -= 3;    // Same as: count = count - 3;  (now 12)
count *= 2;    // Same as: count = count * 2;  (now 24)
count /= 4;    // Same as: count = count / 4;  (now 6)`}
                </pre>
            </div>

            <p className="mb-6 text-[16px] font-medium leading-[1.7] text-[#1f2937]">
                <strong>Comparison Operators</strong> evaluate relationships
                between values and always return a boolean result (true or
                false). These are essential for making decisions in your
                programs:
            </p>

            <div className="my-6 rounded-lg border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.05)] p-4">
                <pre className="m-0 overflow-x-auto rounded-md bg-[#1f2937] p-4 font-mono text-[14px] leading-[1.6] text-[#e5e7eb]">
{`int score1 = 85, score2 = 92;
String name1 = "Alice", name2 = "Bob";

// Numerical comparisons
boolean isEqual = (score1 == score2);        // false
boolean isNotEqual = (score1 != score2);     // true
boolean isGreater = (score1 > score2);       // false
boolean isLess = (score1 < score2);          // true
boolean isGreaterOrEqual = (score1 >= 85);   // true
boolean isLessOrEqual = (score2 <= 100);     // true

// String comparison
boolean sameString = name1.equals(name2);     // false
boolean wrongWay = (name1 == name2);          // Don't use ==`}
                </pre>
            </div>

            <p className="mb-6 text-[16px] font-medium leading-[1.7] text-[#1f2937]">
                <strong>Logical Operators</strong> allow you to combine
                multiple conditions, essential for complex decision-making:
            </p>

            <div className="my-6 rounded-lg border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.05)] p-4">
                <pre className="m-0 overflow-x-auto rounded-md bg-[#1f2937] p-4 font-mono text-[14px] leading-[1.6] text-[#e5e7eb]">
{`int age = 17;
double gpa = 3.8;
boolean hasPermission = true;

// AND operator (&&)
boolean canDrive = (age >= 16) && hasPermission;
boolean honorStudent = (gpa >= 3.5) && (age >= 16);
boolean eligible = (gpa > 3.0) && (age >= 18) && hasPermission;

// OR operator (||)
boolean canVote = (age >= 18) || hasPermission;
boolean needsHelp = (gpa < 2.0) || (age < 14);

// NOT operator (!)
boolean isMinor = !(age >= 18);
boolean notHonorStudent = !(gpa >= 3.5);`}
                </pre>
            </div>

            {/* Warning */}
            <div className="my-8 rounded-r-lg border-l-4 border-red-500 bg-[rgba(239,68,68,0.08)] p-5 text-[15px] leading-[1.7] text-[#991b1b]">
                ⚠️ Be careful with operator precedence! Use parentheses to make
                your intentions clear. For example: (a + b) * c is different
                from a + (b * c).
            </div>

            {/* Type Casting */}
            <h2
                className="
                    mt-10
                    mb-5
                    flex
                    items-center
                    gap-3
                    text-[22px]
                    font-semibold
                    text-[#047857]
                    before:h-6
                    before:w-[4px]
                    before:rounded-[3px]
                    before:bg-gradient-to-b
                    before:from-[#10b981]
                    before:to-[#059669]
                    before:content-['']
                "
            >
                Type Casting Between Data Types
            </h2>

            <p className="mb-6 text-[16px] font-medium leading-[1.7] text-[#1f2937]">
                Sometimes you need to convert data from one type to another.
                This process is called{' '}
                <span className="rounded-md bg-[rgba(16,185,129,0.15)] px-2 py-1 font-semibold text-[#047857]">
                    type casting
                </span>
                . Java handles some conversions automatically (implicit),
                while others require explicit specification.
            </p>

            <p className="mb-6 text-[16px] font-medium leading-[1.7] text-[#1f2937]">
                <strong>Implicit Casting (Automatic)</strong> happens when Java
                safely converts smaller data types to larger ones without
                losing information:
            </p>

            <div className="my-6 rounded-lg border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.05)] p-4">
                <div className="mb-3 text-[15px] font-semibold text-[#047857]">
                    Automatic Type Casting:
                </div>

                <pre className="m-0 overflow-x-auto rounded-md bg-[#1f2937] p-4 font-mono text-[14px] leading-[1.6] text-[#e5e7eb]">
{`// From smaller to larger data types
int wholeNumber = 42;
double decimalNumber = wholeNumber;
System.out.println(decimalNumber);

long bigNumber = wholeNumber;
float floatNumber = wholeNumber;

// Automatic promotion in calculations
int intValue = 5;
double doubleValue = 2.5;
double result = intValue + doubleValue;`}
                </pre>
            </div>

            <p className="mb-6 text-[16px] font-medium leading-[1.7] text-[#1f2937]">
                <strong>Explicit Casting (Manual)</strong> is required when
                converting from a larger data type to a smaller one, or when
                the conversion might lose information. This is called
                "narrowing conversion" and requires you to explicitly tell
                Java you understand you might lose data:
            </p>

            <div className="my-6 rounded-lg border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.05)] p-4">
                <div className="mb-3 text-[15px] font-semibold text-[#047857]">
                    Manual Type Casting:
                </div>

                <pre className="m-0 overflow-x-auto rounded-md bg-[#1f2937] p-4 font-mono text-[14px] leading-[1.6] text-[#e5e7eb]">
{`// From larger to smaller data types
double preciseValue = 9.78;
int truncatedValue = (int) preciseValue;

double salary = 75000.99;
int roundedSalary = (int) salary;

long longValue = 1000000L;
int intValue = (int) longValue;

double average = 87.6;
int roundedAverage = (int) (average + 0.5);`}
                </pre>
            </div>

            <div className="my-8 rounded-r-lg border-l-4 border-red-500 bg-[rgba(239,68,68,0.08)] p-5 text-[15px] leading-[1.7] text-[#991b1b]">
                ⚠️ Explicit casting can cause data loss! When casting from
                double to int, the decimal portion is simply truncated (cut
                off), not rounded. If you need rounding, use Math.round()
                instead.
            </div>

            {/* Input / Output */}
            <h2
                className="
                    mt-10
                    mb-5
                    flex
                    items-center
                    gap-3
                    text-[22px]
                    font-semibold
                    text-[#047857]
                    before:h-6
                    before:w-[4px]
                    before:rounded-[3px]
                    before:bg-gradient-to-b
                    before:from-[#10b981]
                    before:to-[#059669]
                    before:content-['']
                "
            >
                Basic Input and Output Operations
            </h2>

            <p className="mb-6 text-[16px] font-medium leading-[1.7] text-[#1f2937]">
                Every useful program needs to communicate with its users -
                displaying information and accepting input. Java provides
                several ways to handle input and output (I/O). For output, we
                primarily use the <code>System.out</code> methods, and for
                input, we use the <code>Scanner</code> class, which provides a
                simple way to read user input from the keyboard.
            </p>

            <p className="mb-6 text-[16px] font-medium leading-[1.7] text-[#1f2937]">
                <strong>Output Operations</strong> allow your program to display
                information to the user. Java provides several methods with
                different behaviors:
            </p>

            <div className="my-6 rounded-lg border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.05)] p-4">
                <div className="mb-3 text-[15px] font-semibold text-[#047857]">
                    Different Output Methods:
                </div>

                <pre className="m-0 overflow-x-auto rounded-md bg-[#1f2937] p-4 font-mono text-[14px] leading-[1.6] text-[#e5e7eb]">
{`// println() adds a new line
System.out.println("Welcome to Java Programming!");
System.out.println("This appears on a new line");

// print() does NOT add a new line
System.out.print("Hello ");
System.out.print("World!");

// Combining variables with strings
String name = "Alex";
int age = 16;
System.out.println("Hi " + name + ", you are " + age + " years old!");

// printf() for formatted output
double price = 19.99;
System.out.printf("The price is $%.2f%n", price);`}
                </pre>
            </div>

            <p className="mb-6 text-[16px] font-medium leading-[1.7] text-[#1f2937]">
                <strong>Input Operations</strong> using the Scanner class allow
                your programs to be interactive by accepting user input.
                Scanner can read different types of data and provides methods
                for each type:
            </p>

            <div className="my-6 rounded-lg border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.05)] p-4">
                <div className="mb-3 text-[15px] font-semibold text-[#047857]">
                    Reading User Input:
                </div>

                <pre className="m-0 overflow-x-auto rounded-md bg-[#1f2937] p-4 font-mono text-[14px] leading-[1.6] text-[#e5e7eb]">
{`import java.util.Scanner;

public class InputExample {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Enter your name: ");
        String userName = input.nextLine();

        System.out.print("Enter your age: ");
        int userAge = input.nextInt();

        System.out.print("Enter your GPA: ");
        double userGPA = input.nextDouble();

        System.out.print("Are you a student? (true/false): ");
        boolean isStudent = input.nextBoolean();

        System.out.println("\\n=== Your Information ===");
        System.out.println("Name: " + userName);
        System.out.println("Age: " + userAge);
        System.out.printf("GPA: %.2f%n", userGPA);
        System.out.println("Student: " + isStudent);

        input.close();
    }
}`}
                </pre>
            </div>

            <div className="my-8 rounded-r-lg border-l-4 border-emerald-500 bg-[rgba(16,185,129,0.08)] p-5 text-[15px] leading-[1.7] text-[#065f46]">
                💡 Always close your Scanner object with input.close() when
                you're finished reading input. This is good practice for
                resource management and prevents potential issues in larger
                programs.
            </div>

            <div className="my-8 rounded-r-lg border-l-4 border-red-500 bg-[rgba(239,68,68,0.08)] p-5 text-[15px] leading-[1.7] text-[#991b1b]">
                ⚠️ Be careful when mixing nextInt(), nextDouble() with
                nextLine()! These methods don't consume the newline character,
                which can cause issues. Use input.nextLine() after numeric input
                if you need to read a line of text afterward.
            </div>

            {/* Quiz */}
            <div>
                <Quiz />
            </div>

            {/* Try It Yourself */}
            <div className="my-12 rounded-lg border-2 border-dashed border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.06)] p-6">
                <h2 className="mb-5 flex items-center gap-3 text-[22px] font-semibold text-[#15803d]">
                    🚀 Try It Yourself!
                </h2>

                <div className="my-3 rounded-lg bg-[rgba(255,255,255,0.7)] p-5 text-[15px] leading-[1.6] text-[#374151]">
                    <p>
                        <strong>JV001: Student Information</strong>
                        <br />
                        Write a program that takes a student's name, age, and GPA
                        as input and prints them in a formatted way.
                    </p>

                    <p className="mt-4">
                        <strong>Test Case:</strong>
                        <br />
                        Input:
                        <code>
                            <br />
                            Emma
                            <br />
                            16
                            <br />
                            3.75
                        </code>
                        <br />
                        Output:
                        <br />
                        <code>
                            === Student Information ===
                            <br />
                            Name: Emma
                            <br />
                            Age: 16
                            <br />
                            GPA: 3.75
                        </code>
                    </p>
                </div>

                <div className="my-3 rounded-lg bg-[rgba(255,255,255,0.7)] p-5 text-[15px] leading-[1.6] text-[#374151]">
                    <p>
                        <strong>JV002: Simple Calculator</strong>
                        <br />
                        Write a program that takes two integers and prints their
                        sum, difference, product, and quotient.
                    </p>

                    <p className="mt-4">
                        <strong>Test Case:</strong>
                        <br />
                        Input:
                        <code>
                            <br />
                            15
                            <br />
                            4
                        </code>
                        <br />
                        Output:
                        <br />
                        <code>
                            === Results ===
                            <br />
                            Sum: 19
                            <br />
                            Difference: 11
                            <br />
                            Product: 60
                            <br />
                            Quotient: 3
                        </code>
                    </p>
                </div>

                <div className="my-8 rounded-r-lg border-l-4 border-green-500 bg-[rgba(34,197,94,0.08)] p-5 text-[15px] leading-[1.7] text-[#15803d]">
                    ✅ Remember: every expert was once a beginner. Start with
                    simple programs and gradually add complexity as you become
                    more comfortable!
                </div>
            </div>
        </>
    );
}