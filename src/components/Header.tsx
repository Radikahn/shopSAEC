import { Suspense } from 'react'
import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import SpinningLogo from './SpinningLogo'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-25 items-center border-b border-[var(--line)] bg-[var(--header-bg)] px-2 backdrop-blur-lg relative">
      <nav className="ml-8">
        <a href="shop.we-saec.me">
          <span>SHOP</span>
        </a>

        <a href="https://we-saec.me/dash" target="_blank">
          <span className="ml-8">HOME</span>
        </a>

        <a href="https://we-saec.me" target="_blank">
          <span className="ml-8">JOIN US</span>
        </a>
      </nav>
      <div className="absolute left-1/2 -translate-x-1/2">
        <Suspense fallback={<div className="w-10 h-10" />}>
          <SpinningLogo />
        </Suspense>
      </div>
    </header>
  )
}
