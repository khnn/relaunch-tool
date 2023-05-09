"use client"
import * as Form from '@radix-ui/react-form';

const fetchLink = async (url: string) => {
  const response = await fetch('/api/fetchLink', {
    method: "POST",
    body: JSON.stringify({ url: url })
  },)

  console.log(response)
}

export default function CheckLinks() {
  return (
    <button onClick={() => fetchLink("https://dressedco.de")}>Add to Cart</button>
  )
}