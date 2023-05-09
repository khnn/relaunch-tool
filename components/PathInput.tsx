import { useState } from "react"
import { FiCheck, FiX, FiCoffee } from 'react-icons/fi'

export default function PathInput({ path, updatePaths, baseUrl }) {
  { JSON.stringify(path) }
  const [currentPath, setCurrentPath] = useState(path)
  const [checking, setChecking] = useState(false)

  const fetchPath = async (path) => {
    setChecking(true)
    console.log("fetching path", path.value)

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
    console.log(response)
    return response
  }

  return (
    <>
      <div className="flex gap-2 mt-4">
        <div className="relative">
          <input type='url' className="block w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={currentPath.value} onChange={(e) => setCurrentPath({ id: currentPath.id, value: e.currentTarget.value })} onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchPath(currentPath)
            }
          }} />
          <div className="absolute right-3 top-3">
            {checking && <FiCoffee className="animate-pulse" />}
            {!checking && currentPath.status === "success" && <FiCheck />}
            {!checking && currentPath.status === "error" && <FiX color="red" />}
          </div>
        </div>
        <button className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => fetchPath(currentPath)}>Check</button>
      </div>
    </>
  )
}