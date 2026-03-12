const sizes = ['XS', 'S', 'M', 'L', 'XL'] as const

export type Size = (typeof sizes)[number]

export default function ChooseSize({
  selectedSize,
  onSelectSize,
  stock,
}: {
  selectedSize: Size | null
  onSelectSize: (size: Size) => void
  stock: Record<string, number> | null
}) {
  return (
    <div className="flex flex-col mt-4">
      <span>Choose a Size:</span>
      <div className="flex flex-row flex-wrap gap-y-2 mt-2">
        {sizes.map((size, i) => {
          const count = stock?.[size]
          const outOfStock = count !== undefined && count !== null && count <= 0
          return (
            <div key={size} className={`flex flex-col items-center ${i > 0 ? 'ml-2' : ''}`}>
              <button
                onClick={() => !outOfStock && onSelectSize(size)}
                disabled={outOfStock}
                className={`hover:bg-neutral-100/30 w-8 border rounded-2xl transition-all duration-200 ${
                  outOfStock
                    ? 'opacity-30 cursor-not-allowed line-through'
                    : 'cursor-pointer'
                } ${
                  selectedSize === size
                    ? 'bg-neutral-100/40 border-neutral-100/40'
                    : 'bg-neutral-200/15 border-neutral-200/10'
                }`}
              >
                {size}
              </button>
              {stock && (
                <span className={`text-[10px] mt-1 ${outOfStock ? 'text-red-400/70' : 'opacity-50'}`}>
                  {outOfStock ? 'Out' : count}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
