export default function Quantity({
  quantity,
  onQuantityChange,
}: {
  quantity: number
  onQuantityChange: (quantity: number) => void
}) {
  return (
    <div>
      <div className="flex flex-col">
        <span className="mb-2">Quantity:</span>
        <input
          className="ml-4 p-4 w-18 h-6 text-center border border-neutral-200/10 rounded-md"
          type="number"
          min={1}
          max={10}
          value={quantity}
          onChange={(e) => {
            const val = Math.max(1, Math.min(10, Number(e.target.value) || 1))
            onQuantityChange(val)
          }}
        />
      </div>
    </div>
  )
}
