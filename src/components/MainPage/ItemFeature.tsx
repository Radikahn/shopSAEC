import ItemDetails from './ItemDetails'
import ProductFeature from './ProductFeature'

export default function ItemFeature() {
  return (
    <div className="w-full h-full pb-8 overflow-hidden bg-blue-950-950/20 rounded-md border-2 border-blue-100/30">
      <div id="internal-header" className="p-4">
        <span className="">SAEC - Club 33 Tee</span>
      </div>
      <div
        id="product display"
        className="ml-4 mr-4 pl-4 pt-8 flex items-center border-2 border-blue-100/20"
      >
        <div id="left-details" className="pl-4 mr-4 pr-4 mb-8 ">
          <div className="border-r border-blue-100/20 pr-8">
            <ItemDetails></ItemDetails>

            <div className="mt-20 flex flex-col">
              <button className="px-8 py-2 bg-neutral-200/20 border border-neutral-50/20 hover:bg-neutral-100/30  rounded-4xl transition-all duration-300 cursor-pointer">
                Add to Cart
              </button>
            </div>
            <div className="flex flex-1 justify-center mt-12">
              <span className="text-xs">
                Esoteric oversized black T-Shirt. R33 GTR club speciall. {'<33'}
              </span>
            </div>
          </div>
        </div>
        <div
          id="right-details"
          className="flex flex-1 flex-col items-center justify-center pb-12 pr-4"
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
