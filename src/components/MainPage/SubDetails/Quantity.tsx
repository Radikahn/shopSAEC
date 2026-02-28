export default function Quantity() {
  return (
    <div>
      <div className="flex flex-col">
        <span className="mb-2">Quantity:</span>
        <input
          className="ml-4 p-4 w-14 h-6 text-center border border-neutral-200/10 rounded-md"
          defaultValue={1}
        ></input>
      </div>
    </div>
  )
}
