/* eslint-disable import/prefer-default-export */

import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const data = await request.json()
  const requestUrl = data.url

  try {
    const response = await fetch(requestUrl)
    const xml = await response.text()
    const filteredOutput = await xml
      .split("\n")
      .filter((line) => line.includes("<loc>"))
      .map((line) => line.replace("<loc>", "").replace("</loc>", ""))

    return NextResponse.json({ routes: filteredOutput, message: "success" })
  } catch (error) {
    return NextResponse.json({ routes: [], message: "error" })
  }
}
