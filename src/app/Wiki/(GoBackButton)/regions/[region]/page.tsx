import Link from "next/link"

// Utils
import { fetchItem } from "@/utils/functions"
import { Data } from "@/utils/types"

interface Params {
  region: string
}

export default async function page(
  { params } : { params: Params }
) {
  const { region } = params
  const data = await fetchItem(`https://pokeapi.co/api/v2/region/${region}/`)

  return (
    <div>
      <h1>Region: {data.name}</h1>
      <div>
        <h3>Pokedexes:</h3>
        {data.pokedexes.map(
          (e: Data, index: number) =>
          <Link key={index} href={`#`}>
            {e.name}
          </Link>
        )}
      </div>
      <div>
        <h3>Games:</h3>
        {data.version_groups.map(
          (e: Data, index: number) =>
          <Link key={index} href={`/wiki/games/${e.name}`}>
            {e.name}
          </Link>
        )}
      </div>
      <div>
        <h3>Locations:</h3>
        {data.locations.map(
          (e: Data, index: number) =>
          <Link key={index} href={`/wiki/regions/${region}/${e.name}`}>
            {e.name}
          </Link>
        )}
      </div>
    </div>
  )
}
