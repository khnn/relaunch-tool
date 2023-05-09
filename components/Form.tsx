import * as Form from '@radix-ui/react-form';

async function fetchLink(data: FormData) {
  "use server"
  const requestUrl = data.get("url-1") as string;
  console.log(requestUrl)

  try {
    const response = await fetch(requestUrl, { method: 'HEAD' });
    console.log(response)
    // return response.ok;
  } catch (error) {
    console.log(error)
    // return false;
  }
}

export default function OldLinks() {
  return (
    <form action={fetchLink}>
      <input name="url-1" id="url-1" type="url" />
      <button type="submit">Add to Cart</button>
    </form>
  )
}