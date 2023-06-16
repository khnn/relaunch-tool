import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from "node-html-markdown"

import CheckLinks from "@/components/CheckLinks"

const getMDX = async (json) => {
  const req = await fetch(json)
  const data = await req.json()

  const mdx = NodeHtmlMarkdown.translate(
    await data.content.rendered,
    {},
    undefined,
    undefined
  )

  return mdx
}

export default async function Home() {
  const data = await getMDX("")

  return <main className="container mt-20" />
}
