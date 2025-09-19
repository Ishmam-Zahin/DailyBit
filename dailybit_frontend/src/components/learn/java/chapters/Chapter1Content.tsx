// src/components/learn/java/chapters/Chapter1Content.tsx
import styles from '@/styles/pages/learn/java/chapters/chapter-1.module.scss'

export default function Chapter1Content() {
    return (
        <>
            <section className={styles.section}>
                <h2 className={styles.subtitle}>What is Java?</h2>
                <p className={styles.paragraph}>
                    Java is a high-level, object-oriented programming language developed by Sun Microsystems 
                    (now owned by Oracle) in 1995. It's designed to be platform-independent, meaning Java code 
                    can run on any device that has a Java Virtual Machine (JVM) installed.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.subtitle}>Key Features of Java</h2>
                <ul className={styles.list}>
                    <li><strong>Platform Independent:</strong> Write once, run anywhere (WORA)</li>
                    <li><strong>Object-Oriented:</strong> Everything is an object in Java</li>
                    <li><strong>Simple:</strong> Easy to learn and understand</li>
                    <li><strong>Secure:</strong> Built-in security features</li>
                    <li><strong>Robust:</strong> Strong memory management and exception handling</li>
                    <li><strong>Multithreaded:</strong> Can perform multiple tasks simultaneously</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2 className={styles.subtitle}>Java Development Kit (JDK)</h2>
                <p className={styles.paragraph}>
                    The JDK is a software development environment used for developing Java applications. 
                    It includes:
                </p>
                <ul className={styles.list}>
                    <li>Java Compiler (javac)</li>
                    <li>Java Virtual Machine (JVM)</li>
                    <li>Java Runtime Environment (JRE)</li>
                    <li>Libraries and development tools</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2 className={styles.subtitle}>Your First Java Program</h2>
                <div className={styles.codeBlock}>
                    <pre>{`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`}</pre>
                </div>
                <p className={styles.paragraph}>
                    This simple program prints "Hello, World!" to the console. Every Java application 
                    must have a main method, which is the entry point of the program.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.subtitle}>Basic Syntax Rules</h2>
                <ul className={styles.list}>
                    <li>Java is case-sensitive</li>
                    <li>Class names should start with an uppercase letter</li>
                    <li>Method names should start with a lowercase letter</li>
                    <li>File name must match the class name</li>
                    <li>Program execution begins with the main() method</li>
                    <li>Each statement must end with a semicolon (;)</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2 className={styles.subtitle}>Java Applications</h2>
                <p className={styles.paragraph}>
                    Java is used to develop various types of applications:
                </p>
                <ul className={styles.list}>
                    <li>Desktop Applications (Swing, JavaFX)</li>
                    <li>Web Applications (Servlets, JSP, Spring)</li>
                    <li>Mobile Applications (Android)</li>
                    <li>Enterprise Applications (J2EE)</li>
                    <li>Scientific Applications</li>
                    <li>Big Data Technologies (Hadoop)</li>
                </ul>
            </section>

            <div className={styles.note}>
                <strong>Note:</strong> Java is one of the most popular programming languages in the world, 
                used by millions of developers and running on billions of devices worldwide.
            </div>
        </>
    );
}