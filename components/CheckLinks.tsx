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

  return (
    <>
      <h1 className='text-3xl font-extrabold'>Check Links</h1>
      {/* <div>{JSON.stringify(links)}</div> */}
      {
        links.map((link) =>
          <LinkInput key={link.id} link={link} updateLinks={updateLinks} />
        )}
    </>
  )
}