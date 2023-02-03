import Image from "next/image"

// Utils
import { fetchItem } from "@/utils/functions"
import { Data } from "@/utils/types"

// Css
import styles from './category.module.css'

interface EffectEntry {
  effect: string,
  short_effect: string,
  language: Data
}

export default async function Item(
  { data }: { data: Data }
) {
  const item = await fetchItem(data.url)
  console.log(item)

  return (
    <div className={styles.ItemContainer}>
      <h1 className={styles.Name}>{item.name}</h1>
      <div className={styles.Image}>
        {item.sprites.default ?
          <Image
            src={item.sprites.default}
            alt={item.name}
            width={30}
            height={30}
          />
        : 'Missing image'}
      </div>
      <h3 className={styles.Gen}>gen {item.game_indices[0].generation.name.replace("generation-", "")}</h3>
      <div className={styles.Fling}>
        <h3 className={styles.Fe}>fling effect: {item.fling_effect}</h3>
        <h3 className={styles.Fp}>fling power: {item.fling_power}</h3>
      </div>
      <h3 className={styles.Cost}>cost: {item.cost}</h3>
      <ul className={styles.Attributes}>
        {item.attributes.map(
          (e: Data, index: number) => (<li key={index}>{e.name}</li>)
        )}
      </ul>
      <h3>
        {item.effect_entries ? item.effect_entries.map(
          (e: EffectEntry) => e.short_effect
        ): 'Missing effect'}
      </h3>
    </div>
  )
}
