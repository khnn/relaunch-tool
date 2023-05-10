"use client"

import { useState } from "react"
import { FiLoader } from "react-icons/fi"

import PathInput from "./PathInput"

export default function CheckLinks() {
  const [baseUrl, setBaseUrl] = useState("")
  const [siteMapUrl, setSiteMapUrl] = useState("")
  const [siteMapChecking, setSiteMapChecking] = useState(false)
  const [allChecking, setAllChecking] = useState(false)
  const [paths, setPaths] = useState<Path[]>([
    {
      id: "url-1",
      value: "/",
      status: "unchecked",
    },
  ])

  const addPath = () => {
    setPaths([
      ...paths,
      {
        id: `url-${paths.length + 1}`,
        value: "",
        status: "unchecked",
      },
    ])
  }

  const handleXMLParsing = async (url: string) => {
    setSiteMapChecking(true)
    const response = await fetch("/api/fetchSitemap", {
      method: "POST",
      body: JSON.stringify({ url: new URL(url) }),
    })

    const data = await response.json()

    if (data.message === "success") {
      setPaths(
        data.routes.map((route: string) => {
          return {
            id: `url-${route}`,
            value: new URL(route).pathname,
            status: "unchecked",
          }
        })
      )

      setBaseUrl(new URL(data.routes[0]).origin)
    }

    setSiteMapChecking(false)
    return data
  }

  const checkPaths = async () => {
    setAllChecking(true)

    const promises = paths.map(async (path) => {
      return fetch("/api/fetchLink", {
        method: "POST",
        body: JSON.stringify({ url: `${baseUrl}${path.value}` }),
      })
    })

    const responses = await Promise.all(promises).then((values) => {
      setPaths(
        paths.map((path, index) => {
          if (values[index].status === 200) {
            return { ...path, status: "success" }
          }

          if (values[index].status > 400) {
            return { ...path, status: "error" }
          }

          return path
        })
      )
    })

    setAllChecking(false)
    return responses
  }

  const updatePaths = (newPath: Path) => {
    setPaths(
      paths.map((path) => {
        if (path.id === newPath.id) {
          return newPath
        }

        return path
      })
    )
  }

  return (
    <>
      <h1 className="text-3xl font-extrabold">Check Paths</h1>
      <div className="flex gap-2 py-4">
        <input
          type="url"
          id="siteMapUrl"
          placeholder="Sitemap URL"
          className="block w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={siteMapUrl}
          onChange={(e) => setSiteMapUrl(e.currentTarget.value)}
        />
        <button
          type="button"
          className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-200"
          disabled={!siteMapUrl}
          onClick={() => handleXMLParsing(siteMapUrl)}
        >
          {siteMapChecking ? (
            <FiLoader className="animate-spin" />
          ) : (
            "Parse XML"
          )}
        </button>
      </div>
      <hr />
      <label htmlFor="baseUrl" className="flex items-center gap-2">
        Base URL
        <input
          type="url"
          id="baseUrl"
          className="my-4 block w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.currentTarget.value)}
        />
      </label>
      {paths.map((path) => (
        <PathInput
          key={path.id}
          path={path}
          baseUrl={baseUrl}
          allChecking={allChecking}
          checkPaths={checkPaths}
          updatePaths={updatePaths}
        />
      ))}
      <button
        type="button"
        className="mt-4 block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={addPath}
      >
        Add Path
      </button>
      <button
        type="button"
        className="mt-4 block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={checkPaths}
      >
        {allChecking ? <FiLoader className="animate-spin" /> : "Check all"}
      </button>
    </>
  )
}
