// Utils
import { fetchItem } from "@/utils/functions"
import { Data } from "@/utils/types"

export default async function Game(
  { url } : { url: string }
) {
  const data = await fetchItem(url)

  return (
    <div>
      <h1>Game: {data.name}</h1>
      <span>{data.generation.name}</span>
      <ul>
        {data.move_learn_methods.map(
          (e: Data, index: number) =>
          <li key={index}>{e.name}</li>
        )}
      </ul>
    </div>
  )
}
