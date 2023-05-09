"use client"
import * as Form from '@radix-ui/react-form';
import { useState } from "react"
import LinkInput from './LinkInput';

interface Link {
  id: string,
  value: string,
}

export default function CheckLinks() {
  const [links, setLinks] = useState([{
    id: "url-1",
    value: "https://dressedco.de",
    status: "unchecked",
  }])

  const updateLinks = (newLink: Link) => {
    setLinks(links.map((link) => {
      if (link.id === newLink.id) {
        return { ...link, value: newLink.value }
      }
      return link
    }))
  }

  const addLink = () => {
    setLinks([...links, {
      id: `url-${links.length + 1}`,
      value: "",
      status: "unchecked",
    }])
  }

  return (
    <>
      <h1 className='text-3xl font-extrabold'>Check Links</h1>
      {/* <div>{JSON.stringify(links)}</div> */}
      {
        links.map((link) =>
          <LinkInput key={link.id} link={link} updateLinks={updateLinks} />
        )}
      <button className="mt-4 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={addLink}>Add Link</button>
    </>
  )
}