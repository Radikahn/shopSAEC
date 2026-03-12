import ChooseSize from './SubDetails/ChooseSize'
import Quantity from './SubDetails/Quantity'
import type { Size } from './SubDetails/ChooseSize'

export default function ItemDetails({
  selectedSize,
  onSelectSize,
  quantity,
  onQuantityChange,
  stock,
}: {
  selectedSize: Size | null
  onSelectSize: (size: Size) => void
  quantity: number
  onQuantityChange: (quantity: number) => void
  stock: Record<string, number> | null
}) {
  return (
    <div className="h-full">
      <div className="border-b border-neutral-200/20 pb-2">
        <span>Configure:</span>
      </div>
      <ChooseSize selectedSize={selectedSize} onSelectSize={onSelectSize} stock={stock} />
      <div className="mt-4">
        <Quantity quantity={quantity} onQuantityChange={onQuantityChange} />
      </div>
    </div>
  )
}
