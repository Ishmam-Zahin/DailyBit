// src/app/landing/page.tsx
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div
      className="min-h-screen bg-white text-gray-800"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-gray-50 shadow-sm">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="m-0 text-2xl font-bold text-green-600">
              <Link href="/">DailyBit</Link>
            </h1>

            <div className="flex items-center gap-6">
              <Link
                href="/login"
                className="rounded-lg bg-green-600 px-5 py-2.5 text-base font-semibold text-white no-underline transition-colors hover:bg-green-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 px-4 py-20 text-center">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-5xl font-bold leading-tight text-gray-900">
            Learn Programming
            <br />
            <span className="text-green-600">From Scratch</span>
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-500">
            Master programming with our interactive courses, practice
            problems, and AI-powered assistance.
          </p>

          <div className="mb-16 flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-xl bg-green-600 px-8 py-3.5 text-base font-semibold text-white no-underline shadow-lg transition-colors hover:bg-green-700"
            >
              Start Learning Free
            </Link>

            <Link
              href="/learn"
              className="rounded-xl border-2 border-green-600 bg-transparent px-8 py-3.5 text-base font-semibold text-green-600 no-underline transition-colors hover:bg-green-50"
            >
              View Courses
            </Link>
          </div>

          {/* Stats */}
          <div className="mx-auto grid max-w-lg grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">50K+</div>
              <div className="mt-1 text-sm text-gray-500">Students</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">500+</div>
              <div className="mt-1 text-sm text-gray-500">Problems</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">24/7</div>
              <div className="mt-1 text-sm text-gray-500">AI Help</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h3 className="mb-4 text-3xl font-bold text-gray-900">
              Why Choose DailyBit?
            </h3>

            <p className="text-lg text-gray-500">
              Everything you need to master programming
            </p>
          </div>

          <div
            className="grid gap-8"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}
          >
            <FeatureCard
              title="Interactive Code Editor"
              description="Write and test code in real-time with our built-in editor."
              icon="💻"
              iconBg="bg-blue-100"
            />

            <FeatureCard
              title="AI Assistant"
              description="Get instant help and guidance from our AI-powered chatbot."
              icon="🤖"
              iconBg="bg-purple-100"
            />

            <FeatureCard
              title="Practice Problems"
              description="Solve coding challenges with automated testing and feedback."
              icon="✅"
              iconBg="bg-green-100"
            />

            <FeatureCard
              title="Instant Feedback"
              description="Get real-time feedback on your code and solutions."
              icon="⚡"
              iconBg="bg-yellow-100"
            />

            <FeatureCard
              title="Structured Learning"
              description="Follow our step-by-step curriculum from beginner to advanced."
              icon="📚"
              iconBg="bg-indigo-100"
            />

            <FeatureCard
              title="Community Support"
              description="Connect with other students and get help from the community."
              icon="👥"
              iconBg="bg-pink-100"
            />
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="bg-white px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h3 className="mb-4 text-3xl font-bold text-gray-900">
              Available Courses
            </h3>

            <p className="text-lg text-gray-500">
              Start your programming journey today
            </p>
          </div>

          <div
            className="mx-auto grid max-w-4xl gap-8"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            }}
          >
            {/* Java Course */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
              <div className="mb-6 flex items-center">
                <div className="mr-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-200 text-3xl">
                  ☕
                </div>

                <div>
                  <h4 className="m-0 text-2xl font-bold text-gray-900">
                    Java Programming
                  </h4>

                  <p className="mb-0 mt-2 text-base text-gray-500">
                    Complete Java course from basics to advanced
                  </p>
                </div>
              </div>

              <ul className="mb-8 list-none p-0">
                <li className="mb-3 flex items-center text-base text-gray-700">
                  <span className="mr-3 text-xl text-green-600">✓</span>
                  Chapter 1: Java Fundamentals
                </li>

                <li className="mb-3 flex items-center text-base text-gray-700">
                  <span className="mr-3 text-xl text-green-600">✓</span>
                  Chapter 2: Object-Oriented Programming
                </li>

                <li className="mb-3 flex items-center text-base text-gray-700">
                  <span className="mr-3 text-xl text-green-600">✓</span>
                  Chapter 3: Advanced Concepts
                </li>
              </ul>

              <Link
                href="/learn/java"
                className="block w-full rounded-xl bg-green-600 py-3.5 text-center text-base font-semibold text-white no-underline transition-colors hover:bg-green-700"
              >
                Start Java Course
              </Link>
            </div>

            {/* Coming Soon */}
            <div className="relative rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <div className="absolute right-5 top-5 rounded-full bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white">
                Coming Soon
              </div>

              <div className="mb-6 flex items-center">
                <div className="mr-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                  🐍
                </div>

                <div>
                  <h4 className="m-0 text-2xl font-bold text-gray-500">
                    Python Programming
                  </h4>

                  <p className="mb-0 mt-2 text-base text-gray-400">
                    Data Science & Web Development
                  </p>
                </div>
              </div>

              <ul className="mb-8 list-none p-0">
                <li className="mb-3 flex items-center text-base text-gray-400">
                  <span className="mr-3 text-lg text-gray-300">⏱</span>
                  Python Fundamentals
                </li>

                <li className="mb-3 flex items-center text-base text-gray-400">
                  <span className="mr-3 text-lg text-gray-300">⏱</span>
                  Data Analysis
                </li>

                <li className="mb-3 flex items-center text-base text-gray-400">
                  <span className="mr-3 text-lg text-gray-300">⏱</span>
                  Web Development
                </li>
              </ul>

              <button
                className="w-full cursor-not-allowed rounded-xl border-none bg-gray-200 py-3.5 text-base font-semibold text-gray-400"
                disabled
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="mb-6 text-3xl font-bold text-gray-900">
            About DailyBit
          </h3>

          <p className="mb-10 text-lg leading-relaxed text-gray-500">
            We're dedicated to making programming education accessible and
            effective for everyone. Our platform combines interactive learning,
            practical exercises, and AI assistance to help you master
            programming skills at your own pace.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-green-600">
                50,000+
              </div>
              <div className="text-base text-gray-500">Happy Students</div>
            </div>

            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-green-600">
                95%
              </div>
              <div className="text-base text-gray-500">Success Rate</div>
            </div>

            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-green-600">
                4.9★
              </div>
              <div className="text-base text-gray-500">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h3 className="mb-6 text-3xl font-bold text-gray-900">
            Ready to Start Learning?
          </h3>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-500">
            Join thousands of students who are already mastering programming
            with DailyBit.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-xl bg-green-600 px-8 py-3.5 text-base font-semibold text-white no-underline shadow-lg transition-colors hover:bg-green-700"
            >
              Get Started Free
            </Link>

            <Link
              href="/login"
              className="rounded-xl border-2 border-green-600 bg-transparent px-8 py-3.5 text-base font-semibold text-green-600 no-underline transition-colors hover:bg-green-50"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-100 px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div
            className="grid gap-10"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            }}
          >
            <div>
              <h4 className="mb-4 text-xl font-bold text-green-600">
                DailyBit
              </h4>

              <p className="text-base text-gray-500">
                Learn programming with interactive courses and AI assistance.
              </p>
            </div>

            <div>
              <h5 className="mb-4 text-lg font-semibold text-gray-900">
                Courses
              </h5>

              <ul className="m-0 list-none p-0">
                <li className="mb-2">
                  <Link
                    href="/learn/java"
                    className="text-base text-gray-500 no-underline transition-colors hover:text-green-600"
                  >
                    Java Programming
                  </Link>
                </li>

                <li className="mb-2">
                  <span className="text-base text-gray-400">
                    Python (Soon)
                  </span>
                </li>

                <li className="mb-2">
                  <span className="text-base text-gray-400">
                    JavaScript (Soon)
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="mb-4 text-lg font-semibold text-gray-900">
                Features
              </h5>

              <ul className="m-0 list-none p-0">
                <li className="mb-2 text-base text-gray-500">
                  Practice Problems
                </li>

                <li className="mb-2 text-base text-gray-500">
                  AI Assistant
                </li>

                <li className="mb-2 text-base text-gray-500">
                  Code Editor
                </li>
              </ul>
            </div>

            <div>
              <h5 className="mb-4 text-lg font-semibold text-gray-900">
                Support
              </h5>

              <ul className="m-0 list-none p-0">
                <li className="mb-2 text-base text-gray-500">Help Center</li>
                <li className="mb-2 text-base text-gray-500">Contact Us</li>
                <li className="mb-2 text-base text-gray-500">Community</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
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

function FeatureCard({
  title,
  description,
  icon,
  iconBg,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg} text-3xl`}
      >
        {icon}
      </div>

      <h4 className="mb-3 text-xl font-bold text-gray-900">
        {title}
      </h4>

      <p className="text-base leading-relaxed text-gray-500">
        {description}
      </p>
    </div>
  );
}