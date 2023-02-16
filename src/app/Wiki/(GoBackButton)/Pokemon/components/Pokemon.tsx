import Link from "next/link"
import Image from "next/image"

// Utils
import { fetchItem } from "@/utils/functions"

export default async function Pokemon(
  { url }: { url: string }
) {
  const pokemon = await fetchItem(url)

  return (
    <Link href={`/wiki/pokemon/${pokemon.name}`}>
      Pokemon: {pokemon.name}
      {pokemon.sprites ?
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={80}
          height={80}
        />
      : null}
    </Link>
  )
}
