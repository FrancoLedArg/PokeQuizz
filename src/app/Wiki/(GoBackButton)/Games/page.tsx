import Link from "next/link"

// Utils
import { Data } from "@/utils/types"
import { fetchItem } from "@/utils/functions"

// Components
import Game from "./Game"

export default async function Games() {
  const data = await fetchItem('https://pokeapi.co/api/v2/version-group/?limit=25')

  return (
    <div>
      <h1>Games</h1>
      <div>
        {data.results.map((e: Data, index: number) =>
          <Game key={index} url={e.url} />
        )}
      </div>
    </div>
  )
}
