import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import ItemDetails from './ItemDetails'
import ProductFeature from './ProductFeature'
import type { Size } from './SubDetails/ChooseSize'

export interface CartItem {
  item: string
  size: Size
  quantity: number
  price: number
}

const ITEM_NAME = 'Club 33 Tee'
const ITEM_PRICE = 30

export default function ItemFeature() {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const navigate = useNavigate()

  function addToCart() {
    if (!selectedSize) return

    const cartItem: CartItem = {
      item: ITEM_NAME,
      size: selectedSize,
      quantity,
      price: ITEM_PRICE,
    }

    localStorage.setItem('saec_cart', JSON.stringify(cartItem))
    setAdded(true)
    setTimeout(() => {
      navigate({ to: '/cart' })
    }, 400)
  }

  return (
    <div className="w-full h-full pb-8 overflow-hidden bg-blue-950-950/20 rounded-md border-2 border-blue-100/30">
      <div id="internal-header" className="p-4">
        <span className="">SAEC - Club 33 Tee</span>
      </div>
      <div
        id="product display"
        className="mx-2 sm:mx-4 px-2 sm:pl-4 pt-8 flex flex-col-reverse lg:flex-row lg:items-center border-2 border-blue-100/20"
      >
        <div id="left-details" className="px-2 sm:pl-4 sm:mr-4 sm:pr-4 mb-8 ">
          <div className="lg:border-r border-blue-100/20 lg:pr-8">
            <ItemDetails
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />

            <div className="mt-10 lg:mt-20 flex flex-col">
              <button
                onClick={addToCart}
                disabled={!selectedSize}
                className={`px-8 py-2 border rounded-4xl transition-all duration-300 cursor-pointer ${
                  added
                    ? 'bg-green-500/30 border-green-400/40'
                    : !selectedSize
                      ? 'bg-neutral-200/10 border-neutral-50/10 opacity-50 cursor-not-allowed'
                      : 'bg-neutral-200/20 border-neutral-50/20 hover:bg-neutral-100/30'
                }`}
              >
                {added ? 'Added!' : 'Add to Cart'}
              </button>
              {!selectedSize && (
                <span className="text-xs mt-2 opacity-60">
                  Select a size to continue
                </span>
              )}
            </div>
            <div className="flex flex-1 justify-center mt-8 lg:mt-12">
              <span className="text-xs">
                Esoteric oversized black T-Shirt. R33 GTR club speciall. {'<33'}
              </span>
            </div>
          </div>
        </div>
        <div
          id="right-details"
          className="flex flex-1 flex-col items-center justify-center pb-8 lg:pb-12 lg:pr-4"
        >
          <ProductFeature />
        </div>
      </div>
      <div className="flex flex-1 justify-center pt-4 -mb-2">
        <a
          href="https://www.instagram.com/eso.clo/"
          target="_blank"
          className="cursor-pointer"
        >
          <span className="font-light text-center">DESIGNED BY ESOTERIC</span>
        </a>
      </div>
    </div>
  )
}
