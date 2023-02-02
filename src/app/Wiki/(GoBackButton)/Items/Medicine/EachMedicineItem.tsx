import Image from "next/image"

// Css
import styles from './Medicine.module.css'

interface Data {
  name: string,
  url: string
}

interface EffectEntry {
  effect: string,
  short_effect: string,
  language: Data
}0.

async function fetchItem (url: string) {
  const res = await fetch(url)
  const data = await res.json()

  const item = {
    name: data.name,
    fling_effect: data.fling_effect,
    fling_power: data.fling_power,
    cost: data.cost,
    attributes: data.attributes.map(
     (e: Data) => e.name
    ),
    effect: data.effect_entries.map(
      (e: EffectEntry) => e.short_effect
    ),
    sprite: data.sprites.default,
    gen: data.game_indices[0].generation.name.replace("generation-", "")
  }
  if(item.fling_effect != null) {
    console.log(item)
  }
  return item
}


export default async function Medicine(
  { url }: { url: string }
) {
  const item = await fetchItem(url)

  if(item.sprite === null) {
    return null
  } else return (
    <div className={styles.ItemContainer}>
      <h1 className={styles.Name}>{item.name}</h1>
      <div className={styles.Image}>
        {item.sprite ?
          <Image
            src={item.sprite}
            alt={item.name}
            width={30}
            height={30}
           /> : "Missing image"}
      </div>
      <h3 className={styles.Gen}>gen {item.gen}</h3>
      <div className={styles.Fling}>
        <h3 className={styles.Fe}>fling effect: {item.fling_effect}</h3>
        <h3 className={styles.Fp}>fling power: {item.fling_power}</h3>
      </div>
      <h3 className={styles.Cost}>cost: {item.cost}</h3>
      <ul className={styles.Attributes}>
        {item.attributes.map(
          (name: string, index: number) => (<li key={index}>{name}</li>)
        )}
      </ul>
      <h3 className={styles.Effect}>Effect: {item.effect}</h3>
    </div>
  )
}
