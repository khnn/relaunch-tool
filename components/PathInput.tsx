import { useState } from "react"
import { FiCheck, FiX, FiCoffee } from 'react-icons/fi'

export default function PathInput({ path, baseUrl }: { path: Path, baseUrl: string }) {
  { JSON.stringify(path) }
  const [currentPath, setCurrentPath] = useState(path)
  const [checking, setChecking] = useState(false)

  const fetchPath = async (path: Path) => {
    setChecking(true)

    const response = await fetch("/api/fetchLink", {
      method: "POST",
      body: JSON.stringify({ url: `${baseUrl}${path.value}` })
    },)


    if (response.status === 200) {
      setCurrentPath({ ...currentPath, status: "success" })
    }

    if (response.status > 400) {
      setCurrentPath({ ...currentPath, status: "error" })
    }

    setChecking(false)
    return response
  }

  return (
    <div className="flex items-center  mt-4 gap-2">
      <div className="text-gray-400 font-light text-sm">
        {baseUrl}
      </div>
      <div className="flex gap-2">
        <div className="relative">
          <input type='url' className="block w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={currentPath.value} onChange={(e) => setCurrentPath({ ...currentPath, value: e.currentTarget.value })} onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchPath(currentPath)
            }
          }} />
          <div className="absolute right-2.5 top-2.5 p-0.5 bg-white bg-opacity-80 border border-gray-200 rounded-md">
            {checking && <FiCoffee className="animate-bounce" />}
            {!checking && currentPath.status === "success" && <FiCheck />}
            {!checking && currentPath.status === "error" && <FiX color="red" />}
          </div>
        </div>
        <button className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => fetchPath(currentPath)}>Check</button>
      </div>
    </div>
  )
}