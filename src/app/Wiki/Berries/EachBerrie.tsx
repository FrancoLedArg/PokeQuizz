import Image from 'next/image'

// Css
import styles from './Berries.module.css'

interface Berrie {
  id: number,
  name: string,
  flavors: [object],
  size: number,
  firmness: string,
  description: string,
  sprite: string
}

async function fetchBerrie (url: string) {
  let berrie = {} as Berrie
  try {
    const res = await fetch(url)
    const data1 = await res.json()

    const res2 = await fetch(data1.item.url)
    const data2 = await res2.json()

    berrie = {
      id: data1.id,
      name: data1.name,
      flavors: data1.flavors,
      size: data1.size,
      firmness: data1.firmness.name,
      description: data2.effect_entries.map(
        ({ short_effect }: { short_effect: string }) => short_effect).join(''),
      sprite: data2.sprites.default
    }
  } catch (error) {
    console.error(error)
  }
  return berrie
}

export default async function EachBerrie(
  { url }: { url: string }
) {
  const berrie = await fetchBerrie(url)
  return (
    <div className={styles.EachBerrie}>
      <Image
        src={berrie.sprite}
        alt={berrie.name}
        width={30}
        height={30}
      />
      <h3>No{berrie.id}</h3>
      <h1>{berrie.name}</h1>
      <div>
        <h3>SIZE/ {berrie.size}</h3>
        <h3>FIRM/ {berrie.firmness}</h3>
      </div>
      <div>Flavor graphic</div>
      <div>{berrie.description}</div>
    </div>
  )
}
