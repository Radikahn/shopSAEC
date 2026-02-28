import ChooseSize from './SubDetails/ChooseSize'
import Quantity from './SubDetails/Quantity'

export default function ItemDetails() {
  return (
    <div className="h-full">
      <div className="border-b border-neutral-200/20 pb-2">
        <span>Configure:</span>
      </div>
      <ChooseSize />
      <div className="mt-4">
        <Quantity />
      </div>
    </div>
  )
}
