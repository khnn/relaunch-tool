import { useState } from "react"
import { FiCheck, FiX, FiCoffee } from 'react-icons/fi'

export default function LinkInput({ link, updateLinks }) {
  { JSON.stringify(link) }
  const [currentLink, setCurrentLink] = useState(link)
  const [checking, setChecking] = useState(false)

  const fetchLink = async (link) => {
    setChecking(true)
    console.log("fetching link", link.value)

    const response = await fetch('/api/fetchLink', {
      method: "POST",
      body: JSON.stringify({ url: link.value })
    },)


    if (response.status === 200) {
      setCurrentLink({ ...currentLink, status: "success" })
    }

    if (response.status > 400) {
      setCurrentLink({ ...currentLink, status: "error" })
    }

    setChecking(false)
    console.log(response)
    return response
  }

  return (
    <>
      <p>{JSON.stringify(currentLink)}</p>
      <input type='url' value={currentLink.value} onChange={(e) => setCurrentLink({ id: currentLink.id, value: e.currentTarget.value })} />
      {/* <button onClick={() => {
        updateLinks(currentLink)
      }}>+</button> */}
      <p>
        <button onClick={() => fetchLink(currentLink)}>Check</button>
      </p>
      {checking && <FiCoffee />}
      {currentLink.status === "success" && <FiCheck />}
      {currentLink.status === "error" && <FiX />}
    </>
  )
}