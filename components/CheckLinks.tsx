"use client"

import { useState } from "react"
import { FiLoader } from "react-icons/fi"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import PathInput from "./PathInput"

export default function CheckLinks() {
  const [baseUrl, setBaseUrl] = useState("https://")
  const [siteMapUrl, setSiteMapUrl] = useState("https://")
  const [currentTab, setCurrentTab] = useState("sitemap")
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
    setCurrentTab("base-url")
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
      <h1 className="mb-4 text-3xl font-extrabold">Path checker</h1>
      <Tabs value={currentTab} className="w-[400px]">
        <TabsList className="mb-4">
          <TabsTrigger value="sitemap" onClick={() => setCurrentTab("sitemap")}>
            1. Check Sitemap
          </TabsTrigger>
          <TabsTrigger
            value="base-url"
            onClick={() => setCurrentTab("base-url")}
          >
            2. Enter base URL
          </TabsTrigger>
          <TabsTrigger value="paths" onClick={() => setCurrentTab("paths")}>
            3. Paths ({paths.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sitemap">
          <label htmlFor="siteMapUrl">
            <span className="text-sm">Sitemap URL</span>
            <input
              type="url"
              id="siteMapUrl"
              placeholder="Sitemap URL"
              className="mt-2 block w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={siteMapUrl}
              onChange={(e) => setSiteMapUrl(e.currentTarget.value)}
            />
          </label>
          <Button
            className="mt-4 block"
            disabled={!siteMapUrl || siteMapUrl.includes("https://") === false}
            onClick={() => handleXMLParsing(siteMapUrl)}
          >
            {siteMapChecking ? (
              <FiLoader className="animate-spin" />
            ) : (
              "Parse XML"
            )}
          </Button>
        </TabsContent>
        <TabsContent value="base-url">
          <label
            htmlFor="baseUrl"
            className="mt-4 flex flex-col items-start gap-2"
          >
            <span className="text-sm">
              Enter your new base URL to check whether all your current paths
              exist at the new location.
            </span>
            <input
              type="url"
              id="baseUrl"
              placeholder="Base URL"
              className="block w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.currentTarget.value)}
            />
          </label>
          <Button className="mt-4 block" onClick={() => setCurrentTab("paths")}>
            Go to path Tab
          </Button>
        </TabsContent>
        <TabsContent value="paths">
          <Button className="mb-4 block" onClick={checkPaths}>
            {allChecking ? (
              <FiLoader className="animate-spin" />
            ) : (
              "Check all paths"
            )}
          </Button>
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
          <Button className="mt-4 block" onClick={addPath}>
            Add Path
          </Button>
        </TabsContent>
      </Tabs>
    </>
  )
}
