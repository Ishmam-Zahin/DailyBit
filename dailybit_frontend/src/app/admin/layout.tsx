'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppSelector } from '@/redux/ReduxStore'

const navLinks = [
  { label: 'Courses & Chapters', href: '/admin/courses_chapters' },
//   { label: 'Problems',           href: '/admin/problems' },
//   { label: 'Test Cases',         href: '/admin/test_cases' },
//   { label: 'Users',              href: '/admin/users' },
//   { label: 'Posts',              href: '/admin/posts' },
//   { label: 'Comments',           href: '/admin/comments' },
  { label: 'Embeddings',         href: '/admin/embeddings' },
]

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()

  return (
    <>
      <header className="relative flex items-center justify-between px-6 py-4 bg-slate-900 text-white shadow-md">
        <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold tracking-wide text-emerald-400">
          Admin Panel
        </h1>
        <div className="flex items-center gap-3 ml-auto">
          <button className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors text-sm font-medium">
            Settings
          </button>
          <button className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition-colors text-sm font-medium">
            Logout
          </button>
        </div>
      </header>

      <main className="flex min-h-screen bg-slate-50">
        <div className="w-64 shrink-0 bg-white border-r border-slate-200 p-4">
          <nav>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
              Tables
            </h2>
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ label, href }) => {
                const isActive = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`block rounded-md transition-colors ${
                      isActive
                        ? 'bg-slate-100 text-slate-900 font-medium'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <li className="px-3 py-2 text-sm">{label}</li>
                  </Link>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="flex-1 p-6">{children}</div>
      </main>
    </>
  )
}