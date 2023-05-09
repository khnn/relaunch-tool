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
      {
        paths.map((path) =>
          <PathInput key={path.id} path={path} updatePaths={updatePaths} baseUrl={baseUrl} />
        )}
      <button className="mt-4 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={addPath}>Add Path</button>
    </>
  )
}