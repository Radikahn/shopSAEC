import { Suspense } from 'react'
import SpinningLogo from './SpinningLogo'
import { PiShoppingCartSimple } from 'react-icons/pi'

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
      <div className="flex flex-1 justify-end mr-8">
        <span className="text-3xl cursor-pointer">
          <PiShoppingCartSimple />
        </span>
      </div>
    </header>
  )
}
