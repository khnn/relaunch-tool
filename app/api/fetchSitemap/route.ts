/* eslint-disable import/prefer-default-export */

import { NextResponse } from "next/server"

const fetchXMLURL = (url: string) =>
  fetch(url)
    .then((res) => res.text())
    .then((xml) =>
      xml
        .split("\n")
        .filter((line) => line.includes("<loc>"))
        .map((line) =>
          line.replace("<loc>", "").replace("</loc>", "").replace(/\t\t/g, "")
        )
    )

export async function POST(request: Request) {
  const data = await request.json()
  const requestUrl = data.url

  try {
    const output = await fetchXMLURL(requestUrl)

    return NextResponse.json({ routes: output, message: "success" })
  } catch (error) {
    return NextResponse.json({ routes: [], message: "error" })
  }
}
