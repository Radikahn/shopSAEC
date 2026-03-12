import { Suspense, lazy } from 'react'
import { useNavigate } from '@tanstack/react-router'

const SpinningLogo = lazy(() => import('./SpinningLogo'))

export default function Header() {
  const navigation = useNavigate()

  function openCart() {
    navigation({ to: '/cart' })
  }

  function goHome() {
    navigation({ to: '/' })
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 sm:h-25 items-center border-b border-[var(--line)] bg-[var(--header-bg)] px-2 backdrop-blur-lg relative">
      <nav className="hidden sm:block ml-8 text-base">
        <span
          onClick={goHome}
          className="cursor-pointer hover:text-neutral-600 transition-all duration-300"
        >
          SHOP
        </span>

        <a href="https://we-saec.me/dash" target="_blank">
          <span className="ml-8">HOME</span>
        </a>

        <a href="https://we-saec.me" target="_blank">
          <span className="ml-8">JOIN US</span>
        </a>
      </nav>
      <div className="absolute left-1/2 -translate-x-1/2">
        <div onClick={goHome} className="cursor-pointer">
          <Suspense fallback={<div className="w-10 h-10" />}>
            <SpinningLogo />
          </Suspense>
        </div>
      </div>
      <div className="hidden sm:flex flex-1 justify-end mr-8">
        <span
          onClick={openCart}
          className="text-3xl cursor-pointer"
        >
          <img src="cartLogo.png" width={50} height={50} />
        </span>
      </div>
    </header>
  )
}
