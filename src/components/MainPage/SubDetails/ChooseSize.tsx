const sizes = ['XS', 'S', 'M', 'L', 'XL'] as const

export type Size = (typeof sizes)[number]

export default function ChooseSize({
  selectedSize,
  onSelectSize,
}: {
  selectedSize: Size | null
  onSelectSize: (size: Size) => void
}) {
  return (
    <div className="flex flex-col mt-4">
      <span>Choose a Size:</span>
      <div className="flex flex-row flex-wrap gap-y-2 mt-2">
        {sizes.map((size, i) => (
          <button
            key={size}
            onClick={() => onSelectSize(size)}
            className={`hover:bg-neutral-100/30 w-8 ${i > 0 ? 'ml-2' : ''} border rounded-2xl cursor-pointer transition-all duration-200 ${
              selectedSize === size
                ? 'bg-neutral-100/40 border-neutral-100/40'
                : 'bg-neutral-200/15 border-neutral-200/10'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
