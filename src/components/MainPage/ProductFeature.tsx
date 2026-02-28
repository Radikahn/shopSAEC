import { useState } from 'react'

const images = ['/CLEAN.png', '/CLEAN_BACK.png']

export default function ProductFeature() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [animating, setAnimating] = useState(false)

  const go = (next: number, dir: 'left' | 'right') => {
    if (animating) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setCurrent(next)
      setAnimating(false)
    }, 300)
  }

  const prev = () => go(current === 0 ? images.length - 1 : current - 1, 'left')
  const next = () => go(current === images.length - 1 ? 0 : current + 1, 'right')

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-[600px] overflow-hidden">
        <img
          src={images[current]}
          alt={current === 0 ? 'T-shirt front' : 'T-shirt back'}
          className="w-full h-auto transition-all duration-300 ease-in-out"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${direction === 'right' ? '-20px' : '20px'})`
              : 'translateX(0)',
          }}
        />
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-strong)] border border-[var(--line)] text-[var(--sea-ink)] cursor-pointer hover:bg-[var(--link-bg-hover)]"
        >
          &#8249;
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-strong)] border border-[var(--line)] text-[var(--sea-ink)] cursor-pointer hover:bg-[var(--link-bg-hover)]"
        >
          &#8250;
        </button>
      </div>
      <div className="flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i !== current) go(i, i > current ? 'right' : 'left')
            }}
            className={`h-2 w-2 rounded-full cursor-pointer border-none transition-opacity duration-300 ${
              i === current
                ? 'bg-[var(--sea-ink)]'
                : 'bg-[var(--sea-ink-soft)] opacity-40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
