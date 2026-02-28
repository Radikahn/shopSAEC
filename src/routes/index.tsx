import ItemFeature from '#/components/MainPage/ItemFeature'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="mt-2 ml-4 mr-4 -mb-10 flex flex-col justify-center items-center">
      <ItemFeature />
    </div>
  )
}
