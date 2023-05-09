"use client"
import * as Form from '@radix-ui/react-form';
import { useState } from "react"
import PathInput from './PathInput';

interface Path {
  id: string,
  value: string,
  status: "unchecked" | "success" | "error"
}

export default function CheckLinks() {
  const [baseUrl, setBaseUrl] = useState("https://dressedco.de")
  const [paths, setPaths] = useState([{
    id: "url-1",
    value: "/",
    status: "unchecked",
  }])

  const updatePaths = (newPath: Path) => {
    setPaths(paths.map((path) => {
      if (path.id === newPath.id) {
        return { ...path, value: newPath.value }
      }
      return path
    }))
  }

  const addPath = () => {
    setPaths([...paths, {
      id: `url-${paths.length + 1}`,
      value: "",
      status: "unchecked",
    }])
  }

  return (
    <>
      <h1 className='text-3xl font-extrabold'>Check Paths</h1>
      <label htmlFor='baseUrl' className='flex items-center gap-2'>
        Base URL
        <input type='url' id="baseUrl" className="my-4 block w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={baseUrl} onChange={(e) => setBaseUrl(e.currentTarget.value)}></input>
      </label>
      {
        paths.map((path) =>
          <PathInput key={path.id} path={path} updatePaths={updatePaths} baseUrl={baseUrl} />
        )}
      <button className="mt-4 block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={addPath}>Add Path</button>
    </>
  )
}