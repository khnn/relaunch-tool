import CheckLinks from '../components/CheckLinks'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-2">
        <div><CheckLinks /></div>
        <div></div>
      </div>
    </main>
  )
}
