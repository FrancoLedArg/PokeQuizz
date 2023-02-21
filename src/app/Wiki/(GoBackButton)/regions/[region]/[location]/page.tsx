import Link from "next/link"

// Utils
import { fetchItem } from "@/utils/functions"
import { Data } from "@/utils/types"

interface Params {
  location: string
}

export default async function page(
  { params } : { params: Params }
) {
  const { location } = params
  const data = await fetchItem(`https://pokeapi.co/api/v2/location/${location}/`)

  return (
    <div>
      <h1>Location: {data.name}</h1>
      <div>
        <h3>Areas:</h3>
        {data.areas.map(
          (e: Data, index: number) =>
          <Link key={index} href={`/wiki/regions/${data.region.name}/${location}/${e.name}`}>
            {e.name}
          </Link>
        )}
      </div>
    </div>
  )
}
