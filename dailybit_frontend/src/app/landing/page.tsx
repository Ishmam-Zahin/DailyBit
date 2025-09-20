// src/app/landing/page.tsx
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', color: '#1f2937', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Navigation */}
      <nav style={{ 
        backgroundColor: '#f9fafb', 
        borderBottom: '1px solid #e5e7eb', 
        position: 'sticky', 
        top: 0, 
        zIndex: 50,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a', margin: 0 }}>
              DailyBit
            </h1>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div style={{ display: 'none', gap: '2rem', '@media (min-width: 768px)': { display: 'flex' } }}>
                <a href="#courses" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '1.2rem' }}>Courses</a>
                <a href="#features" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '1.2rem' }}>Features</a>
                <a href="#about" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '1.2rem' }}>About</a>
              </div>
              <Link 
                href="/login" 
                style={{ 
                  backgroundColor: '#16a34a', 
                  color: 'white', 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.2rem'
                }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        padding: '6rem 1rem', 
        background: 'linear-gradient(to bottom, #ffffff, #f9fafb)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '4.5rem', 
            fontWeight: 'bold', 
            marginBottom: '2rem',
            lineHeight: '1.1',
            color: '#111827'
          }}>
            Learn Programming<br />
            <span style={{ color: '#16a34a' }}>From Scratch</span>
          </h2>
          <p style={{ 
            fontSize: '1.5rem', 
            color: '#4b5563', 
            marginBottom: '3rem', 
            maxWidth: '700px',
            margin: '0 auto 3rem auto',
            lineHeight: '1.6'
          }}>
            Master programming with our interactive courses, practice problems, and AI-powered assistance.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '5rem' }}>
            <Link 
              href="/signup" 
              style={{ 
                backgroundColor: '#16a34a', 
                color: 'white', 
                padding: '1rem 2.5rem', 
                borderRadius: '0.75rem',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.3rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              Start Learning Free
            </Link>
            <a 
              href="#courses" 
              style={{ 
                border: '2px solid #16a34a', 
                color: '#16a34a', 
                padding: '1rem 2.5rem', 
                borderRadius: '0.75rem',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.3rem',
                backgroundColor: 'transparent'
              }}
            >
              View Courses
            </a>
          </div>
          
          {/* Stats */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '3rem', 
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#16a34a' }}>50K+</div>
              <div style={{ color: '#6b7280', fontSize: '1.1rem' }}>Students</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#16a34a' }}>500+</div>
              <div style={{ color: '#6b7280', fontSize: '1.1rem' }}>Problems</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#16a34a' }}>24/7</div>
              <div style={{ color: '#6b7280', fontSize: '1.1rem' }}>AI Help</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ 
        padding: '6rem 1rem', 
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h3 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
              Why Choose DailyBit?
            </h3>
            <p style={{ color: '#4b5563', fontSize: '1.4rem' }}>
              Everything you need to master programming
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2.5rem'
          }}>
            <FeatureCard
              title="Interactive Code Editor"
              description="Write and test code in real-time with our built-in editor."
              icon="💻"
              iconBg="#dbeafe"
            />
            <FeatureCard
              title="AI Assistant"
              description="Get instant help and guidance from our AI-powered chatbot."
              icon="🤖"
              iconBg="#f3e8ff"
            />
            <FeatureCard
              title="Practice Problems"
              description="Solve coding challenges with automated testing and feedback."
              icon="✅"
              iconBg="#dcfce7"
            />
            <FeatureCard
              title="Instant Feedback"
              description="Get real-time feedback on your code and solutions."
              icon="⚡"
              iconBg="#fef3c7"
            />
            <FeatureCard
              title="Structured Learning"
              description="Follow our step-by-step curriculum from beginner to advanced."
              icon="📚"
              iconBg="#e0e7ff"
            />
            <FeatureCard
              title="Community Support"
              description="Connect with other students and get help from the community."
              icon="👥"
              iconBg="#fce7f3"
            />
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" style={{ 
        padding: '6rem 1rem', 
        backgroundColor: '#ffffff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h3 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
              Available Courses
            </h3>
            <p style={{ color: '#4b5563', fontSize: '1.4rem' }}>
              Start your programming journey today
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
            gap: '3rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {/* Java Course */}
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '2.5rem', 
              borderRadius: '1rem',
              border: '1px solid #e5e7eb',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ 
                  width: '5rem', 
                  height: '5rem', 
                  backgroundColor: '#fed7aa', 
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1.5rem',
                  fontSize: '2rem'
                }}>
                  ☕
                </div>
                <div>
                  <h4 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#111827' }}>
                    Java Programming
                  </h4>
                  <p style={{ color: '#4b5563', margin: '0.5rem 0 0 0', fontSize: '1.2rem' }}>
                    Complete Java course from basics to advanced
                  </p>
                </div>
              </div>
              
              <ul style={{ marginBottom: '2rem', padding: 0, listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: '#374151', fontSize: '1.2rem' }}>
                  <span style={{ color: '#16a34a', marginRight: '1rem', fontSize: '1.4rem' }}>✓</span>
                  Chapter 1: Java Fundamentals
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: '#374151', fontSize: '1.2rem' }}>
                  <span style={{ color: '#16a34a', marginRight: '1rem', fontSize: '1.4rem' }}>✓</span>
                  Chapter 2: Object-Oriented Programming
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: '#374151', fontSize: '1.2rem' }}>
                  <span style={{ color: '#16a34a', marginRight: '1rem', fontSize: '1.4rem' }}>✓</span>
                  Chapter 3: Advanced Concepts
                </li>
              </ul>
              
              <Link 
                href="/learn/java" 
                style={{ 
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  backgroundColor: '#16a34a', 
                  color: 'white', 
                  padding: '1rem', 
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.3rem'
                }}
              >
                Start Java Course
              </Link>
            </div>

            {/* Coming Soon */}
            <div style={{ 
              backgroundColor: '#f9fafb', 
              padding: '2.5rem', 
              borderRadius: '1rem',
              border: '1px solid #e5e7eb',
              position: 'relative'
            }}>
              <div style={{ 
                position: 'absolute', 
                top: '1.5rem', 
                right: '1.5rem', 
                backgroundColor: '#2563eb', 
                color: 'white', 
                padding: '0.5rem 1rem', 
                borderRadius: '2rem',
                fontSize: '1rem',
                fontWeight: '600'
              }}>
                Coming Soon
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ 
                  width: '5rem', 
                  height: '5rem', 
                  backgroundColor: '#dbeafe', 
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1.5rem',
                  fontSize: '2rem'
                }}>
                  🐍
                </div>
                <div>
                  <h4 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#6b7280' }}>
                    Python Programming
                  </h4>
                  <p style={{ color: '#9ca3af', margin: '0.5rem 0 0 0', fontSize: '1.2rem' }}>
                    Data Science & Web Development
                  </p>
                </div>
              </div>
              
              <ul style={{ marginBottom: '2rem', padding: 0, listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: '#9ca3af', fontSize: '1.2rem' }}>
                  <span style={{ color: '#d1d5db', marginRight: '1rem', fontSize: '1.4rem' }}>⏱</span>
                  Python Fundamentals
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: '#9ca3af', fontSize: '1.2rem' }}>
                  <span style={{ color: '#d1d5db', marginRight: '1rem', fontSize: '1.4rem' }}>⏱</span>
                  Data Analysis
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: '#9ca3af', fontSize: '1.2rem' }}>
                  <span style={{ color: '#d1d5db', marginRight: '1rem', fontSize: '1.4rem' }}>⏱</span>
                  Web Development
                </li>
              </ul>
              
              <button style={{ 
                width: '100%',
                backgroundColor: '#e5e7eb', 
                color: '#9ca3af', 
                padding: '1rem', 
                borderRadius: '0.75rem',
                fontWeight: '600',
                border: 'none',
                cursor: 'not-allowed',
                fontSize: '1.3rem'
              }}>
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ 
        padding: '6rem 1rem', 
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827' }}>
            About DailyBit
          </h3>
          <p style={{ 
            fontSize: '1.4rem', 
            color: '#4b5563', 
            marginBottom: '3rem', 
            lineHeight: '1.7'
          }}>
            We're dedicated to making programming education accessible and effective for everyone. 
            Our platform combines interactive learning, practical exercises, and AI assistance to help 
            you master programming skills at your own pace.
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '3rem', 
            marginTop: '4rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#16a34a', marginBottom: '1rem' }}>
                50,000+
              </div>
              <div style={{ color: '#6b7280', fontSize: '1.2rem' }}>Happy Students</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#16a34a', marginBottom: '1rem' }}>
                95%
              </div>
              <div style={{ color: '#6b7280', fontSize: '1.2rem' }}>Success Rate</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#16a34a', marginBottom: '1rem' }}>
                4.9★
              </div>
              <div style={{ color: '#6b7280', fontSize: '1.2rem' }}>Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '6rem 1rem', 
        backgroundColor: '#ffffff',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827' }}>
            Ready to Start Learning?
          </h3>
          <p style={{ 
            fontSize: '1.4rem', 
            color: '#4b5563', 
            marginBottom: '3rem', 
            maxWidth: '700px',
            margin: '0 auto 3rem auto'
          }}>
            Join thousands of students who are already mastering programming with DailyBit.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              href="/signup" 
              style={{ 
                backgroundColor: '#16a34a', 
                color: 'white', 
                padding: '1rem 2.5rem', 
                borderRadius: '0.75rem',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.3rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              Get Started Free
            </Link>
            <Link 
              href="/login" 
              style={{ 
                border: '2px solid #16a34a', 
                color: '#16a34a', 
                padding: '1rem 2.5rem', 
                borderRadius: '0.75rem',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.3rem',
                backgroundColor: 'transparent'
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#f3f4f6', 
        borderTop: '1px solid #e5e7eb', 
        padding: '4rem 1rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '3rem'
          }}>
            <div>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a', marginBottom: '1.5rem' }}>
                DailyBit
              </h4>
              <p style={{ color: '#4b5563', fontSize: '1.2rem' }}>
                Learn programming with interactive courses and AI assistance.
              </p>
            </div>
            
            <div>
              <h5 style={{ fontWeight: '600', marginBottom: '1.5rem', color: '#111827', fontSize: '1.3rem' }}>Courses</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <Link href="/learn/java" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '1.2rem' }}>
                    Java Programming
                  </Link>
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <span style={{ color: '#9ca3af', fontSize: '1.2rem' }}>Python (Soon)</span>
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <span style={{ color: '#9ca3af', fontSize: '1.2rem' }}>JavaScript (Soon)</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h5 style={{ fontWeight: '600', marginBottom: '1.5rem', color: '#111827', fontSize: '1.3rem' }}>Features</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.75rem', color: '#4b5563', fontSize: '1.2rem' }}>Practice Problems</li>
                <li style={{ marginBottom: '0.75rem', color: '#4b5563', fontSize: '1.2rem' }}>AI Assistant</li>
                <li style={{ marginBottom: '0.75rem', color: '#4b5563', fontSize: '1.2rem' }}>Code Editor</li>
              </ul>
            </div>
            
            <div>
              <h5 style={{ fontWeight: '600', marginBottom: '1.5rem', color: '#111827', fontSize: '1.3rem' }}>Support</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.75rem', color: '#4b5563', fontSize: '1.2rem' }}>Help Center</li>
                <li style={{ marginBottom: '0.75rem', color: '#4b5563', fontSize: '1.2rem' }}>Contact Us</li>
                <li style={{ marginBottom: '0.75rem', color: '#4b5563', fontSize: '1.2rem' }}>Community</li>
              </ul>
            </div>
          </div>
          
          <div style={{ 
            borderTop: '1px solid #e5e7eb', 
            paddingTop: '2rem', 
            marginTop: '3rem', 
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '1.1rem'
          }}>
            © 2025 DailyBit. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Card Component
interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
}

function FeatureCard({ title, description, icon, iconBg }: FeatureCardProps) {
  return (
    <div style={{ 
      backgroundColor: '#ffffff', 
      padding: '2.5rem', 
      borderRadius: '1rem',
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ 
        width: '4rem', 
        height: '4rem', 
        backgroundColor: iconBg, 
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        fontSize: '2rem'
      }}>
        {icon}
      </div>
      <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>
        {title}
      </h4>
      <p style={{ color: '#4b5563', fontSize: '1.2rem', lineHeight: '1.6' }}>{description}</p>
    </div>
  );
}