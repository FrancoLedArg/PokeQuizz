import Image from "next/image"

// Utils
import { Data } from "@/utils/types"
import { fetchItem, firstLetterUppercase } from "@/utils/functions"

// Css
import styles from './item.module.css'

interface EffectEntry {
  effect: string,
  short_effect: string,
  language: Data
}

export default async function Item(
  { data }: { data: Data }
) {
  const item = await fetchItem(data.url)

  return (
    <div className={styles.container}>
      <h1 className={styles.name}>
        {item.names.filter(e => e.language.name === 'en').map(e => e.name)}
      </h1>
      <div className={styles.image}>
        {item.sprites.default ?
          <Image
            src={item.sprites.default}
            alt={item.name}
            width={30}
            height={30}
          />
        : 'Missing image'}
      </div>
      <div className={styles.fling}>
        {item.fling_effect ? <h3 className={styles.Fe}>fling effect: {item.fling_effect}</h3> : null}
        {item.fling_power ? <h3 className={styles.Fp}>fling power: {item.fling_power}</h3> : null}
      </div>
      <h3 className={styles.cost}>
        {item.cost > 0 ? `cost: ${item.cost}` : `Unavailable for purchase`}
      </h3>
      <ul className={styles.attributes}>
        {item.attributes ? item.attributes.map(
          (e: Data, index: number) => (<li key={index}>{e.name}</li>)
        ): null}
      </ul>
      <h3 className={styles.description}>
        {item.effect_entries ? item.effect_entries.map(
          (e: EffectEntry) => e.short_effect
        ): null}
      </h3>
    </div>
  )
}
