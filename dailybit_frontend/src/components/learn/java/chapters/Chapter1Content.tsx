// src/components/learn/java/chapters/Chapter1Content.tsx
import chapterStyles from '@/styles/pages/learn/java/chapters/chapter.module.scss'

export default function Chapter1Content() {
    return (
        <>
            <p className={chapterStyles.paragraph}>
                Welcome to your Java programming journey! In this chapter, we'll explore the fundamental building blocks of Java programming. 
                You'll learn essential concepts, work with different data types, perform calculations, and create interactive programs. 
                By the end of this chapter, you'll have a solid foundation for more advanced programming concepts.
            </p>

            <h2 className={chapterStyles.subtitle}>Introduction to Fundamental Concepts in Java</h2>
            <p className={chapterStyles.paragraph}>
                Java programming is built upon several core concepts that work together to create powerful applications. Understanding these fundamentals is essential for effective Java programming.
            </p>
            
            <p className={chapterStyles.paragraph}>
                Java is an <span className={chapterStyles.highlight}>object-oriented programming language</span>, organizing code around objects and classes rather than just functions. This mirrors how we naturally think about the world.
            </p>

            <p className={chapterStyles.paragraph}>
                Java follows key principles that make it both beginner-friendly and professionally powerful:
            </p>
            
            <div className={chapterStyles.keyPoints}>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Strongly Typed:</span>
                    <span className={chapterStyles.keyPointDesc}>Every piece of data has a specific type, preventing errors and making code reliable</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Platform Independent:</span>
                    <span className={chapterStyles.keyPointDesc}>Java code runs on different operating systems without modification</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Automatic Memory Management:</span>
                    <span className={chapterStyles.keyPointDesc}>Java handles memory allocation and cleanup through garbage collection</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Rich Standard Library:</span>
                    <span className={chapterStyles.keyPointDesc}>Thousands of pre-built classes and methods for common tasks</span>
                </div>
                <div className={chapterStyles.keyPoint}>
                    <span className={chapterStyles.keyPointTitle}>Syntax Clarity:</span>
                    <span className={chapterStyles.keyPointDesc}>Designed to be readable and self-documenting</span>
                </div>
            </div>

            <h2 className={chapterStyles.subtitle}>Variables and Data Types Declaration</h2>
            <p className={chapterStyles.paragraph}>
                Variables are labeled containers that store different types of information - numbers, text, true/false values, and more. Think of them as labeled boxes: each has a name and contains a specific type of data.
            </p>

            <p className={chapterStyles.paragraph}>
                Java is a <span className={chapterStyles.highlight}>strongly typed language</span>, meaning every variable must have a declared type. This helps prevent errors and makes code more reliable.
            </p>

            <p className={chapterStyles.paragraph}>Java's primitive data types are the fundamental building blocks for storing data:</p>
            
            <ul className={chapterStyles.list}>
                <li><strong>int:</strong> Stores whole numbers from -2,147,483,648 to 2,147,483,647. Perfect for counts, ages, quantities</li>
                <li><strong>double:</strong> Stores decimal numbers with high precision (about 15 decimal places). Used for calculations requiring precision like prices, measurements</li>
                <li><strong>boolean:</strong> Stores only two values - true or false. Essential for decision-making in programs</li>
                <li><strong>char:</strong> Stores a single character using Unicode encoding. Can represent any character from any language</li>
                <li><strong>String:</strong> Though technically not primitive, it's crucial for storing text. Strings are sequences of characters enclosed in double quotes</li>
            </ul>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>Variable Declaration and Initialization:</div>
                <pre>
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

            <div className={chapterStyles.note}>
                Variable names in Java must start with a letter, underscore, or dollar sign, followed by letters, digits, underscores, or dollar signs. Use meaningful names like 'studentAge' instead of 'x' to make your code self-documenting!
            </div>

            <h2 className={chapterStyles.subtitle}>Arithmetic, Comparison, and Logical Operators</h2>
            <p className={chapterStyles.paragraph}>
                Operators are tools for manipulating data and making decisions in your programs. Java provides three main categories: arithmetic operators for calculations, comparison operators for evaluating relationships, and logical operators for combining conditions.
            </p>

            <p className={chapterStyles.paragraph}>
                <strong>Arithmetic Operators</strong> perform mathematical operations following standard precedence rules (multiplication and division before addition and subtraction):
            </p>

            <div className={chapterStyles.exampleCode}>
                <pre>
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

            <p className={chapterStyles.paragraph}>
                <strong>Comparison Operators</strong> evaluate relationships between values and always return a boolean result (true or false). These are essential for making decisions in your programs:
            </p>

            <div className={chapterStyles.exampleCode}>
                <pre>
{`int score1 = 85, score2 = 92;
String name1 = "Alice", name2 = "Bob";

// Numerical comparisons
boolean isEqual = (score1 == score2);        // false (85 is not equal to 92)
boolean isNotEqual = (score1 != score2);     // true (85 is not equal to 92)
boolean isGreater = (score1 > score2);       // false (85 is not greater than 92)
boolean isLess = (score1 < score2);          // true (85 is less than 92)
boolean isGreaterOrEqual = (score1 >= 85);   // true (85 equals 85)
boolean isLessOrEqual = (score2 <= 100);     // true (92 is less than 100)

// String comparison (be careful!)
boolean sameString = name1.equals(name2);     // false - correct way to compare strings
boolean wrongWay = (name1 == name2);          // Don't use == for strings!`}
                </pre>
            </div>

            <p className={chapterStyles.paragraph}>
                <strong>Logical Operators</strong> allow you to combine multiple conditions, essential for complex decision-making:
            </p>

            <div className={chapterStyles.exampleCode}>
                <pre>
{`int age = 17;
double gpa = 3.8;
boolean hasPermission = true;

// AND operator (&&) - ALL conditions must be true
boolean canDrive = (age >= 16) && hasPermission;           // true
boolean honorStudent = (gpa >= 3.5) && (age >= 16);       // true
boolean eligible = (gpa > 3.0) && (age >= 18) && hasPermission; // false (age < 18)

// OR operator (||) - AT LEAST ONE condition must be true  
boolean canVote = (age >= 18) || hasPermission;            // true (has permission)
boolean needsHelp = (gpa < 2.0) || (age < 14);            // false (both conditions false)

// NOT operator (!) - reverses the boolean value
boolean isMinor = !(age >= 18);                           // true (age is not >= 18)
boolean notHonorStudent = !(gpa >= 3.5);                  // false (gpa IS >= 3.5)`}
                </pre>
            </div>

            <div className={chapterStyles.warning}>
                Be careful with operator precedence! Use parentheses to make your intentions clear. For example: (a + b) * c is different from a + (b * c).
            </div>

            <h2 className={chapterStyles.subtitle}>Type Casting Between Data Types</h2>
            <p className={chapterStyles.paragraph}>
                Sometimes you need to convert data from one type to another. This process is called <span className={chapterStyles.highlight}>type casting</span>. Java handles some conversions automatically (implicit), while others require explicit specification.
            </p>

            <p className={chapterStyles.paragraph}>
                <strong>Implicit Casting (Automatic)</strong> happens when Java safely converts smaller data types to larger ones without losing information:
            </p>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>Automatic Type Casting:</div>
                <pre>
{`// From smaller to larger data types (safe conversions)
int wholeNumber = 42;
double decimalNumber = wholeNumber;        // int to double: 42.0
System.out.println(decimalNumber);         // Output: 42.0

long bigNumber = wholeNumber;              // int to long: 42
float floatNumber = wholeNumber;           // int to float: 42.0

// In calculations, Java automatically promotes to larger type
int intValue = 5;
double doubleValue = 2.5;
double result = intValue + doubleValue;    // int is promoted to double: 7.5`}
                </pre>
            </div>

            <p className={chapterStyles.paragraph}>
                <strong>Explicit Casting (Manual)</strong> is required when converting from a larger data type to a smaller one, or when the conversion might lose information. This is called "narrowing conversion" and requires you to explicitly tell Java you understand you might lose data:
            </p>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>Manual Type Casting:</div>
                <pre>
{`// From larger to smaller data types (potential data loss)
double preciseValue = 9.78;
int truncatedValue = (int) preciseValue;   // Explicit cast: becomes 9 (loses .78)

double salary = 75000.99;
int roundedSalary = (int) salary;          // becomes 75000 (loses .99)

// Converting between different number types
long longValue = 1000000L;
int intValue = (int) longValue;            // Potential loss if longValue > int max

// Converting calculations
double average = 87.6;
int roundedAverage = (int) (average + 0.5); // Manual rounding technique: 88`}
                </pre>
            </div>

            <div className={chapterStyles.warning}>
                Explicit casting can cause data loss! When casting from double to int, the decimal portion is simply truncated (cut off), not rounded. If you need rounding, use Math.round() instead.
            </div>

            <h2 className={chapterStyles.subtitle}>Basic Input and Output Operations</h2>
            <p className={chapterStyles.paragraph}>
                Every useful program needs to communicate with its users - displaying information and accepting input. Java provides several ways to handle input and output (I/O). For output, we primarily use the <code>System.out</code> methods, and for input, we use the <code>Scanner</code> class, which provides a simple way to read user input from the keyboard.
            </p>

            <p className={chapterStyles.paragraph}>
                <strong>Output Operations</strong> allow your program to display information to the user. Java provides several methods with different behaviors:
            </p>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>Different Output Methods:</div>
                <pre>
{`// println() adds a new line after printing
System.out.println("Welcome to Java Programming!");
System.out.println("This appears on a new line");

// print() does NOT add a new line
System.out.print("Hello ");
System.out.print("World!");  // Output: Hello World!

// Combining variables with strings
String name = "Alex";
int age = 16;
System.out.println("Hi " + name + ", you are " + age + " years old!");

// printf() for formatted output (like C language)
double price = 19.99;
System.out.printf("The price is $%.2f%n", price);  // Output: The price is $19.99`}
                </pre>
            </div>

            <p className={chapterStyles.paragraph}>
                <strong>Input Operations</strong> using the Scanner class allow your programs to be interactive by accepting user input. Scanner can read different types of data and provides methods for each type:
            </p>

            <div className={chapterStyles.exampleCode}>
                <div className={chapterStyles.exampleTitle}>Reading User Input:</div>
                <pre>
{`import java.util.Scanner;  // Must import Scanner class

public class InputExample {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);  // Create Scanner object
        
        // Reading different types of input
        System.out.print("Enter your name: ");
        String userName = input.nextLine();      // Reads entire line including spaces
        
        System.out.print("Enter your age: ");
        int userAge = input.nextInt();           // Reads integer
        
        System.out.print("Enter your GPA: ");
        double userGPA = input.nextDouble();     // Reads decimal number
        
        System.out.print("Are you a student? (true/false): ");
        boolean isStudent = input.nextBoolean(); // Reads true/false
        
        // Display collected information
        System.out.println("\\n=== Your Information ===");
        System.out.println("Name: " + userName);
        System.out.println("Age: " + userAge);
        System.out.printf("GPA: %.2f%n", userGPA);
        System.out.println("Student: " + isStudent);
        
        input.close();  // Always close Scanner when done!
    }
}`}
                </pre>
            </div>

            <div className={chapterStyles.note}>
                Always close your Scanner object with input.close() when you're finished reading input. This is good practice for resource management and prevents potential issues in larger programs.
            </div>

            <div className={chapterStyles.warning}>
                Be careful when mixing nextInt(), nextDouble() with nextLine()! These methods don't consume the newline character, which can cause issues. Use input.nextLine() after numeric input if you need to read a line of text afterward.
            </div>

            <div className={chapterStyles.tryItSection}>
                <h2 className={chapterStyles.tryItTitle}>Try It Yourself!</h2>
                
                <div className={chapterStyles.tryItTask}>
                    <p><strong>Store your personal details in variables and print them</strong> Build a program that collects and displays your name, age, and favorite color.</p>
                </div>

                <div className={chapterStyles.tryItTask}>
                    <p><strong>Build a basic Calculator:</strong> Create a program that performs basic arithmetic operations (addition, subtraction, multiplication, division) on two numbers.</p>
                </div>

                <div className={chapterStyles.success}>
                    Remember: every expert was once a beginner. Start with simple programs and gradually add complexity as you become more comfortable!
                </div>
            </div>
        </>
    );
}