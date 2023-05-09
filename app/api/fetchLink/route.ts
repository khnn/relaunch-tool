export async function POST(request: Request) {
    const data = await request.json()
    const requestUrl = data.url
  
    try {
      const response = await fetch(requestUrl, { method: 'HEAD' });
      console.log(response)
      return response;
    } catch (error) {
      console.log(error)
      return error;
    }
}