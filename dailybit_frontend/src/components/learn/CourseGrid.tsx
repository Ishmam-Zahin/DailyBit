import React from 'react';
import Link from 'next/link';
import styles from '@/styles/pages/learn/courseGrid.module.scss';

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
    description: 'Complete introduction to web development. Master HTML, CSS, and JavaScript fundamentals to build your first interactive websites.',
    difficulty: 'Beginner',
    duration: '6-8 weeks',
    topics: 35,
    lessons: 120,
    projects: 8,
    icon: '🌐',
    color: '#059669'
  },
  {
    id: 'python',
    title: 'Python Programming',
    description: 'Start your programming journey with Python. Learn variables, functions, data structures, and build real-world applications.',
    difficulty: 'Beginner',
    duration: '5-7 weeks',
    topics: 30,
    lessons: 95,
    projects: 6,
    icon: '🐍',
    color: '#047857'
  },
  {
    id: 'java',
    title: 'Java Programming',
    description: 'Master object-oriented programming with Java. Build robust applications and understand enterprise-level development concepts.',
    difficulty: 'Intermediate',
    duration: '8-10 weeks',
    topics: 42,
    lessons: 150,
    projects: 12,
    icon: '☕',
    color: '#065f46'
  },
  {
    id: 'cpp',
    title: 'C++ Programming',
    description: 'Deep dive into C++ fundamentals. Master memory management, algorithms, and high-performance system programming.',
    difficulty: 'Advanced',
    duration: '10-12 weeks',
    topics: 45,
    lessons: 180,
    projects: 15,
    icon: '⚙️',
    color: '#059669'
  },
  {
    id: 'javascript',
    title: 'Advanced JavaScript',
    description: 'Master modern JavaScript with ES6+, async programming, DOM manipulation, and advanced development patterns.',
    difficulty: 'Intermediate',
    duration: '6-8 weeks',
    topics: 28,
    lessons: 110,
    projects: 10,
    icon: '⚡',
    color: '#047857'
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    description: 'Create stunning mobile apps for iOS and Android. Learn React Native and cross-platform development techniques.',
    difficulty: 'Advanced',
    duration: '8-10 weeks',
    topics: 38,
    lessons: 140,
    projects: 8,
    icon: '📱',
    color: '#065f46'
  },
  {
    id: 'data-structures',
    title: 'Data Structures & Algorithms',
    description: 'Master essential computer science concepts. Learn arrays, trees, graphs, sorting algorithms, and problem-solving techniques.',
    difficulty: 'Intermediate',
    duration: '6-8 weeks',
    topics: 32,
    lessons: 125,
    projects: 20,
    icon: '🧮',
    color: '#059669'
  },
  {
    id: 'game-development',
    title: 'Game Development Basics',
    description: 'Build your first interactive games! Learn game logic, physics engines, and create engaging gaming experiences.',
    difficulty: 'Intermediate',
    duration: '7-9 weeks',
    topics: 35,
    lessons: 130,
    projects: 6,
    icon: '🎮',
    color: '#047857'
  },
  {
    id: 'database',
    title: 'Database & SQL',
    description: 'Master database design and SQL queries. Learn to store, retrieve, and manage application data effectively and securely.',
    difficulty: 'Intermediate',
    duration: '4-5 weeks',
    topics: 20,
    lessons: 75,
    projects: 5,
    icon: '🗃️',
    color: '#065f46'
  },
  {
    id: 'git',
    title: 'Git & Version Control',
    description: 'Master professional development workflows with Git. Learn collaboration, branching, and project management techniques.',
    difficulty: 'Beginner',
    duration: '2-3 weeks',
    topics: 15,
    lessons: 45,
    projects: 3,
    icon: '📝',
    color: '#059669'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn essential security concepts. Understand vulnerabilities, encryption, and how to build secure applications.',
    difficulty: 'Intermediate',
    duration: '5-6 weeks',
    topics: 25,
    lessons: 85,
    projects: 7,
    icon: '🔒',
    color: '#047857'
  },
  {
    id: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    description: 'Introduction to artificial intelligence and machine learning. Build intelligent applications and understand neural networks.',
    difficulty: 'Advanced',
    duration: '8-10 weeks',
    topics: 40,
    lessons: 160,
    projects: 10,
    icon: '🤖',
    color: '#065f46'
  }
];

const CoursesGrid: React.FC = () => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#059669';
      case 'Intermediate': return '#047857';
      case 'Advanced': return '#065f46';
      default: return '#059669';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Choose Your Learning Path</h1>
        <p className={styles.subtitle}>
          Start your coding journey with our comprehensive courses designed for young programmers
        </p>
      </div>
      
      <div className={styles.coursesGrid}>
        {courses.map((course) => (
          <Link href={`/learn${course.id === 'java' ? '/java' : ''}`} key={course.id} className={styles.courseCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <div className={styles.icon}>
                  {course.icon}
                </div>
              </div>
              <div className={styles.cardMeta}>
                <span 
                  className={styles.difficulty} 
                  style={{ backgroundColor: getDifficultyColor(course.difficulty) }}
                >
                  {course.difficulty}
                </span>
              </div>
            </div>
            
            <div className={styles.cardContent}>
              <h3 className={styles.courseTitle}>{course.title}</h3>
              <p className={styles.courseDescription}>{course.description}</p>
              
              <div className={styles.courseStats}>
                <div className={styles.statRow}>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Duration</span>
                    <span className={styles.statValue}>{course.duration}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Topics</span>
                    <span className={styles.statValue}>{course.topics}</span>
                  </div>
                </div>
                <div className={styles.statRow}>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Lessons</span>
                    <span className={styles.statValue}>{course.lessons}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Projects</span>
                    <span className={styles.statValue}>{course.projects}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.cardFooter}>
              <button className={styles.startButton}>
                Start Learning
                <span className={styles.arrow}>→</span>
              </button>
            </div>
          </Link>
        ))}
      </div>
      
      <div className={styles.callToAction}>
        <h2>Not sure where to start?</h2>
        <p>Take our quick assessment to find the perfect course for your skill level</p>
        <Link href="/" className={styles.assessmentButton}>
          Take Assessment
        </Link>
      </div>
    </div>
  );
};

export default CoursesGrid;