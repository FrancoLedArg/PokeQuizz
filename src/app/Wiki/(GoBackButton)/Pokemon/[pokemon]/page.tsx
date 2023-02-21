import Image from "next/image"

// Utils
import { fetchItem } from "@/utils/functions"

interface Params {
  pokemon: string
}

export default async function Pokemon({ params } : { params: Params }) {
  const { pokemon } = params
  const data = await fetchItem(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)

  return (
    <div>
      {data.name}
      <Image
        src={data.sprites.front_default}
        alt={data.name}
        width={80}
        height={80}
      />

    </div>
  )
}
