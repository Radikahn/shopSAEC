export default function ChooseSize() {
  return (
    <div className="flex flex-col mt-4">
      <span>Choose a Size:</span>
      <div className="flex flex-row mt-2">
        <button className="hover:bg-neutral-100/30 w-8 bg-neutral-200/15 border border-neutral-200/10 rounded-2xl cursor-pointer">
          XS
        </button>
        <button className="hover:bg-neutral-100/30 w-8 ml-2 bg-neutral-200/15 border border-neutral-200/10 rounded-2xl cursor-pointer">
          S
        </button>
        <button className="hover:bg-neutral-100/30 w-8 ml-2 bg-neutral-200/15 border border-neutral-200/10 rounded-2xl cursor-pointer">
          M
        </button>
        <button className="hover:bg-neutral-100/30 w-8 ml-2 bg-neutral-200/15 border border-neutral-200/10 rounded-2xl cursor-pointer">
          L
        </button>
        <button className="hover:bg-neutral-100/30 w-8  ml-2 bg-neutral-200/15 border border-neutral-200/10 rounded-2xl cursor-pointer">
          XL
        </button>
      </div>
    </div>
  )
}
