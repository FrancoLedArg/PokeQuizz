import Link from "next/link"

// Utils
import { fetchItem } from "@/utils/functions"
import { Data } from "@/utils/types"

export default async function page() {
  const data = await fetchItem('https://pokeapi.co/api/v2/region/')
  console.log(data)
  return (
    <div>
      <h1>Regions</h1>
      <div>
        {data.results.map(
          (e: Data, index: number) =>
          <Link key={index} href={`/wiki/regions/${e.name}`}>
            {e.name}
          </Link>
        )}
      </div>
    </div>
  )
}
