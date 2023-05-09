/* eslint-disable import/prefer-default-export */

export async function POST(request: Request) {
  const data = await request.json()
  const requestUrl = data.url

  try {
    const response = await fetch(requestUrl, { method: "HEAD" })
    return response
  } catch (error) {
    return error
  }
}
